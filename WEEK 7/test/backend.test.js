const request = require('supertest');
const http = require('http');
const app = require('../src/server'); // Adjust the path if needed

jest.setTimeout(30000); // Set global timeout to 30 seconds for all tests

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(4000, () => {
    console.log('Server is up and running on port 4000');
    done();  // Wait until the server is fully running
  });
});

afterAll((done) => {
  if (server) {
    console.log('Shutting down server...');
    server.close(() => {
      console.log('Test server closed');
      done();  // Ensure done is called after server is closed
    });
  } else {
    done();
  }
});

describe('Server Tests', () => {
  test('GET / - should return the HTML page', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('<title>Food Web App</title>');
  });

  test('Socket.IO connection - emit recipe_added', (done) => {
    jest.setTimeout(20000); // Increase timeout for this specific test to 20 seconds
    const io = require('socket.io-client');
    const socket = io('http://localhost:4000');

    socket.emit('new_recipe', { category: 'Desserts', recipe: 'Chocolate Cake' });

    socket.on('recipe_added', (data) => {
      expect(data.category).toBe('Desserts');
      socket.disconnect();
      done();
    });
  });

  test('Socket.IO connection - emit rate_recipe', (done) => {
    jest.setTimeout(20000); // Increase timeout for this specific test to 20 seconds
    const io = require('socket.io-client');
    const socket = io('http://localhost:4000');

    socket.emit('rate_recipe', { category: 'Healthy Foods', rating: 4.8 });

    socket.on('rating_updated', (data) => {
      expect(data.category).toBe('Healthy Foods');
      expect(data.rating).toBeCloseTo(4.8);
      socket.disconnect();
      done();
    });
  });
});

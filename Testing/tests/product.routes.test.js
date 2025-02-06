const request = require('supertest');
const { startServer, stopServer } = require('../server'); // Import functions to control the server

describe('Product Routes', () => {
  let server; // Store the server instance

  // Start the server before running the tests
  beforeAll(() => {
    server = startServer(0); // Use port 0 to let the OS assign a random available port
  });

  // Stop the server after running the tests
  afterAll(() => {
    stopServer();
  });

  it('should fetch all products with correct structure', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
    });
  });

  it('should return 404 for a non-numeric product ID', async () => {
    const response = await request(server).get('/api/products/abc');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Product not found');
  });

  it('should handle products with large names gracefully', async () => {
    const largeName = 'A'.repeat(1000);
    const response = await request(server).post('/api/products').send({
      name: largeName,
      price: 100,
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(largeName);
  });
});

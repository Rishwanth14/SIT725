const request = require('supertest');
const { startServer, stopServer, app } = require('./server');

describe('Product API', () => {
  let server;

  // Start the server before the tests
  beforeAll(() => {
    server = startServer(3001); // Use a different port for testing
  });

  // Stop the server after the tests
  afterAll(() => {
    stopServer();
  });

  it('should return a list of products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // Two initial products
  });

  it('should create a new product', async () => {
    const newProduct = { name: 'Product D', price: 200 };
    const response = await request(app).post('/api/products').send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'Product D');
  });
});

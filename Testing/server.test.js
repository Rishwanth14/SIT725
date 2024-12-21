// server.test.js
const request = require('supertest');
const app = require('./server'); // Import your Express app

describe('Product API', () => {
  // Test GET /api/products
  it('should return a list of products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // We have two products initially
  });

  // Test GET /api/products/:id
  it('should return a product by ID', async () => {
    const response = await request(app).get('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name', 'Product A');
  });

  // Test POST /api/products (Create a new product)
  it('should create a new product', async () => {
    const newProduct = { name: 'Product C', price: 200 };
    const response = await request(app).post('/api/products').send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'Product C');
    expect(response.body).toHaveProperty('price', 200);
  });

  // Test PUT /api/products/:id (Update an existing product)
  it('should update an existing product', async () => {
    const updatedProduct = { name: 'Updated Product A', price: 120 };
    const response = await request(app).put('/api/products/1').send(updatedProduct);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Product A');
    expect(response.body).toHaveProperty('price', 120);
  });

  // Test DELETE /api/products/:id (Delete a product)
  it('should delete a product by ID', async () => {
    const response = await request(app).delete('/api/products/2');
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('id', 2);
    expect(response.body[0]).toHaveProperty('name', 'Product B');
  });

  // Test GET /api/products after deletion (ensure product is deleted)
  it('should not find a deleted product', async () => {
    const response = await request(app).get('/api/products/2');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Product not found');
  });
});

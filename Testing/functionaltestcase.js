it('should fetch all products with correct structure', async () => {
  const response = await request(server).get('/api/products');
  expect(response.status).toBe(200); // Check for HTTP 200 status
  expect(response.body).toBeInstanceOf(Array); // Ensure response is an array

  response.body.forEach((product) => {
    expect(product).toHaveProperty('id'); // Check for 'id' field
    expect(product).toHaveProperty('name'); // Check for 'name' field
    expect(product).toHaveProperty('price'); // Check for 'price' field
  });
});

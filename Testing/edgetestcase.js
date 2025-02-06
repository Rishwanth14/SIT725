it('should handle products with large names gracefully', async () => {
    const largeName = 'A'.repeat(1000); // Create a 1000-character string
    const response = await request(server).post('/api/products').send({
      name: largeName,
      price: 100,
    });
  
    expect(response.status).toBe(201); // Check for successful creation
    expect(response.body.name).toBe(largeName); // Verify the name is stored correctly
  });
  
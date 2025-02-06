it('should return 404 for a non-numeric product ID', async () => {
    const response = await request(server).get('/api/products/abc'); // Non-numeric ID
    expect(response.status).toBe(404); // Ensure HTTP 404 is returned
    expect(response.text).toBe('Product not found'); // Check for appropriate error message
  });
  
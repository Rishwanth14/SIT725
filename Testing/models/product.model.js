let products = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 150 },
  ];
  
  // Get all products
  exports.getAllProducts = () => products;
  
  // Get product by ID
  exports.getProductById = (id) => products.find((p) => p.id === id);
  
  // Create a new product
  exports.createProduct = (name, price) => {
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    return newProduct;
  };
  
  // Update an existing product
  exports.updateProduct = (id, updates) => {
    const product = products.find((p) => p.id === id);
    if (!product) return null;
    Object.assign(product, updates);
    return product;
  };
  
  // Delete a product
  exports.deleteProduct = (id) => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    return products.splice(index, 1)[0];
  };
  
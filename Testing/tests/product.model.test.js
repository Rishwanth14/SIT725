const productModel = require('../models/product.model');

describe('Product Model', () => {
  it('should fetch all products', () => {
    const products = productModel.getAllProducts();
    expect(products).toHaveLength(2);
  });

  it('should fetch a product by ID', () => {
    const product = productModel.getProductById(1);
    expect(product).toHaveProperty('id', 1);
  });

  it('should return null for a nonexistent product ID', () => {
    const product = productModel.getProductById(999);
    expect(product).toBeUndefined();
  });

  it('should create a new product', () => {
    const newProduct = productModel.createProduct('Product C', 200);
    expect(newProduct).toHaveProperty('id', 3);
    expect(newProduct.name).toBe('Product C');
  });

  it('should update an existing product', () => {
    const updatedProduct = productModel.updateProduct(1, { name: 'Updated Product A' });
    expect(updatedProduct).toHaveProperty('name', 'Updated Product A');
  });

  it('should delete a product', () => {
    const deletedProduct = productModel.deleteProduct(2);
    expect(deletedProduct).toHaveProperty('id', 2);
    expect(productModel.getAllProducts()).toHaveLength(2);
  });
});

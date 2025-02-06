const productModel = require('../models/product.model');

// Get all products
exports.getAllProducts = (req, res) => {
  const products = productModel.getAllProducts();
  res.status(200).json(products);
};

// Get a product by ID
exports.getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = productModel.getProductById(id);
  if (!product) return res.status(404).send('Product not found');
  res.status(200).json(product);
};

// Create a new product
exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).send('Invalid input');
  const newProduct = productModel.createProduct(name, price);
  res.status(201).json(newProduct);
};

// Update a product
exports.updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;
  const updatedProduct = productModel.updateProduct(id, updates);
  if (!updatedProduct) return res.status(404).send('Product not found');
  res.status(200).json(updatedProduct);
};

// Delete a product
exports.deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const deletedProduct = productModel.deleteProduct(id);
  if (!deletedProduct) return res.status(404).send('Product not found');
  res.status(200).json(deletedProduct);
};

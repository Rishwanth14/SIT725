// server.js
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// In-memory product database
let products = [
  { id: 1, name: 'Product A', price: 100 },
  { id: 2, name: 'Product B', price: 150 }
];

// Route to get all products
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// Route to get a product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.status(200).json(product);
});

// Route to create a new product
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Route to update a product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');

  const { name, price } = req.body;
  product.name = name || product.name;
  product.price = price || product.price;

  res.status(200).json(product);
});

// Route to delete a product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Product not found');

  const deletedProduct = products.splice(index, 1);
  res.status(200).json(deletedProduct);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export the app for testing

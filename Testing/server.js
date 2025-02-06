const express = require('express');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

let server; // Reference to the server instance

// Start the server function
const startServer = (port = 3000) => {
  server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  return server;
};

// Stop the server function
const stopServer = () => {
  if (server) {
    server.close();
  }
};

module.exports = { app, startServer, stopServer }; // Export functions for testing

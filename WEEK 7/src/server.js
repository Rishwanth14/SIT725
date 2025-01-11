const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('recipe_added', (data) => {
        io.emit('recipe_added', data);
    });

    socket.on('rate_recipe', (data) => {
        io.emit('rate_recipe', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Only start the server if this file is run directly
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for testing
module.exports = { app, server, io };
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Use the public/index.html chat front-end
app.use(express.static(__dirname + '/public'));

// Handle client connections
io.on('connection', (socket) => {
  console.log('User connected');

  // Broadcast client messages
  socket.on('message', (message) => {
    console.log('Message received: ' + message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// This runs your express server on http://localhost:3000
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
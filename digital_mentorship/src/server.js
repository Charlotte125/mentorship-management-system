// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Example: Send a message to the client
  socket.emit('message', 'Welcome to Socket.IO server!');

  // Example: Listen for a client message
  socket.on('clientMessage', (data) => {
    console.log('Message from client:', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Socket.IO server running on http://localhost:3000');
});

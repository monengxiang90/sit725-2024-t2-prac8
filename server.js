const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const mongoURI = 'mongodb+srv://monengxiang90:Kaoni1qiwa@cluster0.w2a8b.mongodb.net/';
const http = require('http');  // Required to create the server
const socketIo = require('socket.io');  // Import socket.io

const app = express();
const port = 2024;

// Connect to MongoDB 
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Public')));

// Routes
const calculationRoutes = require('./routes/calculationRoutes');
app.use('/api', calculationRoutes);  // Mount routes under /api

// Create HTTP server and attach Socket.IO to it
const server = http.createServer(app);  // Create an HTTP server
const io = socketIo(server);  // Attach Socket.IO to the HTTP server

// Socket.IO connection setup
io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

// Start server and listen on the specified port
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

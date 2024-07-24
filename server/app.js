const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const codeblocks = require('./codeblocks');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/codeblocks', (req, res) => {
    res.json(codeblocks);
});

io.on('connection', (socket) => {
    socket.on('codeUpdate', (data) => {
        socket.broadcast.emit('codeUpdate', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

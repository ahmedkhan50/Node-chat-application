const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connected');
    socket.on('createMessage', (message) => {
        console.log(message);
    });

    socket.emit('newMessage',{
         from:'ahm233@dskd.com',
         text:'bye guys!!',
         createdAt:123
    });

    socket.on('disconnect', () => {
        console.log('client disconnected!!');
    });
});


server.listen(port, () => {
    console.log(`server is up at port ${port}`);
});


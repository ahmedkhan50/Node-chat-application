const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connected');
    // notify the user who joined recently with welcome message! 
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!!'));

    // notify all other users other than who joined the chat by using socket.broadcast.emit
    // socket.broadcast.emit will send to all users except the one who opened application.
    socket.broadcast.emit('newMessage',generateMessage('admin','New User Joined!!'));

    socket.on('createMessage', (message,callback) => {
        io.emit('newMessage',generateMessage(message.from,message.text));     
        callback('this is from the server!!');
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('admin',coords.latitude, coords.longitude));  
    });

    socket.on('disconnect', () => {
        console.log('client disconnected!!');
    });
});


server.listen(port, () => {
    console.log(`server is up at port ${port}`);
});


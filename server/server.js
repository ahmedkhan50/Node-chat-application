const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();
app.use(express.static(publicPath));


io.on('connection', (socket) => {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('name and room name required');
        }
        const roomName = params.room.toLowerCase();
        socket.join(roomName);
        // remove user from list if other room he had joined.
        users.removeUser(socket.id);
        // add user to list
        users.addUser(socket.id, params.name, roomName);
        io.to(roomName).emit('updateUserList', users.getUserList(roomName));
        // socket.leave(params.room);
        // io.emit -> emits message to all users joined to server.->io.to(params.room).emit
        // socket.broadcast.emit -> sends notification to everyone except the one who joined.-> socket.broadcast.to(params.room).emit
        // socket.emit -> emits notification only to user who currently joined.

        // notify the user who joined recently with welcome message! 
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!!'));
        // notify all other users other than who joined the chat by using socket.broadcast.emit
        // socket.broadcast.emit will send to all users except the one who opened application.
        socket.broadcast.to(roomName).emit('newMessage', generateMessage('admin', `${params.name} has joined.`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        // on disconnection please remove user form the list.
        var remUser = users.removeUser(socket.id);
        if (remUser) {
            io.to(remUser.room).emit('updateUserList', users.getUserList(remUser.room));
            io.to(remUser.room).emit('newMessage', generateMessage('From', `${remUser.name} has Left!`));
        }
    });
});


server.listen(port, () => {
    console.log(`server is up at port ${port}`);
});


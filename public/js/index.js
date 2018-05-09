var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('server disconnected');
});

socket.on('newMessage', function (newmessage) {
    console.log(newmessage);
    var li = $("<li></li>");
    li.text(`${newmessage.from}:${newmessage.text}`);
    $("#messages").append(li);
});

$("#message-form").on("submit", function (event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'user',
        text: $("#message-form input[name='message']").val()
    }, function (message) {
        console.log('Got it..' + message);
    });

});
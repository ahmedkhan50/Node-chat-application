var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('server disconnected');
});

socket.on('newMessage', function (newmessage) {
    var li = $("<li></li>");
    li.text(`${newmessage.from}:${newmessage.text}`);
    $("#messages").append(li);
});

socket.on('newLocationMessage', function (newLocation) {
    var li = $("<li></li>");
    var a = $("<a target='blank'>My current location</a>");
    li.text(`${newLocation.from}:`);
    a.attr('href', newLocation.url);
    li.append(a);
    $("#messages").append(li);
});

$("#message-form").on("submit", function (event) {
    event.preventDefault();
    var messageTextBox = $(".chat__footer #message-form input[name='message']");
    socket.emit('createMessage', {
        from: 'user',
        text: messageTextBox.val()
    }, function (message) {
        console.log('Got it..' + message);
        messageTextBox.val('');
    });

});

var locationButton = $("#send-location");
locationButton.on('click', function (event) {
    if (!navigator.geolocation) {
        return alert('geolocation not supported by this browser!');
    }

    // disable button when fetching location...
    locationButton.attr('disabled', 'disabled').text('Sending location..');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to fetch location!');
    });
});
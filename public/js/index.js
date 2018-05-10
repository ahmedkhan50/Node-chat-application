var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('server disconnected');
});

socket.on('newMessage', function (newmessage) {
    var template = $("#message-template").html();
    var formattedTime = moment(newmessage.createdAt).format('h:mm a');
    var content = Mustache.render(template, {
        text: newmessage.text,
        from: newmessage.from,
        time: formattedTime
    });
    $("#messages").append(content);
});

socket.on('newLocationMessage', function (newLocation) {
    var formattedTime = moment(newLocation.createdAt).format('h:mm a');
    var template = $("#location-message-template").html();
    var content = Mustache.render(template, {
        url: newLocation.url,
        from: newLocation.from,
        time: formattedTime
    });
    $("#messages").append(content);
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
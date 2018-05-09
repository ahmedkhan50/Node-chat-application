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

socket.on('newLocationMessage',function(newLocation){
    var li = $("<li></li>");
    var a = $("<a target='blank'>My current location</a>");
    li.text(`${newLocation.from}:`);
    a.attr('href',newLocation.url);
    li.append(a);
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

var locationButton = $("#send-location");
locationButton.on('click',function(event){
    if(!navigator.geolocation){
        return alert('geolocation not supported by this browser!');
    }

    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage',{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
      });
    },function(){
         alert('unable to fetch location!');
    });
});
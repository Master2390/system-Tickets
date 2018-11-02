var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado');
});


socket.on('disconnect', function() {
    console.log('Desconectado');
});

socket.on('estadoActual', function(res) {
    label.text(res.ultimo);
});

socket.on('nextTicket', function(msg) {
    console.log(msg);
});

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(res) {
        label.text(res.msg);
    });
});
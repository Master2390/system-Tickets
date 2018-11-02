var socket = io();
var label = $('small');

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El Escritorio es necesario');
}
var escritorio = searchParams.get('escritorio');
$('h1').text('Escritorio ' + escritorio);
$('button').on('click', function() {
    socket.emit('atentionTicket', { escritorio: escritorio }, function(res) {
        if (res.ok) {
            label.text('Ticket ' + res.data.numero);
        } else {
            label.text(res.data);
            alert(res.data);
        }
    });
});
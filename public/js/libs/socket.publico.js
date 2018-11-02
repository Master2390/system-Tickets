var socket = io();

var lblTicket = [$("#lblTicket1"), $("#lblTicket2"), $("#lblTicket3"), $("#lblTicket4")];
var lblEscritorio = [$("#lblEscritorio1"), $("#lblEscritorio2"), $("#lblEscritorio3"), $("#lblEscritorio4")];

socket.on('estadoActual', function(res) {
    var audio = new Audio();
    audio.src = 'audio/new-ticket.mp3';
    audio.play();
    actualizaHTML(res.lastTicket);
});

function actualizaHTML(lastTicket) {
    lastTicket.forEach(function(ticket, i) {
        lblTicket[i].text('Ticket ' + ticket.numero);
        lblEscritorio[i].text('Escritorio ' + ticket.escritorio);
    });
}
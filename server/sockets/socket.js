const { io } = require('../server');
const { ticketControl } = require('../classes/ticket-control');

const ticket = new ticketControl();

io.on('connection', (client) => {

    client.emit('estadoActual', {
        ultimo: ticket.getLastTicket(),
        lastTicket: ticket.getLastFourTicket()
    });

    client.on('nextTicket', (msg, callback) => {
        callback({
            msg: ticket.next()
        });
    });

    client.on('atentionTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                ok: false,
                data: 'El Escritorio es Necesario'
            });
        }
        let atentionTicket = ticket.atentionTicket(data.escritorio);
        if (atentionTicket === 'No hay Tickets') {
            return callback({
                ok: false,
                data: atentionTicket
            });
        }
        client.broadcast.emit('estadoActual', {
            ultimo: ticket.getLastTicket(),
            lastTicket: ticket.getLastFourTicket()
        });
        return callback({
            ok: true,
            data: atentionTicket
        });
    });

});
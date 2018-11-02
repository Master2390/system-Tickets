const fs = require('fs');

class Ticket {
    constructor(num, escrit) {
        this.numero = num;
        this.escritorio = escrit;
    }
}

class ticketControl {
    constructor() {
        this.ultimo = 0;
        this.tickets = [];
        this.lastTickets = [];
        this.hoy = new Date().getDate();
        let data = require("../data/data.json");
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.lastTickets = data.lastTickets;
        } else {
            this.reinit()
        }
    }

    next() {
        this.ultimo++;
        this.grabarData();

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        return `Ticket ${this.ultimo}`;
    }

    getLastTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getLastFourTicket() {
        return this.lastTickets;
    }

    reinit() {
        this.ultimo = 0;
        this.tickets = [];
        this.lastTickets = [];
        this.grabarData();
        console.log('Reinicio de Tickets');
    }

    atentionTicket(escrit) {
        if (this.tickets.length === 0) {
            return `No hay Tickets`;
        }
        let numTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atiendeTicket = new Ticket(numTicket, escrit);
        this.lastTickets.unshift(atiendeTicket);
        if (this.lastTickets.length > 4) {
            this.lastTickets.splice(-1, 1);
        }

        this.grabarData();

        return atiendeTicket;
    }

    grabarData() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            lastTickets: this.lastTickets,
        }

        let dataStr = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', dataStr);
    }
}

module.exports = {
    ticketControl
}
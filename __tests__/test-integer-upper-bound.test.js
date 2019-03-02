import { Proxy } from 'cloakroom-smart-buffer-proxy';
import randomstring from 'randomstring';

const verifyTicket = (proxy, ticketDescriptor, index) => {
    console.log(`[${index}] Expecting ticket, ${ticketDescriptor.ticket}, to resolve to, ${ticketDescriptor.expectedValue}, actually: ${proxy.readCloakroomTicket(ticketDescriptor.ticket)}`);
    expect(proxy.readCloakroomTicket(ticketDescriptor.ticket)).toBe(ticketDescriptor.expectedValue);
};

const saveTicket = (savedTickets, ticket, expectedValue) => {
    savedTickets.push({
        ticket: ticket,
        expectedValue: expectedValue
    })
};

const checkTicketListIntegrity = (savedTickets, proxy) => {
    savedTickets.forEach((ticketDescriptor, index) => {
        verifyTicket(proxy, ticketDescriptor, index)
    });
}

const checkTicketListInvalidated = (savedTickets, proxy) => {
    savedTickets.forEach((ticketDescriptor, index) => {
        verifyTicket(proxy, { ticket: ticketDescriptor.ticket, expectedValue: null }, index)
    });
}

describe('Roll over code', () => {
    it('should rollover', () => {
        const proxy = new Proxy(100);
        for (let i = 0; i < 100; ++i) {
            proxy.append(Buffer.from(randomstring.generate(1)));
        }

        const savedTickets = [];
        for (let i = 0; i < 100; ++i) {
            saveTicket(savedTickets, proxy.getCloakroomTicket(i), proxy.getReadOnlyBuffer()[proxy.getReadOnlyBuffer().length - 1 - i]);
        }
        checkTicketListIntegrity(savedTickets, proxy);

        for (let i = 0; i < 25; ++i) {
            proxy.append(Buffer.from(randomstring.generate(1)));
        }

        checkTicketListIntegrity(savedTickets.slice(0, 75), proxy);
        checkTicketListInvalidated(savedTickets.slice(75), proxy);
    });
});

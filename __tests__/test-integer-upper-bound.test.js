import { Proxy } from 'cloakroom-smart-buffer-proxy';
import randomstring from 'randomstring';

const verifyTicket = (proxy, ticketDescriptor) => {
    console.log(`Expecting ticket, ${ticketDescriptor.ticket}, to resolve to, ${ticketDescriptor.expectedValue}.`);
    console.log(`Got: ${proxy.readCloakroomTicket(ticketDescriptor.ticket)}`)
    console.log(proxy.getReadOnlyBuffer());
    expect(proxy.readCloakroomTicket(ticketDescriptor.ticket)).toBe(ticketDescriptor.expectedValue);
};

const saveTicket = (savedTickets, ticket, expectedValue) => {
    savedTickets.push({
        ticket: ticket,
        expectedValue: expectedValue
    })
};

const checkTicketListIntegrity = (savedTickets, proxy) => {
    savedTickets.forEach(ticketDescriptor => {
        verifyTicket(proxy, ticketDescriptor)
    });
}

describe('When the internal counter is pushed past 2^32', () => {
    it('should rollover', () => {
        const proxy = new Proxy();
        for (let i = 0; i < 10; ++i) {
            proxy.append(Buffer.from(randomstring.generate(1)));
        }

        const savedTickets = [];
        saveTicket(savedTickets, proxy.getCloakroomTicket(0), proxy.getReadOnlyBuffer()[0]);
        checkTicketListIntegrity(savedTickets, proxy);
    });
});

const { Proxy } = require('cloakroom-smart-buffer-proxy');

// An instance of Proxy with a set length of 10
const proxy = new Proxy(10);

proxy.append(Buffer.from([69, 68, 67, 66, 65]));
console.log(proxy.getReadOnlyBuffer()); // [69, 68, 67, 66, 65]

const ticket1 = proxy.createTicket(0); // Get a ticket for item zero, 65
console.log(proxy.resolveTicket(ticket1)); // { value: 65, offset 0 }
const ticket2 = proxy.createTicket(4); // Get a ticket for item four, 69
console.log(proxy.resolveTicket(ticket2)); // { value: 69, offset: 4 }

proxy.append(Buffer.from([101, 100, 99, 98, 97]));
console.log(proxy.getReadOnlyBuffer()); // [69, 68, 67, 66, 65, 101, 100, 99, 98, 97]
console.log(proxy.resolveTicket(ticket1)); // { value: 65, offset: 5 }
console.log(proxy.resolveTicket(ticket2)); // { value: 69, offset: 9 }

const ticket3 = proxy.createTicket(0); // Get a ticket for item zero, 97
console.log(proxy.resolveTicket(ticket3)); // { value: 97, offset: 0 }
const ticket4 = proxy.createTicket(9); // Get a ticket for item nine, 69
console.log(proxy.resolveTicket(ticket4)); // { value: 69, offset: 9 }

proxy.append(Buffer.from([0x78]));
console.log(proxy.getReadOnlyBuffer()); // [68, 67, 66, 65, 101, 100, 99, 98, 97, 120]
console.log(proxy.resolveTicket(ticket1)); // { value: 65, offset: 6 }
console.log(proxy.resolveTicket(ticket2)); // null
console.log(proxy.resolveTicket(ticket3)); // { value: 97, offset: 1 }
console.log(proxy.resolveTicket(ticket4)); // null

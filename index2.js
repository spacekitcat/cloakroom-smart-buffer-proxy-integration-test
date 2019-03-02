const { Proxy } = require('cloakroom-smart-buffer-proxy');

// An instance of Proxy with a set length of 10
const proxy = new Proxy(10);

proxy.append(Buffer.from([69, 68, 67, 66, 65]));
console.log(proxy.getReadOnlyBuffer()); // [69, 68, 67, 66, 65]

const ticket1 = proxy.getCloakroomTicket(0); // Get a ticket for item zero, 65
console.log(proxy.readCloakroomTicket(ticket1)); // 65
const ticket2 = proxy.getCloakroomTicket(4); // Get a ticket for item four, 69
console.log(proxy.readCloakroomTicket(ticket2)); // 69

proxy.append(Buffer.from([101, 100, 99, 98, 97]));
console.log(proxy.getReadOnlyBuffer()); // [69, 68, 67, 66, 65, 101, 100, 99, 98, 97]
console.log(proxy.readCloakroomTicket(ticket1)); // 65
console.log(proxy.readCloakroomTicket(ticket2)); // 69

const ticket3 = proxy.getCloakroomTicket(0); // Get a ticket for item zero, 97
console.log(proxy.readCloakroomTicket(ticket3)); // 97
const ticket4 = proxy.getCloakroomTicket(9); // Get a ticket for item nine, 69
console.log(proxy.readCloakroomTicket(ticket4)); // 69

proxy.append(Buffer.from([0x78]));
console.log(proxy.getReadOnlyBuffer()); // [68, 67, 66, 65, 101, 100, 99, 98, 97, 120]
console.log(proxy.readCloakroomTicket(ticket1)); // 65
console.log(proxy.readCloakroomTicket(ticket2)); // null
console.log(proxy.readCloakroomTicket(ticket3)); // 97
console.log(proxy.readCloakroomTicket(ticket4)); // null

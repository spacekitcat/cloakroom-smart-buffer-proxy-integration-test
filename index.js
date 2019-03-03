const { Proxy } = require('cloakroom-smart-buffer-proxy');

const instance = new Proxy(9);
console.log(instance.getReadOnlyBuffer());
instance.append(Buffer.from([0x31, 0x33, 0x32, 0x34]));
console.log(instance.getReadOnlyBuffer());
const ticket1 = instance.createTicket(0)
const ticket2 = instance.createTicket(1).value
const ticket3 = instance.createTicket(2)
const ticket4 = instance.createTicket(3)
console.log('1\t2\t3\t4\t');
console.log(instance.resolveTicket(ticket1).value);
console.log('\t', instance.resolveTicket(ticket2));
console.log('\t\t', instance.resolveTicket(ticket3).value);
console.log('\t\t\t', instance.resolveTicket(ticket4).value);

instance.append(Buffer.from([0x41, 0x43, 0x42, 0x44]));
console.log('', instance.resolveTicket(ticket1).value)
console.log('\t', instance.resolveTicket(ticket2));
console.log('\t\t', instance.resolveTicket(ticket3).value);
console.log('\t\t\t', instance.resolveTicket(ticket4).value);


console.log(instance.getReadOnlyBuffer());
instance.append(Buffer.from([0x54]));
console.log(instance.getReadOnlyBuffer());
instance.append(Buffer.from([0x64]));
console.log(instance.getReadOnlyBuffer());
console.log('', instance.resolveTicket(ticket1).value)
console.log('\t', instance.resolveTicket(ticket2));
console.log('\t\t', instance.resolveTicket(ticket3).value);
console.log('\t\t\t', instance.resolveTicket(ticket4));

instance.append(Buffer.from([0x74, 0x75, 0x76]));
console.log(instance.getReadOnlyBuffer());

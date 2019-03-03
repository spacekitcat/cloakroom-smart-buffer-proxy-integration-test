const { Proxy } = require('cloakroom-smart-buffer-proxy');

const instance = new Proxy(9);
console.log(instance.getReadOnlyBuffer());
instance.append(Buffer.from([0x31, 0x33, 0x32, 0x34]));
console.log(instance.getReadOnlyBuffer());
const ticket1 = instance.getCloakroomTicket(0)
const ticket2 = instance.getCloakroomTicket(1)
const ticket3 = instance.getCloakroomTicket(2)
const ticket4 = instance.getCloakroomTicket(3)
console.log('1\t2\t3\t4\t');
console.log(instance.readCloakroomTicket(ticket1));
console.log('\t', instance.readCloakroomTicket(ticket2));
console.log('\t\t', instance.readCloakroomTicket(ticket3));
console.log('\t\t\t', instance.readCloakroomTicket(ticket4));

instance.append(Buffer.from([0x41, 0x43, 0x42, 0x44]));
console.log('', instance.readCloakroomTicket(ticket1))
console.log('\t', instance.readCloakroomTicket(ticket2));
console.log('\t\t', instance.readCloakroomTicket(ticket3));
console.log('\t\t\t', instance.readCloakroomTicket(ticket4));


console.log(instance.getReadOnlyBuffer());
instance.append(Buffer.from([0x54]));
console.log(instance.getReadOnlyBuffer());
instance.append(Buffer.from([0x64]));
console.log(instance.getReadOnlyBuffer());
console.log('', instance.readCloakroomTicket(ticket1))
console.log('\t', instance.readCloakroomTicket(ticket2));
console.log('\t\t', instance.readCloakroomTicket(ticket3));
console.log('\t\t\t', instance.readCloakroomTicket(ticket4));

instance.append(Buffer.from([0x74, 0x75, 0x76]));
console.log(instance.getReadOnlyBuffer());

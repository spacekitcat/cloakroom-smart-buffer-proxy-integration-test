const { Proxy } = require('cloakroom-smart-buffer-proxy');

const instance = new Proxy(9);
console.log(instance.getReadOnlyBuffer());
instance.append(Buffer.from([0x31, 0x33, 0x32, 0x34]));
console.log(instance.getReadOnlyBuffer());
instance.append(Buffer.from([0x41, 0x43, 0x42, 0x44]));
console.log(instance.getReadOnlyBuffer());
instance.append(Buffer.from([0x54]));
console.log(instance.getReadOnlyBuffer());
instance.append(Buffer.from([0x64]));
console.log(instance.getReadOnlyBuffer());

instance.append(Buffer.from([0x74, 0x75, 0x76]));
console.log(instance.getReadOnlyBuffer());

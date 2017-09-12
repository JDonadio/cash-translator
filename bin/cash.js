#!/usr/bin/env node


var bitcore = require("../node_modules/bitcore-lib");
var bitcoreCash = require("../node_modules/bitcore-lib-cash");


var i = process.argv[2];

if (!i) {
  console.log('Usage: %s <address>', process.argv[1]); 
  process.exit(1);
}


try {
  var a= bitcore.Address(i);
  var hash = a.toObject().hash;

  var buf = a.toBuffer();
  var ver = buf[0];

  var a2 = bitcore.Address.fromBuffer(buf);
  if (ver == 0) buf[0] = 0x28;
  if (ver == 5) buf[0] = 0x40;

  var a2 = bitcoreCash.Address.fromBuffer(buf);
  console.log("Bitcoin Cash Address:", a2);
} catch (e){
  try {
    var a= bitcoreCash.Address(i);
    var hash = a.toObject().hash;

    var buf = a.toBuffer();
    var ver = buf[0];

    var a2 = bitcoreCash.Address.fromBuffer(buf);
    if (ver == 0x28) buf[0] = 0;
    if (ver == 0x40) buf[0] = 5;

    var a2 = bitcore.Address.fromBuffer(buf);
    console.log('Bitcoin Core Address:',a2); 
  

  } catch (e){
    console.log('Error', e);
  };
};


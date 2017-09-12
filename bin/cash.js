#!/usr/bin/env node


var bitcore = require("../node_modules/bitcore-lib");
//var bitcoreCash = require("../node_modules/bitcore-lib");
var bitcoreCash = require("../node_modules/bitcore-lib-cash");


var i = process.argv[2];

if (!i) {
  console.log('Usage: %s <address>', process.argv[1]); 
  process.exit(1);
}

function  translate(address) {
  var a2;
  try {
    var a= bitcore.Address(address);
    var hash = a.toObject().hash;

    var buf = a.toBuffer();
    var ver = buf[0];
console.log('[cash.js.23:ver:]',ver); //TODO

    var a2 = bitcore.Address.fromBuffer(buf);
    if (ver == 0) buf[0] = 28;
    if (ver == 5) buf[0] = 40;

    a2 = bitcoreCash.Address.fromBuffer(buf);
console.log('[cash.js.30:a2:]',a2.toObject()); //TODO
console.log('[cash.js.30:a2:]',a2.toBuffer()); //TODO
  } catch (e){
    console.error(e);
    try {
      var a= bitcoreCash.Address(address);
      var hash = a.toObject().hash;

      var buf = a.toBuffer();
      var ver = buf[0];

      var a2 = bitcoreCash.Address.fromBuffer(buf);
      if (ver == 0x28) buf[0] = 0;
      if (ver == 0x40) buf[0] = 5;

      a2 = bitcore.Address.fromBuffer(buf);
    } catch (e){
      console.error(e);
      return null;
    };
  };
  return a2;
};

var list = process.argv;
list.shift();
list.shift();

list.forEach(function(a){
  var a2 = translate(a);
  if(a2) console.log(a + ':' + a2.toString());
  else console.log('Could not translate', a);
});




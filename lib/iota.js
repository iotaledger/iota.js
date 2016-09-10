var Curl = require("./checksum/curl.js");

function IOTA(settings) {
  // IF NO SETTINGS, SET DEFAULT TO localhost:14265
  this.port = settings.port;
}

IOTA.prototype.getChecksum = function(address) {

  return Curl.generateChecksum(address);
}


var ds = IOTA({port: "yes"});

console.log(ds.getChecksum('JFTVKEDRSGXMKYSQENESOPITWTTTEN9KUHXIZAAGVXX9IJA9RLP9CZDEQENRUAFYAZRLSQKBDMESIMSVW'));

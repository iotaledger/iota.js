var Converter = require("./converter");

function Curl() {
  this.T = [1, 0, -1, 0, 1, -1, 0, 0, -1, 1, 0];
  this.INDICES = [];
  this.initialize();
}

Curl.prototype.initialize = function() {
  this.INDICES[0] = 0;

  for (var i=0; i<729; i++) {
    this.INDICES[i+1] = this.INDICES[i] + (this.INDICES[i] < 365 ? 364 : -365);
  }
}


Curl.prototype.generateChecksum = function(address) {
  this.state = [];

  var converter = new Converter();

  for (var i = 243; i < 729; i++) {
    this.state[i] = 0;
  }

  converter.trits(address, this.state);
  console.log(this.state);
  this.transform();
  console.log("\n29", this.state);
  var checksum = converter.trytes(this.state).substring(0, 9);

  return checksum;
}

Curl.prototype.transform = function() {
  var self = this;
  var stateCopy = [];

  for (var r = 27; r-- > 0; ) {
    stateCopy = self.state.slice();
    for (var i = 0; i < 729; ) {
      self.state[i] = self.T[stateCopy[self.INDICES[i]] + (stateCopy[self.INDICES[++i]] << 2) + 5];
    }
  }
}

module.exports = Curl;

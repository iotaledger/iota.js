var Converter      =  require('../crypto/converter/converter');
var Curl           =  require('../crypto/curl/curl');
var Kerl           =  require('../crypto/kerl/kerl');
var Signing        =  require('../crypto/signing/signing');
var Utils          =  require('../utils/utils');
var inputValidator =  require('../utils/inputValidator');


/**
*   Initializes a new multisig address
*
*   @method addDigest
*   @param {string|array} digest digest trytes
*   @return {object} address instance
*
**/
function Address(digests) {

  if (!(this instanceof Address)) {
    return new Address(digests);
  }

  // Initialize kerl instance
  this._kerl = new Kerl();
  this._kerl.initialize();


  // Add digests if any
  if (digests) {

    this.absorb(digests);
  }
}

/**
*   Absorbs key digests
*
*   @method absorb
*   @param {string|array} digest digest trytes
*   @return {object} address instance
*
**/
Address.prototype.absorb = function (digest) {

  // Construct array
  var digests = Array.isArray(digest) ? digest : [digest];

  // Add digests
  for (var i = 0; i < digests.length; i++) {

    // Get trits of digest
    var digestTrits = Converter.trits(digests[i]);

    // Absorb digest
    this._kerl.absorb(digestTrits, 0, digestTrits.length);
  }

  return this;
}

/**
*   Finalizes and returns the multisig address in trytes
*
*   @method finalize
*   @param {string} digest digest trytes, optional
*   @return {string} address trytes
*
**/
Address.prototype.finalize = function (digest) {

    // Absorb last digest if provided
    if (digest) {
      this.absorb(digest);
    }

    // Squeeze the address trits
    var addressTrits = [];
    this._kerl.squeeze(addressTrits, 0, Curl.HASH_LENGTH);

    // Convert trits into trytes and return the address
    return Converter.trytes(addressTrits);
}


module.exports = Address;

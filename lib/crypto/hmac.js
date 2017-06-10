var Curl = require('./curl');
var nullHashTrytes = (new Array(244).join('9'));

function HMAC(key) {
    this._key = Converter.trits(key);
    this._curl = new Curl();
}

HMAC.prototype.addHMAC = (bundle) => {
    for(var i = 0; i < bundle.bundle.length; i++) {
        if (bundle.bundle[i].value > 0) {
            var bundleHashTrits = Converter.trits(bundle.bundle[i].bundle);
            var hmac = new Int32Array(243);
            this._curl.initialize();
            this._curl.absorb(hmacKey);
            this._curl.absorb(bundleHash);
            this._curl.squeeze(hmac);
            var hmacTrytes = Converter.trytes(hmac);
            bundle.bundle[i].signatureMessageFragment = hmacTrytes + bundle.bundle[i].signatureMessageFragment.substring(243, 2187);
        }
    }
}

module.exports = HMAC;
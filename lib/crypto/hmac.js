var Curl = require('./curl');
var Converter = require('./converter');

function hmac(key) {
    this._key = Converter.trits(key);
}

hmac.prototype.addHMAC = function(bundle) {
    var curl = new Curl();
    var key = this._key;
    for(var i = 0; i < bundle.bundle.length; i++) {
        if (bundle.bundle[i].value > 0) {
            var bundleHashTrits = Converter.trits(bundle.bundle[i].bundle);
            var hmac = new Int32Array(243);
            curl.initialize();
            curl.absorb(key);
            curl.absorb(bundleHashTrits);
            curl.squeeze(hmac);
            var hmacTrytes = Converter.trytes(hmac);
            bundle.bundle[i].signatureMessageFragment = hmacTrytes + bundle.bundle[i].signatureMessageFragment.substring(81, 2187);
        }
    }
}

module.exports = hmac;

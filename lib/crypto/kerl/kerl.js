var CryptoJS = require("crypto-js");
var Converter = require("../converter/converter");
var Curl = require("../curl/curl");
var WConverter = require("../converter/words");

var BIT_HASH_LENGTH = 384;

function Kerl() {


    this.k = CryptoJS.algo.SHA3.create();
    this.k.init({
        outputLength: BIT_HASH_LENGTH
    });
}

Kerl.BIT_HASH_LENGTH = BIT_HASH_LENGTH;
Kerl.HASH_LENGTH = Curl.HASH_LENGTH;

Kerl.prototype.initialize = function(state) {}

Kerl.prototype.reset = function() {

    this.k.reset();

}

Kerl.prototype.absorb = function(trits, offset, length) {


    if (length && ((length % 243) !== 0)) {

        throw new Error('Illegal length provided');

    }

    do {
        var limit = (length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH);

        var trit_state = trits.slice(offset, offset + limit);
        offset += limit;

        // convert trit state to words
        var wordsToAbsorb = WConverter.trits_to_words(trit_state);

        // absorb the trit stat as wordarray
        this.k.update(
            CryptoJS.lib.WordArray.create(wordsToAbsorb));

    } while ((length -= Curl.HASH_LENGTH) > 0);

}



Kerl.prototype.squeeze = function(trits, offset, length) {

    if (length && ((length % 243) !== 0)) {

        throw new Error('Illegal length provided');

    }
    do {

        // get the hash digest
        var kCopy = this.k.clone();
        var final = kCopy.finalize();

        // Convert words to trits and then map it into the internal state
        var trit_state = WConverter.words_to_trits(final.words);

        var i = 0;
        var limit = (length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH);

        while (i < limit) {
            trits[offset++] = trit_state[i++];
        }

        this.reset();

        for (i = 0; i < final.words.length; i++) {
            final.words[i] = final.words[i] ^ 0xFFFFFFFF;
        }

        this.k.update(final);

    } while ((length -= Curl.HASH_LENGTH) > 0);
}

module.exports = Kerl;

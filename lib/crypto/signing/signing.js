var Curl = require("../curl/curl");
var Kerl = require("../kerl/kerl");
var Converter = require("../converter/converter");
var Bundle = require("../bundle/bundle");
var add = require("../helpers/adder");
var oldSigning = require("./oldSigning");
var errors = require("../../errors/inputErrors");

/**
*           Signing related functions
*
**/
var key = function(seed, index, length) {

    while ((seed.length % 243) !== 0) {
      seed.push(0);
    }

    var indexTrits = Converter.fromValue( index );
    var subseed = add( seed.slice( ), indexTrits );

    var kerl = new Kerl( );

    kerl.initialize( );
    kerl.absorb(subseed, 0, subseed.length);
    kerl.squeeze(subseed, 0, subseed.length);

    kerl.reset( );
    kerl.absorb(subseed, 0, subseed.length);

    var key = [], offset = 0, buffer = [];

    while (length-- > 0) {

        for (var i = 0; i < 27; i++) {

            kerl.squeeze(buffer, 0, subseed.length);
            for (var j = 0; j < 243; j++) {

                key[offset++] = buffer[j];
            }
        }
    }
    return key;
}

/**
*
*
**/
var digests = function(key) {

    var digests = [], buffer = [];

    for (var i = 0; i < Math.floor(key.length / 6561); i++) {

        var keyFragment = key.slice(i * 6561, (i + 1) * 6561);

        for (var j = 0; j < 27; j++) {

            buffer = keyFragment.slice(j * 243, (j + 1) * 243);

            for (var k = 0; k < 26; k++) {

                var kKerl = new Kerl();
                kKerl.initialize();
                kKerl.absorb(buffer, 0, buffer.length);
                kKerl.squeeze(buffer, 0, Curl.HASH_LENGTH);
            }

            for (var k = 0; k < 243; k++) {

                keyFragment[j * 243 + k] = buffer[k];
            }
        }

        var kerl = new Kerl()

        kerl.initialize();
        kerl.absorb(keyFragment, 0, keyFragment.length);
        kerl.squeeze(buffer, 0, Curl.HASH_LENGTH);

        for (var j = 0; j < 243; j++) {

            digests[i * 243 + j] = buffer[j];
        }
    }
    return digests;
}

/**
*
*
**/
var address = function(digests) {

    var addressTrits = [];

    var kerl = new Kerl();

    kerl.initialize();
    kerl.absorb(digests, 0, digests.length);
    kerl.squeeze(addressTrits, 0, Curl.HASH_LENGTH);

    return addressTrits;
}

/**
*
*
**/
var digest = function(normalizedBundleFragment, signatureFragment) {

    var buffer = []

    var kerl = new Kerl();

    kerl.initialize();

    for (var i = 0; i< 27; i++) {
        buffer = signatureFragment.slice(i * 243, (i + 1) * 243);

        for (var j = normalizedBundleFragment[i] + 13; j-- > 0; ) {

            var jKerl = new Kerl();

            jKerl.initialize();
            jKerl.absorb(buffer, 0, buffer.length);
            jKerl.squeeze(buffer, 0, Curl.HASH_LENGTH);
        }

        kerl.absorb(buffer, 0, buffer.length);
    }

    kerl.squeeze(buffer, 0, Curl.HASH_LENGTH);
    return buffer;
}

/**
*
*
**/
var signatureFragment = function(normalizedBundleFragment, keyFragment) {

    var signatureFragment = keyFragment.slice(), hash = [];

    var kerl = new Kerl();

    for (var i = 0; i < 27; i++) {

        hash = signatureFragment.slice(i * 243, (i + 1) * 243);

        for (var j = 0; j < 13 - normalizedBundleFragment[i]; j++) {

            kerl.initialize();
            kerl.reset();
            kerl.absorb(hash, 0, hash.length);
            kerl.squeeze(hash, 0, Curl.HASH_LENGTH);
        }

        for (var j = 0; j < 243; j++) {

            signatureFragment[i * 243 + j] = hash[j];
        }
    }

    return signatureFragment;
}

/**
*
*
**/
var validateSignatures = function(expectedAddress, signatureFragments, bundleHash) {
    if (!bundleHash) {
        throw errors.invalidBundleHash();
    }

    var self = this;
    var bundle = new Bundle();

    var normalizedBundleFragments = [];
    var normalizedBundleHash = bundle.normalizedBundle(bundleHash);

    // Split hash into 3 fragments
    for (var i = 0; i < 3; i++) {
        normalizedBundleFragments[i] = normalizedBundleHash.slice(i * 27, (i + 1) * 27);
    }

    // Get digests
    var digests = [];

    for (var i = 0; i < signatureFragments.length; i++) {

        var digestBuffer = digest(normalizedBundleFragments[i % 3], Converter.trits(signatureFragments[i]));

        for (var j = 0; j < 243; j++) {

            digests[i * 243 + j] = digestBuffer[j]
        }
    }

    var address = Converter.trytes(self.address(digests));

    return (expectedAddress === address);
}


module.exports = {
    key                 : key,
    digests             : digests,
    address             : address,
    digest              : digest,
    signatureFragment   : signatureFragment,
    validateSignatures  : validateSignatures
}

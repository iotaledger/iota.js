var Curl = require("./curl");
var Converter = require("./converter");

/**
*           Signing related functions
*
**/
var key = function(seed, index, length) {

    var subseed = seed.slice();

    for (var i = 0; i < index; i++) {

        for (var j = 0; j < 243; j++) {

            if (++subseed[j] > 1) {

                subseed[j] = -1;
            } else {

                break;
            }
        }
    }

    var state = [];
    Curl.initialize(state);
    Curl.absorb(subseed, state);
    Curl.squeeze(subseed, state);
    Curl.initialize(state);
    Curl.absorb(subseed, state);

    var key = [], offset = 0, buffer = [];

    while (length-- > 0) {

        for (var i = 0; i < 27; i++) {

            Curl.squeeze(buffer, state);
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

    var keyFragment = [], digests = [], buffer = [], state = [];

    for (var i = 0; i < Math.floor(key.length / 6561); i++) {

        keyFragment = key.slice(i * 6561, (i + 1) * 6561);

        for (var j = 0; j < 27; j++) {

            buffer = keyFragment.slice(j * 243, (j + 1) * 243);
            for (var k = 0; k < 26; k++) {

                Curl.initialize(state);
                Curl.absorb(buffer, state);
                Curl.squeeze(buffer, state);
            }
            for (var k = 0; k < 243; k++) {

                keyFragment[j * 243 + k] = buffer[k];
            }
        }

        Curl.initialize(state);
        Curl.absorb(keyFragment, state);
        Curl.squeeze(buffer, state);

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

    var address = [], state = [];
    Curl.initialize(state);
    Curl.absorb(digests, state);
    Curl.squeeze(address, state);
    return address;
}

/**
*
*
**/
var digest = function(normalizedBundleFragment, signatureFragment) {

    var buffer = [], state = [], state2 = [];

    Curl.initialize(state);

    for (var i = 0; i< 27; i++) {
        buffer = signatureFragment.slice(i * 243, (i + 1) * 243);

        for (var j = normalizedBundleFragment[i] + 13; j-- > 0; ) {

            Curl.initialize(state2);
            Curl.absorb(buffer, state2);
            Curl.squeeze(buffer, state2);
        }

        Curl.absorb(buffer, state);
    }

    Curl.squeeze(buffer, state);

    return buffer;
}

/**
*
*
**/
var signatureFragment = function(normalizedBundleFragment, keyFragment) {

    var signatureFragment = keyFragment.slice(), state = [], hash = [];

    for (var i = 0; i < 27; i++) {

        hash = signatureFragment.slice(i * 243, (i + 1) * 243);

        for (var j = 0; j < 13 - normalizedBundleFragment[i]; j++) {

            Curl.initialize(state);
            Curl.absorb(hash, state);
            Curl.squeeze(hash, state);
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

    var self = this;

    var normalizedBundleFragments = [];
    var normalizedBundleHash = Utils.normalizedBundle(bundleHash);

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

    var address = Converter.trytes(address(digests));

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

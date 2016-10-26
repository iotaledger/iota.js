var Curl = require("./curl");
var Converter = require("./converter");

/**
*
*   @constructor bundle
**/
function Bundle = function() {

    // Declare empty bundle
    this.bundle = {
        'transactions': []
    }
}

/**
*
*
**/
Bundle.prototype.addEntry = function(signatureMessageLength, address, value, tag, timestamp) {

    for (var i = 0; i < signatureMessageLength; i++) {

        var transactionObject = new Object();
        transactionObject.address = address;
        transactionObject.value = i == 0 ? value : 0;
        transactionObject.tag = tag;
        transactionObject.timestamp = timestamp;

        this.bundle.transactions[this.bundle.transactions.length] = transactionObject;
    }
}

/**
  *
  *
**/
Bundle.prototype.addTrytes = function(signatureFragments) {

  var message;
  var emptySignatureFragment = '';
  var emptyHash = '999999999999999999999999999999999999999999999999999999999999999999999999999999999';

  for (var j = 0; emptySignatureFragment.length < 2187; j++) {
    emptySignatureFragment += '9';
  }

  for (var i = 0; i < this.bundle.transactions.length; i++) {

    // Fill empty signatureMessageFragment
    this.bundle.transactions[i].signatureMessageFragment = signatureFragments[i] ? signatureFragments[i] : emptySignatureFragment;

    // Fill empty trunkTransaction
    this.bundle.transactions[i].trunkTransaction = emptyHash;

    // Fill empty branchTransaction
    this.bundle.transactions[i].branchTransaction = emptyHash;

    // Fill empty nonce
    this.bundle.transactions[i].nonce = emptyHash;
  }
}


/**
*
*
**/
Bundle.prototype.finalize = function() {

    var state = Curl.initialize(state);

    for (var i = 0; i < this.bundle.transactions.length; i++) {

        var valueTrits = Converter.trits(this.bundle.transactions[i].value);
        while (valueTrits.length < 81) {
            valueTrits[valueTrits.length] = 0;
        }

        var timestampTrits = Converter.trits(this.bundle.transactions[i].timestamp);
        while (timestampTrits.length < 27) {
            timestampTrits[timestampTrits.length] = 0;
        }

        var currentIndexTrits = Converter.trits(this.bundle.transactions[i].currentIndex = i);
        while (currentIndexTrits.length < 27) {
            currentIndexTrits[currentIndexTrits.length] = 0;
        }

        var lastIndexTrits = Converter.trits(this.bundle.transactions[i].lastIndex = this.bundle.transactions.length - 1);
        while (lastIndexTrits.length < 27) {
            lastIndexTrits[lastIndexTrits.length] = 0;
        }

        Curl.absorb(Converter.trits(this.bundle.transactions[i].address + Converter.trytes(valueTrits) + this.bundle.transactions[i].tag + Converter.trytes(timestampTrits) + Converter.trytes(currentIndexTrits) + Converter.trytes(lastIndexTrits)), state);
    }

    var hash = [];
    Curl.squeeze(hash, state);
    hash = Converter.trytes(hash);

    for (var i = 0; i < this.bundle.transactions.length; i++) {

        this.bundle.transactions[i].bundle = hash;
    }
}

/**
*   Normalizes the bundle hash
*
**/
Bundle.prototype.normalizedBundle = function(bundleHash) {

    var normalizedBundle = [];

    for (var i = 0; i < 3; i++) {

        var sum = 0;
        for (var j = 0; j < 27; j++) {

            sum += (normalizedBundle[i * 27 + j] = Converter.value(Converter.trits(bundleHash.charAt(i * 27 + j))));
        }

        if (sum >= 0) {

            while (sum-- > 0) {

                for (var j = 0; j < 27; j++) {

                    if (normalizedBundle[i * 27 + j] > -13) {

                        normalizedBundle[i * 27 + j]--;
                        break;
                    }
                }
            }
        } else {

            while (sum++ < 0) {

                for (var j = 0; j < 27; j++) {

                    if (normalizedBundle[i * 27 + j] < 13) {

                        normalizedBundle[i * 27 + j]++;
                        break;
                    }
                }
            }
        }
    }

    return normalizedBundle;
}

module.exports = Bundle;

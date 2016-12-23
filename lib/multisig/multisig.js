var signing = require('../crypto/signing');
var Converter = require('../crypto/converter');
var Curl = require('../crypto/curl');
var Utils = require('../utils/utils');
var inputValidator = require('../utils/inputValidator');


/**
*   Generates a new address
*
*   @method getDigest
*   @param {string} seed
*   @param {int} index
*   @returns {string} digest trytes
**/
var getDigest = function(seed, index) {

    var key = Signing.key(Converter.trits(seed), index, 2);
    return Converter.trytes(Signing.digests(key));
}

/**
*   Generates a new address
*
*   @method addAddressDigest
*   @param {string} digestTrytes
*   @param {string} curlStateTrytes
*   @returns {String}
**/
var addAddressDigest = function(digestTrytes, curlStateTrytes) {

    var digest = Converter.trits(digestTrytes);

    // If curlStateTrytes is provided, convert into trits
    // else use empty state
    var curlState = curlStateTrytes ? Converter.trits(curlStateTrytes) : [];

    var curl = new Curl();

    // initialize Curl with the provided state
    curl.initialize(curlState);
    // absorb the key digest
    curl.absorb(digest);

    return Converter.trytes(curl.state);
}

/**
*   Generates a new address
*
*   @method finalizeAddress
*   @param {string} curlStateTrytes
*   @param {string}
*   @returns {String} address
**/
var finalizeAddress = function(curlStateTrytes) {

    // If curlStateTrytes is provided, convert into trits
    // else use empty state
    var curlState = curlStateTrytes ? Converter.trits(curlStateTrytes) : [];

    var curl = new Curl();

    // initialize Curl with the provided state
    curl.initialize(curlState);

    var addressTrits = [];
    curl.squeeze(addressTrits);

    // Convert trits into trytes and return the address
    return Converter.trytes(addressTrits);
}



initiateTransfer
addSignature
finalizeTransfer

/**
*   Prepares transfer by generating bundle, finding and signing inputs
*
*   @method prepareTransfers
*   @param {object} inputAddress
*   @param {string} remainderAddress
*   @param {int} numCosigners
*   @param {object} transfers
*   @param {function} callback
*   @returns {array} trytes Returns bundle trytes
**/
api.prototype.initiateTransfer = function(inputAddress, remainderAddress, numCosigners, transfers, callback) {

    var self = this;

    // If message or tag is not supplied, provide it
    // Also remove the checksum of the address if it's there
    transfers.forEach(function(thisTransfer) {
        thisTransfer.message = thisTransfer.message ? thisTransfer.message : '';
        thisTransfer.tag = thisTransfer.tag ? thisTransfer.tag : '';
        thisTransfer.address = Utils.noChecksum(thisTransfer.address);
    })

    // Input validation of transfers object
    if (!inputValidator.isTransfersArray(transfers)) {
        return callback(errors.invalidTransfers());
    }

    // Create a new bundle
    var bundle = new Bundle();

    var totalValue = 0;
    var signatureFragments = [];
    var tag;

    //
    //  Iterate over all transfers, get totalValue
    //  and prepare the signatureFragments, message and tag
    //
    for (var i = 0; i < transfers.length; i++) {

        var signatureMessageLength = 1;

        // If message longer than 2187 trytes, increase signatureMessageLength (add multiple transactions)
        if (transfers[i].message.length > 2187) {

            // Get total length, message / maxLength (2187 trytes)
            signatureMessageLength += Math.floor(transfers[i].message.length / 2187);

            var msgCopy = transfers[i].message;

            // While there is still a message, copy it
            while (msgCopy) {

                var fragment = msgCopy.slice(0, 2187);
                msgCopy = msgCopy.slice(2187, msgCopy.length);

                // Pad remainder of fragment
                for (var j = 0; fragment.length < 2187; j++) {
                    fragment += '9';
                }

                signatureFragments.push(fragment);
            }

        } else {
            // Else, get single fragment with 2187 of 9's trytes
            var fragment = '';

            if (transfers[i].message) {
                fragment = transfers[i].message.slice(0, 2187)
            }

            for (var j = 0; fragment.length < 2187; j++) {
                fragment += '9';
            }

            signatureFragments.push(fragment);
        }

        // get current timestamp in seconds
        var timestamp = Math.floor(Date.now() / 1000);

        // If no tag defined, get 27 tryte tag.
        tag = transfers[i].tag ? transfers[i].tag : '999999999999999999999999999';

        // Pad for required 27 tryte length
        for (var j = 0; tag.length < 27; j++) {
            tag += '9';
        }

        // Add first entries to the bundle
        // Slice the address in case the user provided a checksummed one
        bundle.addEntry(signatureMessageLength, transfers[i].address.slice(0, 81), transfers[i].value, tag, timestamp)
        // Sum up total value
        totalValue += parseInt(transfers[i].value);
    }

    // Get inputs if we are sending tokens
    if (totalValue) {

        iota.api.getBalances(Array(inputAddress), 100, function(e, balance) {

            var thisBalance = parseInt(balances.balances[i]);

            if (thisBalance > 0) {

                var toSubtract = 0 - thisBalance;
                var timestamp = Math.floor(Date.now() / 1000);

                // Add input as bundle entry
                bundle.addEntry(2, inputAddress, toSubtract, tag, timestamp);

                // For each cosigner in the multisig, add 2 bundle entries
                // This will then later be used for the signature
                for (var i = 0; i < numCosigners; i++) {
                    bundle.addEntry(2, inputAddress, 0, tag, timestamp);
                }

                // If there is a remainder value
                // Add extra output to send remaining funds to
                if (thisBalance > totalValue) {

                    var remainder = thisBalance - totalValue;

                    // Remainder bundle entry
                    bundle.addEntry(1, remainderAddress, remainder, tag, timestamp);

                }

                // If no input required, don't sign and simply finalize the bundle
                bundle.finalize();
                bundle.addTrytes(signatureFragments);

                var bundleTrytes = []
                bundle.bundle.forEach(function(tx) {
                    bundleTrytes.push(Utils.transactionTrytes(tx))
                })

                return bundleTrytes.reverse();

            } else {

                throw new Error("Not enough balance");
            }
        })

    } else {

        throw new Error("Invalid value transfer: the transfer does not require a signature.");
    }

}


var addSignature = function() {


    //  SIGNING OF INPUTS
    //
    //  Here we do the actual signing of the inputs
    //  Iterate over all bundle transactions, find the inputs
    //  Get the corresponding private key and calculate the signatureFragment
    for (var i = 0; i < bundle.bundle.length; i++) {

        if (bundle.bundle[i].value < 0) {

            var thisAddress = bundle.bundle[i].address;

            // Get the corresponding keyIndex of the address
            var keyIndex;
            for (var k = 0; k < inputs.length; k++) {

                if (inputs[k].address === thisAddress) {

                    keyIndex = inputs[k].keyIndex;
                    break;
                }
            }

            var bundleHash = bundle.bundle[i].bundle;

            // Get corresponding private key of address
            var key = Signing.key(Converter.trits(seed), keyIndex, 2);

            //  First 6561 trits for the firstFragment
            var firstFragment = key.slice(0, 6561);

            //  Get the normalized bundle hash
            var normalizedBundleHash = bundle.normalizedBundle(bundleHash);

            //  First bundle fragment uses 27 trytes
            var firstBundleFragment = normalizedBundleHash.slice(0, 27);

            //  Calculate the new signatureFragment with the first bundle fragment
            var firstSignedFragment = Signing.signatureFragment(firstBundleFragment, firstFragment);

            //  Convert signature to trytes and assign the new signatureFragment
            bundle.bundle[i].signatureMessageFragment = Converter.trytes(firstSignedFragment);

            //  Because the signature is > 2187 trytes, we need to
            //  find the second transaction to add the remainder of the signature
            for (var j = 0; j < bundle.bundle.length; j++) {

                //  Same address as well as value = 0 (as we already spent the input)
                if (bundle.bundle[j].address === thisAddress && bundle.bundle[j].value === 0) {

                    // Use the second 6562 trits
                    var secondFragment = key.slice(6561,  2 * 6561);

                    // The second 27 to 54 trytes of the bundle hash
                    var secondBundleFragment = normalizedBundleHash.slice(27, 27 * 2);

                    //  Calculate the new signature
                    var secondSignedFragment = Signing.signatureFragment(secondBundleFragment, secondFragment);

                    //  Convert signature to trytes and assign it again to this bundle entry
                    bundle.bundle[j].signatureMessageFragment = Converter.trytes(secondSignedFragment);
                }
            }
        }
    }
}

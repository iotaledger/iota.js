var inputValidator  =   require("./inputValidator");
var makeRequest     =   require("./makeRequest");
var Curl            =   require("../crypto/curl/curl");
var Kerl            =   require("../crypto/kerl/kerl");
var Converter       =   require("../crypto/converter/converter");
var Signing         =   require("../crypto/signing/signing");
var CryptoJS        =   require("crypto-js");
var ascii           =   require("./asciiToTrytes");
var extractJson     =   require("./extractJson");
var BigNumber       =   require("bignumber.js");


/**
*   Table of IOTA Units based off of the standard System of Units
**/
var unitMap = {
    'i'   :   {val: new BigNumber(10).pow(0),  dp:  0},
    'Ki'  :   {val: new BigNumber(10).pow(3),  dp:  3},
    'Mi'  :   {val: new BigNumber(10).pow(6),  dp:  6},
    'Gi'  :   {val: new BigNumber(10).pow(9),  dp:  9},
    'Ti'  :   {val: new BigNumber(10).pow(12), dp: 12},
    'Pi'  :   {val: new BigNumber(10).pow(15), dp: 15}// For the very, very rich
}

/**
*   converts IOTA units
*
*   @method convertUnits
*   @param {string || int || float} value
*   @param {string} fromUnit
*   @param {string} toUnit
*   @returns {integer} converted
**/
var convertUnits = function(value, fromUnit, toUnit) {

    // Check if wrong unit provided
    if (unitMap[fromUnit] === undefined || unitMap[toUnit] === undefined) {
        throw new Error("Invalid unit provided");
    }

    var valueBn = new BigNumber(value); 

    if(valueBn.dp() > unitMap[fromUnit].dp) {
      throw new Error("Input value exceeded max fromUnit precision.");
    }

    var valueRaw = valueBn.times(unitMap[fromUnit].val);
    var valueScaled = valueRaw.dividedBy(unitMap[toUnit].val);

    return valueScaled.toNumber();
}

/**
*   Generates the 9-tryte checksum of an address
*
*   @method addChecksum
*   @param {string | list} inputValue
*   @param {int} checksumLength
@   @param {bool} isAddress default is true
*   @returns {string | list} address (with checksum)
**/
var addChecksum = function(inputValue, checksumLength, isAddress) {

    // checksum length is either user defined, or 9 trytes
    var checksumLength = checksumLength || 9;
    var isAddress = (isAddress !== false);

    // the length of the trytes to be validated
    var validationLength = isAddress ? 81 : null;

    var isSingleInput = inputValidator.isString( inputValue );

    // If only single address, turn it into an array
    if ( isSingleInput ) inputValue = new Array( inputValue );

    var inputsWithChecksum = [];

    inputValue.forEach(function(thisValue) {

        // check if correct trytes
        if (!inputValidator.isTrytes(thisValue, validationLength)) {
            throw new Error("Invalid input");
        }

        var kerl = new Kerl();
        kerl.initialize();

        // Address trits
        var addressTrits = Converter.trits(thisValue);

        // Checksum trits
        var checksumTrits = [];

        // Absorb address trits
        kerl.absorb(addressTrits, 0, addressTrits.length);

        // Squeeze checksum trits
        kerl.squeeze(checksumTrits, 0, Curl.HASH_LENGTH);

        // First 9 trytes as checksum
        var checksum = Converter.trytes( checksumTrits ).substring( 81 - checksumLength, 81 );
        inputsWithChecksum.push( thisValue + checksum );
    });

    if (isSingleInput) {

        return inputsWithChecksum[ 0 ];

    } else {

        return inputsWithChecksum;

    }
}

/**
*   Removes the 9-tryte checksum of an address
*
*   @method noChecksum
*   @param {string | list} address
*   @returns {string | list} address (without checksum)
**/
var noChecksum = function(address) {

    var isSingleAddress = inputValidator.isString(address)

    if (isSingleAddress && address.length === 81) {

      return address
    }

    // If only single address, turn it into an array
    if (isSingleAddress) address = new Array(address);

    var addressesWithChecksum = [];

    address.forEach(function(thisAddress) {
        addressesWithChecksum.push(thisAddress.slice(0, 81))
    })

    // return either string or the list
    if (isSingleAddress) {

        return addressesWithChecksum[0];

    } else {

        return addressesWithChecksum;

    }
}

/**
*   Validates the checksum of an address
*
*   @method isValidChecksum
*   @param {string} addressWithChecksum
*   @returns {bool}
**/
var isValidChecksum = function(addressWithChecksum) {

    var addressWithoutChecksum = noChecksum(addressWithChecksum);

    var newChecksum = addChecksum(addressWithoutChecksum);

    return newChecksum === addressWithChecksum;
}

var transactionHash = function (transactionTrits) {
  if (!inputValidator.isTritArray(transactionTrits, 2673 * 3)) {
    throw new Error('Invalid transaction trits')
  }

  var hashTrits = []

  var curl = new Curl()

  // generate the correct transaction hash
  curl.initialize()
  curl.absorb(transactionTrits, 0, transactionTrits.length)
  curl.squeeze(hashTrits, 0, 243)

  return hashTrits
}


/**
*   Converts transaction trytes of 2673 trytes into a transaction object
*
*   @method transactionObject
*   @param {string} trytes
*   @param {string} hash - Transaction hash
*   @returns {String} transactionObject
**/
var transactionObject = function(trytes, hash) {

    if (!trytes) return;

    // validity check
    for (var i = 2279; i < 2295; i++) {

        if (trytes.charAt(i) !== "9") {

            return null;

        }
    }

    var thisTransaction = {};
    var transactionTrits = Converter.trits(trytes);

    if (inputValidator.isHash(hash)) {
        thisTransaction.hash = hash;
    } else {
        thisTransaction.hash = Converter.trytes(transactionHash(transactionTrits));
    }

    thisTransaction.signatureMessageFragment = trytes.slice(0, 2187);
    thisTransaction.address = trytes.slice(2187, 2268);
    thisTransaction.value = Converter.value(transactionTrits.slice(6804, 6837));
    thisTransaction.obsoleteTag = trytes.slice(2295, 2322);
    thisTransaction.timestamp = Converter.value(transactionTrits.slice(6966, 6993));
    thisTransaction.currentIndex = Converter.value(transactionTrits.slice(6993, 7020));
    thisTransaction.lastIndex = Converter.value(transactionTrits.slice(7020, 7047));
    thisTransaction.bundle = trytes.slice(2349, 2430);
    thisTransaction.trunkTransaction = trytes.slice(2430, 2511);
    thisTransaction.branchTransaction = trytes.slice(2511, 2592);

    thisTransaction.tag = trytes.slice(2592, 2619);
    thisTransaction.attachmentTimestamp = Converter.value(transactionTrits.slice(7857, 7884));
    thisTransaction.attachmentTimestampLowerBound = Converter.value(transactionTrits.slice(7884, 7911));
    thisTransaction.attachmentTimestampUpperBound = Converter.value(transactionTrits.slice(7911, 7938));
    thisTransaction.nonce = trytes.slice(2646, 2673);

    return thisTransaction;
}

/**
*   Converts a transaction object into trytes
*
*   @method transactionTrytes
*   @param {object} transactionTrytes
*   @returns {String} trytes
**/
var transactionTrytes = function(transaction) {

    var valueTrits = Converter.trits(transaction.value);
    while (valueTrits.length < 81) {
        valueTrits[valueTrits.length] = 0;
    }

    var timestampTrits = Converter.trits(transaction.timestamp);
    while (timestampTrits.length < 27) {
        timestampTrits[timestampTrits.length] = 0;
    }

    var currentIndexTrits = Converter.trits(transaction.currentIndex);
    while (currentIndexTrits.length < 27) {
        currentIndexTrits[currentIndexTrits.length] = 0;
    }

    var lastIndexTrits = Converter.trits(transaction.lastIndex);
    while (lastIndexTrits.length < 27) {
        lastIndexTrits[lastIndexTrits.length] = 0;
    }

    var attachmentTimestampTrits = Converter.trits(transaction.attachmentTimestamp || 0);
    while (attachmentTimestampTrits.length < 27) {
        attachmentTimestampTrits[attachmentTimestampTrits.length] = 0;
    }

    var attachmentTimestampLowerBoundTrits = Converter.trits(transaction.attachmentTimestampLowerBound || 0);
    while (attachmentTimestampLowerBoundTrits.length < 27) {
        attachmentTimestampLowerBoundTrits[attachmentTimestampLowerBoundTrits.length] = 0;
    }

    var attachmentTimestampUpperBoundTrits = Converter.trits(transaction.attachmentTimestampUpperBound || 0);
    while (attachmentTimestampUpperBoundTrits.length < 27) {
        attachmentTimestampUpperBoundTrits[attachmentTimestampUpperBoundTrits.length] = 0;
    }

    transaction.tag = transaction.tag || transaction.obsoleteTag;

    return transaction.signatureMessageFragment
    + transaction.address
    + Converter.trytes(valueTrits)
    + transaction.obsoleteTag
    + Converter.trytes(timestampTrits)
    + Converter.trytes(currentIndexTrits)
    + Converter.trytes(lastIndexTrits)
    + transaction.bundle
    + transaction.trunkTransaction
    + transaction.branchTransaction
    + transaction.tag
    + Converter.trytes(attachmentTimestampTrits)
    + Converter.trytes(attachmentTimestampLowerBoundTrits)
    + Converter.trytes(attachmentTimestampUpperBoundTrits)
    + transaction.nonce;
}


var isTransactionHash = function (input, minWeightMagnitude) {
  var isTxObject = inputValidator.isArrayOfTxObjects([input])

  return (
    minWeightMagnitude
      ? Converter.trits(isTxObject ? input.hash : input)
        .slice(-minWeightMagnitude)
        .every(function (trit) {
          return trit === 0
        })
      : true
  ) && (
    isTxObject
      ? input.hash === Converter.trytes(transactionHash(Converter.trits(transactionTrytes(input))))
      : inputValidator.isHash(input)
  )
}

/**
*   Categorizes a list of transfers between sent and received
*
*   @method categorizeTransfers
*   @param {object} transfers Transfers (bundles)
*   @param {list} addresses List of addresses that belong to the user
*   @returns {String} trytes
**/
var categorizeTransfers = function(transfers, addresses) {

    var categorized = {
        'sent'      : [],
        'received'  : []
    }

    // Iterate over all bundles and sort them between incoming and outgoing transfers
    transfers.forEach(function(bundle) {

        var spentAlreadyAdded = false;

        // Iterate over every bundle entry
        bundle.forEach(function(bundleEntry, bundleIndex) {

            // If bundle address in the list of addresses associated with the seed
            // add the bundle to the
            if (addresses.indexOf(bundleEntry.address) > -1) {

                // Check if it's a remainder address
                var isRemainder = (bundleEntry.currentIndex === bundleEntry.lastIndex) && bundleEntry.lastIndex !== 0;

                // check if sent transaction
                if (bundleEntry.value < 0 && !spentAlreadyAdded && !isRemainder) {

                    categorized.sent.push(bundle);

                    // too make sure we do not add transactions twice
                    spentAlreadyAdded = true;
                }
                // check if received transaction, or 0 value (message)
                // also make sure that this is not a 2nd tx for spent inputs
                else if (bundleEntry.value >= 0 && !spentAlreadyAdded && !isRemainder) {

                    categorized.received.push(bundle);
                }
            }
        })
    })

    return categorized;
}


/**
*   Validates the signatures
*
*   @method validateSignatures
*   @param {array} signedBundle
*   @param {string} inputAddress
*   @returns {bool}
**/
var validateSignatures = function(signedBundle, inputAddress) {


    var bundleHash;
    var signatureFragments = [];

    for (var i = 0; i < signedBundle.length; i++) {

        if (signedBundle[i].address === inputAddress) {

            bundleHash = signedBundle[i].bundle;

            // if we reached remainder bundle
            if (inputValidator.isNinesTrytes(signedBundle[i].signatureMessageFragment)) {
                break;
            }

            signatureFragments.push(signedBundle[i].signatureMessageFragment)
        }
    }

    if (!bundleHash) {
        return false;
    }

    return Signing.validateSignatures(inputAddress, signatureFragments, bundleHash);
}


/**
*   Checks is a Bundle is valid. Validates signatures and overall structure. Has to be tail tx first.
*
*   @method isValidBundle
*   @param {array} bundle
*   @returns {bool} valid
**/
var isBundle = function(bundle) {

    // If not correct bundle
    if (!inputValidator.isArrayOfTxObjects(bundle)) return false;

    var totalSum = 0, lastIndex, bundleHash = bundle[0].bundle;

    // Prepare to absorb txs and get bundleHash
    var bundleFromTxs = [];

    var kerl = new Kerl();
    kerl.initialize();

    // Prepare for signature validation
    var signaturesToValidate = [];

    bundle.forEach(function(bundleTx, index) {

        totalSum += bundleTx.value;

        // currentIndex has to be equal to the index in the array
        if (bundleTx.currentIndex !== index) return false;

        // Get the transaction trytes
        var thisTxTrytes = transactionTrytes(bundleTx);

        // Absorb bundle hash + value + timestamp + lastIndex + currentIndex trytes.
        var thisTxTrits = Converter.trits(thisTxTrytes.slice(2187, 2187 + 162));
        kerl.absorb(thisTxTrits, 0, thisTxTrits.length);

        // Check if input transaction
        if (bundleTx.value < 0) {
            var thisAddress = bundleTx.address;

            var newSignatureToValidate = {
                'address': thisAddress,
                'signatureFragments': Array(bundleTx.signatureMessageFragment)
            }

            // Find the subsequent txs with the remaining signature fragment
            for (var i = index; i < bundle.length - 1; i++) {
                var newBundleTx = bundle[i + 1];

                // Check if new tx is part of the signature fragment
                if (newBundleTx.address === thisAddress && newBundleTx.value === 0) {
                    newSignatureToValidate.signatureFragments.push(newBundleTx.signatureMessageFragment);
                }
            }

            signaturesToValidate.push(newSignatureToValidate);
        }
    });

    // Check for total sum, if not equal 0 return error
    if (totalSum !== 0) return false;

    // get the bundle hash from the bundle transactions
    kerl.squeeze(bundleFromTxs, 0, Curl.HASH_LENGTH);
    var bundleFromTxs = Converter.trytes(bundleFromTxs);

    // Check if bundle hash is the same as returned by tx object
    if (bundleFromTxs !== bundleHash) return false;

    // Last tx in the bundle should have currentIndex === lastIndex
    if (bundle[bundle.length - 1].currentIndex !== bundle[bundle.length - 1].lastIndex) return false;

    // Validate the signatures
    for (var i = 0; i < signaturesToValidate.length; i++) {

        var isValidSignature = Signing.validateSignatures(signaturesToValidate[i].address, signaturesToValidate[i].signatureFragments, bundleHash);

        if (!isValidSignature) return false;
    }

    return true;
}

module.exports = {
    convertUnits        : convertUnits,
    addChecksum         : addChecksum,
    noChecksum          : noChecksum,
    isValidChecksum     : isValidChecksum,
    transactionHash     : transactionHash,
    transactionObject   : transactionObject,
    transactionTrytes   : transactionTrytes,
    isTransactionHash   : isTransactionHash,
    categorizeTransfers : categorizeTransfers,
    toTrytes            : ascii.toTrytes,
    fromTrytes          : ascii.fromTrytes,
    extractJson         : extractJson,
    validateSignatures  : validateSignatures,
    isBundle            : isBundle
}

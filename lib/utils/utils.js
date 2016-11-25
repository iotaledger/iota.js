var inputValidator = require("./inputValidator");
var makeRequest = require("./makeRequest");
var Curl = require("../crypto/curl");
var Converter = require("../crypto/converter");
var ascii = require("./asciiToTrytes");

/**
*   Table of IOTA Units based off of the standard System of Units
**/
var unitMap = {
    'i'   :   1,
    'Ki'  :   1000,
    'Mi'  :   1000000,
    'Gi'  :   1000000000,
    'Ti'  :   1000000000000,
    'Pi'  :   1000000000000000  // For the very, very rich
}

/**
*   Sends getNodeInfo request to host to check if connected
*
*   @method isConnected
*   @param {string} host
*   @param {function} callback
*   @returns {bool}
**/
var isConnected = function(host, callback) {

    var command = {
        'command':'getNodeInfo'
    }

    var request = new makeRequest(host);

    if (callback) {
        request.send(command, callback);
    } else {
        request.send(command, function(error, success) {

            if (!error) {

                return true;
            } else {

                return false;
            }
        })
    }

}

/**
*   converts IOTA units
*
*   @method convertUnits
*   @param {string} value
*   @param {string} fromUnit
*   @param {string} toUnit
*   @returns {integer} converted
**/
var convertUnits = function(value, fromUnit, toUnit) {

    // If not valid value, return null
    if (!inputValidator.isValue(value)) {

        // Should we actually return an error?
        return null;
    }

    if (unitMap[fromUnit] === undefined || unitMap[toUnit] === undefined) {
        return null;
    }

    if (typeof value === 'string') value = parseInt(value);

    var converted = (value * unitMap[fromUnit]) / unitMap[toUnit];

    return converted;
}

/**
*   Check if a valid trytes
*
*   @method validateTrytes
*   @param {string} trytes
*   @param {integer} length
*   @returns {bool}
**/
var isTrytes = inputValidator.isTrytes;

/**
*   Generates the 9-tryte checksum of an address
*
*   @method getChecksum
*   @param {string} address
*   @returns {string} address (with checksum)
**/
var getChecksum = function(address) {

    // create new Curl instance
    var curl = new Curl();

    // initialize curl empty trits state
    curl.initialize();

    // convert address into trits and map it into the state
    curl.state = Converter.trits(address, curl.state);

    curl.transform();

    var checksum = Converter.trytes(curl.state).substring(0, 9);

    return address + checksum;
}

/**
*   Removes the 9-tryte checksum of an address
*
*   @method noChecksum
*   @param {string} address
*   @returns {string} address (without checksum)
**/
var noChecksum = function(address) {

    if (address.length === 81) return address;

    else if (address.length === 90) return address.slice(0, 81);

    else return null;
}

/**
*   Convert bytes to trytes
*
*   @method toTrytes
*   @param {string} string
*   @param {string} type
*   @returns {string} address (without checksum)
**/
var toTrytes = function(string, type) {

    if (type === "ascii") {
        return ascii.toTrytes(trytes);
    }
}

/**
*   Convert trytes to bytes
*
*   @method fromTrytes
*   @param {string} trytes
*   @param {string} type
*   @returns {string} address (without checksum)
**/
var fromTrytes = function(trytes, type) {

    if (type === "ascii") {
        return ascii.fromTrytes(trytes);
    }
}


/**
*   Converts transaction trytes of 2673 trytes into a transaction object
*
*   @method transactionObject
*   @param {string} trytes
*   @returns {String} transactionObject
**/
var transactionObject = function(transactionTrytes) {

    // validity check
    for (var i = 2279; i < 2295; i++) {
        if (transactionTrytes.charAt(i) != "9") {
            return null;
        }
    }
    var transactionObject = new Object();
    var transactionTrits = Converter.trits(transactionTrytes);
    var hash = [];

    var curl = new Curl();

    // generate the correct transaction hash
    curl.initialize();
    curl.absorb(transactionTrits);
    curl.squeeze(hash);

    transactionObject.hash = Converter.trytes(hash);
    transactionObject.signatureMessageFragment = transactionTrytes.slice(0, 2187);
    transactionObject.address = transactionTrytes.slice(2187, 2268);
    transactionObject.value = Converter.value(transactionTrits.slice(6804, 6837));
    transactionObject.tag = transactionTrytes.slice(2295, 2322);
    transactionObject.timestamp = Converter.value(transactionTrits.slice(6966, 6993));
    transactionObject.currentIndex = Converter.value(transactionTrits.slice(6993, 7020));
    transactionObject.lastIndex = Converter.value(transactionTrits.slice(7020, 7047));
    transactionObject.bundle = transactionTrytes.slice(2349, 2430);
    transactionObject.trunkTransaction = transactionTrytes.slice(2430, 2511);
    transactionObject.branchTransaction = transactionTrytes.slice(2511, 2592);
    transactionObject.nonce = transactionTrytes.slice(2592, 2673);

    return transactionObject;
}

/**
*   Converts a transaction object into trytes
*
*   @method transactionTrytes
*   @param {object} transactionObject
*   @returns {String} trytes
**/
var transactionTrytes = function(transactionObject) {

    var valueTrits = Converter.trits(transactionObject.value);
    while (valueTrits.length < 81) {
        valueTrits[valueTrits.length] = 0;
    }

    var timestampTrits = Converter.trits(transactionObject.timestamp);
    while (timestampTrits.length < 27) {
        timestampTrits[timestampTrits.length] = 0;
    }

    var currentIndexTrits = Converter.trits(transactionObject.currentIndex);
    while (currentIndexTrits.length < 27) {
        currentIndexTrits[currentIndexTrits.length] = 0;
    }

    var lastIndexTrits = Converter.trits(transactionObject.lastIndex);
    while (lastIndexTrits.length < 27) {
        lastIndexTrits[lastIndexTrits.length] = 0;
    }

    return transactionObject.signatureMessageFragment
            + transactionObject.address
            + Converter.trytes(valueTrits)
            + transactionObject.tag
            + Converter.trytes(timestampTrits)
            + Converter.trytes(currentIndexTrits)
            + Converter.trytes(lastIndexTrits)
            + transactionObject.bundle
            + transactionObject.trunkTransaction
            + transactionObject.branchTransaction
            + transactionObject.nonce;
}


module.exports = {
    isConnected         : isConnected,
    convertUnits        : convertUnits,
    isTrytes            : isTrytes,
    getChecksum         : getChecksum,
    noChecksum          : noChecksum,
    toTrytes            : toTrytes,
    fromTrytes          : fromTrytes,
    transactionObject   : transactionObject,
    transactionTrytes   : transactionTrytes
}

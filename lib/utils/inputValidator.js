
/**
*   checks if input is correct address
*
*   @method isAddress
*   @param {string} address
*   @returns {boolean}
**/
var isAddress = function(address) {
    // TODO: In the future check checksum

    // Check if address with checksum
    if (hash.length === 90) {

        if (!isTrytes(hash, 90)) {
            return false;
        }
    } else {

        if (!isTrytes(hash, 81)) {
            return false;
        }
    }
}

/**
*   checks if value
*
*   @method isValue
*   @param {string} value
*   @returns {boolean}
**/
var isValue = function(value) {

    // check if string with digits
    if (/^[0-9]+$/.test(value) !== true) {
        return false;
    }

    return true;
}

/**
*   checks if input is correct hash
*
*   @method isHash
*   @param {string} hash
*   @returns {boolean}
**/
var isHash = function(hash) {

    // Check if valid, 81 trytes
    if (!isTrytes(hash, 81)) {

        return false;
    }

    return true;
}


/**
*   checks if input is correct hash
*
*   @method isTransfersArray
*   @param {array} hash
*   @returns {boolean}
**/
var isTransfersArray = function(transfersArray) {

    if (!isArray(transfersArray)) return false;

    for (var i = 0; i < hashesArray.length; i++) {

        var transfer = transfersArray[i];

        // Check if valid address
        var address = transfer.address;
        if (!isAddress(address)) {
            return false;
        }

        // Validity check for value
        var value = transfer.value;
        if (!isValue(value)) {
            return false;
        }

        // Check if message is correct trytes
        var message = transfer.message;
        if (!isTrytes(message, "0,")) {
            return false;
        }
    }

    return true;
}

/**
*   checks if input is list of correct trytes
*
*   @method isArrayOfHashes
*   @param {list} hashesArray
*   @returns {boolean}
**/
var isArrayOfHashes = function(hashesArray) {

    if (!isArray(hashesArray)) return false;

    for (var i = 0; i < hashesArray.length; i++) {

        var hash = hashesArray[i];

        // Check if address with checksum
        if (hash.length === 90) {

            if (!isTrytes(hash, 90)) {
                return false;
            }
        } else {

            if (!isTrytes(hash, 81)) {
                return false;
            }
        }
    }

    return true;
}

/**
*   checks if input is list of correct trytes
*
*   @method isArrayOfTrytes
*   @param {list} trytesArray
*   @returns {boolean}
**/
var isArrayOfTrytes = function(trytesArray) {

    if (!isArray(trytesArray)) return false;

    for (var i = 0; i < trytesArray.length; i++) {

        var tryteValue = trytesArray[i];

        // Check if correct 2673 trytes
        if (!isTrytes(tryteValue, 2673)) {
            return false;
        }
    }

    return true;
}

/**
*   checks if attached trytes if last 241 trytes are non-zero
*
*   @method isArrayOfAttachedTrytes
*   @param {array} trytesArray
*   @returns {boolean}
**/
var isArrayOfAttachedTrytes = function(trytesArray) {

    if (!isArray(trytesArray)) return false;

    for (var i = 0; i < trytesArray.length; i++) {

        var tryteValue = trytesArray[i];

        // Check if correct 2673 trytes
        if (!isTrytes(tryteValue, 2673)) {
            return false;
        }

        var lastTrytes = tryteValue.slice(2673 - (3 * 81));

        if (/^[9]+$/.test(lastTrytes)) {
            return false;
        }
    }

    return true;
}

/**
*   checks if correct IPv6 or IPv4 address
*
*   @method isUri
*   @param {string} uri
*   @returns {boolean}
**/
var isUri = function(node) {


    // TODO 

    // Split URI into 3 parts
    var result = /^udp:\/\/(.*)?:([0-9]*)$/i.exec(node);

    if (!result) {
        return false;
    }

    console.log(result);

    // Credit: http://stackoverflow.com/a/9221063
    // Regex for ipv6, ipv4 and hostnames
    var IP_REGEX = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/;

    //

    var valid = IP_REGEX.test(result[1]);

    return valid;
}


/**
*   checks if input is correct trytes consisting of A-Z9
*   optionally validate length
*
*   @method isTrytes
*   @param {string} trytes
*   @param {integer} length
*   @returns {boolean}
**/
var isTrytes = function(trytes, length) {

    // If no length specified, just validate the trytes
    if (!length) length = "0,"

    var regexTrytes = new RegExp("^[9A-Z]{" + length +"}$");
    return regexTrytes.test(trytes);
}

/**
*   checks whether input is a string or not
*
*   @method isString
*   @param {string}
*   @returns {boolean}
**/
var isString = function(string) {

    return typeof string === 'string';
}


/**
*   checks whether input is an integer or not
*
*   @method isInt
*   @param {int}
*   @returns {boolean}
**/
var isInt = function(integer) {

    return typeof integer === 'number';
}

/**
*   checks whether input is an array or not
*
*   @method isArray
*   @param {object}
*   @returns {boolean}
**/
var isArray = function(array) {

    return array instanceof Array;
}


/**
*   checks whether input is object or not
*
*   @method isObject
*   @param {object}
*   @returns {boolean}
**/
var isObject = function(object) {

    return typeof object === 'object';
}

module.exports = {
    isAddress: isAddress,
    isValue: isValue,
    isHash: isHash,
    isTransfersArray: isTransfersArray,
    isArrayOfHashes: isArrayOfHashes,
    isArrayOfTrytes: isArrayOfTrytes,
    isArrayOfAttachedTrytes: isArrayOfAttachedTrytes,
    isTrytes: isTrytes,
    isString: isString,
    isInt: isInt,
    isArray: isArray,
    isObject: isObject
}

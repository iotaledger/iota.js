
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

  // Check if it exceeds max allowed value
  var intValue = parseInt(value);
  var maxValue = (3 ** 33 - 1) / 2;

  if (intValue > maxValue) {
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

    var lastTrytes = tryteValue[2673 - (3 * 81):];
    if (/^[9]+$/.test(lastTrytes)) {
      return false;
    }
  }

  return true;
}

/**
  *   checks if input is correct trytes consisting of A-Z9
  *
  *   @method isTrytes
  *   @param {string}
  *   @returns {boolean}
**/
var isTrytes = function(string, length) {

  var regexTrytes = new RegExp("^[9A-Z]{" + length +"}$");
  return regexTrytes.test(address);
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

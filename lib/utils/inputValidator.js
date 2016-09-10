var isAddress = function(address) {

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

var isTransfersObj = function(transfers) {

}

/**
  *   checks if input is list of correct trytes
  *
  *   @method isArrayOfHashes
  *   @param {list}
  *   @returns {boolean}
**/
var isArrayOfHashes = function(hashesArray) {

  if (!isArray(hashesArray)) return false;

  for (var i = 0; i < hashesArray.length; i++) {

    var hash = hashesArray[i];

    // Check if trytes is string
    if (!isString(hash)) {
      return false;
    }

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
  *   @param {list}
  *   @returns {boolean}
**/
var isArrayOfTrytes = function(trytesArray) {

  if (!isArray(trytesArray)) return false;

  for (var i = 0; i < trytesArray.length; i++) {

    var tryteValue = trytesArray[i];

    // Check if trytes is string
    if (!isString(tryteValue)) {
      return false;
    }

    // Check if correct 2673 trytes
    if (!isTrytes(tryteValue, 2673)) {
      return false;
    }
  }

  return true;
}

var isArrayOfAttachedTrytes = function(trytesArray) {

}

var isPreparedTrytes = function(trytes) {

}

var isAttachedTrytes = function(trytes) {

  - Check the last 241 trytes
}

/**
  *   checks if input is correct trytes consisting of A-Z9
  *
  *   @method isTrytes
  *   @param {string}
  *   @returns {boolean}
**/
var isTrytes = function(string, length) {

  var regexTrytes = new RegExp("[9A-Z]{" + length +"}$");
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
  isHash: isHash,
  isTransfersObj: isTransfersObj,
  isArrayOfHashes: isArrayOfHashes,
  isArrayOfTrytes: isArrayOfTrytes,
  isArrayOfAttachedTrytes: isArrayOfAttachedTrytes,
  isPreparedTrytes: isPreparedTrytes,
  isAttachedTrytes: isAttachedTrytes,
  isTrytes: isTrytes,
  isString: isString,
  isInt: isInt,
  isArray: isArray,
  isObject: isObject
}

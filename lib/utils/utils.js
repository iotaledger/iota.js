var inputValidator = require("./inputValidator");
var makeRequest = require("./makeRequest");
var Curl = require("./checksum/curl");
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
  *   @returns {boolean}
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

  var curl = new Curl();

  var checksum = curl.generateChecksum(address);

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

module.exports = {
  isConnected: isConnected,
  convertUnits: convertUnits,
  isTrytes: isTrytes,
  getChecksum: getChecksum,
  noChecksum: noChecksum,
  toTrytes: toTrytes,
  fromTrytes: fromTrytes
}

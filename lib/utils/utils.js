var inputValidator = require("./inputValidator");
var makeRequest = require("./makeRequest")

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

  var command = {}

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

// var asciiConverter;
// var utf8Converter;
// var getChecksum;
// var noCheckssum;

module.exports = {
  isConnected: isConnected,
  convertUnits: convertUnits,
  isTrytes: inputValidator.isTrytes
}

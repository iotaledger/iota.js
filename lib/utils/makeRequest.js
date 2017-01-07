var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var errors = require("../errors/requestErrors");



function makeRequest(provider) {

  this.provider = provider || "http://localhost:14265";
}

/**
  *   Change the HTTP provider
  *
  *   @method setProvider
  *   @param {String} provider
**/
makeRequest.prototype.setProvider = function(provider) {

  this.provider = provider || "http://localhost:14265";
}

/**
  *   creates an XMLHttpRequest Object
  *
  *   @method open
  *   @param {object} command
  *   @returns {object} request
**/
makeRequest.prototype.open = function() {

  var request = new XMLHttpRequest();
  request.open('POST', this.provider, true);
  //request.setRequestHeader('Content-Type','application/json');
  return request;
}

/**
  *   sends an http request to a specified host
  *
  *   @method send
  *   @param {object} command
  *   @param {function} callback
**/
makeRequest.prototype.send = function(command, callback) {

  var self = this;
  var request = this.open();

  request.onreadystatechange = function() {
      if (request.readyState === 4) {
          var result = request.responseText;
          // Prepare the result
          return self.prepareResult(result, callback);
      }
  }

  try {
      request.send(JSON.stringify(command));
  } catch(error) {
      // INCORRECTLY THROWS NO CONNECTION ERROR
      callback(errors.noConnection(self.provider));
  }
}

/**
  *   prepares the returned values from the request
  *
  *   @method prepareResult
  *   @param {string} result
  *   @param {function} callback
**/
makeRequest.prototype.prepareResult = function(result, callback) {

  var error;

  try {
      result = JSON.parse(result);
  } catch(e) {
      error = errors.invalidResponse(result);
      result = null;
  }

  //
  //    TODO: PREPARE ERROR MESSAGES BETTER
  //
  if (!error && result.error) {
    error = errors.requestError(result.error);
    result = null;
  }

  if (!error && result.exception) {
    error = errors.requestError(result.exception);
    result = null;
  }

  return callback(error, result);
}


module.exports = makeRequest;

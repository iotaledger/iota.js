var apiCommands = require('./apiCommands')
var makeRequest = require('../utils/makeRequest')
var errors = require('../errors/inputErrors');
var inputValidator = require('../utils/inputValidator');


/**
  *  Making API requests, including generalized wrapper functions
**/
function api(provider) {
  this.makeRequest = new makeRequest(provider);
}

/**
  *   General function that makes an HTTP request to the local node
  *
  *   @method sendCommand
  *   @param {object} command
  *   @param {function} callback
  *   @returns {object} success
**/
api.prototype.sendCommand = function(command, callback) {

  this.makeRequest.send(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method analyzeTransactions
  *   @param {list} trytes
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.analyzeTransactions = function(trytes, callback) {

  // If single trytes string, turn into array
  if (typeof trytes === 'string') trytes = [trytes];

  // inputValidator: Check if array of correct tryte values
  if (!inputValidator.isArrayOfTrytes(trytes)) {
    throw errors.invalidTrytes();
  }

  var command = apiCommands.analyzeTransactions(trytes);

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method attachToTangle
  *   @param {string} trunkTransaction
  *   @param {string} branchTransaction
  *   @param {integer} minWeightMagnitude
  *   @param {array} trytes
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.attachToTangle = function(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback) {

  // inputValidator: Check if correct hash
  if (!inputValidator.isHash(trunkTransaction)) {

    throw errors.invalidTrunkOrBranch(trunkTransaction);
  }

  // inputValidator: Check if correct hash
  if (!inputValidator.isHash(branchTransaction)) {

    throw errors.invalidTrunkOrBranch(branchTransaction);
  }

  // inputValidator: Check if int
  if (!inputValidator.isInt(minWeightMagnitude)) {

    throw errors.notInt();
  }

  // inputValidator: Check if array of trytes
  if (!inputValidator.isArrayOfTrytes(trytes)) {

    throw errors.invalidTrytes();
  }

  var command = apiCommands.attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method findTransactions
  *   @param {object} searchValues
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.findTransactions = function(searchValues) {

  // Get search key from input object
  var searchKeys = Object.keys(searchValues);
  var availableKeys = ['bundles', 'addresses', 'digests', 'approvees'];

  searchKeys.forEach(function(key) {
    if (availableKeys.indexOf(key) === -1) {

      throw errors.invalidKey();
    }

    var hashes = searchValues[key];

    if (!inputValidator.isArrayOfHashes(hashes)) {

      throw errors.invalidTrytes();
    }
  })



  var command = apiCommands.findTransactions(searchValues);

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method getBundle
  *   @param {string} transaction Tail transaction hash of a bundle
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.getBundle = function(transaction) {

  // TODO: FIGURE OUT AWAY TO CHECK IF TRAIL TRANSACTION

  if (!inputValidator.isHash(transaction)) {

    throw errors.invalidTrytes();
  }

  var command = apiCommands.getBundle(transaction)

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method getInclusionStates
  *   @param {array} transactions
  *   @param {array} tips
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.getInclusionStates = function(transactions, tips) {

  // Check if correct transaction hashes
  if (!inputValidator.isArrayOfHashes(transactions)) {

    throw errors.invalidTrytes();
  }

  // Check if correct tips
  if (!inputValidator.isArrayOfHashes(tips)) {

    throw errors.invalidTrytes();
  }

  var command = apiCommands.getInclusionStates(transactions, tips);

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method getMilestone
  *   @param {integer} milestoneIndex
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.getMilestone = function(milestoneIndex) {

  if (!inputValidator.isInt(milestoneIndex)) {

    throw errors.notInt();
  }

  var command = apiCommands.getMilestone(milestoneIndex);

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method getNewAddress
  *   @param {string} seed
  *   @param {integer} securityLevel
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.getNewAddress = function(seed, securityLevel) {

  // Check if correct trytes
  if (!inputValidator.isHash(seed)) {

    throw errors.invalidTrytes();
  }

  // Check if int
  if (!inputValidator.isInt(securityLevel)) {

    throw errors.notInt();
  }

  var command = apiCommands.getNewAddress(seed, securityLevel);

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method getNodeInfo
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.getNodeInfo = function() {

  var command = apiCommands.getNodeInfo();

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method getPeers
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.getPeers = function() {

  var command = apiCommands.getPeers();

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method getTips
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.getTips = function() {

  var command = apiCommands.getTips();

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method getTransactionsToApprove
  *   @param {string} milestone
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.getTransactionsToApprove = function(milestone) {

  if (!inputValidator.isHash(milestone)) {

    throw errors.invalidTrytes();
  }

  var command = apiCommands.getTransactionsToApprove(milestone);

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method getTransfers
  *   @param {string} seed
  *   @param {integer} securityLevel
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.getTransfers = function(seed, securityLevel) {

  // Check if correct trytes
  if (!inputValidator.isHash(seed)) {

    throw errors.invalidTrytes();
  }

  // Check if int
  if (!inputValidator.isInt(securityLevel)) {

    throw errors.notInt();
  }

  var command = apiCommands.getTransfers(seed, securityLevel);

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method getTrytes
  *   @param {array} hashes
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.getTrytes = function(hashes) {

  if (!inputValidator.isArrayOfHashes(hashes)) {

    throw errors.invalidTrytes();
  }

  var command = apiCommands.getTrytes(hashes);

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method interruptAttachingToTangle
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.interruptAttachingToTangle = function() {

  var command = apiCommands.interruptAttachingToTangle

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method prepareTransfers
  *   @param {string} seed
  *   @param {integer} securityLevel
  *   @param {array} transfers
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.prepareTransfers = function(seed, securityLevel, transfers) {

  // Check if correct trytes
  if (!inputValidator.isHash(seed)) {

    throw errors.invalidTrytes();
  }

  // Check if int
  if (!inputValidator.isInt(securityLevel)) {

    throw errors.notInt();
  }

  // Check if transfers object is valid
  if (!inputValidator.isTransfersArray(transfers)) {

    throw errors.invalidTransfers();
  }

  var command = apiCommands.prepareTransfers(seed, securityLevel, transfers)

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method pushTransactions
  *   @param {array} trytes
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.pushTransactions = function(trytes) {

  if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {

    throw errors.invalidAttachedTrytes();
  }

  var command = apiCommands.pushTransactions(trytes);

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method replayTransfer
  *   @param {string} hashes
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.replayTransfer = function(transaction) {

  if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {

    throw errors.invalidAttachedTrytes();
  }

  var command = apiCommands.replayTransfer(transaction);

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

/**
  *   @method storeTransactions
  *   @param {array} trytes
  *   @returns {function} callback
  *   @returns {object} success
**/
api.prototype.storeTransactions = function(trytes) {

  if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {

    throw errors.invalidAttachedTrytes();
  }

  var command = apiCommands.storeTransactions(trytes);

  this.sendCommand(command, function(error, success) {

    if (callback) {
      return callback(error, success)
    } else {
      return success;
    }
  })
}

module.exports = api;

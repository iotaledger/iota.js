var apiCommands = require('./apiCommands')
var makeRequest = require('../utils/makeRequest')
var errors = require('../errors/inputErrors');
var inputValidator = require('../utils/inputValidator');


/**
*  Making API requests, including generalized wrapper functions
**/
function api(provider) {
    this.makeRequest = provider;
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
api.prototype.findTransactions = function(searchValues, callback) {

    // Get search key from input object
    var searchKeys = Object.keys(searchValues);
    var availableKeys = ['bundles', 'addresses', 'tags', 'approvees'];

    searchKeys.forEach(function(key) {
        if (availableKeys.indexOf(key) === -1) {

            throw errors.invalidKey();
        }


        var hashes = searchValues[key];

        // If tags, append to 27 trytes
        if (key === 'tags') {

            hashes.forEach(function(hash) {

                // Simple padding to 27 trytes
                while (hash.length < 27) {
                    hash += '9'
                }

                // validate hashes
                if (!inputValidator.isTrytes(hash, 27)) {

                    throw errors.invalidTrytes();
                }
            })

            // Reassign padded tags so that it can be used for findTransactions
            searchValues[key] = hashes;
        } else {

            // Check if correct array of hashes
            if (!inputValidator.isArrayOfHashes(hashes)) {

                throw errors.invalidTrytes();
            }
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
*   @method getBalances
*   @param {array} addresses
*   @param {int} threshold
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.getBalances = function(addresses, threshold, callback) {

    // Check if correct transaction hashes
    if (!inputValidator.isArrayOfHashes(addresses)) {

        throw errors.invalidTrytes();
    }

    var command = apiCommands.getBalances(addresses, threshold);

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
api.prototype.getInclusionStates = function(transactions, tips, callback) {

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
*   @method getNodeInfo
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.getNodeInfo = function(callback) {

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
*   @method getNeighbors
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.getNeighbors = function(callback) {

    var command = apiCommands.getNeighbors();

    this.sendCommand(command, function(error, success) {

        if (callback) {
            return callback(error, success)
        } else {
            return success;
        }
    })
}

/**
*   @method addNeighbors
*   @param {Array} uris List of URI's
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.addNeighbors = function(uris, callback) {

    var command = apiCommands.addNeighbors();

    this.sendCommand(command, function(error, success) {

        if (callback) {
            return callback(error, success)
        } else {
            return success;
        }
    })
}

/**
*   @method removeNeighbors
*   @param {Array} uris List of URI's
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.removeNeighbors = function(uris, callback) {

    var command = apiCommands.removeNeighbors();

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
api.prototype.getTips = function(callback) {

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
*   @param {int} depth
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.getTransactionsToApprove = function(depth, callback) {

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
*   @method getTrytes
*   @param {array} hashes
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.getTrytes = function(hashes, callback) {

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
api.prototype.interruptAttachingToTangle = function(callback) {

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
*   @method broadcastTransactions
*   @param {array} trytes
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.broadcastTransactions = function(trytes, callback) {

    if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {

        throw errors.invalidAttachedTrytes();
    }

    var command = apiCommands.broadcastTransactions(trytes);

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
api.prototype.storeTransactions = function(trytes, callback) {

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



/*************************************

WRAPPER FUNCTIONS

**************************************/

//
//  bundle hash, transaction hash,
//

/**
*   @method readMessage
*   @param {Object} options
*       @property {string} hash
*       @property {string} bundle
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.readMessage = function(options, callback) {

    //  If it's a single transaction hash, first get
    if (options.hash) {


    }
    // First get the bundle

    // If the bundle only contains 1 transaction, it does not contain a message
    if (data.transactions.length < 2) {
        processedTxs += 1;
        return
    }
}

module.exports = api;

var apiCommands     =   require('./apiCommands')
var errors          =   require('../errors/inputErrors');
var inputValidator  =   require('../utils/inputValidator');
var HMAC            =   require("../crypto/hmac/hmac");
var Converter       =   require("../crypto/converter/converter");
var Signing         =   require("../crypto/signing/signing");
var Bundle          =   require("../crypto/bundle/bundle");
var Utils           =   require("../utils/utils");
var async           =   require("async");

'use strict';
var nullHashTrytes = (new Array(244).join('9'));

/**
*  Making API requests, including generalized wrapper functions
**/
function api(provider, isSandbox) {

    this._makeRequest = provider;
    this.sandbox = isSandbox;
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
    var commandsToBatch = ['findTransactions', 'getBalances', 'getInclusionStates', 'getTrytes']
    var commandKeys = ['addresses', 'bundles', 'hashes', 'tags', 'transactions', 'approvees']
    var batchSize = 1000

    if (commandsToBatch.indexOf(command.command) > -1) {
      var keysToBatch = Object.keys(command)
        .filter(function (key) {
          return commandKeys.indexOf(key) > -1 && command[key].length > batchSize
        })

      if (keysToBatch.length) {
        return this._makeRequest.batchedSend(command, keysToBatch, batchSize, callback)
      }
    }

    return this._makeRequest.send(command, callback);
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

        return callback(errors.invalidTrunkOrBranch(trunkTransaction));
    }

    // inputValidator: Check if correct hash
    if (!inputValidator.isHash(branchTransaction)) {

        return callback(errors.invalidTrunkOrBranch(branchTransaction));
    }

    // inputValidator: Check if int
    if (!inputValidator.isValue(minWeightMagnitude)) {

        return callback(errors.notInt());
    }

    // inputValidator: Check if array of trytes
    if (!inputValidator.isArrayOfTrytes(trytes)) {

        return callback(errors.invalidTrytes());
    }


    var command = apiCommands.attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)

    return this.sendCommand(command, callback)
}

/**
*   @method findTransactions
*   @param {object} searchValues
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.findTransactions = function(searchValues, callback) {

    // If not an object, return error
    if (!inputValidator.isObject(searchValues)) {
        return callback(errors.invalidKey());
    }

    // Get search key from input object
    var searchKeys = Object.keys(searchValues);
    var availableKeys = ['bundles', 'addresses', 'tags', 'approvees'];

    var keyError = false;

    searchKeys.forEach(function(key) {

        if (availableKeys.indexOf(key) === -1) {

            keyError = errors.invalidKey();
            return
        }

        if (key === 'addresses') {

          searchValues.addresses = searchValues.addresses.map(function(address) {

              return Utils.noChecksum(address)
          });
        }

        var hashes = searchValues[key];

        // If tags, append to 27 trytes
        if (key === 'tags') {

            searchValues.tags = hashes.map(function(hash) {

                // Simple padding to 27 trytes
                while (hash.length < 27) {
                    hash += '9';
                }

                // validate hash
                if (!inputValidator.isTrytes(hash, 27)) {

                    keyError = errors.invalidTrytes();
                    return
                }
                return hash;
            })

        } else {

            // Check if correct array of hashes
            if (!inputValidator.isArrayOfHashes(hashes)) {

                keyError = errors.invalidTrytes();
                return
            }
        }


    })

    // If invalid key found, return
    if (keyError) {
        callback(keyError);
        return
    }

    var command = apiCommands.findTransactions(searchValues);

    return this.sendCommand(command, callback)
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

        return callback(errors.invalidTrytes());
    }

    var command = apiCommands.getBalances(addresses.map(function(address) {

      return Utils.noChecksum(address)
    }), threshold);

    return this.sendCommand(command, callback)
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

        return callback(errors.invalidTrytes());
    }

    // Check if correct tips
    if (!inputValidator.isArrayOfHashes(tips)) {

        return callback(errors.invalidTrytes());
    }

    var command = apiCommands.getInclusionStates(transactions, tips);

    return this.sendCommand(command, callback)
}

/**
*   @method getNodeInfo
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.getNodeInfo = function(callback) {

    var command = apiCommands.getNodeInfo();

    return this.sendCommand(command, callback)
}

/**
*   @method getNeighbors
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.getNeighbors = function(callback) {

    var command = apiCommands.getNeighbors();

    return this.sendCommand(command, callback)
}

/**
*   @method addNeighbors
*   @param {Array} uris List of URI's
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.addNeighbors = function(uris, callback) {

    // Validate URIs
    for (var i = 0; i < uris.length; i++) {
        if (!inputValidator.isUri(uris[i])) return callback(errors.invalidUri(uris[i]));
    }

    var command = apiCommands.addNeighbors(uris);

    return this.sendCommand(command, callback)
}

/**
*   @method removeNeighbors
*   @param {Array} uris List of URI's
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.removeNeighbors = function(uris, callback) {

    // Validate URIs
    for (var i = 0; i < uris.length; i++) {
        if (!inputValidator.isUri(uris[i])) return callback(errors.invalidUri(uris[i]));
    }

    var command = apiCommands.removeNeighbors(uris);

    return this.sendCommand(command, callback)
}

/**
*   @method getTips
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.getTips = function(callback) {

    var command = apiCommands.getTips();

    return this.sendCommand(command, callback)
}

/**
*   @method getTransactionsToApprove
*   @param {int} depth
*   @param {string} reference
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.getTransactionsToApprove = function(depth, reference, callback) {

    // Check if correct depth
    if (!inputValidator.isValue(depth)) {

        return callback(errors.invalidInputs());
    }

    var command = apiCommands.getTransactionsToApprove(depth, reference);

    return this.sendCommand(command, callback)
}

/**
*   @method getTrytes
*   @param {array} hashes
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.getTrytes = function(hashes, callback) {

    if (!inputValidator.isArrayOfHashes(hashes)) {

        return callback(errors.invalidTrytes());
    }

    var command = apiCommands.getTrytes(hashes);

    return this.sendCommand(command, callback)
}

/**
*   @method interruptAttachingToTangle
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.interruptAttachingToTangle = function(callback) {

    var command = apiCommands.interruptAttachingToTangle();

    return this.sendCommand(command, callback)
}

/**
*   @method broadcastTransactions
*   @param {array} trytes
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.broadcastTransactions = function(trytes, callback) {

    if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {

        return callback(errors.invalidAttachedTrytes());
    }

    var command = apiCommands.broadcastTransactions(trytes);

    return this.sendCommand(command, callback)
}

/**
*   @method storeTransactions
*   @param {array} trytes
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.storeTransactions = function(trytes, callback) {

    if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {

        return callback(errors.invalidAttachedTrytes());
    }

    var command = apiCommands.storeTransactions(trytes);

    return this.sendCommand(command, callback)
}



/*************************************

WRAPPER AND CUSTOM  FUNCTIONS

**************************************/


/**
*   Wrapper function for getTrytes and transactionObjects
*   gets the trytes and transaction object from a list of transaction hashes
*
*   @method getTransactionsObjects
*   @param {array} hashes
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.getTransactionsObjects = function(hashes, callback) {

    // If not array of hashes, return error
    if (!inputValidator.isArrayOfHashes(hashes)) {
        return callback(errors.invalidInputs());
    }

    // get the trytes of the transaction hashes
    this.getTrytes(hashes, function(error, trytes) {

        if (error) return callback(error);

        var transactionObjects = [];

        // call transactionObjects for each trytes
        trytes.forEach(function(thisTrytes) {

            // If no trytes returned, simply push null as placeholder
            if (!thisTrytes) {
                transactionObjects.push(null);
            } else {
                transactionObjects.push(Utils.transactionObject(thisTrytes));
            }
        })

        return callback(null, transactionObjects);
    })
}

/**
*   Wrapper function for findTransactions, getTrytes and transactionObjects
*   Returns the transactionObject of a transaction hash. The input can be a valid
*   findTransactions input
*
*   @method getTransactionsObjects
*   @param {object} input
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.findTransactionObjects = function(input, callback) {

    var self = this;

    self.findTransactions(input, function(error, transactions) {

        if (error) return callback(error);

        // get the transaction objects of the transactions
        self.getTransactionsObjects(transactions, callback);
    })
}

/**
*   Wrapper function for getNodeInfo and getInclusionStates
*
*   @method getLatestInclusion
*   @param {array} hashes
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.getLatestInclusion = function(hashes, callback) {

    var self = this;

    self.getNodeInfo(function(e, nodeInfo) {

        if (e) return callback(e);

        var latestMilestone = nodeInfo.latestSolidSubtangleMilestone;

        return self.getInclusionStates(hashes, Array(latestMilestone), callback);
    })
}

/**
*   Broadcasts and stores transaction trytes
*
*   @method storeAndBroadcast
*   @param {array} trytes
*   @returns {function} callback
*   @returns {object} success
**/
api.prototype.storeAndBroadcast = function(trytes, callback) {

    var self = this;

    self.storeTransactions(trytes, function(error, success) {


        if (error) return callback(error);

        // If no error
        return self.broadcastTransactions(trytes, callback)
    })
}

/**
*   Gets transactions to approve, attaches to Tangle, broadcasts and stores
*
*   @method sendTrytes
*   @param {array} trytes
*   @param {int} depth
*   @param {int} minWeightMagnitude
*   @param {object} options
*   @param {function} callback
*   @returns {object} analyzed Transaction objects
**/
api.prototype.sendTrytes = function(trytes, depth, minWeightMagnitude, options, callback) {

    var self = this;

    // If no options provided, switch arguments
    if (arguments.length === 4 && Object.prototype.toString.call(options) === "[object Function]") {
        callback = options;
        options = {};
    }

    // Check if correct depth and minWeightMagnitude
    if (!inputValidator.isValue(depth) || !inputValidator.isValue(minWeightMagnitude)) {

        return callback(errors.invalidInputs());
    }

    // Get branch and trunk
    self.getTransactionsToApprove(depth, options.reference, function(error, toApprove) {

        if (error) {
            return callback(error)
        }

        // attach to tangle - do pow
        self.attachToTangle(toApprove.trunkTransaction, toApprove.branchTransaction, minWeightMagnitude, trytes, function(error, attached) {

            if (error) {
                return callback(error)
            }

            // If the user is connected to the sandbox, we have to monitor the POW queue
            // to check if the POW job was completed
            if (self.sandbox) {

                var job = self.sandbox + '/jobs/' + attached.id;

                // Do the Sandbox send function
                self._makeRequest.sandboxSend(job, function(e, attachedTrytes) {

                    if (e) {
                        return callback(e);
                    }

                    self.storeAndBroadcast(attachedTrytes, function(error, success) {

                        if (error) {
                            return callback(error);
                        }

                        var finalTxs = [];

                        attachedTrytes.forEach(function(trytes) {
                            finalTxs.push(Utils.transactionObject(trytes));
                        })

                        return callback(null, finalTxs);

                    })
                })
            } else {

                // Broadcast and store tx
                self.storeAndBroadcast(attached, function(error, success) {

                    if (error) {
                        return callback(error);
                    }

                    var finalTxs = [];

                    attached.forEach(function(trytes) {
                        finalTxs.push(Utils.transactionObject(trytes));
                    })

                    return callback(null, finalTxs);

                })
            }
        })
    })
}

/**
*   Prepares Transfer, gets transactions to approve
*   attaches to Tangle, broadcasts and stores
*
*   @method sendTransfer
*   @param {string} seed
*   @param {int} depth
*   @param {int} minWeightMagnitude
*   @param {array} transfers
*   @param {object} options
*       @property {array} inputs List of inputs used for funding the transfer
*       @property {string} address if defined, this address wil be used for sending the remainder value to
*   @param {function} callback
*   @returns {object} analyzed Transaction objects
**/
api.prototype.sendTransfer = function(seed, depth, minWeightMagnitude, transfers, options, callback) {

    var self = this;

    // Validity check for number of arguments
    if (arguments.length < 5) {
        return callback(new Error("Invalid number of arguments"));
    }

    // If no options provided, switch arguments
    if (arguments.length === 5 && Object.prototype.toString.call(options) === "[object Function]") {
        callback = options;
        options = {};
    }

    // Check if correct depth and minWeightMagnitude
    if (!inputValidator.isValue(depth) || !inputValidator.isValue(minWeightMagnitude)) {

        return callback(errors.invalidInputs());
    }

    self.prepareTransfers(seed, transfers, options, function(error, trytes) {

        if (error) {
            return callback(error)
        }

      self.sendTrytes(trytes, depth, minWeightMagnitude, options, callback);
    })
}

/**
* Promotes a transaction by adding spam on top of it.
* Will promote {maximum} transfers on top of the current one with {delay} interval.
*
* @Param {string} tail
* @param {int} depth
* @param {int} minWeightMagnitude
* @param {array} transfer
* @param {object} params
* @param callback
*
* @returns {array} transaction objects
*/
api.prototype.promoteTransaction = function(tail, depth, minWeightMagnitude, transfer, params, callback) {
    var self = this;
    if (!inputValidator.isHash(tail)) {
        return callback(errors.invalidTrytes());
    }

    self.isPromotable(tail).then(function (isPromotable) {
      if (!isPromotable) {
        return callback(errors.inconsistentSubtangle(tail));
      }

      if (params.interrupt === true || (typeof(params.interrupt) === 'function' && params.interrupt()))
        return callback(null, tail);

      self.sendTransfer(transfer[0].address, depth, minWeightMagnitude, transfer, {reference: tail}, function(err, res) {
          if (err == null && params.delay > 0) {
              setTimeout (function() {
                  self.promoteTransaction(tail, depth, minWeightMagnitude, transfer, params, callback);
              }, params.delay);
          } else {
              return callback(err, res);
          }
      });
    }).catch(function (err) {
      callback(err)
    })
}

/**
*   Replays a transfer by doing Proof of Work again
*
*   @method replayBundle
*   @param {string} tail
*   @param {int} depth
*   @param {int} minWeightMagnitude
*   @param {function} callback
*   @returns {object} analyzed Transaction objects
**/
api.prototype.replayBundle = function(tail, depth, minWeightMagnitude, callback) {

    var self = this;

    // Check if correct tail hash
    if (!inputValidator.isHash(tail)) {

        return callback(errors.invalidTrytes());
    }


    // Check if correct depth and minWeightMagnitude
    if (!inputValidator.isValue(depth) || !inputValidator.isValue(minWeightMagnitude)) {

        return callback(errors.invalidInputs());
    }


    self.getBundle(tail, function(error, bundle) {

        if (error) return callback(error);

        // Get the trytes of all the bundle objects
        var bundleTrytes = [];

        bundle.forEach(function(bundleTx) {
            bundleTrytes.push(Utils.transactionTrytes(bundleTx));
        })

        return self.sendTrytes(bundleTrytes.reverse(), depth, minWeightMagnitude, callback);
    })
}

/**
*   Re-Broadcasts a transfer
*
*   @method broadcastBundle
*   @param {string} tail
*   @param {function} callback
*   @returns {object} analyzed Transaction objects
**/
api.prototype.broadcastBundle = function(tail, callback) {

    var self = this;

    // Check if correct tail hash
    if (!inputValidator.isHash(tail)) {

        return callback(errors.invalidTrytes());
    }

    self.getBundle(tail, function(error, bundle) {

        if (error) return callback(error);

        // Get the trytes of all the bundle objects
        var bundleTrytes = [];
        bundle.forEach(function(bundleTx) {
            bundleTrytes.push(Utils.transactionTrytes(bundleTx));
        })

        return self.broadcastTransactions(bundleTrytes.reverse(), callback);
    })
}


/**
*   Generates a new address
*
*   @method newAddress
*   @param      {string} seed
*   @param      {int} index
*   @param      {int} security      Security level of the private key
*   @param      {bool} checksum
*   @returns    {string} address     Transaction objects
**/
api.prototype._newAddress = function(seed, index, security, checksum) {

    var key = Signing.key(Converter.trits(seed), index, security);
    var digests = Signing.digests(key);
    var addressTrits = Signing.address(digests);
    var address = Converter.trytes(addressTrits)

    if (checksum) {
        address = Utils.addChecksum(address);
    }

    return address;
}

/**
*   Generates a new address either deterministically or index-based
*
*   @method getNewAddress
*   @param {string} seed
*   @param {object} options
*       @property   {int} index         Key index to start search from
*       @property   {bool} checksum     add 9-tryte checksum
*       @property   {int} total         Total number of addresses to return
*       @property   {int} security      Security level to be used for the private key / address. Can be 1, 2 or 3
*       @property   {bool} returnAll    return all searched addresses
*   @param {function} callback
*   @returns {string | array} address List of addresses
**/
api.prototype.getNewAddress = function(seed, options, callback) {

    var self = this;

    // If no options provided, switch arguments
    if (arguments.length === 2 && Object.prototype.toString.call(options) === "[object Function]") {
        callback = options;
        options = {};
    }

    // validate the seed
    if (!inputValidator.isTrytes(seed)) {

        return callback(errors.invalidSeed());
    }

    // default index value
    var index = 0;

    if ('index' in options) {

        index = options.index;

        // validate the index option
        if (!inputValidator.isValue(index) || index < 0) {

            return callback(errors.invalidIndex());
        }
    }

    var checksum = options.checksum || false;
    var total = options.total || null;

    // If no user defined security, use the standard value of 2
    var security = 2;

    if ('security' in options) {

      security = options.security;

      // validate the security option
      if (!inputValidator.isValue(security) || security < 1 || security > 3) {

        return callback(errors.invalidSecurity());
      }
    }


    var allAddresses = [];


    // Case 1: total
    //
    // If total number of addresses to generate is supplied, simply generate
    // and return the list of all addresses
    if (total) {
        // Increase index with each iteration
        for (var i = 0; i < total; i++, index++) {

            var address = self._newAddress(seed, index, security, checksum);
            allAddresses.push(address);
        }

        return callback(null, allAddresses);
    }
    //  Case 2: no total provided
    //
    //  Continue calling findTransactions to see if address was already created
    //  if null, return list of addresses
    //
    else {

        async.doWhilst(function(callback) {
            // Iteratee function

            var newAddress = self._newAddress(seed, index, security, checksum);

            self.findTransactions({'addresses': Array(newAddress)}, function(error, transactions) {

                if (error) {
                    return callback(error);
                }
                callback(null, newAddress, transactions)
            })

        }, function(address, transactions) {
            // Test function with validity check

            if (options.returnAll) {
                allAddresses.push(address)
            }

            // Increase the index
            index += 1;

            // Validity check
            return transactions.length > 0;

        }, function(err, address) {
            // Final callback

            if (err) {
                return callback(err);
            } else {

                // If returnAll, return list of allAddresses
                // else return the last address that was generated
                var addressToReturn = options.returnAll ? allAddresses : address;

                return callback(null, addressToReturn);
            }
        })
    }
}

/**
*   Gets the inputs of a seed
*
*   @method getInputs
*   @param {string} seed
*   @param {object} options
*       @property {int} start Starting key index
*       @property {int} end Ending key index
*       @property {int} threshold Min balance required
*       @property {int} security secuirty level of private key / seed
*   @param {function} callback
**/
api.prototype.getInputs = function(seed, options, callback) {

    var self = this;

    // If no options provided, switch arguments
    if (arguments.length === 2 && Object.prototype.toString.call(options) === "[object Function]") {
        callback = options;
        options = {};
    }

    // validate the seed
    if (!inputValidator.isTrytes(seed)) {

        return callback(errors.invalidSeed());
    }

    var start = options.start || 0;
    var end = options.end || null;
    var threshold = options.threshold || null;
    // If no user defined security, use the standard value of 2
    var security = options.security || 2;

    // If start value bigger than end, return error
    // or if difference between end and start is bigger than 500 keys
    if (options.end && (start > end || end > (start + 500))) {
        return callback(new Error("Invalid inputs provided"))
    }

    //  Case 1: start and end
    //
    //  If start and end is defined by the user, simply iterate through the keys
    //  and call getBalances
    if (end) {

        var allAddresses = [];

        for (var i = start; i < end; i++) {

            var address = self._newAddress(seed, i, security, false);
            allAddresses.push(address);
        }

        getBalanceAndFormat(allAddresses);
    }
    //  Case 2: iterate till threshold || end
    //
    //  Either start from index: 0 or start (if defined) until threshold is reached.
    //  Calls getNewAddress and deterministically generates and returns all addresses
    //  We then do getBalance, format the output and return it
    else {

        self.getNewAddress(seed, {'index': start, 'returnAll': true, 'security': security}, function(error, addresses) {

            if (error) {
                return callback(error);
            } else {
                getBalanceAndFormat(addresses);
            }
        })
    }


    //  Calls getBalances and formats the output
    //  returns the final inputsObject then
    function getBalanceAndFormat(addresses) {

        self.getBalances(addresses, 100, function(error, balances) {

            if (error) {
                return callback(error);
            } else {

                var inputsObject = {
                    'inputs': [],
                    'totalBalance': 0
                }

                // If threshold defined, keep track of whether reached or not
                // else set default to true
                var thresholdReached = threshold ? false : true;

                for (var i = 0; i < addresses.length; i++) {

                    var balance = parseInt(balances.balances[i]);

                    if (balance > 0) {

                        var newEntry = {
                            'address': addresses[i],
                            'balance': balance,
                            'keyIndex': start + i,
                            'security': security
                        }

                        // Add entry to inputs
                        inputsObject.inputs.push(newEntry);
                        // Increase totalBalance of all aggregated inputs
                        inputsObject.totalBalance += balance;

                        if (threshold && inputsObject.totalBalance >= threshold) {

                            thresholdReached = true;
                            break;
                        }
                    }
                }

                if (thresholdReached) {
                    return callback(null, inputsObject);
                } else {
                    return callback(new Error("Not enough balance"));
                }
            }
        })
    }
}


/**
*   Prepares transfer by generating bundle, finding and signing inputs
*
*   @method prepareTransfers
*   @param {string} seed
*   @param {object} transfers
*   @param {object} options
*       @property {array} inputs Inputs used for signing. Needs to have correct security, keyIndex and address value
*       @property {string} address Remainder address
*       @property {int} security security level to be used for getting inputs and addresses
*       @property {string} hmacKey HMAC key used for attaching an HMAC
*   @param {function} callback
*   @returns {array} trytes Returns bundle trytes
**/
api.prototype.prepareTransfers = function(seed, transfers, options, callback) {

    var self = this;
    var addHMAC = false;
    var addedHMAC = false;

    // If no options provided, switch arguments
    if (arguments.length === 3 && Object.prototype.toString.call(options) === "[object Function]") {
        callback = options;
        options = {};
    }

    // validate the seed
    if (!inputValidator.isTrytes(seed)) {

        return callback(errors.invalidSeed());
    }

    if (options.hasOwnProperty('hmacKey') && options.hmacKey) {

        if(!inputValidator.isTrytes(options.hmacKey)) {
            return callback(errors.invalidTrytes());
        }
        addHMAC = true;
    }

    // If message or tag is not supplied, provide it
    // Also remove the checksum of the address if it's there after validating it
    transfers.forEach(function(thisTransfer) {

        thisTransfer.message = thisTransfer.message ? thisTransfer.message : '';
        thisTransfer.obsoleteTag = thisTransfer.tag ? thisTransfer.tag : (thisTransfer.obsoleteTag ? thisTransfer.obsoleteTag : '');

        if (addHMAC && thisTransfer.value > 0) {
            thisTransfer.message = nullHashTrytes + thisTransfer.message;
            addedHMAC = true;
        }

        // If address with checksum, validate it
        if (thisTransfer.address.length === 90) {

            if (!Utils.isValidChecksum(thisTransfer.address)) {

                return callback(errors.invalidChecksum(thisTransfer.address));

            }
        }

        thisTransfer.address = Utils.noChecksum(thisTransfer.address);
    })

    // Input validation of transfers object
    if (!inputValidator.isTransfersArray(transfers)) {
        return callback(errors.invalidTransfers());
    }

    // If inputs provided, validate the format
    if (options.inputs && !inputValidator.isInputs(options.inputs)) {
        return callback(errors.invalidInputs());
    }

    var remainderAddress = options.address || null;
    var chosenInputs = options.inputs || [];
    var security = options.security || 2;

    // Create a new bundle
    var bundle = new Bundle();

    var totalValue = 0;
    var signatureFragments = [];
    var tag;

    //
    //  Iterate over all transfers, get totalValue
    //  and prepare the signatureFragments, message and tag
    //
    for (var i = 0; i < transfers.length; i++) {

        var signatureMessageLength = 1;

        // If message longer than 2187 trytes, increase signatureMessageLength (add 2nd transaction)
        if (transfers[i].message.length > 2187) {

            // Get total length, message / maxLength (2187 trytes)
            signatureMessageLength += Math.floor(transfers[i].message.length / 2187);

            var msgCopy = transfers[i].message;

            // While there is still a message, copy it
            while (msgCopy) {

                var fragment = msgCopy.slice(0, 2187);
                msgCopy = msgCopy.slice(2187, msgCopy.length);

                // Pad remainder of fragment
                for (var j = 0; fragment.length < 2187; j++) {
                    fragment += '9';
                }

                signatureFragments.push(fragment);
            }
        } else {
            // Else, get single fragment with 2187 of 9's trytes
            var fragment = '';

            if (transfers[i].message) {
                fragment = transfers[i].message.slice(0, 2187)
            }

            for (var j = 0; fragment.length < 2187; j++) {
                fragment += '9';
            }

            signatureFragments.push(fragment);
        }

        // get current timestamp in seconds
        var timestamp = Math.floor(Date.now() / 1000);

        // If no tag defined, get 27 tryte tag.
        tag = transfers[i].obsoleteTag ? transfers[i].obsoleteTag : '999999999999999999999999999';

        // Pad for required 27 tryte length
        for (var j = 0; tag.length < 27; j++) {
            tag += '9';
        }

        // Add first entries to the bundle
        // Slice the address in case the user provided a checksummed one
        bundle.addEntry(signatureMessageLength, transfers[i].address, transfers[i].value, tag, timestamp)
        // Sum up total value
        totalValue += parseInt(transfers[i].value);
    }

    // Get inputs if we are sending tokens
    if (totalValue) {

        //  Case 1: user provided inputs
        //
        //  Validate the inputs by calling getBalances
        if (options.inputs) {

            // Get list if addresses of the provided inputs
            var inputsAddresses = [];
            options.inputs.forEach(function(inputEl) {
                inputsAddresses.push(inputEl.address);
            })

            self.getBalances(inputsAddresses, 100, function(error, balances) {

                if (error) return callback(error);

                var confirmedInputs = [];
                var totalBalance = 0;
                for (var i = 0; i < balances.balances.length; i++) {
                    var thisBalance = parseInt(balances.balances[i]);

                    // If input has balance, add it to confirmedInputs
                    if (thisBalance > 0) {
                        totalBalance += thisBalance;

                        var inputEl = options.inputs[i];
                        inputEl.balance = thisBalance;

                        confirmedInputs.push(inputEl);

                        // if we've already reached the intended input value, break out of loop
                        if (totalBalance >= totalValue) {
                            break;
                        }
                    }
                }

                // Return not enough balance error
                if (totalValue > totalBalance) {
                    return callback(new Error("Not enough balance"));
                }

                addRemainder(confirmedInputs);
            });

        }

        //  Case 2: Get inputs deterministically
        //
        //  If no inputs provided, derive the addresses from the seed and
        //  confirm that the inputs exceed the threshold
        else {

            self.getInputs(seed, { 'threshold': totalValue, 'security': security }, function(error, inputs) {

                // If inputs with enough balance
                if (!error) {

                    addRemainder(inputs.inputs);
                } else {

                    return callback(error);
                }
            })
        }
    } else {

        // If no input required, don't sign and simply finalize the bundle
        bundle.finalize();
        bundle.addTrytes(signatureFragments);

        var bundleTrytes = []
        bundle.bundle.forEach(function(tx) {
            bundleTrytes.push(Utils.transactionTrytes(tx))
        })

        return callback(null, bundleTrytes.reverse());
    }



    function addRemainder(inputs) {

        var totalTransferValue = totalValue;
        for (var i = 0; i < inputs.length; i++) {

            var thisBalance = inputs[i].balance;
            var toSubtract = 0 - thisBalance;
            var timestamp = Math.floor(Date.now() / 1000);

            // Add input as bundle entry
            bundle.addEntry(inputs[i].security, inputs[i].address, toSubtract, tag, timestamp);

            // If there is a remainder value
            // Add extra output to send remaining funds to
            if (thisBalance >= totalTransferValue) {

                var remainder = thisBalance - totalTransferValue;

                // If user has provided remainder address
                // Use it to send remaining funds to
                if (remainder > 0 && remainderAddress) {

                    // Remainder bundle entry
                    bundle.addEntry(1, remainderAddress, remainder, tag, timestamp);

                    // Final function for signing inputs
                    signInputsAndReturn(inputs);
                }
                else if (remainder > 0) {

                    var startIndex = 0;
                    for(var k = 0; k < inputs.length; k++) {
                        startIndex = Math.max(inputs[k].keyIndex, startIndex);
                    }

                    startIndex++;

                    // Generate a new Address by calling getNewAddress
                    self.getNewAddress(seed, {'index': startIndex, 'security': security}, function(error, address) {

                        if (error) return callback(error)

                        var timestamp = Math.floor(Date.now() / 1000);

                        // Remainder bundle entry
                        bundle.addEntry(1, address, remainder, tag, timestamp);

                        // Final function for signing inputs
                        signInputsAndReturn(inputs);
                    })
                } else {

                    // If there is no remainder, do not add transaction to bundle
                    // simply sign and return
                    signInputsAndReturn(inputs);
                }

            // If multiple inputs provided, subtract the totalTransferValue by
            // the inputs balance
            } else {

                totalTransferValue -= thisBalance;
            }
        }
    }

    function signInputsAndReturn(inputs) {

        bundle.finalize();
        bundle.addTrytes(signatureFragments);

        //  SIGNING OF INPUTS
        //
        //  Here we do the actual signing of the inputs
        //  Iterate over all bundle transactions, find the inputs
        //  Get the corresponding private key and calculate the signatureFragment
        for (var i = 0; i < bundle.bundle.length; i++) {

            if (bundle.bundle[i].value < 0) {

                var thisAddress = bundle.bundle[i].address;

                // Get the corresponding keyIndex and security of the address
                var keyIndex;
                var keySecurity;
                for (var k = 0; k < inputs.length; k++) {

                    if (inputs[k].address === thisAddress) {

                        keyIndex = inputs[k].keyIndex;
                        keySecurity = inputs[k].security ? inputs[k].security : security;
                        break;
                    }
                }

                var bundleHash = bundle.bundle[i].bundle;

                // Get corresponding private key of address
                var key = Signing.key(Converter.trits(seed), keyIndex, keySecurity);

                //  Get the normalized bundle hash
                var normalizedBundleHash = bundle.normalizedBundle(bundleHash);
                var normalizedBundleFragments = [];

                // Split hash into 3 fragments
                for (var l = 0; l < 3; l++) {
                    normalizedBundleFragments[l] = normalizedBundleHash.slice(l * 27, (l + 1) * 27);
                }

                //  First 6561 trits for the firstFragment
                var firstFragment = key.slice(0, 6561);

                //  First bundle fragment uses the first 27 trytes
                var firstBundleFragment = normalizedBundleFragments[0];

                //  Calculate the new signatureFragment with the first bundle fragment
                var firstSignedFragment = Signing.signatureFragment(firstBundleFragment, firstFragment);

                //  Convert signature to trytes and assign the new signatureFragment
                bundle.bundle[i].signatureMessageFragment = Converter.trytes(firstSignedFragment);

                // if user chooses higher than 27-tryte security
                // for each security level, add an additional signature
                for (var j = 1; j < keySecurity; j++) {

                    //  Because the signature is > 2187 trytes, we need to
                    //  find the subsequent transaction to add the remainder of the signature
                    //  Same address as well as value = 0 (as we already spent the input)
                    if (bundle.bundle[i + j].address === thisAddress && bundle.bundle[i + j].value === 0) {

                        // Use the next 6561 trits
                        var nextFragment = key.slice(6561 * j,  (j + 1) * 6561);

                        var nextBundleFragment = normalizedBundleFragments[j];

                        //  Calculate the new signature
                        var nextSignedFragment = Signing.signatureFragment(nextBundleFragment, nextFragment);

                        //  Convert signature to trytes and assign it again to this bundle entry
                        bundle.bundle[i + j].signatureMessageFragment = Converter.trytes(nextSignedFragment);
                    }
                }
            }
        }

        if(addedHMAC) {
            var hmac = new HMAC(options.hmacKey);
            hmac.addHMAC(bundle);
        }

        var bundleTrytes = []

        // Convert all bundle entries into trytes
        bundle.bundle.forEach(function(tx) {
            bundleTrytes.push(Utils.transactionTrytes(tx))
        })

        return callback(null, bundleTrytes.reverse());
    }
}



/**
*   Basically traverse the Bundle by going down the trunkTransactions until
*   the bundle hash of the transaction is no longer the same. In case the input
*   transaction hash is not a tail, we return an error.
*
*   @method traverseBundle
*   @param {string} trunkTx Hash of a trunk or a tail transaction  of a bundle
*   @param {string} bundleHash
*   @param {array} bundle List of bundles to be populated
*   @returns {array} bundle Transaction objects
**/
api.prototype.traverseBundle = function(trunkTx, bundleHash, bundle, callback) {

    var self = this;

    // Get trytes of transaction hash
    self.getTrytes(Array(trunkTx), function(error, trytesList) {

        if (error) return callback(error);

        var trytes = trytesList[0]

        if (!trytes) return callback(new Error("Bundle transactions not visible"))

        // get the transaction object
        var txObject = Utils.transactionObject(trytes);

        if (!txObject) return callback(new Error("Invalid trytes, could not create object"));

        // If first transaction to search is not a tail, return error
        if (!bundleHash && txObject.currentIndex !== 0) {

            return callback(new Error("Invalid tail transaction supplied."));
        }

        // If no bundle hash, define it
        if (!bundleHash) {

            bundleHash = txObject.bundle;
        }

        // If different bundle hash, return with bundle
        if (bundleHash !== txObject.bundle) {

            return callback(null, bundle);
        }

        // If only one bundle element, return
        if (txObject.lastIndex === 0 && txObject.currentIndex === 0) {

            return callback(null, Array(txObject));
        }

        // Define new trunkTransaction for search
        var trunkTx = txObject.trunkTransaction;

        // Add transaction object to bundle
        bundle.push(txObject);

        // Continue traversing with new trunkTx
        return self.traverseBundle(trunkTx, bundleHash, bundle, callback);
    })
}

/**
*   Gets the associated bundle transactions of a single transaction
*   Does validation of signatures, total sum as well as bundle order
*
*   @method getBundle
*   @param {string} transaction Hash of a tail transaction
*   @returns {list} bundle Transaction objects
**/
api.prototype.getBundle = function(transaction, callback) {

    var self = this;

    // inputValidator: Check if correct hash
    if (!inputValidator.isHash(transaction)) {

        return callback(errors.invalidInputs(transaction));
    }

    // Initiate traverseBundle
    self.traverseBundle(transaction, null, Array(), function(error, bundle) {

        if (error) return callback(error);

        if (!Utils.isBundle(bundle)) {

            return callback(new Error("Invalid Bundle provided"))

        } else {

            // Return bundle element
            return callback(null, bundle);

        }
    })
}


/**
*   Internal function to get the formatted bundles of a list of addresses
*
*   @method _bundlesFromAddresses
*   @param {list} addresses List of addresses
*   @param {bool} inclusionStates
*   @returns {list} bundles Transaction objects
**/
api.prototype._bundlesFromAddresses = function(addresses, inclusionStates, callback) {

    var self = this;

    // call wrapper function to get txs associated with addresses
    self.findTransactionObjects({'addresses': addresses}, function(error, transactionObjects) {

        if (error) return callback(error);

        // set of tail transactions
        var tailTransactions = new Set();
        var nonTailBundleHashes = new Set();

        transactionObjects.forEach(function(thisTransaction) {

            // Sort tail and nonTails
            if (thisTransaction.currentIndex === 0) {

                tailTransactions.add(thisTransaction.hash);
            } else {

                nonTailBundleHashes.add(thisTransaction.bundle)
            }
        })

        // Get tail transactions for each nonTail via the bundle hash
        self.findTransactionObjects({'bundles': Array.from(nonTailBundleHashes)}, function(error, bundleObjects) {

            if (error) return callback(error);

            bundleObjects.forEach(function(thisTransaction) {

                if (thisTransaction.currentIndex === 0) {

                    tailTransactions.add(thisTransaction.hash);
                }
            })

            var finalBundles = [];
            var tailTxArray = Array.from(tailTransactions);

            // If inclusionStates, get the confirmation status
            // of the tail transactions, and thus the bundles
            async.waterfall([

                //
                // 1. Function
                //
                function(cb) {

                    if (inclusionStates) {

                        self.getLatestInclusion(tailTxArray, function(error, states) {

                            // If error, return it to original caller
                            if (error) return callback(error);

                            cb(null, states);
                        })
                    } else {
                        cb(null, []);
                    }
                },

                //
                // 2. Function
                //
                function(tailTxStates, cb) {

                    // Map each tail transaction to the getBundle function
                    // format the returned bundles and add inclusion states if necessary
                    async.mapSeries(tailTxArray, function(tailTx, cb2) {

                         self.getBundle(tailTx, function(error, bundle) {

                             // If error returned from getBundle, simply ignore it
                             // because the bundle was most likely incorrect
                             if (!error) {

                                 // If inclusion states, add to each bundle entry
                                 if (inclusionStates) {
                                     var thisInclusion = tailTxStates[tailTxArray.indexOf(tailTx)];

                                     bundle.forEach(function(bundleTx) {

                                         bundleTx['persistence'] = thisInclusion;
                                     })
                                 }

                                 finalBundles.push(bundle);
                             }
                             cb2(null, true);
                         })
                    }, function(error, results) {

                        // credit: http://stackoverflow.com/a/8837505
                        // Sort bundles by timestamp
                        finalBundles.sort(function(a, b) {
                            var x = parseInt(a[0]['attachmentTimestamp']); var y = parseInt(b[0]['attachmentTimestamp']);
                            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                        });

                        return callback(error, finalBundles);
                    })
                }
            ])
        })
    })
}

/**
*   @method getTransfers
*   @param {string} seed
*   @param {object} options
*       @property {int} start Starting key index
*       @property {int} end Ending key index
*       @property {int} security security level to be used for getting inputs and addresses
*       @property {bool} inclusionStates returns confirmation status of all transactions
*   @param {function} callback
*   @returns {object} success
**/
api.prototype.getTransfers = function(seed, options, callback) {

    var self = this;

    // If no options provided, switch arguments
    if (arguments.length === 2 && Object.prototype.toString.call(options) === "[object Function]") {
        callback = options;
        options = {};
    }

    // inputValidator: Check if correct seed
    if (!inputValidator.isTrytes(seed)) {

        return callback(errors.invalidSeed(seed));
    }

    var start = options.start || 0;
    var end = options.end || null;
    var inclusionStates = options.inclusionStates || null;
    var security = options.security || 2;

    // If start value bigger than end, return error
    // or if difference between end and start is bigger than 500 keys
    if (start > end || end > (start + 500)) {
        return callback(new Error("Invalid inputs provided"))
    }

    // first call findTransactions
    // If a transaction is non tail, get the tail transactions associated with it
    // add it to the list of tail transactions

    var addressOptions = {
        index: start,
        total: end ? end - start : null,
        returnAll: true,
        security: security
    }

    //  Get a list of all addresses associated with the users seed
    self.getNewAddress(seed, addressOptions, function(error, addresses) {

        if (error) return callback(error);

        return self._bundlesFromAddresses(addresses, inclusionStates, callback);
    })
}


/**
*   Similar to getTransfers, just that it returns additional account data
*
*   @method getAccountData
*   @param {string} seed
*   @param {object} options
*       @property {int} start Starting key index
*       @property {int} security security level to be used for getting inputs and addresses
*       @property {int} end Ending key index
*   @param {function} callback
*   @returns {object} success
**/
api.prototype.getAccountData = function(seed, options, callback) {

    var self = this;

    // If no options provided, switch arguments
    if (arguments.length === 2 && Object.prototype.toString.call(options) === "[object Function]") {
        callback = options;
        options = {};
    }

    // inputValidator: Check if correct seed
    if (!inputValidator.isTrytes(seed)) {

        return callback(errors.invalidSeed(seed));
    }

    var start = options.start || 0;
    var end = options.end || null;
    var security = options.security || 2;

    // If start value bigger than end, return error
    // or if difference between end and start is bigger than 1000 keys
    if (end && (start > end || end > (start + 1000))) {
        return callback(new Error("Invalid inputs provided"))
    }

    //  These are the values that will be returned to the original caller
    //  @latestAddress: latest unused address
    //  @addresses:     all addresses associated with this seed that have been used
    //  @transfers:     all sent / received transfers
    //  @inputs:        all inputs of the account
    //  @balance:       the confirmed balance
    var valuesToReturn = {
        'latestAddress' : '',
        'addresses'     : [],
        'transfers'     : [],
        'inputs'        : [],
        'balance'       : 0
    }

    // first call findTransactions
    // If a transaction is non tail, get the tail transactions associated with it
    // add it to the list of tail transactions
    var addressOptions = {
        index: start,
        total: end ? end - start : null,
        returnAll: true,
        security: security
    }

    //  Get a list of all addresses associated with the users seed
    self.getNewAddress(seed, addressOptions, function(error, addresses) {

        if (error) return callback(error);

        // assign the last address as the latest address
        // since it has no transactions associated with it
        valuesToReturn.latestAddress = addresses[addresses.length - 1];

        // Add all returned addresses to the lsit of addresses
        // remove the last element as that is the most recent address
        valuesToReturn.addresses = addresses.slice(0, -1);

        // get all bundles from a list of addresses
        self._bundlesFromAddresses(addresses, true, function(error, bundles) {

            if (error) return callback(error);

            // add all transfers
            valuesToReturn.transfers = bundles;

            // Get the correct balance count of all addresses
            self.getBalances(valuesToReturn.addresses, 100, function(error, balances) {

                if (error) return callback(error);

                balances.balances.forEach(function(balance, index) {

                    var balance = parseInt(balance);

                    valuesToReturn.balance += balance;

                    if (balance > 0) {

                        var newInput = {
                            'address': valuesToReturn.addresses[index],
                            'keyIndex': index,
                            'security': security,
                            'balance': balance
                        }

                        valuesToReturn.inputs.push(newInput);

                    }
                })

                return callback(null, valuesToReturn);
            })
        })
    })
}

/**
*   Determines whether you should replay a transaction
*   or make a new one (either with the same input, or a different one)
*
*   @method isReattachable
*   @param {String || Array} inputAddresses Input address you want to have tested
*   @returns {Bool}
**/
api.prototype.isReattachable = function(inputAddresses, callback) {

    var self = this;

    // if string provided, make array
    if (inputValidator.isString(inputAddresses)) inputAddresses = new Array(inputAddresses)

    // Categorized value transactions
    // hash -> txarray map
    var addressTxsMap = {};
    var addresses = [];

    for (var i = 0; i < inputAddresses.length; i++) {

        var address = inputAddresses[i];

        if (!inputValidator.isAddress(address)) {

            return callback(errors.invalidInputs());

        }

        var address = Utils.noChecksum(address);

        addressTxsMap[address] = new Array();
        addresses.push(address);
    }

    self.findTransactionObjects( { 'addresses': addresses }, function( e, transactions ) {

        if (e) return callback(e);


        var valueTransactions = [];

        transactions.forEach(function(thisTransaction) {

            if (thisTransaction.value < 0) {

                var txAddress = thisTransaction.address;
                var txHash = thisTransaction.hash;

                // push hash to map
                addressTxsMap[txAddress].push(txHash)

                valueTransactions.push(txHash);

            }
        })

        if ( valueTransactions.length > 0 ) {

            // get the includion states of all the transactions
            self.getLatestInclusion( valueTransactions, function( e, inclusionStates ) {

                // bool array
                var results = addresses.map(function(address) {

                    var txs = addressTxsMap[address];
                    var numTxs = txs.length;

                    if (numTxs === 0) {
                        return true;
                    }

                    var shouldReattach = true;

                    for (var i = 0; i < numTxs; i++) {

                        var tx = txs[i];

                        var txIndex = valueTransactions.indexOf(tx);
                        var isConfirmed = inclusionStates[txIndex];
                        shouldReattach = isConfirmed ? false : true;

                        // if tx confirmed, break
                        if (isConfirmed)
                            break;
                    }


                    return shouldReattach;

                })

                // If only one entry, return first
                if (results.length === 1) {
                    results = results[0];
                }

                return callback(null, results);

            })

        } else {

            var results = [];
            var numAddresses = addresses.length;

            // prepare results array if multiple addresses
            if ( numAddresses > 1 ) {

                for ( var i = 0; i < numAddresses; i++ ) {
                    results.push(true);
                }

            } else {
                results = true;
            }

            return callback(null, results);
        }
    })
}

/*
 * Wraps {checkConsistency} in a promise so that its value is returned
 */
api.prototype.isPromotable = function(tail) {
    var self = this;

    // Check if is hash
    if (!inputValidator.isHash(tail)) {
        return false;
    }

    var command = apiCommands.checkConsistency([tail]);

    var promise = new Promise(function(res, rej) {
        self.sendCommand(command, function(err, isConsistent) {
            if (err) {
              rej(err)
            }
            res(isConsistent.state);
        });
    });
    return promise.then(function(val) {
        return val;
    });
}

module.exports = api;

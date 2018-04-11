/**
*   @method attachToTangle
*   @param {string} trunkTransaction
*   @param {string} branchTransaction
*   @param {integer} minWeightMagnitude
*   @param {array} trytes
*   @returns {object} command
**/
var attachToTangle = function(trunkTransaction, branchTransaction, minWeightMagnitude, trytes) {

    var command = {
        'command'             : 'attachToTangle',
        'trunkTransaction'    : trunkTransaction,
        'branchTransaction'   : branchTransaction,
        'minWeightMagnitude'  : minWeightMagnitude,
        'trytes'              : trytes
    }

    return command;
}

/**
*   @method findTransactions
*   @param {object} searchValues Can be bundles, addresses, tags and approvees
*   @returns {object} command
**/
var findTransactions = function(searchValues) {

    var command = {
        'command' : 'findTransactions'
    }

    var validSearchKeys = ['bundles', 'addresses', 'tags', 'approvees'];

    var searchKey = Object.keys(searchValues);

    searchKey.forEach(function(key) {
        if (validSearchKeys.indexOf(key) > -1) {
            command[key] = searchValues[key];
        }
    })

    return command;
}

/**
*   @method getBalances
*   @param {array} addresses
*   @param {int} threshold
*   @returns {object} command
**/
var getBalances = function(addresses, threshold) {

    var command = {
        'command'    : 'getBalances',
        'addresses'  : addresses,
        'threshold'  : threshold
    }

    return command;
}

/**
*   @method getInclusionStates
*   @param {array} transactions
*   @param {array} tips
*   @returns {object} command
**/
var getInclusionStates = function(transactions, tips) {

    var command = {
        'command'       : 'getInclusionStates',
        'transactions'  : transactions,
        'tips'          : tips
    }

    return command;
}

/**
*   @method getNodeInfo
*   @returns {object} command
**/
var getNodeInfo = function() {

    var command = {
        'command' : 'getNodeInfo'
    }

    return command;
}

/**
*   @method getNeighbors
*   @returns {object} command
**/
var getNeighbors = function() {

    var command = {
        'command' : 'getNeighbors'
    }

    return command;
}

/**
*   @method addNeighbors
*   @param {Array} uris
*   @returns {object} command
**/
var addNeighbors = function(uris) {

    var command = {
        'command' : 'addNeighbors',
        'uris'    : uris
    }

    return command;
}

/**
*   @method removeNeighbors
*   @param {Array} uris
*   @returns {object} command
**/
var removeNeighbors = function(uris) {

    var command = {
        'command' : 'removeNeighbors',
        'uris'    : uris
    }

    return command;
}

/**
*   @method getTips
*   @returns {object} command
**/
var getTips = function() {

    var command = {
        'command' : 'getTips'
    }

    return command;
}

/**
*   @method getTransactionsToApprove
*   @param {int} depth
*   @returns {object} command
**/
var getTransactionsToApprove = function(depth, reference) {

    var command = {
        'command'   : 'getTransactionsToApprove',
        'depth'     : depth,
    }

    if (reference != undefined) {
      command.reference = reference;
    }

    return command;
}

/**
*   @method getTrytes
*   @param {array} hashes
*   @returns {object} command
**/
var getTrytes = function(hashes) {

    var command = {
        'command' :'getTrytes',
        'hashes'  : hashes
    }

    return command;
}

/**
*   @method interruptAttachingToTangle
*   @returns {object} command
**/
var interruptAttachingToTangle = function() {

    var command = {
        'command' : 'interruptAttachingToTangle'
    }

    return command;
}

/**
*   @method broadcastTransactions
*   @param {array} trytes
*   @returns {object} command
**/
var broadcastTransactions = function(trytes) {

    var command = {
        'command' : 'broadcastTransactions',
        'trytes'  : trytes
    }

    return command;
}

/**
*   @method storeTransactions
*   @param {array} trytes
*   @returns {object} command
**/
var storeTransactions = function(trytes) {

    var command = {
        'command' : 'storeTransactions',
        'trytes'  : trytes
    }

    return command;
}

/**
*   @method returns whether the given tail is consistent
*   @param {string} tail bundle tail hash
*   @returns {object} command
*/
var checkConsistency = function(hashes) {

    var command = {
        'command' : 'checkConsistency',
        'tails'    : hashes
    };

    return command;
}

/**
*   @method wereAddressesSpentFrom
*   @param {array} addresses Addresses to check
*   @returns {object} command
*/
var wereAddressesSpentFrom = function (addresses) {

    var command = {
        'command': 'wereAddressesSpentFrom',
        'addresses': addresses
    }

    return command
}

module.exports = {
    attachToTangle              : attachToTangle,
    findTransactions            : findTransactions,
    getBalances                 : getBalances,
    getInclusionStates          : getInclusionStates,
    getNodeInfo                 : getNodeInfo,
    getNeighbors                : getNeighbors,
    addNeighbors                : addNeighbors,
    removeNeighbors             : removeNeighbors,
    getTips                     : getTips,
    getTransactionsToApprove    : getTransactionsToApprove,
    getTrytes                   : getTrytes,
    interruptAttachingToTangle  : interruptAttachingToTangle,
    checkConsistency            : checkConsistency,
    broadcastTransactions       : broadcastTransactions,
    storeTransactions           : storeTransactions,
    wereAddressesSpentFrom      : wereAddressesSpentFrom
}

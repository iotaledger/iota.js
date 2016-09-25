/**
  *   @method analyzeTransactions
  *   @param {list} trytes
  *   @returns {object} command
**/
var analyzeTransactions = function(trytes) {

  var command = {
    'command' : 'analyzeTransactions',
    'trytes'  : trytes
  }

  return command;
}

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
  *   @param {object} searchValues
  *   @returns {object} command
**/
var findTransactions = function(searchValues) {

  var command = {
    'command' : 'findTransactions'
  }

  var searchKey = Object.keys(searchValues);

  searchKey.forEach(function(key) {
    command[key] = searchValues[key];
  })

  return command;
}

/**
  *   @method getBundle
  *   @param {string} transaction Tail transaction hash of a bundle
  *   @returns {object} command
**/
var getBundle = function(transaction) {

  var command = {
    'command'     : 'getBundle',
    'transaction' : transaction
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
  *   @method getMilestone
  *   @param {integer} milestoneIndex
  *   @returns {object} command
**/
var getMilestone = function(milestoneIndex) {

  var command = {
    'command' : 'getMilestone',
    'index'   : milestoneIndex
  }

  return command;
}

/**
  *   @method getNewAddress
  *   @param {string} seed
  *   @param {integer} securityLevel
  *   @returns {object} command
**/
var getNewAddress = function(seed, securityLevel) {

  var command = {
    'command'       : 'getNewAddress',
    'seed'          : seed,
    'securityLevel' : securityLevel
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
  *   @method getPeers
  *   @returns {object} command
**/
var getPeers = function() {

  var command = {
    'command' : 'getPeers'
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
  *   @param {string} milestone
  *   @returns {object} command
**/
var getTransactionsToApprove = function(milestone) {

  var command = {
    'command'   : 'getTransactionsToApprove',
    'milestone' : milestone
  }

  return command;
}

/**
  *   @method getTransfers
  *   @param {string} seed
  *   @param {integer} securityLevel
  *   @returns {object} command
**/
var getTransfers = function(seed, securityLevel) {

  var command = {
    'command'       : 'getTransfers',
    'seed'          : seed,
    'securityLevel' : securityLevel
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
  *   @method prepareTransfers
  *   @param {string} seed
  *   @param {integer} securityLevel
  *   @param {array} transfers
  *   @returns {object} command
**/
var prepareTransfers = function(seed, securityLevel, transfers) {

  var command = {
    'command'       : 'prepareTransfers',
    'seed'          : seed,
    'securityLevel' : securityLevel,
    'transfers'     : transfers
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
  *   @method replayTransfer
  *   @param {string} transaction
  *   @param {object} command
**/
var replayTransfer = function(transaction) {

  var command = {
    'command'     : 'replayTransfer',
    'transaction' : transaction
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
  *
  *
**/
// var transfer = function(seed, address, value, message, securityLevel, minWeightMagnitude) {
//
//   var command = {
//     'command': 'transfer',
//     'seed': seed,
//     'address': address,
//     'value': value,
//     'message': message,
//     'securityLevel': securityLevel,
//     'minWeightMagnitude': minWeightMagnitude
//   }
//
//   return command;
// }

module.exports = {
  analyzeTransactions: analyzeTransactions,
  attachToTangle: attachToTangle,
  findTransactions: findTransactions,
  getBundle: getBundle,
  getInclusionStates: getInclusionStates,
  getMilestone: getMilestone,
  getNewAddress: getNewAddress,
  getNodeInfo: getNodeInfo,
  getPeers: getPeers,
  getTips: getTips,
  getTransactionsToApprove: getTransactionsToApprove,
  getTransfers: getTransfers,
  getTrytes: getTrytes,
  interruptAttachingToTangle: interruptAttachingToTangle,
  prepareTransfers: prepareTransfers,
  broadcastTransactions: broadcastTransactions,
  replayTransfer: replayTransfer,
  storeTransactions: storeTransactions
}

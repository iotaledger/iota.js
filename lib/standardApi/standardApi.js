var errors = require('./errors');
var inputValidator = require('./inputValidator');


/**
  *   @method analyzeTransactions
  *   @param {list} trytes
  *   @returns {object} command
**/
var analyzeTransactions = function(trytes) {

  // inputValidator: Check if array of correct tryte values
  if (!inputValidator.isArrayOfTrytes(trytes)) {
    throw errors.invalidTrytes();
  }

  var command = {
    'command': 'analyzeTransactions',
    'trytes': trytes
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

  var command = {
    'command': 'attachToTangle',
    'trunkTransaction': trunkTransaction,
    'branchTransaction': branchTransaction,
    'minWeightMagnitude': minWeightMagnitude,
    'trytes': trytes
  }

  return command;
}

/**
  *   @method findTransactions
  *   @param {object} searchValues
  *   @returns {object} command
**/
var findTransactions = function(searchValues) {

  // Get search key from input object
  var searchKey = Object.getKey(searchValues)[0];

  var availableKeys = ['bundles', 'addresses', 'digests', 'approvees'];

  if (availableKeys.indexOf(searchKey) === -1) {

    throw errors.invalidKey();
  }

  var hashes = searchValues[searchKey];

  if (!inputValidator.isArrayOfHashes(hashes)) {

    throw errors.invalidTrytes();
  }

  var command = {
    'command': 'findTransactions'
  }

  command[searchKey] = hashes;

  return command;
}

/**
  *   @method getBundle
  *   @param {string} transaction Tail transaction hash of a bundle
  *   @returns {object} command
**/
var getBundle = function(transaction) {

  // TODO: FIGURE OUT AWAY TO CHECK IF TRAIL TRANSACTION

  var command = {
    'command': 'getBundle',
    'transaction': transaction
  }

  return command;
}

/**
  *
  *
**/
var getInclusionStates = function(transactions, tips) {

  var command = {
    'command': 'getInclusionStates',
    'transactions': transactions,
    'tips': tips
  }

  return command;
}

/**
  *
  *
**/
var getMilestone = function(milestoneIndex) {

  var command = {
    'command': 'getMilestone',
    'index': milestoneIndex
  }

  return command;
}

/**
  *
  *
**/
var getNewAddress = function(seed, securityLevel) {

  var command = {
    'command': 'getNewAddress',
    'seed': seed,
    'securityLevel': securityLevel
  }

  return command;
}

/**
  *
  *
**/
var getNodeInfo = function() {

  var command = {
    'command': 'getNodeInfo'
  }

  return command;
}

/**
  *
  *
**/
var getPeers = function() {

  var command = {
    'command': 'getPeers'
  }

  return command;
}

/**
  *
  *
**/
var getTips = function() {

  var command = {
    'command': 'getTips'
  }

  return command;
}

/**
  *
  *
**/
var getTransactionsToApprove = function(milestone) {

  var command = {
    'command': 'getTransactionsToApprove',
    'milestone': milestone
  }

  return command;
}

/**
  *
  *
**/
var getTransfers = function(seed, securityLevel) {

  var command = {
    'command': 'getTransfers',
    'seed': seed,
    'securityLevel': securityLevel
  }

  return command;
}

/**
  *
  *
**/
var getTrytes = function(hashes) {

  var command = {
    'command':'getTrytes',
    'hashes': hashes
  }

  return command;
}

/**
  *
  *
**/
var interruptAttachingToTangle = function() {

  var command = {
    'command': 'interruptAttachingToTangle'
  }

  return command;
}

/**
  *
  *
**/
var prepareTransfers = function(seed, securityLevel, transfers) {

  var command = {
    'command': 'prepareTransfers',
    'seed': seed,
    'securityLevel': securityLevel,
    'transfers': transfers
  }

  return command;
}

/**
  *
  *
**/
var pushTransactions = function(trytes) {

  var command = {
    'command': 'pushTransactions',
    'trytes': trytes
  }

  return command;
}

/**
  *
  *
**/
var pullTransactions = function(trytes) {

  var command = {
    'command': 'pullTransactions',
    'trytes': trytes
  }

  return command;
}

/**
  *
  *
**/
var replayTransfer = function(transaction) {

  var command = {
    'command': 'replayTransfer',
    'transaction': transaction
  }

  return command;
}

/**
  *
  *
**/
var storeTransactions = function(trytes) {

  var command = {
    'command': 'storeTransactions',
    'trytes': trytes
  }

  return command;
}

/**
  *
  *
**/
var transfer = function(seed, address, value, message, securityLevel, minWeightMagnitude) {

  var command = {
    'command': 'transfer',
    'seed': seed,
    'address': address,
    'value': value,
    'message': message,
    'securityLevel': securityLevel,
    'minWeightMagnitude': minWeightMagnitude
  }

  return command;
}

module.exports = {
  analyzeTransactions: analyzeTransactions,
  attachToTangle: attachToTangle,
  findTransactions: findTransactions,
  getBundle: getBundle,
  getInclusionStates: getInclusionStates,
  getMilestone: getMilestone,
  getNewAddress: getNewAddress,
  getPeers: getPeers,
  getTips: getTips,
  getTransactionsToApprove: getTransactionsToApprove,
  getTransfers: getTransfers,
  getTrytes: getTrytes,
  interruptAttachingToTangle: interruptAttachingToTangle,
  prepareTransfers: prepareTransfers,
  pushTransactions: pushTransactions,
  pullTransactions: pullTransactions,
  replayTransfer: replayTransfer,
  storeTransactions: storeTransactions,
  transfer: transfer
}

var errors = require('../utils/inputErrors');
var inputValidator = require('../utils/inputValidator');


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

  if (!inputValidator.isHash(transaction)) {

    throw errors.invalidTrytes();
  }

  var command = {
    'command': 'getBundle',
    'transaction': transaction
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

  // Check if correct transaction hashes
  if (!inputValidator.isArrayOfHashes(transactions)) {

    throw errors.invalidTrytes();
  }

  // Check if correct tips
  if (!inputValidator.isArrayOfHashes(tips)) {

    throw errors.invalidTrytes();
  }

  var command = {
    'command': 'getInclusionStates',
    'transactions': transactions,
    'tips': tips
  }

  return command;
}

/**
  *   @method getMilestone
  *   @param {integer} milestoneIndex
  *   @returns {object} command
**/
var getMilestone = function(milestoneIndex) {

  if (!inputValidator.isInt(milestoneIndex)) {

    throw errors.notInt();
  }

  var command = {
    'command': 'getMilestone',
    'index': milestoneIndex
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

  // Check if correct trytes
  if (!inputValidator.isHash(seed)) {

    throw errors.invalidTrytes();
  }

  // Check if int
  if (!inputValidator.isInt(securityLevel)) {

    throw errors.notInt();
  }

  var command = {
    'command': 'getNewAddress',
    'seed': seed,
    'securityLevel': securityLevel
  }

  return command;
}

/**
  *   @method getNodeInfo
  *   @returns {object} command
**/
var getNodeInfo = function() {

  var command = {
    'command': 'getNodeInfo'
  }

  return command;
}

/**
  *   @method getPeers
  *   @returns {object} command
**/
var getPeers = function() {

  var command = {
    'command': 'getPeers'
  }

  return command;
}

/**
  *   @method getTips
  *   @returns {object} command
**/
var getTips = function() {

  var command = {
    'command': 'getTips'
  }

  return command;
}

/**
  *   @method getTransactionsToApprove
  *   @param {string} milestone
  *   @returns {object} command
**/
var getTransactionsToApprove = function(milestone) {

  if (!inputValidator.isHash(milestone)) {

    throw errors.invalidTrytes();
  }

  var command = {
    'command': 'getTransactionsToApprove',
    'milestone': milestone
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

  // Check if correct trytes
  if (!inputValidator.isHash(seed)) {

    throw errors.invalidTrytes();
  }

  // Check if int
  if (!inputValidator.isInt(securityLevel)) {

    throw errors.notInt();
  }

  var command = {
    'command': 'getTransfers',
    'seed': seed,
    'securityLevel': securityLevel
  }

  return command;
}

/**
  *   @method getTrytes
  *   @param {array} hashes
  *   @returns {object} command
**/
var getTrytes = function(hashes) {

  if (!inputValidator.isArrayOfHashes(hashes)) {

    throw errors.invalidTrytes();
  }

  var command = {
    'command':'getTrytes',
    'hashes': hashes
  }

  return command;
}

/**
  *   @method interruptAttachingToTangle
  *   @returns {object} command
**/
var interruptAttachingToTangle = function() {

  var command = {
    'command': 'interruptAttachingToTangle'
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

  var command = {
    'command': 'prepareTransfers',
    'seed': seed,
    'securityLevel': securityLevel,
    'transfers': transfers
  }

  return command;
}

/**
  *   @method pushTransactions
  *   @param {array} trytes
  *   @returns {object} command
**/
var pushTransactions = function(trytes) {

  if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {

    throw errors.invalidAttachedTrytes();
  }

  var command = {
    'command': 'pushTransactions',
    'trytes': trytes
  }

  return command;
}

/**
  *   @method pushTransactions
  *   @param {array} trytes
  *   @returns {object} command
**/
var pullTransactions = function(trytes) {

  if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {

    throw errors.invalidAttachedTrytes();
  }

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

  if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {

    throw errors.invalidAttachedTrytes();
  }

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

  if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {

    throw errors.invalidAttachedTrytes();
  }

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
  storeTransactions: storeTransactions
}

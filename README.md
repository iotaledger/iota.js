Question:
  - Should the API library return lists or should it always be objects?
  - Customizeable API calls (e.g. getBundle for transaction, transactions and bundles)

To Test:
  - multi entry bundles
  - Remove hardcoded value of 2 for signing and addresses 






# IOTA Javascript LIBRARY

Early development, please check in a few days again


getNodeInfo
getMilestone
getPeers
getTips
getTransfers
findTransactions
getInclusionStates
getBundle
getTrytes
analyzeTransactions
getNewAddress
prepareTransfers
getTransactionsToApprove
attachToTangle
interruptAttachingToTangle
pushTransactions
storeTransactions
transfer
replayTransfer
pullTransactions


prepareHttpCall
prepareRequest


prepareRequest -> prepareHttpCall -> makeHttpCall
^
wrappers

First do prepareHttpCall


UNIT CONVERTER:
  - Make it possible to send with terms such as "1Gi"



new IOTA()
  input: settings {host, port, }

generateAddress
  input: {seed, securityLevel, checksum (true/false)}
  return: {address}

sendTransaction
  input: {
    seed,
    securityLevel,
    value,
    message: {
      toTrytes: true/false,
      message: value
    }
  }

readMessage
  input: {transaction || address || bundle}

analyzeTransactions
  Do it with just the hash of a tx? i.e. getTrytes then analyze

better Replay

#####

HELPER FUNCTIONS

#####

getChecksum
  input: {address}
  return: {checksum}

validateTrytes
  input: trytes
  output: true or error message

toTrytes
  input: {string}
  return: trytes encoded string

fromTrytes
  input: {trytes}
  return: string

getBundle
  - transaction hash
  - transaction hashes
  - bundle hash

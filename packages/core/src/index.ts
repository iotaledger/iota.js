/** @module core */

// IRI commands
export {
    Address,
    Transfer,
    Bundle,
    Transaction,
    Inputs,
    Balance,
    Neighbor,
    Neighbors,
    BaseCommand,
    IRICommand,
    AttachToTangle,
    Callback,
    Provider,
    AddNeighborsCommand,
    AddNeighborsResponse,
    AttachToTangleCommand,
    AttachToTangleResponse,
    BroadcastTransactionsCommand,
    BroadcastTransactionsResponse,
    CheckConsistencyCommand,
    CheckConsistencyResponse,
    FindTransactionsQuery,
    FindTransactionsCommand,
    FindTransactionsResponse,
    GetBalancesCommand,
    GetBalancesResponse,
    Balances,
    GetInclusionStatesCommand,
    GetInclusionStatesResponse,
    GetNeighborsCommand,
    GetNeighborsResponse,
    GetNodeInfoCommand,
    GetNodeInfoResponse,
    GetTipsCommand,
    GetTipsResponse,
    GetTransactionsToApproveCommand,
    GetTransactionsToApproveResponse,
    TransactionsToApprove,
    GetTrytesCommand,
    GetTrytesResponse,
    InterruptAttachingToTangleCommand,
    InterruptAttachingToTangleResponse,
    RemoveNeighborsCommand,
    RemoveNeighborsResponse,
    StoreTransactionsCommand,
    StoreTransactionsResponse,
} from '../../types'

export { createAddNeighbors } from './createAddNeighbors'

export { createAttachToTangle } from './createAttachToTangle'

export { createBroadcastTransactions } from './createBroadcastTransactions'

export { createCheckConsistency, CheckConsistencyOptions } from './createCheckConsistency'

export { createFindTransactions } from './createFindTransactions'

export { createGetBalances } from './createGetBalances'

export { createGetInclusionStates } from './createGetInclusionStates'

export { createGetNeighbors } from './createGetNeighbors'

export { createGetNodeInfo } from './createGetNodeInfo'

export { createGetTips } from './createGetTips'

export { createGetTransactionsToApprove } from './createGetTransactionsToApprove'

export { createGetTrytes } from './createGetTrytes'

export { createInterruptAttachingToTangle } from './createInterruptAttachingToTangle'

export { createRemoveNeighbors } from './createRemoveNeighbors'

export { createStoreTransactions } from './createStoreTransactions'

// `wereAddressesSpentFrom` command is a temporary measure to prevent loss of funds,
// when security assumptions are ignored by developers or wallet users.
// It's being used internally by `getNewAddress()`.
// Avoid developing programs that rely on this method.
//
// export {
//     createWereAddressesSpentFrom,
//     WereAddressesSpentFromCommand,
//     WereAddressesSpentFromResponse
// } from './createWereAddressesSpentFrom'

// Wrappers
export { createBroadcastBundle } from './createBroadcastBundle'

export { createFindTransactionObjects } from './createFindTransactionObjects'

export { createGetAccountData, GetAccountDataOptions, AccountData } from './createGetAccountData'

export { createGetBundle } from './createGetBundle'

// `getBundlesFromAddress` has been deprecated because of its poor performance.
// Traversing and validating bundles gets slower as bundle instances increase.
// Use `findTransactionObjects` on `addresses` and lazily fetch the bundles when needed.
//
export { createGetBundlesFromAddresses } from './createGetBundlesFromAddresses'

export { createGetInputs, GetInputsOptions } from './createGetInputs'

export { createGetLatestInclusion } from './createGetLatestInclusion'

export {
    createGetNewAddress,
    // createGetUntilFirstUnusedAddress,
    createIsAddressUsed,
    GetNewAddressOptions,
} from './createGetNewAddress'

export { createGetTransactionObjects } from './createGetTransactionObjects'

// `getTransfers` has been deprecated because of poor performance (regenerates addresses
// and calls `getBundlesFromAddresses`).
// Use `findTransactionObjects` as replacement and prefer to lazily fetch complete bundles,
// if and when required.
//
// export {
//     createGetTransfers,
//     getTransfersOptions,
//     GetTransfersOptions
// } from './createGetTransfers'

export { isAboveMaxDepth, createIsPromotable } from './createIsPromotable'

export { createIsReattachable } from './createIsReattachable'

export { createPromoteTransaction, PromoteTransactionOptions } from './createPromoteTransaction'

export { createReplayBundle } from './createReplayBundle'

export { createSendTrytes } from './createSendTrytes'

export { createPrepareTransfers, PrepareTransfersOptions } from './createPrepareTransfers'

export { createStoreAndBroadcast } from './createStoreAndBroadcast'

export { createTraverseBundle } from './createTraverseBundle'

export { generateAddress } from './generateAddress'

// Errors
import * as errors from '../../errors'
export { errors }

// export api factory with default provider
export { API, composeAPI, Settings } from './composeAPI'

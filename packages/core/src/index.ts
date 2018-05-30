// IRI commands
export {
    createAddNeighbors,
    AddNeighborsCommand,
    AddNeighborsResponse
} from './createAddNeighbors'

export {
    createAttachToTangle,
    AttachToTangleCommand,
    AttachToTangleResponse
} from './createAttachToTangle'

export {
    createBroadcastTransactions,
    BroadcastTransactionsCommand,
    BroadcastTransactionsResponse
} from './createBroadcastTransactions'

export {
    createCheckConsistency,
    CheckConsistencyCommand,
    CheckConsistencyResponse
} from './createCheckConsistency'

export {
    createFindTransactions,
    FindTransactionsQuery,
    FindTransactionsCommand,
    FindTransactionsResponse
} from './createFindTransactions'

export {
    createGetBalances,
    GetBalancesCommand,
    GetBalancesResponse
} from './createGetBalances'

export {
    createGetInclusionStates,
    GetInclusionStatesCommand,
    GetInclusionStatesResponse
} from './createGetInclusionStates'

export {
    createGetNeighbors,
    GetNeighborsCommand,
    GetNeighborsResponse
} from './createGetNeighbors'

export {
    createGetNodeInfo,
    GetNodeInfoCommand,
    GetNodeInfoResponse
} from './createGetNodeInfo'

export {
    createGetTips,
    GetTipsCommand,
    GetTipsResponse
} from './createGetTips'

export {
    createGetTransactionsToApprove,
    GetTransactionsToApproveCommand,
    GetTransactionsToApproveResponse
} from './createGetTransactionsToApprove'

export {
    createGetTrytes,
    GetTrytesCommand,
    GetTrytesResponse
} from './createGetTrytes'

export {
    createInterruptAttachingToTangle,
    InterruptAttachingToTangleCommand,
    InterruptAttachingToTangleResponse
} from './createInterruptAttachingToTangle'

export {
    createRemoveNeighbors,
    RemoveNeighborsCommand,
    RemoveNeighborsResponse
} from './createRemoveNeighbors'

export {
    createStoreTransactions,
    StoreTransactionsCommand,
    StoreTransactionsResponse
} from './createStoreTransactions'

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

export {
    createGetAccountData,
    GetAccountDataOptions,
    AccountData
} from './createGetAccountData'

export { createGetBundle } from './createGetBundle'

// `getBundlesFromAddress` has been deprecated because of its poor performance.
// Traversing and validating bundles gets slower as bundle instances increase.
// Use `findTransactionObjects` on `addresses` and lazily fetch the bundles when needed.
//
// export { createGetBundlesFromAddresses } from './createGetBundlesFromAddresses'

export {
    createGetInputs,
    GetInputsOptions
} from './createGetInputs'

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

export {
    createPromoteTransaction,
    PromoteTransactionOptions
} from './createPromoteTransaction'

export { createReplayBundle } from './createReplayBundle'

export { createSendTrytes, SendTrytesOptions } from './createSendTrytes'

export { createPrepareTransfers, PrepareTransfersOptions } from './createPrepareTransfers'

export { createStoreAndBroadcast } from './createStoreAndBroadcast'

export { createTraverseBundle } from './createTraverseBundle'

export { generateAddress } from './generateAddress'

// Types
export * from './types'

// Errors
import * as errors from './errors'
export { errors }

// export api factory with default provider
export { API, composeAPI as default, Settings } from './composeAPI'
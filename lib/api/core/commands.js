import {
    AddNeighborsCommand,
    AttachToTangleCommand,
    BroadcastTransactionsCommand,
    CheckConsistencyCommand,
    FindTransactionsCommand,
    FindTransactionsQuery,
    GetBalancesCommand,
    GetInclusionStatesCommand,
    GetNeighborsCommand,
    GetNodeInfoCommand,
    GetTipsCommand,
    GetTransactionsToApproveCommand,
    GetTrytesCommand,
    InterruptAttachingToTangleCommand,
    IRICommand,
    RemoveNeighborsCommand,
    StoreTransactionsCommand,
} from './types/commands'

/**
 *   @method attachToTangle
 *   @param {string} trunkTransaction
 *   @param {string} branchTransaction
 *   @param {integer} minWeightMagnitude
 *   @param {array} trytes
 *   @returns {object} command
 **/
export const attachToTangle = (
    trunkTransaction: string,
    branchTransaction: string,
    minWeightMagnitude: number,
    trytes: string[]
): AttachToTangleCommand => ({
    command: IRICommand.ATTACH_TO_TANGLE,
    trunkTransaction,
    branchTransaction,
    minWeightMagnitude,
    trytes,
})

/**
 *   @method findTransactions
 *   @param {object} query Can be bundles, addresses, tags and approvees
 *   @returns {object} command
 **/
export const findTransactions = (query: FindTransactionsSearchValues): FindTransactionsCommand => ({
    command: IRICommand.FIND_TRANSACTIONS,
    ...query
})

/**
 *   @method getBalances
 *   @param {array} addresses
 *   @param {int} threshold
 *   @returns {object} command
 **/
export const getBalances = (addresses: string[], threshold: number): GetBalancesCommand => ({
    command: IRICommand.GET_BALANCES,
    addresses,
    threshold,
})

/**
 *   @method getInclusionStates
 *   @param {array} transactions
 *   @param {array} tips
 *   @returns {object} command
 **/
export const getInclusionStates = (transactions: string[], tips: string[]): GetInclusionStatesCommand => ({
    command: IRICommand.GET_INCLUSION_STATES,
    transactions,
    tips,
})

/**
 *   @method getNodeInfo
 *   @returns {object} command
 **/
export const getNodeInfo = (): GetNodeInfoCommand => ({
    command: IRICommand.GET_NODE_INFO
})

/**
 *   @method getNeighbors
 *   @returns {object} command
 **/
export const getNeighbors = (): GetNeighborsCommand => ({
    command: IRICommand.GET_NEIGHBORS
})

/**
 *   @method addNeighbors
 *   @param {Array} uris
 *   @returns {object} command
 **/
export const addNeighbors = (uris: string[]): AddNeighborsCommand => ({
    command: IRICommand.ADD_NEIGHBORS,
    uris,
})

/**
 *   @method removeNeighbors
 *   @param {Array} uris
 *   @returns {object} command
 **/
export const removeNeighbors = (uris: string[]): RemoveNeighborsCommand => ({
    command: IRICommand.REMOVE_NEIGHBORS,
    uris,
})

/**
 *   @method getTips
 *   @returns {object} command
 **/
export const getTips = (): GetTipsCommand => ({ command: IRICommand.GET_TIPS })

/**
 *   @method getTransactionsToApprove
 *   @param {int} depth
 *   @param {string?} reference
 *   @returns {object} command
 **/
export const getTransactionsToApprove = (depth: number, reference?: string): GetTransactionsToApproveCommand => {
    const command: GetTransactionsToApproveCommand = {
        command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
        depth,
    }

    if (reference && reference.length > 0) {
        command.reference = reference
    }

    return command
}

/**
 *   @method getTrytes
 *   @param {array} hashes
 *   @returns {object} command
 **/
export const getTrytes = (hashes: string[]): GetTrytesCommand => ({
    command: IRICommand.GET_TRYTES,
    hashes,
})

/**
 *   @method interruptAttachingToTangle
 *   @returns {object} command
 **/
export const interruptAttachingToTangle = (): InterruptAttachingToTangleCommand => ({
    command: IRICommand.INTERRUPT_ATTACHING_TO_TANGLE,
})

/**
 *   @method broadcastTransactions
 *   @param {array} trytes
 *   @returns {object} command
 **/
export const broadcastTransactions = (trytes: string[]): BroadcastTransactionsCommand => ({
    command: IRICommand.BROADCAST_TRANSACTIONS,
    trytes,
})

/**
 *   @method storeTransactions
 *   @param {array} trytes
 *   @returns {object} command
 **/
export const storeTransactions = (trytes: string[]): StoreTransactionsCommand => ({
    command: IRICommand.STORE_TRANSACTIONS,
    trytes,
})

/**
 * @method  returns whether the given tail is consistent
 * @param tail bundle tail hash
 * @returns   {object} command
 */
export const checkConsistency = (tails: string[]): CheckConsistencyCommand => ({
    command: IRICommand.CHECK_CONSISTENCY,
    tails,
})

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
} from '../types/commands'

/**
 *   @method attachToTangleCommand
 *   @param {string} trunkTransaction
 *   @param {string} branchTransaction
 *   @param {integer} minWeightMagnitude
 *   @param {array} trytes
 *   @returns {object} command
 **/
export const attachToTangleCommand = (
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
 *   @method findTransactionsCommand
 *   @param {object} query Can be bundles, addresses, tags and approvees
 *   @returns {object} command
 **/
export const findTransactionsCommand = (query: FindTransactionsQuery): FindTransactionsCommand => ({
    command: IRICommand.FIND_TRANSACTIONS,
    ...query
})

/**
 *   @method getBalancesCommand
 *   @param {array} addresses
 *   @param {int} threshold
 *   @returns {object} command
 **/
export const getBalancesCommand = (addresses: string[], threshold: number): GetBalancesCommand => ({
    command: IRICommand.GET_BALANCES,
    addresses,
    threshold,
})

/**
 *   @method getInclusionStatesCommand
 *   @param {array} transactions
 *   @param {array} tips
 *   @returns {object} command
 **/
export const getInclusionStatesCommand = (transactions: string[], tips: string[]): GetInclusionStatesCommand => ({
    command: IRICommand.GET_INCLUSION_STATES,
    transactions,
    tips,
})

/**
 *   @method getNodeInfoCommand
 *   @returns {object} command
 **/
export const getNodeInfo = (): GetNodeInfoCommand => ({
    command: IRICommand.GET_NODE_INFO
})

/**
 *   @method getNeighborsCommand
 *   @returns {object} command
 **/
export const getNeighborsCommand = (): GetNeighborsCommand => ({
    command: IRICommand.GET_NEIGHBORS
})

/**
 *   @method addNeighborsCommand
 *   @param {Array} uris
 *   @returns {object} command
 **/
export const addNeighborsCommand = (uris: string[]): AddNeighborsCommand => ({
    command: IRICommand.ADD_NEIGHBORS,
    uris,
})

/**
 *   @method removeNeighborsCommand
 *   @param {Array} uris
 *   @returns {object} command
 **/
export const removeNeighborsCommand = (uris: string[]): RemoveNeighborsCommand => ({
    command: IRICommand.REMOVE_NEIGHBORS,
    uris,
})

/**
 *   @method getTipsCommand
 *   @returns {object} command
 **/
export const getTipsCommand = (): GetTipsCommand => ({ command: IRICommand.GET_TIPS })

/**
 *   @method getTransactionsToApproveCommand
 *   @param {int} depth
 *   @param {string?} reference
 *   @returns {object} command
 **/
export const getTransactionsToApproveCommand = (depth: number, reference?: string): GetTransactionsToApproveCommand => ({
    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
    depth,
    reference
})

/**
 *   @method getTrytesCommand
 *   @param {array} hashes
 *   @returns {object} command
 **/
export const getTrytesCommand = (hashes: string[]): GetTrytesCommand => ({
    command: IRICommand.GET_TRYTES,
    hashes,
})

/**
 *   @method interruptAttachingToTangleCommand
 *   @returns {object} command
 **/
export const interruptAttachingToTangleCommand = (): InterruptAttachingToTangleCommand => ({
    command: IRICommand.INTERRUPT_ATTACHING_TO_TANGLE,
})

/**
 *   @method broadcastTransactionsCommand
 *   @param {array} trytes
 *   @returns {object} command
 **/
export const broadcastTransactionsCommand = (trytes: string[]): BroadcastTransactionsCommand => ({
    command: IRICommand.BROADCAST_TRANSACTIONS,
    trytes,
})

/**
 *   @method storeTransactionsCommand
 *   @param {array} trytes
 *   @returns {object} command
 **/
export const storeTransactionsCommand = (trytes: string[]): StoreTransactionsCommand => ({
    command: IRICommand.STORE_TRANSACTIONS,
    trytes,
})

/**
 * @method  checkConsistenyCommand whether the given tail is consistent
 * @param   {string} tail 
 * @returns {object} command
 */
export const checkConsistencyCommand = (tails: string[]): CheckConsistencyCommand => ({
    command: IRICommand.CHECK_CONSISTENCY,
    tails,
})

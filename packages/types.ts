import * as Promise from 'bluebird'
export type Maybe<T> = T | void

export type Hash = string
export type Tag = string
export type Trytes = string
export type TransactionTrytes = string
export type AttachedTransactionTrytes = string

export interface Provider {
    send: <C extends BaseCommand, R>(command: C, callback?: Callback<R>) => Promise<R>
    setSettings: <S>(settings?: Partial<S>) => void
}

/* Address object */
export interface Address extends Balance {
    address: Hash
    keyIndex: number
    security: number
}

export const makeAddress = (address: Hash, balance: string, keyIndex: number, security: number): Address => ({
    address,
    keyIndex,
    security,
    balance,
})

export interface Balance {
    balance: string
}

export interface Inputs {
    inputs: Address[]
    totalBalance: number
}

/* Transfer object */
export interface Transfer {
    address: string
    value: number
    message: string
    tag: string
    obsoleteTag?: string
}

/* Transaction object */
export interface Transaction {
    hash: string
    signatureMessageFragment: string
    address: string
    value: number
    obsoleteTag: string
    timestamp: number
    currentIndex: number
    lastIndex: number
    bundle: string
    trunkTransaction: string
    branchTransaction: string
    tag: string
    attachmentTimestamp: number
    attachmentTimestampLowerBound: number
    attachmentTimestampUpperBound: number
    nonce: string
    confirmed?: boolean
}

/* Bundle object */
export type Bundle = Transaction[]

/* Neighbor object */
export interface Neighbor {
    address: string
    numberOfAllTransactions: number
    numberOfInvalidTransactions: number
    numberOfNewTransactions: number
}

/* List of Neighbors object, returned by `getNeighbors()` */
export type Neighbors = Neighbor[]

/* List of IRI Commands */
export enum IRICommand {
    GET_NODE_INFO = 'getNodeInfo',
    GET_NEIGHBORS = 'getNeighbors',
    ADD_NEIGHBORS = 'addNeighbors',
    REMOVE_NEIGHBORS = 'removeNeighbors',
    GET_TIPS = 'getTips',
    FIND_TRANSACTIONS = 'findTransactions',
    GET_TRYTES = 'getTrytes',
    GET_INCLUSION_STATES = 'getInclusionStates',
    GET_BALANCES = 'getBalances',
    GET_TRANSACTIONS_TO_APPROVE = 'getTransactionsToApprove',
    ATTACH_TO_TANGLE = 'attachToTangle',
    INTERRUPT_ATTACHING_TO_TANGLE = 'interruptAttachingToTangle',
    BROADCAST_TRANSACTIONS = 'broadcastTransactions',
    STORE_TRANSACTIONS = 'storeTransactions',
    CHECK_CONSISTENCY = 'checkConsistency',
    WERE_ADDRESSES_SPENT_FROM = 'wereAddressesSpentFrom',
}

/* IRI Command objects extend from this interface */
export interface BaseCommand {
    command: string
}

export interface FindTransactionsQuery {
    addresses?: Hash[]
    approvees?: Hash[]
    bundles?: Hash[]
    tags?: Tag[]
}

export interface FindTransactionsCommand extends BaseCommand, FindTransactionsQuery {
    command: IRICommand.FIND_TRANSACTIONS
}

export interface FindTransactionsResponse {
    hashes: Hash[]
}

export interface GetBalancesCommand extends BaseCommand {
    command: string
    addresses: string[]
    threshold: number
}

export interface GetBalancesResponse {
    balances: string[]
    duration: number
    milestone: string
    milestoneIndex: number
}

export interface GetInclusionStatesCommand extends BaseCommand {
    command: IRICommand.GET_INCLUSION_STATES
    transactions: string[]
    tips: string[]
}

export interface GetTrytesCommand extends BaseCommand {
    command: IRICommand.GET_TRYTES
    hashes: string[]
}

/* Callback */
export type Callback<R = any> = (err: Error | null, res?: R) => void

export type AttachToTangle = (
    trunkTransaction: Hash,
    branchTransaction: Hash,
    minWeightMagnitude: number,
    trytes: Trytes[]
) => Promise<Trytes[]>

export const asArray = <T>(x: T | T[]): T[] => (Array.isArray(x) ? x : [x])

export const getOptionsWithDefaults = <T>(defaults: T) => (options: Partial<T>): T =>
    Object.assign({}, defaults, options) // tslint:disable-line prefer-object-spread
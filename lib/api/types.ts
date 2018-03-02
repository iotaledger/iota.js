import * as Promise from 'bluebird'

import {
    AttachToTangleCommand,
    FindTransactionsCommand,
    FindTransactionsQuery,
    GetBalancesCommand,
    GetBalancesResponse,
    GetInclusionStatesCommand,
    GetNeighborsResponse,
    GetNodeInfoResponse,
    GetTransactionsToApproveResponse,
    GetTrytesCommand,
} from './core'

import {
    AccountData,
    GetAccountDataOptions,
    GetInputsOptions,
    GetNewAddressOptions,
    GetTransfersOptions,
    PromoteTransactionOptions,
} from './extended'

export type Maybe<T> = T | void

export type Hash = string
export type Tag = string
export type Trytes = string

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

export const isBatchableCommand = (command: BaseCommand): command is BatchableCommand =>
    command.command === IRICommand.FIND_TRANSACTIONS ||
    command.command === IRICommand.GET_BALANCES ||
    command.command === IRICommand.GET_INCLUSION_STATES ||
    command.command === IRICommand.GET_TRYTES

export interface MapsToArrays {
    [key: string]: any[]
}

/* Known batchable commands */
export type BatchableCommand = MapsToArrays &
    (FindTransactionsCommand | GetBalancesCommand | GetInclusionStatesCommand | GetTrytesCommand)

/* Keys to batch object */
export interface BatchableKeys {
    [key: string]: string[]
}

type FindTransactionKeys = keyof FindTransactionsCommand
const findTransactionKeys: Array<keyof FindTransactionsCommand> = ['addresses', 'approvees', 'bundles', 'tags']

/** Batchable keys for each command */
export const batchableKeys: BatchableKeys = {
    [IRICommand.FIND_TRANSACTIONS]: ['addresses', 'approvees', 'bundles', 'tags'] as FindTransactionKeys[],
    [IRICommand.GET_BALANCES]: ['addresses'] as Array<keyof GetBalancesCommand>,
    [IRICommand.GET_INCLUSION_STATES]: ['tips', 'transactions'] as Array<keyof GetInclusionStatesCommand>,
    [IRICommand.GET_TRYTES]: ['hashes'] as Array<keyof GetTrytesCommand>,
}

/* IRI Command objects extend from this interface */
export interface BaseCommand {
    command: string
}

/* Connection settings object */
export interface Settings {
    provider?: string
    normalizeOutput?: boolean
}

/* Callback */
export type Callback<R = any> = (err: Error | null, res?: R) => void

export type CurlFunction = (
    trunkTransaction: Hash,
    branchTransaction: Hash,
    minWeightMagnitude: number,
    trytes: Trytes[]
) => Promise<Trytes[]>

// /* API, Core + Extended */
// export interface API {
//     /**
//      * API util methods
//      */
//     getSettings: () => Settings

//     setSettings: (settings: Settings) => API

//     /**
//      * Core API methods
//      */
//     sendCommand: <C extends BaseCommand, R = any>(this: API, command: BaseCommand, callback?: Callback<R>) => Promise<R>

//     attachToTangle: (
//         this: API,
//         trunkTransaction: string,
//         branchTransaction: string,
//         minWeightMagnitude: number,
//         trytes: string[],
//         callback?: Callback<string[]>
//     ) => Promise<string[]>

//     findTransactions: (this: API, query: FindTransactionsQuery, callback?: Callback<string[]>) => Promise<string[]>

//     getBalances: (
//         this: API,
//         addresses: string[],
//         threshold: number,
//         callback?: Callback<GetBalancesResponse>
//     ) => Promise<GetBalancesResponse>

//     getInclusionStates: (
//         this: API,
//         transactions: string[],
//         tips: string[],
//         callback?: Callback<string[]>
//     ) => Promise<string[]>

//     getNodeInfo: (this: API, callback?: Callback<GetNodeInfoResponse>) => Promise<GetNodeInfoResponse>

//     getNeighbors: (this: API, callback?: Callback<GetNeighborsResponse>) => Promise<Neighbor[]>

//     addNeighbors: (this: API, callback?: Callback<number>) => Promise<number>

//     removeNeighbors: (this: API, callback?: Callback<number>) => Promise<number>

//     getTips: (this: API, callback?: Callback<string[]>) => Promise<string[]>

//     getTransactionsToApprove: (
//         this: API,
//         depth: number,
//         reference?: string,
//         callback?: Callback<GetTransactionsToApproveResponse>
//     ) => Promise<GetTransactionsToApproveResponse>

//     getTrytes: (this: API, hashes: string[], callback?: Callback<string[]>) => Promise<string[]>

//     interruptAttachingToTangle: (this: API, callback?: Callback<void>) => Promise<void>

//     checkConsistency: (this: API, transactions: string | string[], callback?: Callback<boolean>) => Promise<boolean>

//     broadcastTransactions: (this: API, trytes: string[], callback?: Callback<void>) => Promise<void>

//     storeTransactions: (this: API, trytes: string[], callback?: Callback<void>) => Promise<void>

//     wereAddressesSpentFrom: (this: API, addresses: string[], callback?: Callback<boolean[]>) => Promise<boolean[]>

//     /**
//      * Extended API methods
//      */
//     broadcastBundle: (this: API, tailTransaction: string, callback?: Callback<void>) => Promise<void>

//     findTransactionObjects: (
//         this: API,
//         query: FindTransactionsQuery,
//         callback?: Callback<Transaction[]>
//     ) => Promise<Transaction[]>

//     getAccountData: (
//         this: API,
//         seed: string,
//         options: GetAccountDataOptions,
//         callback?: Callback<AccountData>
//     ) => Promise<AccountData>

//     getBundle: (this: API, tailTransaction: string, callback?: Callback<Bundle | void>) => Promise<Bundle | void>

//     getBundlesFromAddresses: (
//         this: API,
//         addresses: string[],
//         inclusionState?: boolean,
//         callback?: Callback<Bundle[]>
//     ) => Promise<Bundle[]>

//     getInputs: (this: API, seed: string, options?: GetInputsOptions, callback?: Callback) => Promise<Inputs>

//     getLatestInclusion: (this: API, transactions: string[], callback?: Callback<boolean[]>) => Promise<boolean[]>

//     getNewAddress: (this: API, seed: string, options: GetNewAddressOptions) => Promise<string[] | string>

//     getTransactionObjects: (
//         this: API,
//         transactions: string[],
//         callback?: Callback<Transaction[]>
//     ) => Promise<Transaction[]>

//     isPromotable: (
//         // Deprecated
//         this: API,
//         transactions: string | string[],
//         callback?: Callback<boolean>
//     ) => Promise<boolean>

//     promoteTransaction: (
//         this: API,
//         tailTransaction: string,
//         depth: number,
//         minWeightMagnitude: number,
//         transfers?: Transfer[],
//         options?: PromoteTransactionOptions,
//         callback?: Callback<Transaction[]>
//     ) => Promise<Transaction[]>

//     replaybundle: (
//         this: API,
//         tailTransaction: string,
//         depth: number,
//         minWeightMagnitude: number,
//         callback?: Callback<Bundle>
//     ) => Promise<Bundle>

//     sendTransfer: (
//         this: API,
//         seed: string,
//         depth: number,
//         minWeightMagnitude: number,
//         transfers: Transfer[],
//         options?: any,
//         callback?: Callback<Bundle>
//     ) => Promise<Bundle>

//     sendTrytes: (
//         this: API,
//         trytes: string[],
//         depth: number,
//         minWeightMagnitude: number,
//         options?: any,
//         callback?: Callback<Bundle>
//     ) => Promise<Bundle>

//     traverseBundle: (
//         this: API,
//         trunkTransaction: string,
//         bundleHash: string | null,
//         bundle: Bundle,
//         callback?: Callback<Bundle | void>
//     ) => Promise<Bundle | void>

//     storeAndBroadcast: (this: API, trytes: string[], callback?: Callback<void>) => Promise<void>

//     [key: string]: any
// }

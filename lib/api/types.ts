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

export interface Provider {
    sendCommand: <C extends BaseCommand, R>(command: C, callback?: Callback<R>) => Promise<R>
    setSettings: (settings: Settings) => void
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

/* Callback */
export type Callback<R = any> = (err: Error | null, res?: R) => void

export type AttachToTangle = (
    trunkTransaction: Hash,
    branchTransaction: Hash,
    minWeightMagnitude: number,
    trytes: Trytes[]
) => Promise<Trytes[]>

export interface Settings {
    provider: string
    attachToTangle?: AttachToTangle
    host?: string // deprecated
    port?: string // deprecated
    sandbox?: string // deprecated
    token?: string // deprecated
}

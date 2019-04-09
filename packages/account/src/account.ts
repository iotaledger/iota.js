import { asyncBuffer, AsyncBuffer } from '@iota/async-buffer'
import { API } from '@iota/core'
import {
    createPersistence,
    generatePersistenceID,
    Persistence,
    PersistenceIteratorOptions,
    streamToBuffers,
} from '@iota/persistence'
import * as Promise from 'bluebird'
import { EventEmitter } from 'events'
import { CreatePersistenceAdapter, Trytes } from '../../types'
import { preset as defaultPreset } from './preset'

export interface AddressGenerationParams {
    readonly seed: Int8Array
    readonly persistence: Persistence
    readonly timeSource: TimeSource
    readonly security: 1 | 2 | 3
}
export interface TransactionIssuanceParams {
    readonly seed: Int8Array
    readonly deposits: AsyncBuffer<Int8Array>
    readonly persistence: Persistence
    readonly network: Network
    readonly timeSource: TimeSource
    readonly security: 1 | 2 | 3
    readonly now: () => number // testing only
}
export interface NetworkParams {
    readonly provider: string
}
export interface TransactionAttachmentParams {
    readonly network: Network
    readonly bundles: AsyncBuffer<Int8Array>
    readonly persistence: Persistence
    readonly delay: number
}
export interface TransactionAttachmentStartParams {
    readonly depth: number
    readonly minWeightMagnitude: number
    readonly delay?: number
    readonly maxDepth?: number
    readonly now?: () => number // testing only
}

export interface HistoryParams {
    readonly persistence: Persistence
}

export interface AccountParams {
    readonly seed: Int8Array
    readonly provider?: string
    readonly persistencePath?: string
    readonly stateAdapter?: CreatePersistenceAdapter
    readonly historyAdapter?: CreatePersistenceAdapter
    readonly network?: any
    readonly timeSource?: TimeSource
}

export interface AddressGeneration<X, Y> {
    readonly [generate: string]: ((params: X) => Promise<Y>) | any
}

export interface TransactionIssuance<Y, Z> {
    readonly [send: string]: (params: Y | any) => Promise<Z>
}

export interface Network {
    readonly findTransactions: API['findTransactions']
    readonly getBalances: API['getBalances']
    readonly getBalance: (address: Trytes) => Promise<number>
    readonly getConsistency: API['checkConsistency']
    readonly getLatestInclusion: API['getLatestInclusion']
    readonly getTrytes: API['getTrytes']
    readonly sendTrytes: API['sendTrytes']
    readonly setSettings: API['setSettings']
}
export interface TransactionAttachment {
    readonly startAttaching: (params: TransactionAttachmentStartParams) => void
    readonly stopAttaching: () => void
}

export interface History<Y, Z> {
    readonly readIncludedDeposits: (options: PersistenceIteratorOptions) => EventEmitter
    readonly readIncludedTransfers: (options: PersistenceIteratorOptions) => EventEmitter
    readonly getDeposit: (key: Trytes) => Promise<Y>
    readonly getTransfer: (key: Trytes) => Promise<Z>
    readonly deleteDeposit: (key: Trytes) => Promise<void>
    readonly deleteTransfer: (key: Trytes) => Promise<void>
}

export interface Account<X, Y, Z>
    extends AddressGeneration<X, Y>,
        TransactionIssuance<Y, Z>,
        TransactionAttachment,
        History<Y, Z>,
        EventEmitter {}

export type TimeSource = () => Promise<number>
export type CreateNetwork = (params: NetworkParams) => Network
export type CreateAddressGeneration<X, Y> = (params: AddressGenerationParams) => AddressGeneration<X, Y>
export type CreateTransactionIssuance<Y, Z> = (params: TransactionIssuanceParams) => TransactionIssuance<Y, Z>
export type CreateTransactionAttachment<Z> = (params: TransactionAttachmentParams) => TransactionAttachment
export type CreateHistory<Y, Z> = (params: HistoryParams) => History<Y, Z>
export type CreateAccount<X, Y, Z> = (params: AccountParams) => Account<X, Y, Z>
export type CreateAccountWithPreset<X, Y, Z> = (preset: AccountPreset<X, Y, Z>) => CreateAccount<X, Y, Z>

export interface AccountPreset<X, Y, Z> {
    readonly persistencePath: string
    readonly stateAdapter: CreatePersistenceAdapter
    readonly historyAdapter: CreatePersistenceAdapter
    readonly provider: string
    readonly network: CreateNetwork
    readonly security: 1 | 2 | 3
    readonly addressGeneration: CreateAddressGeneration<X, Y>
    readonly transactionIssuance: CreateTransactionIssuance<Y, Z>
    readonly transactionAttachment: CreateTransactionAttachment<Z>
    readonly attachmentDelay: number
    readonly timeSource: TimeSource
    readonly test: { [t: string]: any }
    readonly [k: string]: any
}

export function createAccountWithPreset<X, Y, Z>(preset: AccountPreset<X, Y, Z>): CreateAccount<X, Y, Z> {
    return function(
        this: any,
        {
            seed,
            persistencePath = preset.persistencePath,
            stateAdapter = preset.stateAdapter,
            historyAdapter = preset.historyAdapter,
            provider = preset.provider,
            network = preset.network({ provider }),
            timeSource = preset.timeSource,
        }: AccountParams
    ): Account<X, Y, Z> {
        const persistence = createPersistence({
            persistenceID: generatePersistenceID(seed),
            persistencePath,
            stateAdapter,
            historyAdapter,
        })

        const bundles = asyncBuffer<Int8Array>()
        const deposits = asyncBuffer<Int8Array>()

        persistence.on('writeBundle', bundles.write)
        persistence.on('writeCDA', deposits.write)

        persistence
            .createStateReadStream()
            .on('data', streamToBuffers({ bundles, deposits }))
            .on('error', error => this.emit('error', error))

        function accountMixin(this: any) {
            return Object.assign(
                this,
                preset.addressGeneration({ seed, persistence, timeSource, security: preset.security }),
                preset.transactionIssuance({
                    seed,
                    deposits,
                    persistence,
                    network,
                    timeSource,
                    security: preset.security,
                    now: preset.test.now,
                }),
                preset.transactionAttachment({ bundles, persistence, network, delay: preset.attachmentDelay }),
                preset.history({ persistence }),
                EventEmitter.prototype
            )
        }

        const target = {}
        return accountMixin.call(target)
    }
}

export const createAccount = createAccountWithPreset(defaultPreset)

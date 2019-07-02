import { asyncBuffer, AsyncBuffer } from '@iota/async-buffer'
import { CDA_LENGTH, CDAInput, deserializeCDAInput, isExpired } from '@iota/cda'
import { tritsToTrytes, trytesToTrits } from '@iota/converter'
import { API } from '@iota/core'
import { createPersistence, generatePersistenceID, Persistence, PersistenceIteratorOptions } from '@iota/persistence'
import { isMultipleOfTransactionLength } from '@iota/transaction'
import * as Promise from 'bluebird'
import { EventEmitter } from 'events'
import { CreatePersistenceAdapter, Trytes } from '../../types'
import { preset as defaultPreset } from './preset'

export interface AddressGenerationParams {
    readonly seed: Int8Array
    readonly persistence: Persistence<string, Int8Array>
    readonly timeSource: TimeSource
    readonly security: 1 | 2 | 3
}
export interface TransactionIssuanceParams {
    readonly seed: Int8Array
    readonly deposits: AsyncBuffer<Int8Array>
    readonly persistence: Persistence<string, Int8Array>
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
    readonly persistence: Persistence<string, Int8Array>
}
export interface TransactionAttachmentStartParams {
    readonly depth: number
    readonly minWeightMagnitude: number
    readonly delay?: number
    readonly maxDepth?: number
    readonly now?: () => number // testing only
}

export interface HistoryParams {
    readonly persistence: Persistence<string, Int8Array>
}

export interface AccountParams {
    readonly seed: Int8Array | string
    readonly provider?: string
    readonly persistencePath?: string
    readonly persistenceAdapter?: CreatePersistenceAdapter<string, Int8Array>
    readonly network?: any
    readonly timeSource?: TimeSource
    readonly depth?: number
    readonly minWeightMagnitude?: number
    readonly delay?: number
    readonly maxDepth?: number
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
        EventEmitter {
    stop: () => Promise<void>
    start: () => Promise<void>
}

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
    readonly persistenceAdapter: CreatePersistenceAdapter<string, Int8Array>
    readonly provider: string
    readonly network: CreateNetwork
    readonly security: 1 | 2 | 3
    readonly addressGeneration: CreateAddressGeneration<X, Y>
    readonly transactionIssuance: CreateTransactionIssuance<Y, Z>
    readonly transactionAttachment: CreateTransactionAttachment<Z>
    readonly timeSource: TimeSource
    readonly depth: number
    readonly minWeightMagnitude: number
    readonly delay: number
    readonly maxDepth: number
    readonly test: { [t: string]: any }
    readonly [k: string]: any
}

export function createAccountWithPreset<X, Y, Z>(preset: AccountPreset<X, Y, Z>): CreateAccount<X, Y, Z> {
    return function(
        this: any,
        {
            seed,
            persistencePath = preset.persistencePath,
            persistenceAdapter = preset.persistenceAdapter,
            provider = preset.provider,
            network = preset.network({ provider }),
            timeSource = preset.timeSource,
            depth = preset.depth,
            minWeightMagnitude = preset.minWeightMagnitude,
            delay = preset.delay,
            maxDepth = preset.maxDepth,
        }: AccountParams
    ): Account<X, Y, Z> {
        if (typeof seed === 'string') {
            seed = trytesToTrits(seed)
        }

        const bundles = asyncBuffer<Int8Array>()
        const deposits = asyncBuffer<Int8Array>()

        let depositsList: CDAInput[] = []

        const emitDepositEvents = () => {
            persistence
                .ready()
                .then(timeSource)
                .then(currentTime => {
                    const depositsListCopy = [...depositsList].filter(deposit => deposit.timeoutAt > 0)

                    network
                        .getBalances(depositsListCopy.map(({ address }) => address), 100)
                        .then((balances: ReadonlyArray<number>) => {
                            depositsList = depositsListCopy.filter((deposit, i) => {
                                if (balances[i] > 0) {
                                    if (deposit.expectedAmount && balances[i] >= deposit.expectedAmount) {
                                        this.emit('deposit', { ...deposit, balance: balances[i] })
                                        return false
                                    } else if (deposit.multiUse && isExpired(currentTime, deposit)) {
                                        this.emit('deposit', { ...deposit, balance: balances[i] })
                                        return false
                                    } else if (!deposit.multiUse) {
                                        this.emit('deposit', { ...deposit, balance: balances[i] })
                                        return false
                                    }
                                    return true
                                }

                                if (isExpired(currentTime, deposit)) {
                                    return false
                                }

                                return true
                            })
                        })
                })
        }

        let emitDepositEventsTimeout: any

        const persistence = createPersistence(
            persistenceAdapter({
                persistenceID: generatePersistenceID(seed),
                persistencePath,
            })
        )

        persistence.on('data', ({ key, value }) => {
            if (key[0] === '0') {
                if (isMultipleOfTransactionLength(value.length)) {
                    bundles.write(value)
                }

                if (value.length === CDA_LENGTH) {
                    deposits.write(value)
                    depositsList.push(deserializeCDAInput(value))
                }
            }
        })

        function accountMixin(this: any) {
            return Object.assign(
                this,
                preset.addressGeneration.call(this, {
                    seed: seed as Int8Array,
                    persistence,
                    timeSource,
                    security: preset.security,
                }),
                preset.transactionIssuance.call(this, {
                    seed: seed as Int8Array,
                    deposits,
                    persistence,
                    network,
                    timeSource,
                    security: preset.security,
                    now: preset.test.now,
                }),
                preset.transactionAttachment.call(this, {
                    bundles,
                    persistence,
                    network,
                }),
                {
                    stop: () => {
                        this.stopAttaching()
                        clearTimeout(emitDepositEventsTimeout)
                        return persistence.close()
                    },
                    start: () => {
                        return persistence.open().then(() => {
                            emitDepositEventsTimeout = setTimeout(emitDepositEvents, 60 * 1000)
                            this.startAttaching()
                        })
                    },
                },
                EventEmitter.prototype
            )
        }

        const target = {}
        const account = accountMixin.call(target)

        persistence
            .ready()
            .then(() => {
                account.startAttaching({
                    depth,
                    minWeightMagnitude,
                    delay,
                    maxDepth,
                })
            })
            .catch((error: Error) => account.emit('error', error))

        return account
    }
}

export const createAccount = createAccountWithPreset(defaultPreset)

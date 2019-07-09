import { asyncBuffer, AsyncBuffer } from '@iota/async-buffer'
import { CDA_LENGTH, CDAInput, deserializeCDAInput, isExpired } from '@iota/cda'
import { tritsToTrytes, trytesToTrits } from '@iota/converter'
import { API } from '@iota/core'
import { createPersistence, generatePersistenceID, Persistence, PersistenceIteratorOptions } from '@iota/persistence'
import { isMultipleOfTransactionLength } from '@iota/transaction'
import * as Promise from 'bluebird'
import { EventEmitter } from 'events'
import { Bundle, CreatePersistenceAdapter, Transaction, Trytes } from '../../types'
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
    readonly pollingDelay?: number
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
    readonly storeAndBroadcast: API['storeAndBroadcast']
    readonly getTransactionsToApprove: API['getTransactionsToApprove']
    readonly attachToTangle: API['attachToTangle']
    readonly getBundlesFromAddresses: API['getBundlesFromAddresses']
}
export interface TransactionAttachment {
    readonly startAttaching: (params: TransactionAttachmentStartParams) => void
    readonly stopAttaching: () => void
}

export interface Account<X, Y, Z>
    extends AddressGeneration<X, Y>,
        TransactionIssuance<Y, Z>,
        TransactionAttachment,
        EventEmitter {
    stop: () => Promise<void>
    start: () => Promise<void>
    getTotalBalance: () => Promise<void>
    getAvailableBalance: () => Promise<void>
}

export type TimeSource = () => Promise<number>
export type CreateNetwork = (params: NetworkParams) => Network
export type CreateAddressGeneration<X, Y> = (params: AddressGenerationParams) => AddressGeneration<X, Y>
export type CreateTransactionIssuance<Y, Z> = (params: TransactionIssuanceParams) => TransactionIssuance<Y, Z>
export type CreateTransactionAttachment<Z> = (params: TransactionAttachmentParams) => TransactionAttachment
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
    readonly pollingDelay: number
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
            pollingDelay = preset.pollingDelay,
            maxDepth = preset.maxDepth,
        }: AccountParams
    ): Account<X, Y, Z> {
        if (typeof seed === 'string') {
            seed = trytesToTrits(seed)
        }

        const addresses: Trytes[] = []
        const bundles = asyncBuffer<Int8Array>()
        const deposits = asyncBuffer<Int8Array>()
        const depositsList: CDAInput[] = []

        let emitDepositEventsTimeout: any
        let running: boolean = true

        const persistence = createPersistence(
            persistenceAdapter({
                persistenceID: generatePersistenceID(seed),
                persistencePath,
            })
        )

        persistence.on('data', ({ key, value }) => {
            const trits = Int8Array.from(value)
            if (key.toString()[0] === '0') {
                if (isMultipleOfTransactionLength(trits.length)) {
                    bundles.write(trits)
                }

                if (trits.length === CDA_LENGTH) {
                    deposits.write(trits)
                    const cda = deserializeCDAInput(trits)
                    depositsList.push(cda)
                    addresses.push(tritsToTrytes(cda.address))
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
                        if (running) {
                            running = false

                            this.stopAttaching()
                            clearTimeout(emitDepositEventsTimeout)
                            return persistence.close()
                        }
                    },
                    start: () => {
                        if (running) {
                            return
                        }

                        running = true

                        return persistence.open().then(() => {
                            emitDepositEventsTimeout = setTimeout(emitTransferEvents, pollingDelay)
                            this.startAttaching()
                        })
                    },
                    getTotalBalance: () => {
                        return persistence
                            .ready()
                            .then(() => network.getBalances(addresses, 100))
                            .then(({ balances }) => balances.reduce((acc: number, b: number) => (acc += b), 0))
                    },
                    getAvailableBalance: () => {
                        return persistence
                            .ready()
                            .then(() => timeSource())
                            .then(currentTime => {
                                const depositsListCopy = [...depositsList]
                                return network
                                    .getBalances(depositsList.map(({ address }) => tritsToTrytes(address)), 100)
                                    .then(({ balances }: { balances: ReadonlyArray<number> }) => {
                                        let acc = 0
                                        depositsList.forEach((input, i) => {
                                            if (balances[i] > 0) {
                                                if (input.expectedAmount && balances[i] >= input.expectedAmount) {
                                                    acc += balances[i]
                                                } else if (input.multiUse && isExpired(currentTime, input)) {
                                                    acc += balances[i]
                                                } else if (!input.multiUse) {
                                                    acc += balances[i]
                                                }
                                            }
                                        })
                                        return acc
                                    })
                            })
                    },
                },
                EventEmitter.prototype
            )
        }

        const target = {}
        const account = accountMixin.call(target)
        const emittedIncludedDeposits: { [k: string]: boolean } = {}
        const emittedPendingDeposits: { [k: string]: boolean } = {}
        const emittedIncludedWithdrawals: { [k: string]: boolean } = {}
        const emittedPendingWithdrawals: { [k: string]: boolean } = {}

        const emitTransferEvents = () => {
            persistence
                .ready()
                .then(() => network.getBundlesFromAddresses(addresses, true))
                .then(bundlesFromAddresses => {
                    bundlesFromAddresses
                        .filter(
                            (bundle: Bundle) =>
                                emittedIncludedDeposits[bundle[0].hash] !== true ||
                                (emittedPendingDeposits[bundle[0].hash] === true &&
                                    emittedIncludedDeposits[bundle[0].hash] !== true &&
                                    (bundle[0] as any).persistence === true)
                        )
                        .filter(
                            (bundle: ReadonlyArray<Transaction>) =>
                                bundle.findIndex(tx => addresses.indexOf(tx.address) > -1 && tx.value > 0) > -1
                        )
                        .forEach((bundle: ReadonlyArray<Transaction>) =>
                            bundle
                                .filter(tx => addresses.indexOf(tx.address) > 0 && tx.value > 0)
                                .forEach(tx => {
                                    account.emit(
                                        (bundle[0] as any).persistence ? 'includedDeposit' : 'pendingDeposit',
                                        {
                                            address: tx.address,
                                            bundle,
                                        }
                                    )
                                    if ((bundle[0] as any).persistence) {
                                        emittedIncludedDeposits[bundle[0].hash] = true
                                    } else {
                                        emittedPendingDeposits[bundle[0].hash] = true
                                    }
                                })
                        )
                    bundlesFromAddresses
                        .filter(
                            (bundle: Bundle) =>
                                emittedIncludedWithdrawals[bundle[0].hash] !== true ||
                                (emittedPendingWithdrawals[bundle[0].hash] === true &&
                                    emittedIncludedWithdrawals[bundle[0].hash] !== true &&
                                    (bundle[0] as any).persistence === true)
                        )
                        .filter(
                            (bundle: ReadonlyArray<Transaction>) =>
                                bundle.findIndex(tx => addresses.indexOf(tx.address) > -1 && tx.value < 0) > -1
                        )
                        .forEach((bundle: ReadonlyArray<Transaction>) =>
                            bundle
                                .filter(tx => addresses.indexOf(tx.address) > 0 && tx.value < 0)
                                .forEach(tx => {
                                    account.emit(
                                        (bundle[0] as any).persistence ? 'includedWithdrawal' : 'pendingWithdrawal',
                                        {
                                            address: tx.address,
                                            bundle,
                                        }
                                    )
                                    if ((bundle[0] as any).persistence) {
                                        emittedIncludedWithdrawals[bundle[0].hash] = true
                                    } else {
                                        emittedPendingWithdrawals[bundle[0].hash] = true
                                    }
                                })
                        )
                })
                .catch(error => account.emit('error', error))
                .then(() => {
                    emitDepositEventsTimeout = setTimeout(emitTransferEvents, pollingDelay)
                })
        }

        if (running) {
            persistence
                .ready()
                .then(() =>
                    account.startAttaching({
                        depth,
                        minWeightMagnitude,
                        delay,
                        maxDepth,
                    })
                )
                .then(() => {
                    emitDepositEventsTimeout = setTimeout(emitTransferEvents, 0)
                })
                .catch((error: Error) => account.emit('error', error))
        }

        return account
    }
}

export const createAccount = createAccountWithPreset(defaultPreset)

import { asyncBuffer, AsyncBuffer } from '@iota/async-buffer'
import { AbstractCDA, CDA_LENGTH, CDAInput, deserializeCDAInput, isExpired, serializeCDAInput } from '@iota/cda'
import { tritsToTrytes, tritsToValue, trytesToTrits, valueToTrits } from '@iota/converter'
import { API } from '@iota/core'
import {
    createPersistence,
    generatePersistenceID,
    Persistence,
    PersistenceBatch,
    PersistenceBatchTypes,
} from '@iota/persistence'
import { bundle as bundleHash, isMultipleOfTransactionLength, TRANSACTION_LENGTH } from '@iota/transaction'
import { asTransactionObject } from '@iota/transaction-converter'
import * as Promise from 'bluebird'
import { EventEmitter } from 'events'
import { Bundle, CreatePersistenceAdapter, Transaction, Trytes } from '../../types'
import { preset as defaultPreset } from './preset'

export interface AddressGenerationParams {
    readonly seed: Int8Array
    readonly security: 1 | 2 | 3
    readonly persistence: Persistence<string, Int8Array>
    readonly timeSource: TimeSource
    readonly network: Network
    readonly now: () => number // testing only
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
    readonly emitTransferEvents?: boolean
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
    readonly getInclusionStates: API['getInclusionStates']
    readonly getTrytes: API['getTrytes']
    readonly sendTrytes: API['sendTrytes']
    readonly setSettings: API['setSettings']
    readonly storeAndBroadcast: API['storeAndBroadcast']
    readonly getTransactionsToApprove: API['getTransactionsToApprove']
    readonly attachToTangle: API['attachToTangle']
    readonly getBundlesFromAddresses: API['getBundlesFromAddresses']
    readonly wereAddressesSpentFrom: API['wereAddressesSpentFrom']
    readonly isAddressUsed: (
        address: Trytes
    ) => Promise<{ isUsed: boolean; isSpent: boolean; transactions: ReadonlyArray<Trytes> }>
}
export interface TransactionAttachment {
    readonly startAttaching: (params: TransactionAttachmentStartParams) => void
    readonly stopAttaching: () => void
}

export interface Deposit extends AbstractCDA {
    readonly address: Trytes
    readonly index: number
    readonly security: 1 | 2 | 3
    readonly balance: number
}

export interface AccountState {
    readonly deposits: ReadonlyArray<Deposit>
    readonly withdrawals: ReadonlyArray<ReadonlyArray<Trytes>>
    readonly lastKeyIndex: number
}

export interface Account<X, Y, Z>
    extends AddressGeneration<X, Y>,
        TransactionIssuance<Y, Z>,
        TransactionAttachment,
        EventEmitter {
    stop: () => Promise<void>
    start: () => Promise<void>
    getTotalBalance: () => Promise<number>
    getAvailableBalance: () => Promise<number>
    getDeposits: () => Promise<Deposit>
    getWithdrawals: () => Promise<ReadonlyArray<Transaction>>
    exportState: () => Promise<AccountState>
    importState: (state: AccountState) => Promise<void>
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

export const SENT_TO_ADDRESS_PREFIX = 'sent_to'

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
            emitTransferEvents = true,
        }: AccountParams
    ): Account<X, Y, Z> {
        if (typeof seed === 'string') {
            seed = trytesToTrits(seed)
        }

        const addresses: Trytes[] = []
        const bundles = asyncBuffer<Int8Array>()
        const deposits = asyncBuffer<Int8Array>()
        const depositsList: CDAInput[] = []
        const withdrawalsList: Array<ReadonlyArray<Transaction>> = []

        let transferEventsTimeout: any
        let running: boolean = true

        const persistence = createPersistence(
            persistenceAdapter({
                persistenceID: generatePersistenceID(seed),
                persistencePath,
            })
        )

        function accountMixin(this: any) {
            return Object.assign(
                this,
                preset.addressGeneration.call(this, {
                    seed: seed as Int8Array,
                    persistence,
                    timeSource,
                    security: preset.security,
                    network,
                    now: preset.test.now,
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
                            clearTimeout(transferEventsTimeout)
                            return persistence.close()
                        }
                    },
                    start: () => {
                        if (running) {
                            return
                        }

                        running = true

                        return persistence.open().then(() => {
                            if (emitTransferEvents) {
                                transferEventsTimeout = setTimeout(transferEvents, pollingDelay)
                            }
                            this.startAttaching()
                        })
                    },
                    getTotalBalance: () => {
                        return persistence
                            .ready()
                            .then(() => network.getBalances(addresses))
                            .then(({ balances }) => balances.reduce((acc: number, b: number) => (acc += b), 0))
                    },
                    getAvailableBalance: () => {
                        return persistence
                            .ready()
                            .then(() => timeSource())
                            .then(currentTime => {
                                const depositsListCopy = [...depositsList]
                                return network
                                    .getBalances(depositsListCopy.map(({ address }) => tritsToTrytes(address)))
                                    .then(({ balances }: { balances: ReadonlyArray<number> }) => {
                                        let acc = 0
                                        depositsListCopy.forEach((input, i) => {
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
                    getDeposits: () => {
                        return persistence
                            .ready()
                            .then(() =>
                                [...depositsList].map(deposit => ({
                                    ...deposit,
                                    address: tritsToTrytes(deposit.address),
                                    index: tritsToValue(deposit.index),
                                }))
                            )
                            .then(depositsListCopy =>
                                network
                                    .getBalances(depositsListCopy.map(deposit => deposit.address))
                                    .then(({ balances }: { balances: ReadonlyArray<number> }) =>
                                        depositsListCopy.map((deposit, i) => ({
                                            ...deposit,
                                            balance: balances[i],
                                        }))
                                    )
                            )
                    },
                    getWithdrawals: () => {
                        return persistence.ready().then(() => [...withdrawalsList])
                    },
                    exportState: () => {
                        return persistence
                            .ready()
                            .then(() => persistence.get('key_index'))
                            .then(lastKeyIndex => ({
                                lastKeyIndex,
                                deposits: [...depositsList].map(deposit => ({
                                    ...deposit,
                                    address: tritsToTrytes(deposit.address),
                                    index: tritsToValue(deposit.index),
                                })),
                                withdrawals: [...withdrawalsList],
                            }))
                    },
                    importState: (state: AccountState) => {
                        return persistence.ready().then(() =>
                            persistence.batch([
                                {
                                    type: PersistenceBatchTypes.put,
                                    key: 'key_index',
                                    value: valueToTrits(state.lastKeyIndex),
                                },
                                ...state.deposits.map(deposit => ({
                                    type: 'put',
                                    key: ['0', ':', deposit.address].join(''),
                                    value: serializeCDAInput({
                                        ...deposit,
                                        address: trytesToTrits(deposit.address),
                                        index: trytesToTrits(deposit.index),
                                    }),
                                })),
                                ...state.withdrawals.map(withdrawal => {
                                    const trits = new Int8Array(withdrawal.length * TRANSACTION_LENGTH)
                                    for (let i = 0; i < withdrawal.length; i++) {
                                        trits.set(trytesToTrits(withdrawal[i]), i * TRANSACTION_LENGTH)
                                    }
                                    return {
                                        type: PersistenceBatchTypes.put,
                                        key: ['0', ':', tritsToTrytes(bundleHash(trits))].join(''),
                                        value: trits,
                                    }
                                }),
                            ] as PersistenceBatch<string, Int8Array>)
                        )
                    },
                },

                EventEmitter.prototype
            )
        }

        const target = {}
        const account = accountMixin.call(target)

        persistence.on('data', ({ key, value }) => {
            const trits = Int8Array.from(value)
            const [prefix, id] = key.toString().split(':')
            if (prefix === '0') {
                if (isMultipleOfTransactionLength(trits.length)) {
                    bundles.write(trits)

                    const bundle = []
                    for (let offset = 0; offset < trits.length; offset += TRANSACTION_LENGTH) {
                        bundle.push(
                            asTransactionObject(tritsToTrytes(trits.slice(offset, offset + TRANSACTION_LENGTH)))
                        )
                    }
                    withdrawalsList.push(bundle)
                }

                if (trits.length === CDA_LENGTH) {
                    deposits.write(trits)
                    const cda = deserializeCDAInput(trits)
                    depositsList.push(cda)
                    addresses.push(tritsToTrytes(cda.address))
                }

                if (trits.length === 1) {
                    // used address, don't list it as deposit or pass it to input selection
                    addresses.push(id)
                }
            } else if (prefix === SENT_TO_ADDRESS_PREFIX) {
                timeSource().then(now => {
                    if (tritsToValue(trits) <= now) {
                        persistence.del([prefix, id].join(':')).catch(error => account.emit('error', error))
                    }
                })
            }
        })

        const emittedIncludedDeposits: { [k: string]: boolean } = {}
        const emittedPendingDeposits: { [k: string]: boolean } = {}
        const emittedIncludedWithdrawals: { [k: string]: boolean } = {}
        const emittedPendingWithdrawals: { [k: string]: boolean } = {}

        const transferEvents = () => {
            return persistence
                .ready()
                .then(() => network.getBundlesFromAddresses(addresses, true))
                .then(bundlesFromAddresses => {
                    bundlesFromAddresses
                        .filter(
                            (bundle: Bundle) =>
                                (emittedIncludedDeposits[bundle[0].hash] !== true &&
                                    (bundle[0] as any).persistence === true) ||
                                (emittedPendingDeposits[bundle[0].hash] !== true &&
                                    (bundle[0] as any).persistence === false)
                        )
                        .filter(
                            (bundle: ReadonlyArray<Transaction>) =>
                                bundle.findIndex(tx => addresses.indexOf(tx.address) > -1 && tx.value > 0) > -1
                        )
                        .forEach((bundle: ReadonlyArray<Transaction>) =>
                            bundle
                                .filter(tx => addresses.indexOf(tx.address) > -1 && tx.value > 0)
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
                                (emittedIncludedWithdrawals[bundle[0].hash] !== true &&
                                    (bundle[0] as any).persistence === true) ||
                                (emittedPendingWithdrawals[bundle[0].hash] !== true &&
                                    (bundle[0] as any).persistence === false)
                        )
                        .filter(
                            (bundle: ReadonlyArray<Transaction>) =>
                                bundle.findIndex(tx => addresses.indexOf(tx.address) > -1 && tx.value < 0) > -1
                        )
                        .forEach((bundle: ReadonlyArray<Transaction>) =>
                            bundle
                                .filter(tx => addresses.indexOf(tx.address) > -1 && tx.value < 0)
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
                    transferEventsTimeout = setTimeout(transferEvents, pollingDelay)
                })
        }

        if (running) {
            persistence
                .ready()
                .then(() => {
                    account.startAttaching({
                        depth,
                        minWeightMagnitude,
                        delay,
                        maxDepth,
                    })

                    if (emitTransferEvents) {
                        transferEvents()
                    }
                })
                .catch((error: Error) => account.emit('error', error))
        }

        account.on('error', () => {}) // tslint:disable-line

        return account
    }
}

export const createAccount = createAccountWithPreset(defaultPreset)

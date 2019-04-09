import {
    CDA,
    CDA_CHECKSUM_LENGTH,
    CDA_LENGTH,
    CDAInput,
    CDAParams,
    CDATransfer,
    deserializeCDA,
    deserializeCDAInput,
    isExpired,
    serializeCDAInput,
    verifyCDAParams,
    verifyCDATransfer,
} from '@iota/cda'
import { bytesToTrits, tritsToBytes, tritsToTrytes, tritsToValue, trytesToTrits } from '@iota/converter'
import {
    createCheckConsistency,
    createFindTransactions,
    createGetBalances,
    createGetLatestInclusion,
    createGetTrytes,
    createPrepareTransfers,
    createSendTrytes,
    isAboveMaxDepth,
} from '@iota/core'
import { createHttpClient } from '@iota/http-client'
import { PersistenceIteratorOptions } from '@iota/persistence'
import { createPersistenceAdapter } from '@iota/persistence-adapter-level'
import { address as signingAddress, digests, key, subseed, TRYTE_WIDTH } from '@iota/signing'
import {
    address as transactionAddress,
    bundle as bundleHash,
    BUNDLE_LENGTH,
    BUNDLE_OFFSET,
    isMultipleOfTransactionLength,
    TRANSACTION_LENGTH,
    transactionHash,
} from '@iota/transaction'
import { asTransactionObjects } from '@iota/transaction-converter'
import * as Promise from 'bluebird'
import { EventEmitter } from 'events'
import { Bundle, Transaction, Trytes } from '../../types'
import {
    AccountPreset,
    AddressGeneration,
    AddressGenerationParams,
    History,
    HistoryParams,
    Network,
    NetworkParams,
    TransactionAttachment,
    TransactionAttachmentParams,
    TransactionAttachmentStartParams,
    TransactionIssuance,
    TransactionIssuanceParams,
} from './account'

export interface CDAAccount
    extends AddressGeneration<CDAParams, CDA>,
        TransactionIssuance<CDA, Bundle>,
        TransactionAttachment,
        History<CDA, Bundle> {}

export const events = {
    attachToTangle: 'attachToTangle',
}

export function networkAdapter({ provider }: NetworkParams): Network {
    const httpClient = createHttpClient({ provider })
    const getBalances = createGetBalances(httpClient)

    return {
        getTrytes: createGetTrytes(httpClient),
        getBalance: (address: Trytes): Promise<number> =>
            getBalances([address], 100).then(({ balances }) => balances[0]),
        getBalances,
        getConsistency: createCheckConsistency(httpClient),
        getLatestInclusion: createGetLatestInclusion(httpClient),
        findTransactions: createFindTransactions(httpClient),
        sendTrytes: createSendTrytes(httpClient),
        setSettings: httpClient.setSettings,
    }
}

export function addressGeneration(addressGenerationParams: AddressGenerationParams) {
    const { seed, persistence, timeSource } = addressGenerationParams
    const { nextIndex, writeCDA } = persistence

    return {
        generateCDA(cdaParams: CDAParams) {
            if (!cdaParams) {
                throw new Error(
                    'Provide an object with conditions for the CDA: { timeoutAt, [multiUse], [exeptectedAmount], [security=2] }'
                )
            }

            const { timeoutAt, expectedAmount, multiUse } = cdaParams

            return Promise.try(() => timeSource().then(currentTime => verifyCDAParams(currentTime, cdaParams)))
                .then(nextIndex)
                .then(index => {
                    const security = cdaParams.security || addressGenerationParams.security

                    return serializeCDAInput({
                        address: signingAddress(digests(key(subseed(seed, tritsToValue(index)), security))),
                        index,
                        security,
                        timeoutAt,
                        multiUse,
                        expectedAmount,
                    })
                })
                .tap(writeCDA)
                .then(deserializeCDA)
        },
    }
}

interface CDAInputs {
    inputs: CDAInput[]
    totalBalance: number
}

export function transactionIssuance(
    this: any,
    { seed, deposits, persistence, network, timeSource, now }: TransactionIssuanceParams
) {
    const { getBalance } = network
    const prepareTransfers = createPrepareTransfers(undefined, now)

    const transactionIssuer = {
        sendToCDA(cdaTransfer: CDATransfer): Promise<ReadonlyArray<Trytes>> {
            if (!cdaTransfer) {
                throw new Error(
                    'Provide an object with conditions and value for the CDA transfer: { timeoutAt, [multiUse], [exeptectedAmount], [security=2], value }'
                )
            }
            return Promise.try(() => timeSource().then(currentTime => verifyCDATransfer(currentTime, cdaTransfer)))
                .then(() => accumulateInputs(cdaTransfer.value))
                .then(({ inputs, totalBalance }) => {
                    const remainder = totalBalance - cdaTransfer.value

                    return generateRemainderAddress(remainder).then(remainderAddress =>
                        prepareTransfers(
                            seed,
                            [
                                {
                                    address: cdaTransfer.address.slice(0, -(CDA_CHECKSUM_LENGTH / TRYTE_WIDTH)),
                                    value: cdaTransfer.value,
                                },
                            ],
                            {
                                inputs: inputs.slice().map(input => ({
                                    address: tritsToTrytes(input.address),
                                    keyIndex: tritsToValue(input.index),
                                    security: input.security as number,
                                    balance: input.balance as number,
                                })),
                                remainderAddress,
                            }
                        ).tap(trytes => persistence.writeBundle(bundleTrytesToBundleTrits(trytes)))
                    )
                })
        },
    }

    function accumulateInputs(
        threshold: number,
        acc: CDAInputs = { inputs: [], totalBalance: 0 },
        buffer: Int8Array[] = []
    ): Promise<CDAInputs> {
        if (deposits.inboundLength() === 0) {
            buffer.forEach(deposits.write)
            throw new Error('Insufficient balance')
        }

        return deposits.read().then(cda =>
            timeSource().then(currentTime => {
                const input = deserializeCDAInput(cda)

                return getBalance(tritsToTrytes(input.address)).then(balance => {
                    //
                    // Input selection Conditions
                    //
                    // The following strategy is blocking execution because it awaits arrival of balance on inputs.
                    // A strategy leading to eventual input selection should be discussed.
                    // Such us inputs are selected prior to inclusion of funding transactions,
                    // and order of funding and withdrawing is not important.
                    // This would allow for _transduction_ of transfers instead of reduction of inputs.
                    //
                    if (balance > 0) {
                        if (input.expectedAmount && balance >= input.expectedAmount) {
                            acc.totalBalance += balance
                            acc.inputs.push({ ...input, balance })
                        } else if (input.multiUse && isExpired(currentTime, input)) {
                            acc.totalBalance += balance
                            acc.inputs.push({ ...input, balance })
                        } else if (!input.multiUse) {
                            acc.totalBalance += balance
                            acc.inputs.push({ ...input, balance })
                        }
                    } else if (isExpired(currentTime, input)) {
                        persistence.deleteCDA(cda)
                    } else {
                        buffer.push(cda)
                    }

                    return acc.totalBalance >= threshold ? acc : accumulateInputs(threshold, acc, buffer)
                })
            })
        )
    }

    function generateRemainderAddress(remainder: number): Promise<Trytes | undefined> {
        if (remainder === 0) {
            return Promise.resolve(undefined)
        }

        return persistence.nextIndex().then(index => {
            const security = 2
            const remainderAddress = signingAddress(digests(key(subseed(seed, tritsToValue(index)), security)))

            return persistence
                .writeCDA(
                    serializeCDAInput({
                        address: remainderAddress,
                        index,
                        security,
                        timeoutAt: 0,
                        multiUse: false,
                        expectedAmount: remainder,
                    })
                )
                .then(() => tritsToTrytes(remainderAddress))
        })
    }

    return transactionIssuer
}

export function transactionAttachment(this: any, params: TransactionAttachmentParams): TransactionAttachment {
    const { bundles, persistence, network } = params
    const { findTransactions, sendTrytes, getTrytes, getLatestInclusion, getConsistency } = network

    let reference: Transaction
    let running = false

    const routine = (attachParams: TransactionAttachmentStartParams) => {
        const { depth, minWeightMagnitude, maxDepth, delay } = attachParams

        bundles.read().then(bundle => {
            setTimeout(() => routine(attachParams), delay)

            findTransactions({ addresses: [tritsToTrytes(transactionAddress(bundle))] })
                .then(hashes => getTrytes(hashes))
                .then(pastAttachments =>
                    pastAttachments.filter(
                        trytes =>
                            tritsToTrytes(bundleHash(bundle)) ===
                            trytes.slice(
                                BUNDLE_OFFSET / TRYTE_WIDTH,
                                BUNDLE_OFFSET / TRYTE_WIDTH + BUNDLE_LENGTH / TRYTE_WIDTH
                            )
                    )
                )
                .then(pastAttachments =>
                    getLatestInclusion(
                        pastAttachments.map(trytes => tritsToTrytes(transactionHash(trytesToTrits(trytes))))
                    )
                )
                .then(inclusionStates => {
                    const trytes = bundleTritsToBundleTrytes(bundle)

                    if (inclusionStates.length === 0) {
                        sendTrytes(trytes.slice().reverse(), depth, minWeightMagnitude, reference.hash)
                            .tap(transactions => this.emit(events.attachToTangle, transactions))
                            .tap(([tail]) => {
                                if (!reference || !isAboveMaxDepth(reference.attachmentTimestamp, maxDepth)) {
                                    reference = tail
                                } else {
                                    return getConsistency([tail.hash]).then(consistent => {
                                        if (!consistent) {
                                            reference = tail
                                        }
                                    })
                                }
                            })
                    }

                    if (inclusionStates.indexOf(true) > -1) {
                        persistence.deleteBundle(bundleHash(bundle))
                        return
                    } else {
                        bundles.write(bundle)
                    }

                    if (!running) {
                        return
                    }
                })
                .catch(error => {
                    bundles.write(bundle)
                    this.emit(error)
                })
        })
    }

    return {
        startAttaching: (startParams: TransactionAttachmentStartParams) => {
            if (running) {
                return
            }

            routine(startParams)

            running = true
        },
        stopAttaching: () => {
            if (!running) {
                return
            }

            running = false
        },
    }
}

export function history({ persistence }: HistoryParams): History<CDA, ReadonlyArray<Trytes>> {
    return {
        // Streaming support will be added later
        readIncludedDeposits(options: PersistenceIteratorOptions) {
            const emitter = new EventEmitter()
            const stream = persistence.createHistoryReadStream({
                ...options,
                keys: false,
                values: true,
            })

            stream.on('data', value => {
                const trits = bytesToTrits(value)
                if (trits.length === CDA_LENGTH) {
                    emitter.emit('data', deserializeCDA(trits))
                }
            })
            stream.on('end', () => emitter.emit('end'))
            stream.on('close', () => emitter.emit('close'))
            stream.on('error', error => emitter.emit(error))

            return emitter
        },

        readIncludedTransfers(options: PersistenceIteratorOptions) {
            const emitter = new EventEmitter()
            const stream = persistence.createHistoryReadStream({
                ...options,
                keys: false,
                values: true,
            })

            stream.on('data', value => {
                const trits = bytesToTrits(value)

                if (trits.length !== 0 && isMultipleOfTransactionLength(trits.length)) {
                    emitter.emit('data', asTransactionObjects()(bundleTritsToBundleTrytes(trits)))
                }
            })
            stream.on('end', () => emitter.emit('end'))
            stream.on('close', () => emitter.emit('close'))
            stream.on('error', error => emitter.emit(error))

            return emitter
        },

        getDeposit(address: Trytes) {
            return persistence
                .historyRead(tritsToBytes(trytesToTrits(address)))
                .then(value => deserializeCDA(bytesToTrits(value)))
        },

        getTransfer(bundle: Trytes) {
            return persistence
                .historyRead(tritsToBytes(trytesToTrits(bundle)))
                .then(value => bundleTritsToBundleTrytes(bytesToTrits(value)))
        },

        deleteDeposit(address: Trytes) {
            return persistence.historyDelete(tritsToBytes(trytesToTrits(address)))
        },

        deleteTransfer(bundle: Trytes) {
            return persistence.historyDelete(tritsToBytes(trytesToTrits(bundle)))
        },
    }
}

export function createAccountPreset(test = {}): AccountPreset<CDAParams, CDA, ReadonlyArray<Trytes>> {
    return {
        persistencePath: './',
        stateAdapter: createPersistenceAdapter,
        historyAdapter: createPersistenceAdapter,
        provider: 'http://localhost:14265',
        network: networkAdapter,
        security: 2,
        addressGeneration,
        transactionIssuance,
        transactionAttachment,
        attachmentDelay: 1000 * 30,
        history,
        timeSource: () => Promise.resolve(Math.floor(Date.now() / 1000)),
        test,
    }
}

export const preset = createAccountPreset()

export const testPreset = createAccountPreset({
    now: () => 1,
})

function bundleTritsToBundleTrytes(trits: Int8Array): ReadonlyArray<Trytes> {
    const out = []
    for (let offset = 0; offset < trits.length; offset += TRANSACTION_LENGTH) {
        out.push(tritsToTrytes(trits.slice(offset, offset + TRANSACTION_LENGTH)))
    }
    return out
}

function bundleTrytesToBundleTrits(trytes: ReadonlyArray<Trytes>): Int8Array {
    const out = new Int8Array(trytes.length * TRANSACTION_LENGTH)

    for (let i = 0; i < trytes.length; i++) {
        out.set(trytesToTrits(trytes[i]), i * TRANSACTION_LENGTH)
    }

    return out
}

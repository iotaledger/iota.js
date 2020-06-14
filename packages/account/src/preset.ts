import {
    CDA,
    CDA_CHECKSUM_LENGTH,
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
import { tritsToTrytes, tritsToValue, TRYTE_WIDTH, trytesToTrits, valueToTrits } from '@iota/converter'
import {
    createAttachToTangle,
    createCheckConsistency,
    createFindTransactions,
    createGetBalances,
    createGetBundlesFromAddresses,
    createGetInclusionStates,
    createGetTransactionsToApprove,
    createGetTrytes,
    createIsAddressUsed,
    createPrepareTransfers,
    createSendTrytes,
    createStoreAndBroadcast,
    createWereAddressesSpentFrom,
    isAboveMaxDepth,
} from '@iota/core'
import { createHttpClient } from '@iota/http-client'
import { PersistenceBatchTypes } from '@iota/persistence'
import { createPersistenceAdapter } from '@iota/persistence-adapter-level'
import { address as signingAddress, digests, key, subseed } from '@iota/signing'
import {
    address as transactionAddress,
    bundle as bundleHash,
    BUNDLE_LENGTH,
    BUNDLE_OFFSET,
    TRANSACTION_LENGTH,
    transactionHash,
} from '@iota/transaction'
import { asTransactionObject } from '@iota/transaction-converter'
import * as Promise from 'bluebird'
import '../../typed-array'
import { Bundle, Hash, PersistencePutCommand, Transaction, Trytes } from '../../types'
import {
    AccountPreset,
    AddressGeneration,
    AddressGenerationParams,
    Network,
    NetworkParams,
    SENT_TO_ADDRESS_PREFIX,
    TransactionAttachment,
    TransactionAttachmentParams,
    TransactionAttachmentStartParams,
    TransactionIssuance,
    TransactionIssuanceParams,
} from './account'

export enum Events {
    selectInput = 'selectedInput',
    prepareTransfer = 'preparedTransfer',
    getTransactionsToApprove = 'getTransactionsToApprove',
    attachToTangle = 'attachToTangle',
    broadcast = 'broadcast',
    error = 'error',
}

export interface CDAAccount
    extends AddressGeneration<CDAParams, CDA>,
        TransactionIssuance<CDA, Bundle>,
        TransactionAttachment {}

export function networkAdapter({ provider }: NetworkParams): Network {
    const httpClient = createHttpClient({ provider })
    const getBalances = createGetBalances(httpClient)
    const getTrytes = createGetTrytes(httpClient)
    const getInclusionStates = createGetInclusionStates(httpClient)

    return {
        getTrytes: hashes => (hashes.length > 0 ? getTrytes(hashes) : Promise.resolve([])),
        getBalance: (address): Promise<number> => getBalances([address]).then(({ balances }) => balances[0]),
        getBalances,
        getConsistency: createCheckConsistency(httpClient),
        getInclusionStates: hashes => (hashes.length > 0 ? getInclusionStates(hashes) : Promise.resolve([])),
        getBundlesFromAddresses: createGetBundlesFromAddresses(httpClient, 'lib'),
        findTransactions: createFindTransactions(httpClient),
        sendTrytes: createSendTrytes(httpClient),
        setSettings: httpClient.setSettings,
        getTransactionsToApprove: createGetTransactionsToApprove(httpClient),
        attachToTangle: createAttachToTangle(httpClient),
        storeAndBroadcast: createStoreAndBroadcast(httpClient),
        wereAddressesSpentFrom: createWereAddressesSpentFrom(httpClient, 'lib'),
        isAddressUsed: createIsAddressUsed(httpClient),
    }
}

export function addressGeneration(this: any, addressGenerationParams: AddressGenerationParams) {
    const { seed, persistence, timeSource, network, now } = addressGenerationParams
    const prepareTransfers = createPrepareTransfers(undefined, now)
    const emitter = this // tslint:disable-line

    function generateCDA(cdaParams: CDAParams): Promise<CDA> {
        if (!cdaParams) {
            throw new Error(
                'Provide an object with conditions for the CDA: { timeoutAt, [multiUse], [exeptectedAmount], [security=2] }'
            )
        }

        const { timeoutAt, expectedAmount, multiUse } = cdaParams

        return Promise.try(() => timeSource().then(currentTime => verifyCDAParams(currentTime, cdaParams)))
            .then(persistence.increment)
            .then(index => {
                const security = cdaParams.security || addressGenerationParams.security
                const address = signingAddress(digests(key(subseed(seed, tritsToValue(index)), security)))
                const addressTrytes = tritsToTrytes(address)

                return network.isAddressUsed(addressTrytes).then(({ isUsed, isSpent, transactions }) => {
                    if (isUsed) {
                        return persistence
                            .put(
                                ['0', addressTrytes].join(':'),
                                isSpent
                                    ? new Int8Array(1)
                                    : serializeCDAInput({
                                          address,
                                          index,
                                          security,
                                          timeoutAt: 0,
                                      })
                            )
                            .then(() =>
                                emitter.emit('error', new Error('Skipping used address.'), {
                                    address: addressTrytes,
                                    isSpent,
                                    transactions,
                                })
                            )
                            .then(() => generateCDA(cdaParams))
                    }

                    const serializedCDA = serializeCDAInput({
                        address,
                        index,
                        security,
                        timeoutAt,
                        multiUse,
                        expectedAmount,
                    })

                    return persistence
                        .put(['0', addressTrytes].join(':'), serializedCDA)
                        .then(() => deserializeCDA(serializedCDA))
                        .then(cda =>
                            prepareTransfers('9'.repeat(81), [
                                {
                                    address: cda.address,
                                    value: 0,
                                },
                            ])
                                .then(trytes => {
                                    const bundleTrits = bundleTrytesToBundleTrits(trytes)
                                    return persistence.put(
                                        ['0', tritsToTrytes(bundleHash(bundleTrits))].join(':'),
                                        bundleTrits
                                    )
                                })
                                .then(() => cda)
                        )
                })
            })
    }

    return { generateCDA }
}

interface CDAInputs {
    inputs: CDAInput[]
    totalBalance: number
}

export function transactionIssuance(
    this: any,
    { seed, deposits, persistence, network, timeSource, now }: TransactionIssuanceParams
) {
    const { getBalance, wereAddressesSpentFrom } = network
    const prepareTransfers = createPrepareTransfers(undefined, now)
    const noChecksum = (address: string) => address.slice(0, -(CDA_CHECKSUM_LENGTH / TRYTE_WIDTH))

    const transactionIssuer = {
        sendToCDA: (cdaTransfer: CDATransfer): Promise<ReadonlyArray<Trytes>> => {
            if (!cdaTransfer) {
                throw new Error(
                    'Provide an object with conditions and value for the CDA transfer: { timeoutAt, [multiUse], [exeptectedAmount], [security=2], value }'
                )
            }

            return (cdaTransfer.multiUse === true
                ? Promise.resolve()
                : persistence
                      .get([SENT_TO_ADDRESS_PREFIX, noChecksum(cdaTransfer.address)].join(':'))
                      .then(() => {
                          throw new Error(
                              `Aborted sending twice to the same address; ${noChecksum(cdaTransfer.address)}`
                          )
                      })
                      .catch(error => {
                          if (!error.notFound) {
                              throw error
                          }
                      })
            ).then(() =>
                wereAddressesSpentFrom([noChecksum(cdaTransfer.address)]).then(([spent]) => {
                    if (spent) {
                        throw new Error(`Aborted sending to spent address; ${noChecksum(cdaTransfer.address)}`)
                    }

                    return Promise.try(() =>
                        persistence
                            .ready()
                            .then(timeSource)
                            .then(currentTime => verifyCDATransfer(currentTime, cdaTransfer))
                    )
                        .then(() => accumulateInputs(cdaTransfer.value))
                        .then(({ inputs, totalBalance }) => {
                            inputs.forEach(input => this.emit(Events.selectInput, { cdaTransfer, input }))
                            const remainder = totalBalance - cdaTransfer.value

                            return generateRemainderAddress(remainder).then(remainderAddress =>
                                prepareTransfers(
                                    seed,
                                    [
                                        {
                                            address: noChecksum(cdaTransfer.address),
                                            value: cdaTransfer.value,
                                        },
                                    ],
                                    {
                                        inputs: inputs.map(input => ({
                                            address: tritsToTrytes(input.address),
                                            keyIndex: tritsToValue(input.index),
                                            security: input.security,
                                            balance: input.balance as number,
                                        })),
                                        remainderAddress,
                                    }
                                )
                                    .tap(trytes => this.emit(Events.prepareTransfer, { cdaTransfer, trytes }))
                                    .tap(trytes =>
                                        persistence.batch([
                                            ...inputs.map(
                                                (input): PersistencePutCommand<string, Int8Array> => ({
                                                    type: PersistenceBatchTypes.put,
                                                    key: ['0', tritsToTrytes(input.address)].join(':'),
                                                    value: new Int8Array(1),
                                                })
                                            ),
                                            {
                                                type: PersistenceBatchTypes.put,
                                                key: [
                                                    '0',
                                                    tritsToTrytes(bundleHash(bundleTrytesToBundleTrits(trytes))),
                                                ].join(':'),
                                                value: bundleTrytesToBundleTrits(trytes),
                                            },
                                            {
                                                type: PersistenceBatchTypes.put,
                                                key: [SENT_TO_ADDRESS_PREFIX, noChecksum(cdaTransfer.address)].join(
                                                    ':'
                                                ),
                                                value: valueToTrits(cdaTransfer.timeoutAt),
                                            },
                                        ])
                                    )
                            )
                        })
                })
            )
        },
    }

    const emitter = this // tslint:disable-line

    function accumulateInputs(
        threshold: number,
        acc: CDAInputs = { inputs: [], totalBalance: 0 },
        buffer: Int8Array[] = []
    ): Promise<CDAInputs> {
        if (deposits.inboundLength() === 0) {
            buffer.forEach(deposits.write)
            acc.inputs.map(serializeCDAInput).forEach(deposits.write)
            throw new Error('Insufficient balance')
        }

        return deposits.read().then(cda =>
            timeSource()
                .then(currentTime => {
                    const input = deserializeCDAInput(cda)
                    const address = tritsToTrytes(input.address)

                    return getBalance(address).then(balance => {
                        //
                        // Input selection Conditions
                        //
                        // The following strategy is blocking execution because it awaits arrival of balance on inputs.
                        // A strategy leading to eventual input selection should be discussed.
                        // Such us inputs are selected prior to inclusion of funding transactions,
                        // and order of funding and withdrawing is not important.
                        // This would allow for _transduction_ of transfers instead of reduction of inputs.
                        //
                        if (
                            balance > 0 &&
                            ((input.expectedAmount && balance >= input.expectedAmount) ||
                                (input.multiUse && isExpired(currentTime, input)) ||
                                !input.multiUse)
                        ) {
                            return wereAddressesSpentFrom([address]).then(([spent]) => {
                                if (spent) {
                                    return persistence.put(['0', address].join(':'), new Int8Array(1)).then(() =>
                                        emitter.emit('error', new Error('Skipping spent input.'), {
                                            address,
                                            balance,
                                        })
                                    )
                                }

                                acc.inputs.push({ ...input, balance })
                                acc.totalBalance += balance
                            })
                        } else if (input.timeoutAt !== 0 && isExpired(currentTime, input)) {
                            return persistence.put(['0', address].join(':'), new Int8Array(1))
                        } else {
                            buffer.push(cda) // restore later
                        }
                    })
                })
                .catch(error => {
                    // TODO: add a "maxRetries" argument
                    deposits.write(cda) // enables retries after network/db errors
                    emitter.emit('error', error)
                })
                .then(() => (acc.totalBalance >= threshold ? acc : accumulateInputs(threshold, acc, buffer)))
        )
    }

    function generateRemainderAddress(remainder: number): Promise<Trytes | undefined> {
        if (remainder === 0) {
            return Promise.resolve(undefined)
        }

        return persistence.increment().then(index => {
            const security = 2
            const remainderAddress = signingAddress(digests(key(subseed(seed, tritsToValue(index)), security)))
            const addressTrytes = tritsToTrytes(remainderAddress)

            return network.isAddressUsed(addressTrytes).then(({ isUsed, isSpent, transactions }) => {
                if (isUsed) {
                    return persistence
                        .put(
                            ['0', addressGeneration].join(':'),
                            isSpent
                                ? new Int8Array(1)
                                : serializeCDAInput({
                                      address: remainderAddress,
                                      index,
                                      security,
                                      timeoutAt: 0,
                                  })
                        )
                        .then(() =>
                            emitter.emit('error', new Error('Dropped used address.'), {
                                address: addressTrytes,
                                isSpent,
                                transactions,
                            })
                        )
                        .then(() => generateRemainderAddress(remainder))
                }

                return persistence
                    .put(
                        ['0', tritsToTrytes(remainderAddress)].join(':'),
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
        })
    }

    return transactionIssuer
}

export function transactionAttachment(this: any, params: TransactionAttachmentParams): TransactionAttachment {
    const { bundles, persistence, network } = params
    const {
        findTransactions,
        storeAndBroadcast,
        getTransactionsToApprove,
        attachToTangle,
        getTrytes,
        getInclusionStates,
        getConsistency,
    } = network

    let reference: Transaction
    let running = false

    const attachToTangleRoutine = (attachParams: TransactionAttachmentStartParams) => {
        if (!running) {
            return false
        }

        const { depth, minWeightMagnitude, maxDepth, delay } = attachParams

        bundles.read().then(bundle =>
            Promise.resolve({ addresses: [tritsToTrytes(transactionAddress(bundle.slice(-TRANSACTION_LENGTH)))] })
                .then(findTransactions)
                .then(getTrytes)
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
                    pastAttachments.map(trytes => tritsToTrytes(transactionHash(trytesToTrits(trytes))))
                )
                .then(pastAttachmentHashes =>
                    getInclusionStates(pastAttachmentHashes).tap(inclusionStates => {
                        if (inclusionStates.indexOf(true) > -1) {
                            return persistence.del(['0', tritsToTrytes(bundleHash(bundle))].join(':'))
                        }

                        return Promise.all(pastAttachmentHashes.map(h => getConsistency([h]))).tap(consistencyStates =>
                            consistencyStates.indexOf(true) > -1
                                ? setTimeout(() => bundles.write(bundle), delay)
                                : getTransactionsToApprove(depth, reference ? reference.hash : undefined)
                                      .tap(transactionsToApprove =>
                                          this.emit(Events.getTransactionsToApprove, {
                                              trytes: bundleTritsToBundleTrytes(bundle),
                                              transactionsToApprove,
                                          })
                                      )
                                      .then(
                                          ({
                                              trunkTransaction,
                                              branchTransaction,
                                          }: {
                                              trunkTransaction: Hash
                                              branchTransaction: Hash
                                          }) =>
                                              attachToTangle(
                                                  trunkTransaction,
                                                  branchTransaction,
                                                  minWeightMagnitude,
                                                  bundleTritsToBundleTrytes(bundle)
                                              )
                                      )
                                      .tap(transactions =>
                                          this.emit(
                                              Events.attachToTangle,
                                              transactions.map(t => asTransactionObject(t))
                                          )
                                      )
                                      .then(attachedTrytes => storeAndBroadcast(attachedTrytes))
                                      .tap(attachedTrytes =>
                                          this.emit(Events.broadcast, attachedTrytes.map(t => asTransactionObject(t)))
                                      )
                                      .then(attachedTrytes => attachedTrytes.map(t => asTransactionObject(t)))
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

                                          setTimeout(() => bundles.write(bundle), delay)
                                      })
                        )
                    })
                )
                .tap(() => setTimeout(() => attachToTangleRoutine(attachParams), 1000))
                .catch(error => {
                    bundles.write(bundle)
                    this.emit(Events.error, error)
                })
        )
    }

    return {
        startAttaching: (startParams: TransactionAttachmentStartParams) => {
            if (running) {
                return
            }

            running = true

            attachToTangleRoutine(startParams)
        },
        stopAttaching: () => {
            if (!running) {
                return
            }

            running = false
        },
    }
}

export function createAccountPreset(test = {}): AccountPreset<CDAParams, CDA, ReadonlyArray<Trytes>> {
    return {
        persistencePath: './',
        persistenceAdapter: createPersistenceAdapter,
        provider: 'http://localhost:14265',
        network: networkAdapter,
        security: 2,
        addressGeneration,
        transactionIssuance,
        transactionAttachment,
        timeSource: () => Promise.resolve(Math.floor(Date.now() / 1000)),
        depth: 3,
        minWeightMagnitude: 9,
        delay: 1000 * 30,
        pollingDelay: 1000 * 30,
        maxDepth: 6,
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

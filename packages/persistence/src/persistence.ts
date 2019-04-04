import { asyncBuffer } from '@iota/async-buffer'
import { bytesToTrits, tritsToBytes, tritsToTrytes, tritsToValue, trytesToTrits, valueToTrits } from '@iota/converter'
import Kerl from '@iota/kerl'
import * as signing from '@iota/signing'
import { ADDRESS_LENGTH, bundle, isMultipleOfTransactionLength } from '@iota/transaction'
import * as Promise from 'bluebird'
import { EventEmitter } from 'events'
import * as errors from '../../errors'
import { isTrits } from '../../guards'
import {
    Persistence,
    PersistenceAdapter,
    PersistenceAdapterBatch,
    PersistenceBatch,
    PersistenceError,
    PersistenceIteratorOptions,
} from '../../types'

export { Persistence, PersistenceAdapter, PersistenceError, PersistenceIteratorOptions, PersistenceBatch }

const KEY_LENGTH = 243
const CDA_ADDRESS_OFFSET = 0
const CDA_ADDRESS_LENGTH = ADDRESS_LENGTH
const CDA_LENGTH = 243 + 27 + 81 + 27 + 35 + 1 // address + timeout_at + expected_amount + checksum + key_index + security

const KEY_INDEX_START = 0

export const storeID = (seed: Int8Array): string => {
    if (seed.length !== Kerl.HASH_LENGTH) {
        throw new Error(errors.ILLEGAL_SEED_LENGTH)
    }
    const sponge = new Kerl()
    const id = new Int8Array(Kerl.HASH_LENGTH)
    sponge.absorb(
        signing.address(signing.digests(signing.key(signing.subseed(seed, KEY_INDEX_START), 2))),
        0,
        Kerl.HASH_LENGTH
    )
    sponge.squeeze(id, 0, Kerl.HASH_LENGTH)
    return tritsToTrytes(id)
}

const verifyIndex = (index: Int8Array) => {
    const value = tritsToValue(index)
    if (value < KEY_INDEX_START || !Number.isSafeInteger(value)) {
        throw new Error(errors.ILLEGAL_KEY_INDEX)
    }
    return index
}

const increment = (index: Int8Array) => valueToTrits(tritsToValue(index) + 1)

const prefixes = {
    KEY_INDEX_PREFIX: tritsToBytes(trytesToTrits('KEY9INDEX')),
}

const events = {
    writeBundle: 'writeBundle',
    deleteBundle: 'deleteBundle',
    writeCDA: 'writeCDA',
    deleteCDA: 'deleteCDA',
}

export function persistence(this: any, persistenceAdapter: PersistenceAdapter): Persistence<Int8Array> {
    const indexBuffer = asyncBuffer<Int8Array>()
    let initialized = false

    const ready = () => {
        if (initialized) {
            return Promise.resolve()
        }

        initialized = true

        return persistenceAdapter
            .read(prefixes.KEY_INDEX_PREFIX)
            .then(bytesToTrits)
            .then(indexBuffer.write)
            .catch(error => {
                if (error.notFound) {
                    // Intialize index field in store.
                    const index = valueToTrits(KEY_INDEX_START)
                    return persistenceAdapter.write(prefixes.KEY_INDEX_PREFIX, tritsToBytes(index)).then(() => {
                        indexBuffer.write(index)
                        return index
                    })
                }

                throw error
            })
    }

    return Object.assign(
        this,
        {
            nextIndex: () =>
                ready()
                    .then(indexBuffer.read)
                    .then(verifyIndex)
                    .then(increment)
                    .then(index =>
                        persistenceAdapter
                            .write(prefixes.KEY_INDEX_PREFIX, tritsToBytes(index))
                            .then(() => indexBuffer.write(index))
                            .then(() => index)
                            .catch(error => {
                                // On error, restore the buffer value and rethrow.
                                indexBuffer.write(index)
                                throw error
                            })
                    ),

            writeBundle: (buffer: Int8Array) => {
                if (!isMultipleOfTransactionLength(buffer.length)) {
                    throw new RangeError(errors.ILLEGAL_BUNDLE_LENGTH)
                }

                return ready()
                    .then(() => persistenceAdapter.write(tritsToBytes(bundle(buffer)), tritsToBytes(buffer)))
                    .tap(() => this.emit(events.writeBundle, buffer))
            },

            deleteBundle: (buffer: Int8Array) => {
                if (!isMultipleOfTransactionLength(buffer.length)) {
                    throw new RangeError(errors.ILLEGAL_BUNDLE_LENGTH)
                }

                return ready()
                    .then(() => persistenceAdapter.delete(tritsToBytes(bundle(buffer))))
                    .tap(() => this.emit(events.deleteCDA, buffer))
            },

            readCDA: (address: Int8Array) => {
                if (address.length !== ADDRESS_LENGTH) {
                    throw new RangeError(errors.ILLEGAL_ADDRESS_LENGTH)
                }

                return ready()
                    .then(() => persistenceAdapter.read(tritsToBytes(address)))
                    .then(bytesToTrits)
            },

            writeCDA: (cda: Int8Array) => {
                if (cda.length !== CDA_LENGTH) {
                    throw new RangeError(errors.ILLEGAL_CDA_LENGTH)
                }

                return ready()
                    .then(() =>
                        persistenceAdapter.read(tritsToBytes(cda.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_LENGTH)))
                    )
                    .then(() => {
                        throw new Error(errors.CDA_ALREADY_IN_STORE)
                    })
                    .catch(error => {
                        if (error.notFound) {
                            return persistenceAdapter
                                .write(
                                    tritsToBytes(cda.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_LENGTH)),
                                    tritsToBytes(cda)
                                )
                                .tap(() => this.emit(events.writeCDA, cda))
                        }

                        throw error
                    })
            },

            deleteCDA: (cda: Int8Array) => {
                if (cda.length !== CDA_LENGTH) {
                    throw new RangeError(errors.ILLEGAL_CDA_LENGTH)
                }

                return ready().then(() =>
                    persistenceAdapter
                        .delete(tritsToBytes(cda.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_LENGTH)))
                        .tap(() => this.emit(events.deleteCDA, cda))
                )
            },

            batch: (ops: ReadonlyArray<PersistenceBatch<Int8Array>>) => {
                for (const { type, value } of ops) {
                    if (!events.hasOwnProperty(type)) {
                        throw new Error(errors.ILLEGAL_BATCH)
                    }

                    if (
                        (type === events.writeBundle || type === events.deleteBundle) &&
                        !isMultipleOfTransactionLength(value.length)
                    ) {
                        throw new RangeError('ILLEGAL_BUNDLE_LENGTH')
                    }

                    if ((type === events.writeCDA || type === events.deleteCDA) && value.length !== CDA_LENGTH) {
                        throw new RangeError('ILLEGAL_CDA_LENGTH')
                    }
                }

                return ready()
                    .then(() =>
                        persistenceAdapter.batch(
                            ops.map(
                                ({ type, value }): PersistenceAdapterBatch<Buffer, Buffer> => {
                                    switch (type) {
                                        case 'writeBundle':
                                            return {
                                                type: 'write',
                                                key: tritsToBytes(bundle(value)),
                                                value: tritsToBytes(value),
                                            }
                                        case 'deleteBundle':
                                            return {
                                                type: 'delete',
                                                key: tritsToBytes(bundle(value)),
                                            }

                                        case 'writeCDA':
                                            return {
                                                type: 'write',
                                                key: tritsToBytes(value.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_LENGTH)),
                                                value: tritsToBytes(value),
                                            }
                                        case 'deleteCDA':
                                            return {
                                                type: 'delete',
                                                key: tritsToBytes(value.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_LENGTH)),
                                            }
                                    }
                                }
                            )
                        )
                    )
                    .tap(() => ops.forEach(({ type, value }) => this.emit(events[type], value)))
            },

            createReadStream: (
                onData: (data: Int8Array) => any,
                onError: (error: Error) => any,
                onClose: () => any,
                onEnd: () => any,
                options?: PersistenceIteratorOptions<Int8Array>
            ) =>
                persistenceAdapter.createReadStream(
                    value => {
                        if (isMultipleOfTransactionLength(value.length) || value.length === CDA_LENGTH) {
                            onData(bytesToTrits(value))
                        }
                    },
                    onError,
                    onClose,
                    onEnd,
                    { reverse: true, ...(options || {}) }
                ),
        },
        EventEmitter.prototype
    )
}

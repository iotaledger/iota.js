import { asyncBuffer } from '@iota/async-buffer'
import { tritsToTrytes, tritsToValue, trytesToTrits, valueToTrits } from '@iota/converter'
import Kerl from '@iota/kerl'
import * as signing from '@iota/signing'
import { ADDRESS_LENGTH, bundle, isMultipleOfTransactionLength } from '@iota/transaction'
import * as Promise from 'bluebird'
import { EventEmitter } from 'events'
import * as errors from '../../errors'
import { isTrits } from '../../guards'
import { Persistence, PersistenceAdapter, PersistenceError, PersistenceIteratorOptions } from '../../types'

export { Persistence, PersistenceAdapter, PersistenceError, PersistenceIteratorOptions }

const KEY_LENGTH = 243
const CDA_LENGTH = 243 + 27 + 81 + 27 + 35 + 1 // address + timeout_at + expected_amount + checksum + key_index + security

const KEY_INDEX_START = 0

const events = {
    writeBundle: 'writeBundle',
    deleteBundle: 'deleteBundle',
    writeCDA: 'writeCDA',
    deleteCDA: 'deleteCDA',
}

const prefixes = {
    KEY_INDEX_PREFIX: trytesToTrits('KEY9INDEX'),
    CDA_PREFIX: trytesToTrits('CDA'),
}

const mergePrefix = (prefix: Int8Array, key: Int8Array): Int8Array => {
    const out = new Int8Array(prefix.length + key.length)
    out.set(prefix)
    out.set(key, prefix.length)
    return out
}

const verifyIndex = (index: Int8Array) => {
    const value = tritsToValue(index)
    if (value < KEY_INDEX_START || !Number.isSafeInteger(value)) {
        throw new Error(errors.ILLEGAL_KEY_INDEX)
    }
    return index
}

const increment = (index: Int8Array) => valueToTrits(tritsToValue(index) + 1)

export const storeID = (seed: Int8Array): string => {
    if (seed.length !== Kerl.HASH_LENGTH) {
        throw new Error(errors.ILLEGAL_SEED_LENGTH)
    }
    const sponge = new Kerl()
    const id = new Int8Array(Kerl.HASH_LENGTH)
    sponge.absorb(signing.address(signing.digests(signing.key(signing.subseed(seed, 0), 2))), 0, Kerl.HASH_LENGTH)
    sponge.squeeze(id, 0, Kerl.HASH_LENGTH)
    return tritsToTrytes(id)
}

export function persistence(this: any, persistenceAdapter: PersistenceAdapter): Promise<Persistence> {
    const keyIndexBuffer = asyncBuffer<Int8Array>()
    const init = () =>
        persistenceAdapter
            .read(prefixes.KEY_INDEX_PREFIX)
            .then(keyIndexBuffer.write)
            .catch(error => {
                if (error.notFound) {
                    // Intialize index field in store.
                    const index = valueToTrits(KEY_INDEX_START)
                    return persistenceAdapter.write(prefixes.KEY_INDEX_PREFIX, index).then(() => {
                        keyIndexBuffer.write(index)
                        return index
                    })
                }

                throw error
            })

    return init().then(() =>
        Object.assign(
            this,
            {
                nextIndex: () => {
                    return keyIndexBuffer
                        .read()
                        .then(verifyIndex)
                        .then(increment)
                        .then(index =>
                            persistenceAdapter
                                .write(prefixes.KEY_INDEX_PREFIX, index)
                                .then(() => keyIndexBuffer.write(index))
                                .then(() => index)
                                .catch(error => {
                                    // On error, restore the buffer value and rethrow.
                                    keyIndexBuffer.write(index)
                                    throw error
                                })
                        )
                },

                writeBundle: (buffer: Int8Array) => {
                    if (!isMultipleOfTransactionLength(buffer.length)) {
                        throw new RangeError(errors.ILLEGAL_BUNDLE_LENGTH)
                    }
                    return persistenceAdapter.write(bundle(buffer), buffer).then(() => {
                        this.emit(events.writeBundle, buffer)
                    })
                },
                deleteBundle: (buffer: Int8Array) => {
                    if (!isMultipleOfTransactionLength(buffer.length)) {
                        throw new RangeError(errors.ILLEGAL_BUNDLE_LENGTH)
                    }
                    return persistenceAdapter.delete(bundle(buffer)).then(() => {
                        this.emit(events.deleteCDA, buffer)
                    })
                },

                readCDA: (address: Int8Array) => persistenceAdapter.read(mergePrefix(prefixes.CDA_PREFIX, address)),
                writeCDA: (address: Int8Array, cda: Int8Array) => {
                    if (address.length !== ADDRESS_LENGTH) {
                        throw new Error(errors.ILLEGAL_ADDRESS_LENGTH)
                    }

                    if (cda.length !== CDA_LENGTH) {
                        throw new Error(errors.ILLEGAL_CDA_LENGTH)
                    }

                    return persistenceAdapter.write(mergePrefix(prefixes.CDA_PREFIX, address), cda).then(() => {
                        this.emit(events.writeCDA, cda)
                    })
                },
                deleteCDA: (address: Int8Array) => {
                    if (address.length !== ADDRESS_LENGTH) {
                        throw new Error(errors.ILLEGAL_ADDRESS_LENGTH)
                    }

                    return persistenceAdapter.read(mergePrefix(prefixes.CDA_PREFIX, address)).then(cda =>
                        persistenceAdapter.delete(mergePrefix(prefixes.CDA_PREFIX, address)).then(() => {
                            this.emit(events.deleteCDA, cda)
                        })
                    )
                },

                createReadStream: (
                    onData: (data: { key: Int8Array; value: Int8Array }) => any,
                    onError: (error: Error) => any,
                    onClose: () => any,
                    onEnd: () => any,
                    options?: PersistenceIteratorOptions<Int8Array>
                ) =>
                    persistenceAdapter.createReadStream(
                        ({ key, value }) => {
                            if (isMultipleOfTransactionLength(value.length) || value.length === CDA_LENGTH) {
                                const buffer = Int8Array.from(key)
                                const length = buffer.length
                                const offset = length - KEY_LENGTH
                                onData({
                                    key: buffer.slice(offset, length),
                                    value: Int8Array.from(value),
                                })
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
    )
}

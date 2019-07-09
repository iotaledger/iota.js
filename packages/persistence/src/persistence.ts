import { asyncBuffer } from '@iota/async-buffer'
import { tritsToTrytes, tritsToValue, valueToTrits } from '@iota/converter'
import Kerl from '@iota/kerl'
import * as Signing from '@iota/signing'
import * as Promise from 'bluebird'
import { EventEmitter } from 'events'
import * as errors from '../../errors'
import { isTrits } from '../../guards'
import {
    Persistence,
    PersistenceAdapter,
    PersistenceBatch,
    PersistenceBatchTypes,
    PersistenceError,
    PersistenceIteratorOptions,
} from '../../types'

export {
    Persistence,
    PersistenceAdapter,
    PersistenceBatch,
    PersistenceBatchTypes,
    PersistenceError,
    PersistenceIteratorOptions,
}

const KEY_INDEX_START = 0
const KEY_INDEX_PREFIX = 'key_index'

export function createPersistence(adapter: PersistenceAdapter<string, Int8Array>): Persistence<string, Int8Array> {
    let initialized: Promise<void>
    const source = adapter.createReadStream()
    const indexBuffer = asyncBuffer<Int8Array>()

    const ready = () => {
        if (initialized === undefined) {
            initialized = new Promise((resolve, reject) => {
                source.on('end', resolve)
                source.on('error', reject)
            }).then(() =>
                adapter
                    .get(KEY_INDEX_PREFIX)
                    .then(indexBuffer.write)
                    .catch(error => {
                        if (error.notFound) {
                            // Intialize index field in store.
                            const index = valueToTrits(KEY_INDEX_START)

                            return adapter.put(KEY_INDEX_PREFIX, index).then(() => {
                                indexBuffer.write(index)
                            })
                        }

                        throw error
                    })
            )
        }

        return initialized
    }

    function persistenceMixin(this: any) {
        return Object.assign(
            this,
            {
                ready,
                increment: () =>
                    ready()
                        .then(() => indexBuffer.read())
                        .then(index => {
                            if (tritsToValue(index) < KEY_INDEX_START || !Number.isSafeInteger(tritsToValue(index))) {
                                throw new Error(errors.ILLEGAL_KEY_INDEX)
                            }
                            return index
                        })
                        .then(index => valueToTrits(tritsToValue(index) + 1))
                        .then(index =>
                            adapter
                                .put(KEY_INDEX_PREFIX, index)
                                .then(() => indexBuffer.write(index))
                                .then(() => index)
                                .catch(error => {
                                    // On error, restore the buffer value and rethrow.
                                    indexBuffer.write(index)
                                    throw error
                                })
                        ),

                get: (key: string) => ready().then(() => adapter.get(key)),

                put: (key: string, value: Int8Array) =>
                    ready()
                        .then(() => adapter.put(key, value))
                        .tap(() =>
                            this.emit('data', {
                                key,
                                value,
                            })
                        ),

                del: (key: string) => ready().then(() => adapter.del(key)),

                batch: (commands: PersistenceBatch<string, Int8Array>) =>
                    ready()
                        .then(() => adapter.batch(commands))
                        .tap(() =>
                            commands.filter(command => {
                                if (command.type === PersistenceBatchTypes.put) {
                                    this.emit('data', {
                                        key: command.key,
                                        value: command.value,
                                    })
                                }
                            })
                        ),
                open: adapter.open,
                close: adapter.close,
            },
            EventEmitter.prototype
        )
    }

    const persistence = persistenceMixin.apply({})

    ready().then(() => persistence.emit('ready'))
    source.on('data', data => persistence.emit('data', data))

    return persistence
}

export const generatePersistenceID = (seed: Int8Array): string => {
    if (!isTrits(seed) || seed.length !== Kerl.HASH_LENGTH) {
        throw new Error(errors.ILLEGAL_SEED_LENGTH)
    }

    const { address, digests, key, subseed } = Signing
    const sponge = new Kerl()
    const index = KEY_INDEX_START
    const security = 2
    const id = new Int8Array(Kerl.HASH_LENGTH)

    sponge.absorb(address(digests(key(subseed(seed, index), security))), 0, Kerl.HASH_LENGTH)
    sponge.squeeze(id, 0, Kerl.HASH_LENGTH)

    return tritsToTrytes(id)
}

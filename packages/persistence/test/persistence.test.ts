import { asyncBuffer } from '@iota/async-buffer'
import { bytesToTrits, tritsToBytes, tritsToTrytes, tritsToValue, trytesToTrits, valueToTrits } from '@iota/converter'
import Kerl from '@iota/kerl'
import { persistenceAdapter } from '@iota/persistence-adapter-level'
import { add } from '@iota/signing'
import { ADDRESS_LENGTH, bundle, TRANSACTION_LENGTH } from '@iota/transaction'
import { describe, Try } from 'riteway'
import * as errors from '../../errors'
import { PersistenceAdapter, PersistenceError } from '../../types'
import { persistence as createPersistence, storeID } from '../src/persistence'

const CDA_LENGTH = 243 + 27 + 81 + 27 + 35 + 1
const CDA_ADDRESS_OFFSET = 0
const CDA_ADDRESS_LENGTH = ADDRESS_LENGTH

const KEY_INDEX_PREFIX = tritsToBytes(trytesToTrits('KEY9INDEX'))

let numberOfStores = -1
const seed = new Int8Array(243)

const isolate = () => {
    numberOfStores++

    const adapter = persistenceAdapter({
        storeID: storeID(add(seed, valueToTrits(numberOfStores))),
        storePath: './test/temp',
    })

    return {
        persistence: createPersistence(adapter),
        adapter,
    }
}

describe('storeId(seed: Int8Array): string', async assert => {
    assert({
        given: 'seed.length < 243',
        should: 'throw Error',
        actual: Try(storeID, new Int8Array(Kerl.HASH_LENGTH - 1)),
        expected: new Error(errors.ILLEGAL_SEED_LENGTH),
    })

    assert({
        given: 'seed.length > 243',
        should: 'throw Error',
        actual: Try(storeID, new Int8Array(Kerl.HASH_LENGTH + 1)),
        expected: new Error(errors.ILLEGAL_SEED_LENGTH),
    })

    assert({
        given: 'valid seed',
        should: 'should produce correct storeID',
        actual: storeID(new Int8Array(Kerl.HASH_LENGTH)),
        expected: 'WUPANEMSQXZGVLYUKXFEOHQQMPBRIQVJKHFBGMIRDMRFCTLILLBECYEFFLFVOZMJRKGGFDHBNCSQUOODD',
    })
})

describe('persistence.nextIndex()', async assert => {
    assert({
        given: 'a read fault',
        should: 'throw an error',
        actual: await (async () => {
            const { adapter } = isolate()
            const faultyAdapter: any = {
                ...adapter,
                read: (key: Int8Array) => Promise.reject(new Error('err...')),
            }

            try {
                return await createPersistence(faultyAdapter).nextIndex()
            } catch (error) {
                return error.message
            }
        })(),
        expected: new Error('err...').message,
    })

    assert({
        given: 'a write fault',
        should: 'throw an error',
        actual: await (async () => {
            numberOfStores += 1
            const adapter = persistenceAdapter({
                storeID: storeID(add(seed, valueToTrits(numberOfStores))),
                storePath: './test/temp',
            })

            await adapter.write(KEY_INDEX_PREFIX, tritsToBytes(valueToTrits(100000)))

            let i = 0

            const write = adapter.write
            const faultyAdapter: PersistenceAdapter = {
                ...adapter,
                write: (key, value): any => {
                    if (i !== 0) {
                        return adapter.write(key, value)
                    } else {
                        i += 1
                        return Promise.reject(new Error('err...'))
                    }
                },
            }

            const persistence = createPersistence(faultyAdapter)

            try {
                await persistence.nextIndex()
            } catch (error) {
                return {
                    error: error.message,
                    index: await persistence.nextIndex(),
                }
            }
        })(),
        expected: {
            error: new Error('err...').message,
            index: valueToTrits(100002),
        },
    })

    assert({
        given: 'a faulty key index record',
        should: 'throw error',
        actual: await (async () => {
            numberOfStores += 1

            const adapter = persistenceAdapter({
                storeID: storeID(add(seed, valueToTrits(numberOfStores))),
                storePath: './test/temp',
            })

            await adapter.write(KEY_INDEX_PREFIX, tritsToBytes(valueToTrits(-1)))
            const persistence = createPersistence(adapter)

            try {
                await persistence.nextIndex()
            } catch (error) {
                return error
            }
        })(),
        expected: new Error(errors.ILLEGAL_KEY_INDEX),
    })

    const numberOfActions = 50000
    const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t))

    assert({
        given: 'store = leveldb',
        should: 'increment index atomically',
        actual: await (async () => {
            const { adapter, persistence } = isolate()
            const delayLowerBound = 1
            const delayUpperBound = 30

            const results = await Promise.all(
                new Array(numberOfActions).fill(undefined).map(async () => {
                    await delay(Math.floor(Math.random() * delayUpperBound) + delayLowerBound)
                    return persistence.nextIndex()
                })
            )
            const persistedIndex = await adapter.read(KEY_INDEX_PREFIX).then(bytesToTrits)

            return {
                results: results.map(trits => tritsToValue(trits)).sort((a, b) => a - b),
                persistedIndex,
            }
        })(),
        expected: {
            results: new Array(numberOfActions).fill(0).map((_, i) => i + 1),
            persistedIndex: valueToTrits(numberOfActions),
        },
    })
})

describe('persistence.writeBundle(bundle: Int8Array) -> adapter.read(key: Int8Array): Int8Array', async assert => {
    assert({
        given: 'bundle of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(isolate().persistence.writeBundle, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_BUNDLE_LENGTH),
    })

    assert({
        given: 'a written bundle',
        should: 'read it',
        actual: await (async () => {
            const { adapter, persistence } = isolate()
            const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)
            await persistence.writeBundle(buffer)
            return adapter.read(tritsToBytes(bundle(buffer))).then(bytesToTrits)
        })(),
        expected: new Int8Array(TRANSACTION_LENGTH * 2).fill(1),
    })
})

describe('persistence.writeBundle(buffer: Int8Array) -> persistence.deleteBundle(buffer: Int8Array) -> adapter.read(key: Buffer): Buffer', async assert => {
    assert({
        given: 'bundle of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(isolate().persistence.deleteBundle, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_BUNDLE_LENGTH),
    })

    assert({
        given: 'a written bundle',
        should: 'delete it',
        actual: await (async () => {
            const { adapter, persistence } = isolate()
            const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)
            let wroteAndDeleted = false
            try {
                await persistence.writeBundle(buffer)
                await persistence.deleteBundle(buffer)

                wroteAndDeleted = true

                await adapter.read(tritsToBytes(bundle(buffer)))
            } catch (error) {
                if (wroteAndDeleted && error.notFound) {
                    return 'ok'
                }

                throw error
            }
        })(),
        expected: 'ok',
    })
})

describe('persistence.writeCDA(cda: Int8Array) -> persistence.readCDA(address: Int8Array): Int8Array', async assert => {
    assert({
        given: 'CDA of illegal length (cda.length < expected)',
        should: 'throw RangeError',
        actual: Try(isolate().persistence.writeCDA, new Int8Array(CDA_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_CDA_LENGTH),
    })

    assert({
        given: 'CDA of illegal length (cda.length > expected)',
        should: 'throw RangeError',
        actual: Try(isolate().persistence.writeCDA, new Int8Array(CDA_LENGTH + 1)),
        expected: new RangeError(errors.ILLEGAL_CDA_LENGTH),
    })

    assert({
        given: 'a written cda',
        should: 'read it',
        actual: await (async () => {
            const { persistence } = isolate()
            const cda = new Int8Array(CDA_LENGTH).fill(1)

            await persistence.writeCDA(cda)

            return persistence.readCDA(cda.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_LENGTH))
        })(),
        expected: new Int8Array(CDA_LENGTH).fill(1),
    })

    assert({
        given: 'a written cda',
        should: 'throw Error on overwrite attemp',
        actual: await (async () => {
            const { persistence } = isolate()
            const cda = new Int8Array(CDA_LENGTH).fill(1)

            await persistence.writeCDA(cda)

            try {
                await persistence.writeCDA(cda)
            } catch (error) {
                return error
            }
        })(),
        expected: new Error(errors.CDA_ALREADY_IN_STORE),
    })
})

describe('persistence.readCDA(address: Int8Array)', async assert => {
    assert({
        given: 'address of illegal length (address.length < expected)',
        should: 'throw RangeError',
        actual: Try(isolate().persistence.readCDA, new Int8Array(ADDRESS_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'address of illegal length (address.length > expected)',
        should: 'throw RangeError',
        actual: Try(isolate().persistence.readCDA, new Int8Array(ADDRESS_LENGTH + 1)),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })
})

describe('persistence.writeCDA(cda: Int8Array) -> persistence.deleteCDA(address: Int8Array) -> persistence.readCDA(address: Int8Array): Int8Array', async assert => {
    assert({
        given: 'illegal CDA length (cda.length < expected)',
        should: 'throw RangeError',
        actual: Try(isolate().persistence.deleteCDA, new Int8Array(CDA_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'illegal CDA length (cda.length > expected)',
        should: 'throw RangeError',
        actual: Try(await isolate().persistence.deleteCDA, new Int8Array(CDA_LENGTH + 1)),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'a written CDA',
        should: 'delete it',
        actual: await (async () => {
            const { persistence } = isolate()
            const cda = new Int8Array(CDA_LENGTH).fill(1)
            let wroteAndDeleted = false

            try {
                await persistence.writeCDA(cda)
                await persistence.deleteCDA(cda)

                wroteAndDeleted = true

                return await persistence.readCDA(cda.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_LENGTH))
            } catch (error) {
                if (wroteAndDeleted && error.notFound) {
                    return 'ok'
                }
                throw error
            }
        })(),
        expected: 'ok',
    })
})

describe('persistence.batch(ops: ReadonlyArray<PersistenceAdapterBatch<V, K>>) -> adapter.read(key: K))', async assert => {
    assert({
        given: 'Illegal bundle in batch write',
        should: 'throw RangeError',
        actual: Try(isolate().persistence.batch as any, [
            {
                type: 'writeBundle',
                value: new Int8Array(TRANSACTION_LENGTH * 2 - 1),
            },
        ]),
        expected: new RangeError(errors.ILLEGAL_BUNDLE_LENGTH),
    })

    assert({
        given: 'Illegal bundle in batch delete',
        should: 'throw RangeError',
        actual: Try(isolate().persistence.batch as any, [
            {
                type: 'deleteBundle',
                value: new Int8Array(TRANSACTION_LENGTH * 2 - 1),
            },
        ]),
        expected: new RangeError(errors.ILLEGAL_BUNDLE_LENGTH),
    })

    assert({
        given: 'Illegal CDA in batch write',
        should: 'throw RangeError',
        actual: Try(isolate().persistence.batch as any, [
            {
                type: 'writeCDA',
                value: new Int8Array(CDA_LENGTH - 1).fill(1),
            },
        ]),
        expected: new RangeError(errors.ILLEGAL_BUNDLE_LENGTH),
    })

    assert({
        given: 'Illegal CDA in batch delete',
        should: 'throw RangeError',
        actual: Try(isolate().persistence.batch as any, [
            {
                type: 'deleteCDA',
                value: new Int8Array(CDA_LENGTH - 1).fill(1),
            },
        ]),
        expected: new RangeError(errors.ILLEGAL_BUNDLE_LENGTH),
    })

    assert({
        given: 'Illegal batch op',
        should: 'throw Error',
        actual: Try(isolate().persistence.batch as any, [
            {
                type: 'unknown',
                value: new Int8Array(CDA_LENGTH),
            } as any,
        ]),
        expected: new Error(errors.ILLEGAL_BATCH),
    })

    const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)
    const bufferB = new Int8Array(TRANSACTION_LENGTH * 2).fill(-1)
    const cda = new Int8Array(CDA_LENGTH).fill(0)
    const cdaB = new Int8Array(CDA_LENGTH).fill(0)
    cdaB[0] = 1

    assert({
        given: 'persisted bundle & cda',
        should: 'batch delete and persist a new ones',
        actual: await (async () => {
            const { persistence, adapter } = isolate()

            await persistence.writeBundle(buffer)
            await persistence.writeCDA(cda)

            await persistence.batch([
                {
                    type: 'deleteBundle' as any,
                    value: buffer,
                },
                {
                    type: 'writeBundle' as any,
                    value: bufferB,
                },
                {
                    type: 'deleteCDA' as any,
                    value: cda,
                },
                {
                    type: 'writeCDA' as any,
                    value: cdaB,
                },
            ] as any)

            try {
                await adapter.read(tritsToBytes(bundle(bufferB)))
            } catch (error) {
                if (!error.notFound) {
                    throw error
                }
            }

            try {
                await persistence.readCDA(cda.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_LENGTH))
            } catch (error) {
                if (!error.notFound) {
                    throw error
                }
            }

            return [
                await adapter.read(tritsToBytes(bundle(bufferB))).then(bytesToTrits),
                await persistence.readCDA(cdaB.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_LENGTH)),
            ]
        })(),
        expected: [bufferB, cdaB],
    })
})

describe('persistence.createReadStream(onData: (data: V) => any): NodeJS.ReadStream', async assert => {
    const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(-1)
    const address = new Int8Array(ADDRESS_LENGTH).fill(1)
    const cda = new Int8Array(CDA_LENGTH).fill(1)
    const expected = [buffer, cda]

    assert({
        given: 'persisted key index, bundle & CDA',
        should: 'read bundle & CDA',
        actual: await (async () => {
            const { adapter, persistence } = isolate()

            await adapter.write(KEY_INDEX_PREFIX, tritsToBytes(valueToTrits(9)))
            await persistence.writeBundle(buffer)
            await persistence.writeCDA(cda)

            return new Promise((resolve, reject) => {
                const result: any = []
                const onData = (data: any) => result.push(data)
                const onError = (error: any) => reject(error)
                const onClose = () => {} // tslint:disable-line
                const onEnd = () => resolve(result)
                persistence.createReadStream(onData, onError, onClose, onEnd)
            })
        })(),
        expected,
    })
})

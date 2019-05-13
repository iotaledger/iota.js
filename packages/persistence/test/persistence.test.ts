import { asyncBuffer } from '@iota/async-buffer'
import { bytesToTrits, tritsToBytes, tritsToTrytes, tritsToValue, trytesToTrits, valueToTrits } from '@iota/converter'
import Kerl from '@iota/kerl'
import {
    createPersistenceAdapter,
    CreatePersistenceAdapter,
    PersistenceAdapterParams,
} from '@iota/persistence-adapter-level'
import { add } from '@iota/signing'
import { ADDRESS_LENGTH, bundle, TRANSACTION_LENGTH } from '@iota/transaction'
import * as BluebirdPromise from 'bluebird'
import { describe, Try } from 'riteway'
import * as errors from '../../errors'
import {
    createPersistence,
    generatePersistenceID,
    PersistenceBatchTypes,
    PersistenceParams,
    streamToBuffers,
} from '../src/persistence'

const CDA_LENGTH = 243 + 27 + 27 + 1 + 81 + 35 + 1
const CDA_ADDRESS_OFFSET = 0
const CDA_ADDRESS_LENGTH = ADDRESS_LENGTH
const CDAddress = (cda: Int8Array) => cda.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_OFFSET + CDA_ADDRESS_LENGTH)

const KEY_INDEX_PREFIX = tritsToBytes(trytesToTrits('KEY9INDEX'))

const isolate = (() => {
    const seed = new Int8Array(243)
    let i = -1

    return (params: Partial<PersistenceParams> = {}) => {
        i++

        return createPersistence({
            persistenceID: generatePersistenceID(add(seed, valueToTrits(i))),
            persistencePath: './test/temp',
            stateAdapter: createPersistenceAdapter,
            historyAdapter: createPersistenceAdapter,
            ...params,
        })
    }
})()

describe('generatePersistenceID(seed: Int8Array): string', async assert => {
    assert({
        given: 'seed.length < 243',
        should: 'throw Error',
        actual: Try(generatePersistenceID, new Int8Array(Kerl.HASH_LENGTH - 1)),
        expected: new Error(errors.ILLEGAL_SEED_LENGTH),
    })

    assert({
        given: 'seed.length > 243',
        should: 'throw Error',
        actual: Try(generatePersistenceID, new Int8Array(Kerl.HASH_LENGTH + 1)),
        expected: new Error(errors.ILLEGAL_SEED_LENGTH),
    })

    assert({
        given: 'valid seed',
        should: 'should produce correct persistenceID',
        actual: generatePersistenceID(new Int8Array(Kerl.HASH_LENGTH)),
        expected: 'WUPANEMSQXZGVLYUKXFEOHQQMPBRIQVJKHFBGMIRDMRFCTLILLBECYEFFLFVOZMJRKGGFDHBNCSQUOODD',
    })
})

describe('persistence.nextIndex()', async assert => {
    assert({
        given: 'a read fault',
        should: 'throw an error',
        actual: await (async () => {
            const stateAdapter: CreatePersistenceAdapter = (params: PersistenceAdapterParams) => ({
                ...createPersistenceAdapter(params),
                read: (key: Buffer) => BluebirdPromise.reject(new Error('err...')),
            })

            const { nextIndex } = isolate({ stateAdapter })

            try {
                return await nextIndex()
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
            const buffer = asyncBuffer<boolean>()
            const stateAdapter: CreatePersistenceAdapter = (params: PersistenceAdapterParams) => {
                const adapter = createPersistenceAdapter(params)
                let i = 0

                adapter.write(KEY_INDEX_PREFIX, tritsToBytes(valueToTrits(100000))).then(() => buffer.write(true))

                return {
                    ...adapter,
                    write(key: Buffer, value: Buffer): BluebirdPromise<void> {
                        if (i !== 0) {
                            return adapter.write(key, value)
                        } else {
                            i += 1
                            return BluebirdPromise.reject(new Error('err...'))
                        }
                    },
                }
            }

            const { nextIndex } = isolate({ stateAdapter })

            await buffer.read()

            try {
                await nextIndex()
            } catch (error) {
                return [error.message, await nextIndex()]
            }
        })(),
        expected: [new Error('err...').message, valueToTrits(100002)],
    })

    assert({
        given: 'a faulty key index record',
        should: 'throw error',
        actual: await (async () => {
            const buffer = asyncBuffer<boolean>()

            const stateAdapter: CreatePersistenceAdapter = (params: PersistenceAdapterParams) => {
                const adapter = createPersistenceAdapter(params)

                adapter.write(KEY_INDEX_PREFIX, tritsToBytes(valueToTrits(-1))).then(() => buffer.write(true))

                return adapter
            }

            const { nextIndex } = isolate({ stateAdapter })

            await buffer.read()

            try {
                await nextIndex()
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
            const { nextIndex, stateRead } = isolate({})
            const delayLowerBound = 1
            const delayUpperBound = 30

            const results = await Promise.all(
                new Array(numberOfActions).fill(undefined).map(async () => {
                    await delay(Math.floor(Math.random() * delayUpperBound) + delayLowerBound)
                    return nextIndex()
                })
            )
            const persistedIndex = await stateRead(KEY_INDEX_PREFIX).then(bytesToTrits)

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
        actual: Try(isolate().writeBundle, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_BUNDLE_LENGTH),
    })
    ;(async () => {
        const expected = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)

        assert({
            given: 'a written bundle',
            should: 'read it',
            actual: await (async () => {
                const { writeBundle, stateRead } = isolate()

                await writeBundle(expected)

                return stateRead(tritsToBytes(bundle(expected))).then(bytesToTrits)
            })(),
            expected,
        })
    })()
})

describe('persistence.writeBundle(buffer: Int8Array) -> persistence.deleteBundle(buffer: Int8Array) -> adapter.read(key: Buffer): Buffer', async assert => {
    assert({
        given: 'bundle of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(isolate().deleteBundle, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_BUNDLE_LENGTH),
    })

    assert({
        given: 'a written bundle',
        should: 'delete it',
        actual: await (async () => {
            const { writeBundle, deleteBundle, stateRead } = isolate()
            const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)
            let deleted = false

            try {
                await writeBundle(buffer)
                await deleteBundle(buffer)

                deleted = true

                await stateRead(tritsToBytes(bundle(buffer)))
            } catch (error) {
                if (deleted && error.notFound) {
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
        actual: Try(isolate().writeCDA, new Int8Array(CDA_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_CDA_LENGTH),
    })

    assert({
        given: 'CDA of illegal length (cda.length > expected)',
        should: 'throw RangeError',
        actual: Try(isolate().writeCDA, new Int8Array(CDA_LENGTH + 1)),
        expected: new RangeError(errors.ILLEGAL_CDA_LENGTH),
    })

    assert({
        given: 'a written cda',
        should: 'read it',
        actual: await (async () => {
            const { writeCDA, readCDA } = isolate()
            const cda = new Int8Array(CDA_LENGTH).fill(1)

            await writeCDA(cda)

            return readCDA(cda.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_LENGTH))
        })(),
        expected: new Int8Array(CDA_LENGTH).fill(1),
    })
})

describe('persistence.readCDA(address: Int8Array)', async assert => {
    assert({
        given: 'address of illegal length (address.length < expected)',
        should: 'throw RangeError',
        actual: Try(isolate().readCDA, new Int8Array(ADDRESS_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'address of illegal length (address.length > expected)',
        should: 'throw RangeError',
        actual: Try(isolate().readCDA, new Int8Array(ADDRESS_LENGTH + 1)),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })
})

describe('persistence.writeCDA(cda: Int8Array) -> persistence.deleteCDA(address: Int8Array) -> persistence.readCDA(address: Int8Array): Int8Array', async assert => {
    assert({
        given: 'illegal CDA length (cda.length < expected)',
        should: 'throw RangeError',
        actual: Try(isolate().deleteCDA, new Int8Array(CDA_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'illegal CDA length (cda.length > expected)',
        should: 'throw RangeError',
        actual: Try(await isolate().deleteCDA, new Int8Array(CDA_LENGTH + 1)),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'a written CDA',
        should: 'delete it',
        actual: await (async () => {
            const { writeCDA, deleteCDA, readCDA } = isolate()
            const cda = new Int8Array(CDA_LENGTH).fill(1)
            let deleted = false

            try {
                await writeCDA(cda)
                await deleteCDA(cda)

                deleted = true

                return await readCDA(cda.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_LENGTH))
            } catch (error) {
                if (deleted && error.notFound) {
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
        actual: Try(isolate().batch as any, [
            {
                type: PersistenceBatchTypes.writeBundle,
                value: new Int8Array(TRANSACTION_LENGTH * 2 - 1),
            },
        ]).message,
        expected: errors.ILLEGAL_BUNDLE_LENGTH,
    })

    assert({
        given: 'Illegal bundle in batch delete',
        should: 'throw RangeError',
        actual: Try(isolate().batch as any, [
            {
                type: PersistenceBatchTypes.deleteBundle,
                value: new Int8Array(TRANSACTION_LENGTH * 2 - 1),
            },
        ]).message,
        expected: errors.ILLEGAL_BUNDLE_LENGTH,
    })

    assert({
        given: 'Illegal CDA in batch write',
        should: 'throw RangeError',
        actual: Try(isolate().batch as any, [
            {
                type: PersistenceBatchTypes.writeCDA,
                value: new Int8Array(CDA_LENGTH - 1).fill(1),
            },
        ]).message,
        expected: errors.ILLEGAL_CDA_LENGTH,
    })

    assert({
        given: 'Illegal CDA in batch delete',
        should: 'throw RangeError',
        actual: Try(isolate().batch as any, [
            {
                type: PersistenceBatchTypes.deleteCDA,
                value: new Int8Array(CDA_LENGTH - 1).fill(1),
            },
        ]).message,
        expected: errors.ILLEGAL_CDA_LENGTH,
    })

    assert({
        given: 'Illegal batch op',
        should: 'throw Error',
        actual: Try(isolate().batch as any, [
            {
                type: 'unknown',
                value: new Int8Array(CDA_LENGTH),
            } as any,
        ]).message,
        expected: errors.ILLEGAL_BATCH,
    })

    const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)
    const bufferB = new Int8Array(TRANSACTION_LENGTH * 2).fill(-1)
    const cda = new Int8Array(CDA_LENGTH).fill(0)
    const cdaB = new Int8Array(CDA_LENGTH).fill(0)
    cdaB[0] = 1

    assert({
        given: 'persisted bundle & cda',
        should: 'batch delete and persist new ones',
        actual: await (async () => {
            const { writeBundle, writeCDA, readCDA, batch, stateRead } = isolate()

            await writeBundle(buffer)
            await writeCDA(cda)

            await batch([
                {
                    type: PersistenceBatchTypes.deleteBundle,
                    value: buffer,
                },
                {
                    type: PersistenceBatchTypes.writeBundle,
                    value: bufferB,
                },
                {
                    type: PersistenceBatchTypes.deleteCDA,
                    value: cda,
                },
                {
                    type: PersistenceBatchTypes.writeCDA,
                    value: cdaB,
                },
            ] as any)

            try {
                await stateRead(tritsToBytes(bundle(bufferB)))
            } catch (error) {
                if (!error.notFound) {
                    throw error
                }
            }

            try {
                await readCDA(CDAddress(cda))
            } catch (error) {
                if (!error.notFound) {
                    throw error
                }
            }

            return [await stateRead(tritsToBytes(bundle(bufferB))).then(bytesToTrits), await readCDA(CDAddress(cdaB))]
        })(),
        expected: [bufferB, cdaB],
    })
})

describe('persistence.createReadStream(onData: (data: V) => any): NodeJS.ReadStream', async assert => {
    const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(-1)
    const cda = new Int8Array(CDA_LENGTH).fill(1)
    const expected = [buffer, cda, buffer].map(tritsToTrytes)

    assert({
        given: 'persisted state & history',
        should: 'read state & history',
        actual: await (async () => {
            const { writeBundle, writeCDA, createStateReadStream, createHistoryReadStream, historyWrite } = isolate()

            await writeBundle(buffer)
            await writeCDA(cda)
            await historyWrite(tritsToBytes(bundle(buffer)), tritsToBytes(buffer))

            return new Promise((resolve, reject) => {
                const result: any = []
                const noop = () => {} // tslint:disable-line

                createStateReadStream({ reverse: true })
                    .on('data', ({ value }: { value: Buffer }) => {
                        if (value.length > 0) {
                            result.push(bytesToTrits(value))
                        }
                    })
                    .on('close', noop)
                    .on('end', () => {
                        createHistoryReadStream()
                            .on('data', ({ value }: { value: Buffer }) => {
                                if (value.length > 0) {
                                    result.push(bytesToTrits(value))
                                }
                            })
                            .on('close', noop)
                            .on('end', () => resolve(result.map(tritsToTrytes)))
                            .on('error', (error: Error) => reject(error))
                    })
                    .on('error', (error: Error) => reject(error))
            })
        })(),
        expected,
    })
})

describe('streamToBuffers({ bundles, deposits })', async assert => {
    const b = new Int8Array(TRANSACTION_LENGTH * 2)
    const cda = new Int8Array(CDA_LENGTH).fill(-1)
    const expected = [b, cda]

    assert({
        given: 'written CDA & bundle',
        should: 'write to buffers',
        actual: await (async () => {
            const { writeBundle, writeCDA, createStateReadStream } = isolate()
            const bundles = asyncBuffer<Int8Array>()
            const deposits = asyncBuffer<Int8Array>()

            const noop = () => {} // tslint:disable-line

            await writeBundle(b)
            await writeCDA(cda)

            return new Promise((resolve, reject) => {
                createStateReadStream({ reverse: true })
                    .on('data', streamToBuffers({ bundles, deposits }))
                    .on('close', noop)
                    .on('end', () =>
                        bundles.read().then(bufferB => deposits.read().then(bufferCda => resolve([bufferB, bufferCda])))
                    )
                    .on('error', (error: Error) => reject(error))
            })
        })(),
        expected,
    })
})

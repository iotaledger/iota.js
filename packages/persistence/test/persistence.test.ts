import { asyncBuffer } from '@iota/async-buffer'
import { tritsToTrytes, tritsToValue, trytesToTrits, valueToTrits } from '@iota/converter'
import Kerl from '@iota/kerl'
import { persistenceAdapter } from '@iota/persistence-adapter-level'
import { add } from '@iota/signing'
import { ADDRESS_LENGTH, bundle, TRANSACTION_LENGTH } from '@iota/transaction'
import { describe, Try } from 'riteway'
import * as errors from '../../errors'
import { PersistenceError } from '../../types'
import { asyncPipe, tap } from '../../utils'
import { persistence, storeID } from '../src/persistence'

const CDA_LENGTH = 243 + 27 + 81 + 27 + 35 + 1
const KEY_INDEX_PREFIX = trytesToTrits('KEY9INDEX')

let numberOfStores = -1
const seed = new Int8Array(243)
const isolatedPersistence = () => {
    numberOfStores++
    const adapter = persistenceAdapter({
        storeID: storeID(add(seed, valueToTrits(numberOfStores))),
        storePath: './test/temp',
    })
    return persistence(adapter).then(store => ({
        adapter,
        store,
    }))
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
    const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t))
    const numberOfActions = 50000

    assert({
        given: 'a read fault',
        should: 'throw an error',
        actual: await (async () => {
            const adapter = await isolatedPersistence()
            const faultyAdapter: any = {
                ...adapter,
                read: (key: Int8Array) => Promise.reject(new Error('err...')),
            }

            try {
                ;(await persistence(faultyAdapter)).nextIndex()
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

            await adapter.write(KEY_INDEX_PREFIX, valueToTrits(100000))

            let i = 0

            const write = adapter.write
            const faultyAdapter: any = { ...adapter }
            faultyAdapter.write = (key: Int8Array, value: Int8Array) => {
                if (i !== 0) {
                    return adapter.write(key, value)
                } else {
                    i += 1
                    return Promise.reject(new Error('err...'))
                }
            }

            const store = await persistence(faultyAdapter)

            try {
                await store.nextIndex()
            } catch (error) {
                return {
                    error: error.message,
                    index: await store.nextIndex(),
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

            await adapter.write(KEY_INDEX_PREFIX, valueToTrits(-1))
            const store = await persistence(adapter)

            try {
                await store.nextIndex()
            } catch (error) {
                return error
            }
        })(),
        expected: new Error(errors.ILLEGAL_KEY_INDEX),
    })

    assert({
        given: 'store = leveldb',
        should: 'increment index atomically',
        actual: await (async () => {
            const { adapter, store } = await isolatedPersistence()
            const delayLowerBound = 1
            const delayUpperBound = 30
            const f = store.nextIndex

            return Promise.all(
                new Array(numberOfActions)
                    .fill(undefined)
                    .map(() => delay(Math.floor(Math.random() * delayUpperBound) + delayLowerBound).then(() => f()))
            ).then(results =>
                adapter.read(KEY_INDEX_PREFIX).then((persistedIndex: Int8Array) => ({
                    results: results.map(trits => tritsToValue(trits)).sort((a, b) => a - b),
                    persistedIndex,
                }))
            )
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
        actual: Try((await isolatedPersistence()).store.writeBundle, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_BUNDLE_LENGTH),
    })

    assert({
        given: 'a written bundle',
        should: 'read it',
        actual: await (async () => {
            const { adapter, store } = await isolatedPersistence()
            const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)
            return store.writeBundle(buffer).then(() => adapter.read(bundle(buffer)))
        })(),
        expected: new Int8Array(TRANSACTION_LENGTH * 2).fill(1),
    })
})

describe('persistence.writeBundle(key: Int8Array, value: Int8Array) -> persistence.deleteBundle(key: Int8Array) -> adapter.read(key: Int8Array): Int8Array', async assert => {
    assert({
        given: 'bundle of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try((await isolatedPersistence()).store.deleteBundle, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_BUNDLE_LENGTH),
    })

    assert({
        given: 'a written bundle',
        should: 'delete it',
        actual: await (async () => {
            const { adapter, store } = await isolatedPersistence()
            const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)
            let wroteAndDeleted = false
            return store
                .writeBundle(buffer)
                .then(() => store.deleteBundle(buffer))
                .then(() => {
                    wroteAndDeleted = true
                    return adapter.read(bundle(buffer))
                })
                .catch((error: PersistenceError) => {
                    if (wroteAndDeleted && error.notFound) {
                        return 'ok'
                    }
                    throw error
                })
        })(),
        expected: 'ok',
    })
})

describe('persistence.writeCDA(address: Int8Array, cda: Int8Array) -> persistence.readCDA(): Int8Array', async assert => {
    assert({
        given: 'address of illegal length (actual length < expected)',
        should: 'throw RangeError',
        actual: Try(
            (await isolatedPersistence()).store.writeCDA,
            new Int8Array(ADDRESS_LENGTH - 1),
            new Int8Array(CDA_LENGTH)
        ),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'address of illegal length (actual length > expected)',
        should: 'throw RangeError',
        actual: Try(
            (await isolatedPersistence()).store.writeCDA,
            new Int8Array(ADDRESS_LENGTH + 1),
            new Int8Array(CDA_LENGTH)
        ),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'CDA of illegal length (actual length < expected)',
        should: 'throw RangeError',
        actual: Try(
            (await isolatedPersistence()).store.writeCDA,
            new Int8Array(ADDRESS_LENGTH),
            new Int8Array(CDA_LENGTH - 1)
        ),
        expected: new RangeError(errors.ILLEGAL_CDA_LENGTH),
    })

    assert({
        given: 'CDA of illegal length (actual length > expected)',
        should: 'throw RangeError',
        actual: Try(
            (await isolatedPersistence()).store.writeCDA,
            new Int8Array(ADDRESS_LENGTH),
            new Int8Array(CDA_LENGTH + 1)
        ),
        expected: new RangeError(errors.ILLEGAL_CDA_LENGTH),
    })

    assert({
        given: 'a written cda',
        should: 'read it',
        actual: await (async () => {
            const { store } = await isolatedPersistence()
            const address = new Int8Array(ADDRESS_LENGTH).fill(1)
            const cda = new Int8Array(CDA_LENGTH).fill(1)
            return store.writeCDA(address, cda).then(() => store.readCDA(address))
        })(),
        expected: new Int8Array(CDA_LENGTH).fill(1),
    })
})

describe('persistence.writeCDA(address: Int8Array, cda: Int8Array) -> persistence.deleteCDA(address: Int8Array) -> persistence.readCDA(address: Int8Array): Int8Array', async assert => {
    assert({
        given: 'illegal address length (actual length < expected)',
        should: 'throw RangeError',
        actual: Try((await isolatedPersistence()).store.deleteCDA, new Int8Array(ADDRESS_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'illegal address length (actual length > expected)',
        should: 'throw RangeError',
        actual: Try((await isolatedPersistence()).store.deleteCDA, new Int8Array(ADDRESS_LENGTH + 1)),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'a written bundle',
        should: 'delete it',
        actual: await (async () => {
            const { store } = await isolatedPersistence()
            const address = new Int8Array(ADDRESS_LENGTH).fill(1)
            const cda = new Int8Array(CDA_LENGTH).fill(1)
            let wroteAndDeleted = false
            return store
                .writeCDA(address, cda)
                .then(() => store.deleteCDA(address))
                .then(() => {
                    wroteAndDeleted = true
                    return store.readCDA(address)
                })
                .catch((error: PersistenceError) => {
                    if (wroteAndDeleted && error.notFound) {
                        return 'ok'
                    }
                    throw error
                })
        })(),
        expected: 'ok',
    })
})

describe('adapted.createReadStream(): NodeJS.ReadStream', async assert => {
    const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)
    const address = new Int8Array(ADDRESS_LENGTH).fill(1)
    const cda = new Int8Array(CDA_LENGTH).fill(1)
    assert({
        given: 'persisted key index, bundle & CDA',
        should: 'read bundle & CDA',
        actual: await (async () => {
            const { adapter, store } = await isolatedPersistence()
            return adapter
                .write(KEY_INDEX_PREFIX, valueToTrits(9))
                .then(() => store.writeBundle(buffer))
                .then(() => store.writeCDA(address, cda))
                .then(
                    () =>
                        new Promise((resolve, reject) => {
                            const result: any = []
                            const onData = (data: any) => result.push(data)
                            const onError = (error: any) => reject(error)
                            const onClose = () => {} // tslint:disable-line
                            const onEnd = () => resolve(result.length)
                            store.createReadStream(onData, onError, onClose, onEnd)
                        })
                )
        })(),
        expected: [{ key: bundle(buffer), value: buffer }, { key: address, value: cda }].length,
    })
})

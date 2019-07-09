import { tritsToValue, valueToTrits } from '@iota/converter'
import Kerl from '@iota/kerl'
import { createPersistenceAdapter } from '@iota/persistence-adapter-level'
import { add } from '@iota/signing'
import * as BluebirdPromise from 'bluebird'
import { describe, Try } from 'riteway'
import * as errors from '../../errors'
import { createPersistence, generatePersistenceID, PersistenceBatchTypes } from '../src/persistence'

const KEY_INDEX_PREFIX = 'key_index'

const isolate = (() => {
    const seed = new Int8Array(243)
    let i = -1

    return () => {
        i++
        return createPersistenceAdapter({
            persistenceID: generatePersistenceID(add(seed, valueToTrits(i))),
            persistencePath: './test/temp',
        })
    }
})()

describe('generatePersistenceID(seed)', async assert => {
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

describe('persistence.increment()', async assert => {
    assert({
        given: 'a read fault',
        should: 'throw an error',
        actual: await (async () => {
            try {
                const persistence = createPersistence({
                    ...isolate(),
                    get(key: string) {
                        return BluebirdPromise.reject(new Error('error'))
                    },
                })
                await persistence.increment()
            } catch (error) {
                return error.message
            }
        })(),
        expected: 'error',
    })

    assert({
        given: 'a write fault',
        should: 'throw an error',
        actual: await (async () => {
            const adapter = isolate()
            let i = 0

            await adapter.put(KEY_INDEX_PREFIX, valueToTrits(100000))

            const persistence = createPersistence({
                ...adapter,
                put(key: string, value: Int8Array): BluebirdPromise<void> {
                    if (i !== 0) {
                        return adapter.put(key, value)
                    } else {
                        i += 1
                        return BluebirdPromise.reject(new Error('error'))
                    }
                },
            })

            try {
                await persistence.increment()
            } catch (error) {
                return [error.message, await persistence.increment()]
            }
        })(),
        expected: ['error', valueToTrits(100002)],
    })

    assert({
        given: 'a faulty key index record',
        should: 'throw error',
        actual: await (async () => {
            const adapter = isolate()
            await adapter.put(KEY_INDEX_PREFIX, valueToTrits(-1))
            const persistence = createPersistence(adapter)
            try {
                await persistence.increment()
            } catch (error) {
                return error
            }
        })(),
        expected: new Error(errors.ILLEGAL_KEY_INDEX),
    })

    const numberOfActions = 50000
    const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t))

    assert({
        given: 'leveldb as a store',
        should: 'increment index atomically',
        actual: await (async () => {
            const persistence = createPersistence(isolate())
            const delayLowerBound = 1
            const delayUpperBound = 30

            const results = await Promise.all(
                new Array(numberOfActions).fill(undefined).map(async () => {
                    await delay(Math.floor(Math.random() * delayUpperBound) + delayLowerBound)
                    return persistence.increment()
                })
            )
            const persistedIndex = await persistence.get(KEY_INDEX_PREFIX)

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

describe('persistence.put(key, value) -> persistence.get(key)', async assert => {
    const value = new Int8Array(1).fill(1)
    const persistence = createPersistence(isolate())
    await persistence.put('key', value)

    assert({
        given: 'persisted value',
        should: 'read it',
        actual: await persistence.get('key'),
        expected: value,
    })
})

describe('persistence.put(key, value) -> persistence.del(key) -> persistence.get(key)', async assert => {
    assert({
        given: 'persisted value',
        should: 'delete it',
        actual: await (async () => {
            const persistence = createPersistence(isolate())
            const value = new Int8Array(1).fill(1)
            let deleted = false

            try {
                await persistence.put('key', value)
                await persistence.del('key')

                deleted = true

                await persistence.get('key')
            } catch (error) {
                if (deleted && error.notFound) {
                    return true
                }
                throw error
            }
        })(),
        expected: true,
    })
})

describe('persistence.put(key, value) -> persistence.batch(commands) -> persistence.get(key))', async assert => {
    const a = new Int8Array(1).fill(1)
    const b = new Int8Array(1).fill(-1)

    assert({
        given: 'persisted value',
        should: 'batch delete it and persist a new one',
        actual: await (async () => {
            const persistence = createPersistence(isolate())

            await persistence.put('a', a)

            await persistence.batch([
                {
                    type: PersistenceBatchTypes.del,
                    key: 'a',
                },
                {
                    type: PersistenceBatchTypes.put,
                    key: 'b',
                    value: b,
                },
            ])

            try {
                await persistence.get('a')
            } catch (error) {
                if (!error.notFound) {
                    throw error
                }
            }

            return persistence.get('b')
        })(),
        expected: b,
    })
})

describe('persistence.on(eventName, callback)', async assert => {
    const a = new Int8Array(1).fill(1)
    const b = new Int8Array(1).fill(-1)

    assert({
        given: 'persisted values',
        should: 'emit events',
        actual: await (async () => {
            const persistence = createPersistence(isolate())

            const promise = new Promise(resolve => {
                const result: any = []

                persistence.on('data', ({ value }) => {
                    if (value.length > 0) {
                        result.push(value)
                        if (result.length === 2) {
                            resolve(result)
                        }
                    }
                })
            })

            await persistence.put('a', a)
            await persistence.put('b', b)

            return promise
        })(),
        expected: [a, b],
    })
})

import { bytesToTrits, valueToTrits } from '@iota/converter'
import { describe, Try } from 'riteway'
import {
    createPersistenceAdapter,
    PersistenceAdapterParams,
    PersistenceBatchTypes,
} from '../src/persistenceAdapterLevel'

const isolate = (() => {
    let i = -1

    return (params?: Partial<PersistenceAdapterParams>) => {
        i++

        return createPersistenceAdapter({
            persistenceID: 'ID-' + i,
            persistencePath: './test/temp',
            ...params,
        })
    }
})()

describe('persistenceAdapter({ persistenceID, persistencePath })', async assert => {
    assert({
        given: 'persistenceID = undefined',
        should: 'throw error',
        actual: Try(isolate, { persistenceID: undefined } as any),
        expected: new Error(),
    })

    assert({
        given: 'persistenceID = null',
        should: 'throw error',
        actual: Try(isolate, { persistenceID: null } as any),
        expected: new Error(),
    })

    assert({
        given: 'persistenceID = NaN',
        should: 'throw error',
        actual: Try(isolate, { persistenceID: NaN } as any),
        expected: new Error(),
    })

    assert({
        given: 'persistenceID = 1 (numeric)',
        should: 'throw error',
        actual: Try(isolate, { persistenceID: 1 } as any),
        expected: new Error(),
    })

    assert({
        given: 'persistenceID = undefined',
        should: 'throw error',
        actual: Try(isolate, { persistenceID: 'ID', persistencePath: undefined } as any),
        expected: new Error(),
    })

    assert({
        given: 'persistencePath = null',
        should: 'throw error',
        actual: Try(isolate, { persistenceID: 'ID', persistencePath: null } as any),
        expected: new Error(),
    })

    assert({
        given: 'peristencePath = NaN',
        should: 'throw error',
        actual: Try(isolate, { persistenceID: 'ID', persistencePath: NaN } as any),
        expected: new Error(),
    })

    assert({
        given: 'persistencePath = 1 (numeric)',
        should: 'throw error',
        actual: Try(isolate, { persistenceID: 'ID', persistencePath: 1 } as any),
        expected: new Error(),
    })
})

describe('adapter.put(key, value) -> adapter.read(key)', async assert => {
    assert({
        given: 'a written value',
        should: 'read it',
        actual: await (async () => {
            const adapter = isolate()

            await adapter.put('key', valueToTrits(999314))

            return adapter.get('key')
        })(),
        expected: valueToTrits(999314),
    })
})

describe('adapter.put(key, value) -> adapter.del(key) -> adapter.get(key))', async assert => {
    assert({
        given: 'a written value',
        should: 'delete it',
        actual: await (async () => {
            const adapter = isolate()
            const value = new Int8Array(9).fill(1)

            let deleted = false

            try {
                await adapter.put('key', value)
                await adapter.del('key')

                deleted = true

                return await adapter.get('key')
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

describe('adapter.put(key, value) -> adapter.batch(commands) -> adapter.get(key))', async assert => {
    const a = new Int8Array(1).fill(1)
    const b = new Int8Array(1).fill(-1)

    assert({
        given: 'a written value',
        should: 'batch delete it and persist a new one',
        actual: await (async () => {
            const adapter = isolate()

            await adapter.put('a', a)

            await adapter.batch([
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
                await adapter.get('a')
            } catch (error) {
                if (!error.notFound) {
                    throw error
                }
            }

            return adapter.get('b')
        })(),
        expected: b,
    })
})

describe('adapter.createReadStream(options)', async assert => {
    const a = new Int8Array(1).fill(1)
    const b = new Int8Array(1).fill(-1)

    assert({
        given: 'persisted values',
        should: 'read as stream',
        actual: await (async () => {
            const adapter = isolate()

            await adapter.put('a', a)
            await adapter.put('b', b)

            return new Promise((resolve, reject) => {
                const result: any = []
                const noop = () => {} // tslint:disable-line

                adapter
                    .createReadStream({ reverse: true })
                    .on('data', ({ value }) => {
                        result.push(bytesToTrits(value))
                    })
                    .on('close', noop)
                    .on('end', () => resolve(result))
                    .on('error', error => reject(error))
            })
        })(),
        expected: [b, a],
    })
})

describe('adapter.open() / adapter.close()', async assert => {
    const adapter = isolate()

    assert({
        given: 'closed database',
        should: 'open it and close it',
        actual: (await (async () => {
            await adapter.open()
            await adapter.close()

            try {
                await adapter.put('key', new Int8Array(1))
            } catch (error) {
                return error
            }
        })()).message,
        expected: 'Database is not open',
    })
})

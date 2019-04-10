import { bytesToTrits, tritsToBytes, valueToTrits } from '@iota/converter'
import { ADDRESS_LENGTH, bundle, TRANSACTION_LENGTH } from '@iota/transaction'
import leveldown from 'leveldown'
import { describe, Try } from 'riteway'
import {
    createPersistenceAdapter,
    PersistenceAdapterBatchTypes,
    PersistenceAdapterParams,
} from '../src/persistenceAdapterLevel'

const CDA_LENGTH = 243 + 27 + 81 + 27 + 35 + 1

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

describe('persistenceAdapter(params: PersistenceAdapterParams): PersistenceAdapter', async assert => {
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

describe('adapter.write(key: K, value: V) -> adapter.read(key: K): V', async assert => {
    assert({
        given: 'a written value',
        should: 'read it',
        actual: await (async () => {
            const { write, read } = isolate({ store: leveldown })
            const key = new Int8Array(1).fill(1)

            await write(tritsToBytes(key), tritsToBytes(valueToTrits(999314)))

            return read(tritsToBytes(key)).then(bytesToTrits)
        })(),
        expected: valueToTrits(999314),
    })
})

describe('adapter.write(key: K, value: V) -> adapter.delete(key: K) -> adapter.read(key: K))', async assert => {
    assert({
        given: 'a written bundle',
        should: 'delete it',
        actual: await (async () => {
            const adapter = isolate()
            const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)

            let deleted = false

            try {
                await adapter.write(tritsToBytes(bundle(buffer)), tritsToBytes(buffer))
                await adapter.delete(tritsToBytes(bundle(buffer)))

                deleted = true

                return await adapter.read(tritsToBytes(bundle(buffer)))
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

describe('adapter.batch(ops: ReadonlyArray<PersistenceAdapterBatch<V, K>>) -> adapter.read(key: K): V)', async assert => {
    const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)
    const bufferB = new Int8Array(TRANSACTION_LENGTH * 2).fill(-1)

    assert({
        given: 'a written bundle',
        should: 'batch delete it and persist a new one',
        actual: await (async () => {
            const { write, batch, read } = isolate()

            await write(tritsToBytes(bundle(buffer)), tritsToBytes(buffer))

            await batch([
                {
                    type: PersistenceAdapterBatchTypes.delete,
                    key: tritsToBytes(bundle(buffer)),
                },
                {
                    type: PersistenceAdapterBatchTypes.write,
                    key: tritsToBytes(bundle(bufferB)),
                    value: tritsToBytes(bufferB),
                },
            ])

            try {
                await read(tritsToBytes(bundle(bufferB)))
            } catch (error) {
                if (!error.notFound) {
                    throw error
                }
            }

            return read(tritsToBytes(bundle(bufferB))).then(bytesToTrits)
        })(),
        expected: bufferB,
    })
})

describe('adapter.createReadStream(onData: (data: V) => any, onError, onClose, onEnd, options): NodeJS.ReadStream', async assert => {
    const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(-1)
    const address = new Int8Array(ADDRESS_LENGTH).fill(1)
    const cda = new Int8Array(CDA_LENGTH).fill(1)
    const expected = [buffer, cda]

    assert({
        given: 'persisted bundle & CDA',
        should: 'read bundle & CDA',
        actual: await (async () => {
            const { write, createReadStream } = isolate()

            await write(tritsToBytes(bundle(buffer)), tritsToBytes(buffer))
            await write(tritsToBytes(address), tritsToBytes(cda))

            return new Promise((resolve, reject) => {
                const result: any = []
                const noop = () => {} // tslint:disable-line

                createReadStream({ reverse: true })
                    .on('data', ({ value }) => {
                        result.push(bytesToTrits(value))
                    })
                    .on('close', noop)
                    .on('end', () => resolve(result))
                    .on('error', error => reject(error))
            })
        })(),
        expected,
    })
})

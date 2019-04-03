import { bytesToTrits, tritsToBytes, trytesToTrits, valueToTrits } from '@iota/converter'
import { ADDRESS_LENGTH, bundle, TRANSACTION_LENGTH } from '@iota/transaction'
import { describe, Try } from 'riteway'
import { persistenceAdapter, PersistenceAdapterDeleteOp, PersistenceError } from '../src/persistenceAdapterLevel'

const CDA_LENGTH = 243 + 27 + 81 + 27 + 35 + 1

let i = -1
const isolate = () => {
    i++
    return persistenceAdapter({
        storeID: 'ID-' + i.toString(),
        storePath: './test/temp',
    })
}

describe('persistenceAdapter(params: PersistenceAdapterParams): PersistenceAdapter', async assert => {
    assert({
        given: 'storeID = undefined',
        should: 'throw error',
        actual: Try(persistenceAdapter, { storeID: undefined } as any),
        expected: new Error(),
    })

    assert({
        given: 'storeID = null',
        should: 'throw error',
        actual: Try(persistenceAdapter, { storeID: null } as any),
        expected: new Error(),
    })

    assert({
        given: 'storeID = NaN',
        should: 'throw error',
        actual: Try(persistenceAdapter, { storeID: NaN } as any),
        expected: new Error(),
    })

    assert({
        given: 'storeID = 1 (numeric)',
        should: 'throw error',
        actual: Try(persistenceAdapter, { storeID: 1 } as any),
        expected: new Error(),
    })

    assert({
        given: 'storePath = undefined',
        should: 'throw error',
        actual: Try(persistenceAdapter, { storeID: 'ID', storePath: undefined } as any),
        expected: new Error(),
    })

    assert({
        given: 'storePath = null',
        should: 'throw error',
        actual: Try(persistenceAdapter, { storeId: 'ID', storePath: null } as any),
        expected: new Error(),
    })

    assert({
        given: 'storeID = NaN',
        should: 'throw error',
        actual: Try(persistenceAdapter, { storeID: 'ID', storePath: NaN } as any),
        expected: new Error(),
    })

    assert({
        given: 'storeID = 1 (numeric)',
        should: 'throw error',
        actual: Try(persistenceAdapter, { storeID: 'ID', storePath: 1 } as any),
        expected: new Error(),
    })
})

describe('adapter.write(key: K, value: V) -> adapter.read(key: K): V', async assert => {
    assert({
        given: 'a written value',
        should: 'read it',
        actual: await (async () => {
            const adapter = isolate()
            const key = new Int8Array(1).fill(1)

            await adapter.write(tritsToBytes(key), tritsToBytes(valueToTrits(999314)))

            return adapter.read(tritsToBytes(key)).then(bytesToTrits)
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

            let wroteAndDeleted = false

            try {
                await adapter.write(tritsToBytes(bundle(buffer)), tritsToBytes(buffer))
                await adapter.delete(tritsToBytes(bundle(buffer)))

                wroteAndDeleted = true

                return await adapter.read(tritsToBytes(bundle(buffer)))
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

describe('adapter.batch(ops: ReadonlyArray<PersistenceAdapterBatch<V, K>>) -> adapter.read(key: K))', async assert => {
    const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)
    const bufferB = new Int8Array(TRANSACTION_LENGTH * 2).fill(-1)

    assert({
        given: 'a written bundle',
        should: 'batch delete it and persist a new one',
        actual: await (async () => {
            const adapter = isolate()

            await adapter.write(tritsToBytes(bundle(buffer)), tritsToBytes(buffer))

            await adapter.batch([
                {
                    type: 'delete',
                    key: tritsToBytes(bundle(buffer)),
                },
                {
                    type: 'write',
                    key: tritsToBytes(bundle(bufferB)),
                    value: tritsToBytes(bufferB),
                },
            ])

            try {
                await adapter.read(tritsToBytes(bundle(bufferB)))
            } catch (error) {
                if (!error.notFound) {
                    throw error
                }
            }

            return adapter.read(tritsToBytes(bundle(bufferB))).then(bytesToTrits)
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
            const adapter = await isolate()

            await adapter.write(tritsToBytes(bundle(buffer)), tritsToBytes(buffer))
            await adapter.write(tritsToBytes(address), tritsToBytes(cda))

            return new Promise((resolve, reject) => {
                const result: any = []
                const onData = (value: Buffer) => result.push(bytesToTrits(value))
                const onError = (error: any) => reject(error)
                const onClose = () => {} // tslint:disable-line
                const onEnd = () => resolve(result)
                adapter.createReadStream(onData, onError, onClose, onEnd, { reverse: true })
            })
        })(),
        expected,
    })
})

import { trytesToTrits, valueToTrits } from '@iota/converter'
import { ADDRESS_LENGTH, bundle, TRANSACTION_LENGTH } from '@iota/transaction'
import { describe, Try } from 'riteway'
import { persistenceAdapter, PersistenceError } from '../src/persistenceAdapterLevel'

const CDA_LENGTH = 243 + 27 + 81 + 27 + 35 + 1

let i = -1
const isolatedAdapter = () => {
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

describe('adapter.write(key: Int8Array, value: Int8Array) -> adapter.read(key: Int8Array): Int8Array', async assert => {
    assert({
        given: 'a written value',
        should: 'read it',
        actual: await (() => {
            const adapter = isolatedAdapter()
            const key = new Int8Array(1).fill(1)
            return adapter.write(key, valueToTrits(999314)).then(() => adapter.read(key))
        })(),
        expected: valueToTrits(999314),
    })
})

describe('adapter.write(key: Int8Array, value: Int8Array) -> adapter.delete(key: Int8Array) -> adapter.read(key: Int8Array))', async assert => {
    assert({
        given: 'a written bundle',
        should: 'delete it',
        actual: await (() => {
            const adapter = isolatedAdapter()
            const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)
            let wroteAndDeleted = false
            return adapter
                .write(bundle(buffer), buffer)
                .then(() => adapter.delete(bundle(buffer)))
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

describe('adapted.createReadStream(): NodeJS.ReadStream', async assert => {
    const buffer = new Int8Array(TRANSACTION_LENGTH * 2).fill(1)
    const address = new Int8Array(ADDRESS_LENGTH).fill(1)
    const cda = new Int8Array(CDA_LENGTH).fill(1)
    assert({
        given: 'persisted key index, bundle & CDA',
        should: 'read bundle & CDA',
        actual: await (async () => {
            const adapter = await isolatedAdapter()
            return adapter
                .write(trytesToTrits('KEY9INDEX'), valueToTrits(9))
                .then(() => adapter.write(bundle(buffer), buffer))
                .then(() => adapter.write(address, cda))
                .then(() =>
                    new Promise((resolve, reject) => {
                        const result: any = []
                        const onData = (data: any) => result.push(data)
                        const onError = (error: any) => reject(error)
                        const onClose = () => {} // tslint:disable-line
                        const onEnd = () => resolve(result.length)
                        adapter.createReadStream(onData, onError, onClose, onEnd)
                    }).catch(error => {
                        console.log(error) // tslint:disable-line
                    })
                )
        })(),
        expected: [{ key: bundle(buffer), value: buffer }, { key: address, value: cda }].length,
    })
})

import { createHttpClient } from '@iota/http-client'
import { bundle } from '@iota/samples'
import test from 'ava'
import { INVALID_TRANSACTION_HASH } from '../../../errors'
import { stringify } from '../../../guards'
import { createGetTransactionObjects } from '../../src'
import './nocks/getTrytes'

const getTransactionObjects = createGetTransactionObjects(createHttpClient())
const hashes = [bundle[0].hash]
const transactions = [bundle[0]]

test('getTransactionObjects() resolves to correct transactions.', async t => {
    t.deepEqual(
        await getTransactionObjects(hashes),
        transactions,
        'getTransactionObjects() should resolve to correct transactions.'
    )
})

test('getTransactionObjects() rejects with correct error for invalid hash.', t => {
    const invalidHashes = ['asdasDSFDAFD']

    t.is(
        t.throws(() => getTransactionObjects(invalidHashes), Error).message,
        `${INVALID_TRANSACTION_HASH}: ${stringify(invalidHashes)}`,
        'getTransactionObjects() should throw correct error for invalid hash.'
    )
})

test.cb('getTransactionObjects() invokes callback', t => {
    getTransactionObjects(hashes, t.end)
})

test.cb('getTransactionObjects() passes correct arguments to callback', t => {
    getTransactionObjects(hashes, (err, res) => {
        t.is(
            err,
            null,
            'getTransactionObjects() should pass null as first argument in callback for successuful requests'
        )

        t.deepEqual(
            res,
            transactions,
            'getTransactionObjects() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})

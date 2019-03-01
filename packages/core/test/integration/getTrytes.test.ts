import { createHttpClient } from '@iota/http-client'
import test from 'ava'
import { INVALID_TRANSACTION_HASH } from '../../../errors'
import { stringify } from '../../../guards'
import { createGetTrytes } from '../../src'
import { getTrytesCommand, getTrytesResponse } from './nocks/getTrytes'

const getTrytes = createGetTrytes(createHttpClient())

test('getTrytes() resolves to correct response', async t => {
    t.deepEqual(
        await getTrytes(getTrytesCommand.hashes),
        getTrytesResponse.trytes,
        'getTrytes() should resolve to correct tryte array'
    )
})

test('getTrytes() rejects with correct error for invalid hashes', t => {
    const invalidHashes = ['asdasDSFDAFD']

    t.is(
        t.throws(() => getTrytes(invalidHashes), Error).message,
        `${INVALID_TRANSACTION_HASH}: ${stringify(invalidHashes)}`,
        'getTrytes() should throw error for invalid hashes'
    )
})

test.cb('getTrytes() invokes callback', t => {
    getTrytes(getTrytesCommand.hashes, t.end)
})

test.cb('getTrytes() passes correct arguments to callback', t => {
    getTrytes(getTrytesCommand.hashes, (err, res) => {
        t.is(err, null, 'getTrytes() should pass null as first argument in callback for successuful requests')

        t.deepEqual(
            res,
            getTrytesResponse.trytes,
            'getTrytes() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})

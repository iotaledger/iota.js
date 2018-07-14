import test from 'ava'
import { createHttpClient } from '@iota/http-client'
import { createCheckConsistency } from '../../src'
import { INVALID_HASH_ARRAY } from '../../src/errors'
import { checkConsistencyCommand, checkConsistencyResponse } from './nocks/checkConsistency'

const checkConsistency = createCheckConsistency(createHttpClient())

test('checkConsistency() resolves to correct response', async t => {
    t.deepEqual(
        await checkConsistency(checkConsistencyCommand.tails),
        checkConsistencyResponse.state,
        'checkConsistency() should resolve to correct response'
    )
})

test('checkConsistency() rejects with correct errors for invalid transaction hashes', t => {
    const invalidHashes = ['asdasDSFDAFD']

    t.is(
        t.throws(() => checkConsistency(invalidHashes), Error).message,
        `${INVALID_HASH_ARRAY}: ${invalidHashes[0]}`,
        'checkConsistency() should throw error for invalid transaction hashes'
    )
})

test.cb('checkConsistency() invokes callback', t => {
    checkConsistency(checkConsistencyCommand.tails, t.end)
})

test.cb('checkConsistency() passes correct arguments to callback', t => {
    checkConsistency(checkConsistencyCommand.tails, (err, res) => {
        t.is(err, null, 'checkConsistency() should pass null as first argument in callback for successuful requests')

        t.deepEqual(
            res,
            checkConsistencyResponse.state,
            'checkConsistency() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})

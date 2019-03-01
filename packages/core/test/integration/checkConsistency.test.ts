import { createHttpClient } from '@iota/http-client'
import test from 'ava'
import { inconsistentTransaction, INVALID_TRANSACTION_HASH } from '../../../errors'
import { stringify } from '../../../guards'
import { createCheckConsistency } from '../../src'
import {
    checkConsistencyCommand,
    checkConsistencyResponse,
    checkConsistencyWithInfoCommand,
    checkConsistencyWithInfoResponse,
} from './nocks/checkConsistency'

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
        `${INVALID_TRANSACTION_HASH}: ${stringify(invalidHashes)}`,
        'checkConsistency() should throw error for invalid transaction hashes'
    )
})

test.cb(
    'checkConsistency() rejects with correct info if state is `false` and called with `options = { rejectWithReason: true }`',
    t => {
        checkConsistency(checkConsistencyWithInfoCommand.tails, { rejectWithReason: true }, (err, state) => {
            t.is(
                (err as Error).message,
                inconsistentTransaction(checkConsistencyWithInfoResponse.info),
                'checkConsistency() should reject with correct info if state is `false` and called with `options = { rejectWithReason: true }`'
            )

            t.end()
        })
    }
)

test.cb('checkConsistency() invokes callback', t => {
    checkConsistency(checkConsistencyCommand.tails, {}, t.end)
})

test.cb('checkConsistency() passes correct arguments to callback', t => {
    checkConsistency(checkConsistencyCommand.tails, {}, (err, res) => {
        t.is(err, null, 'checkConsistency() should pass null as first argument in callback for successuful requests')

        t.deepEqual(
            res,
            checkConsistencyResponse.state,
            'checkConsistency() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})

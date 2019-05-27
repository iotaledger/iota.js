import { createHttpClient } from '@iota/http-client'
import { bundle, bundleWithZeroValue } from '@iota/samples'
import test from 'ava'
import { INVALID_TRANSACTION_HASH } from '../../../errors'
import { stringify } from '../../../guards'
import { createTraverseBundle } from '../../src'
import './nocks/getTrytes'

const traverseBundle = createTraverseBundle(createHttpClient())
const tail = bundle[0].hash

test('traverseBundle() resolves to correct bundle.', async t => {
    t.deepEqual(await traverseBundle(tail), bundle, 'traverseBundle() should resolve to correct bundle.')
})

test('traverseBundle() resolves to correct signle transaction bundle.', async t => {
    t.deepEqual(
        await traverseBundle(bundleWithZeroValue[0].hash),
        bundleWithZeroValue,
        'traverseBundle() resolves to correct single transaction bundle.'
    )
})

test('traverseBundle() rejects with correct error for invalid hash.', t => {
    const invalidHash = 'asdasDSFDAFD'

    t.is(
        t.throws(() => traverseBundle(invalidHash), Error).message,
        `${INVALID_TRANSACTION_HASH}: ${stringify(invalidHash)}`,
        'traverseBundle() should throw correct error for invalid hash.'
    )
})

test.cb('traverseBundle() invokes callback', t => {
    traverseBundle(tail, undefined, t.end)
})

test.cb('traverseBundle() passes correct arguments to callback', t => {
    traverseBundle(tail, undefined, (err, res) => {
        t.is(err, null, 'traverseBundle() should pass null as first argument in callback for successuful requests')

        t.deepEqual(res, bundle, 'traverseBundle() should pass the correct response as second argument in callback')

        t.end()
    })
})

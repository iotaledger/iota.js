import { trits } from '@iota/converter'
import { bundle, bundleTrytes } from '@iota/samples'
import test from 'ava'
import { transactionHash } from '../src'

test('transactionHash() returns the correct transaction hash.', t => {
    t.is(
        transactionHash(trits(bundleTrytes[0])),
        bundle[0].hash,
        'transactionHash() should return the correct transaction hash.'
    )
})

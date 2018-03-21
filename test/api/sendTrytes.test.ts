import test from 'ava'
import { createSendTrytes } from '../../lib/api/extended'
import { INVALID_TRYTES_ARRAY } from '../../lib/errors'
import { provider } from '../../lib/utils'
import { attachToTangleCommand, attachToTangleResponse } from '../nocks/attachToTangle'
import { getTransactionsToApproveCommand } from '../nocks/getTransactionsToApprove'
import { bundle } from '../samples/bundle'

import '../nocks/broadcastTransactions'
import '../nocks/storeTransactions'

const { minWeightMagnitude, trytes } = attachToTangleCommand
const { depth } = getTransactionsToApproveCommand

const sendTrytes = createSendTrytes(provider())

test('sendTrytes() attaches to tangle, broadcasts, stores and resolves to transaction objects.', async t => { 
    t.deepEqual(
        await sendTrytes(
            trytes,
            depth,
            minWeightMagnitude
        ),
        bundle,
        'sendTrytes() should attach to tangle, broadcast, store and resolve to transaction objects.'    
    )
})

test('sendTrytes() does not mutate original trytes.', async t => {
    const trytesCopy = [...trytes]
    
    await sendTrytes(
        trytesCopy,
        depth,
        minWeightMagnitude
    )
    
    t.deepEqual(
        trytesCopy,
        trytes,
        'sendTrytes() should not mutate original trytes.'
    )
})

test('sendTrytes() rejects with correct errors for invalid input.', t => {
    const invalidTrytes = ['asdasDSFDAFD'] 

    t.is(
        t.throws(() => sendTrytes(
            invalidTrytes,
            depth,
            minWeightMagnitude,
        ), Error).message,
        `${ INVALID_TRYTES_ARRAY }: ${ invalidTrytes[0] }`,
        'sendTrytes() should throw correct error for invalid trytes.'
    )
})

test.cb('sendTrytes() invokes callback', t => {
    sendTrytes(
        trytes,
        depth,
        minWeightMagnitude,
        undefined,
        t.end
    )
})

test.cb('sendTrytes() passes correct arguments to callback', t => {
    sendTrytes(
        trytes,
        depth,
        minWeightMagnitude,
        undefined,
        (err, res) => {
            t.is(
                err,
                null,
                'sendTrytes() should pass null as first argument in callback for successuful requests'
            )
          
            t.deepEqual(
                res,
                bundle,
                'sendTrytes() should pass the correct response as second argument in callback'
            )
          
            t.end()  
        }
    )
})

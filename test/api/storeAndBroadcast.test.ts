import test from 'ava'
import { createStoreAndBroadcast } from '../../lib/api/extended'
import { INVALID_ATTACHED_TRYTES } from '../../lib/errors'
import { provider } from '../../lib/utils'
import { storeTransactionsCommand } from '../nocks/storeTransactions'
import { attachedTrytesOfInvalidLength } from '../samples/attachedTrytes'

import '../nocks/broadcastTransactions'

const storeAndBroadcast = createStoreAndBroadcast(provider())

test('storeAndBroadcast() stores and broadcasts transactions.', async t => { 
    t.deepEqual(
        await storeAndBroadcast(
            [...storeTransactionsCommand.trytes]
        ),
        undefined, 
        'storeAndBroadcast() should store and bradcast transactions.'    
    )
})

test('storeAndBroadcast() does not mutate original trytes.', async t => {
    const trytes = [...storeTransactionsCommand.trytes]
    
    await storeAndBroadcast(trytes)
    
    t.deepEqual(
        trytes,
        storeTransactionsCommand.trytes,
        'storeAndBroadcast() should not mutate original trytes.'
    )
})

test('storeAndBroadcast() rejects with correct error for invalid attached trytes.', t => {
    const invalidTrytes = ['asdasDSFDAFD'] 

    t.is(
        t.throws(() => storeAndBroadcast(
            invalidTrytes
        ), Error).message,
        `${ INVALID_ATTACHED_TRYTES }: ${ invalidTrytes[0] }`,
        'storeAndBroadcast() should throw error for invalid attached trytes.' 
    )
})

test('storeAndBroadcast() rejects with correct errors for attached trytes of invalid length.', t => {
    const invalidTrytes = ['asdasDSFDAFD'] 

    t.is(
        t.throws(() => storeAndBroadcast(
           attachedTrytesOfInvalidLength 
        ), Error).message,
        `${ INVALID_ATTACHED_TRYTES }: ${ attachedTrytesOfInvalidLength[0] }`,
        'storeAndBroadcast() should throw error for attached trytes of invalid length.' 
    )
})


test.cb('storeAndBroadcast() invokes callback', t => {
    storeAndBroadcast(
        [...storeTransactionsCommand.trytes],
        t.end
    )
})

test.cb('storeAndBroadcast() passes correct arguments to callback', t => {
    storeAndBroadcast(
        [...storeTransactionsCommand.trytes],
        (err, res) => {
            t.is(
                err,
                null,
                'storeAndBroadcast() should pass null as first argument in callback for successuful requests'
            )
          
            t.deepEqual(
                res,
                undefined,
                'storeAndBroadcast() should pass the correct response as second argument in callback'
            )
          
            t.end()  
        }
    )
})

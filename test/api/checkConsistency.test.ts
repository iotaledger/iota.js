import test from 'ava'
import { createCheckConsistency } from '../../lib/api/core'
import { INVALID_HASH_ARRAY } from '../../lib/errors'
import { provider } from '../../lib/utils'
import { checkConsistencyCommand, checkConsistencyResponse } from '../nocks/checkConsistency'

const checkConsistency = createCheckConsistency(provider())

test('checkConsistency() resolves to correct response', async t => { 
    t.deepEqual(
        await checkConsistency(checkConsistencyCommand.transactions),
        checkConsistencyResponse.state,
        'checkConsistency() should resolve to correct response'    
    )
})

test('checkConsistency() rejects with correct errors for invalid transaction hashes', t => {
    const invalidHashes = ['asdasDSFDAFD'] 

    t.is(
        t.throws(() => checkConsistency(invalidHashes), Error).message,
        `${ INVALID_HASH_ARRAY }: ${ invalidHashes[0] }`,
        'checkConsistency() should throw error for invalid transaction hashes' 
    )
})

test.cb('checkConsistency() invokes callback', t => {
    checkConsistency(checkConsistencyCommand.transactions, t.end)
})

test.cb('checkConsistency() passes correct arguments to callback', t => {
    checkConsistency(checkConsistencyCommand.transactions, (err, res) => {
        t.is(
            err,
            null,
            'checkConsistency() should pass null as first argument in callback for successuful requests'
        )
      
        t.deepEqual(
            res,
            checkConsistencyResponse.state,
            'checkConsistency() should pass the correct response as second argument in callback'
        )
      
        t.end()  
    })
})

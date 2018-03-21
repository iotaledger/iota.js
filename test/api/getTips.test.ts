import test from 'ava'
import { createGetTips } from '../../lib/api/core'
import { INVALID_HASH_ARRAY, INVALID_THRESHOLD } from '../../lib/errors'
import { provider } from '../../lib/utils'
import { getTipsResponse } from '../nocks/getTips'

const getTips = createGetTips(provider())

test('getTips() resolves to correct tips response', async t => { 
    t.deepEqual(
        await getTips(),
        getTipsResponse.hashes,
        'getTips() should resolve to correct balances'    
    )
})

test.cb('getTips() invokes callback', t => {
    getTips(t.end)
})

test.cb('getTips() passes correct arguments to callback', t => {
    getTips((err, res) => {
        t.is(
            err,
            null,
            'getTips() should pass null as first argument in callback for successuful requests'
        )
      
        t.deepEqual(
            res,
            getTipsResponse.hashes,
            'getTips() should pass the correct response as second argument in callback'
        )
      
        t.end()  
    })
})

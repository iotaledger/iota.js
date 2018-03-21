import test from 'ava'
import { createPrepareTransfers } from '../../lib/api/extended'
import * as errors from '../../lib/errors'
import { addChecksum, asTransactionObjects, provider } from '../../lib/utils'
import { addresses } from '../samples/addresses'
import { trytes as expected } from '../samples/prepareTransfers'

import '../nocks/prepareTransfers'

const inputs = [{
    address: 'FJHSSHBZTAKQNDTIKJYCZBOZDGSZANCZSWCNWUOCZXFADNOQSYAHEJPXRLOVPNOQFQXXGEGVDGICLMOXX',
    keyIndex: 0,
    security: 2,
    balance: '3'
}, {
    address: '9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB',
    keyIndex: 1,
    security: 2,
    balance: '4'
}]

const transfers = [{
    address: addChecksum('A'.repeat(81)),
    value: 3,
    tag: 'TAG',
    message: '9'
}, {
    address: addChecksum('B'.repeat(81)),
    value: 3,
    tag: 'TAG',
    message: ''
}]

const remainderAddress = addresses[2]

const now = () => 1522219924
const prepareTransfers = createPrepareTransfers(undefined, now)
const prepareTransfersWithNetwork = createPrepareTransfers(provider(), now)

test('prepareTransfers() prepares the correct array of trytes offline.', async t => {
    const trytes = await prepareTransfers('SEED', transfers, { inputs, remainderAddress })

    t.deepEqual(
        trytes,
        expected,
        'prepareTransfers() should prepare the correct array of trytes.'
    )
})

test('prepareTransfers() does not mutate original transfers object offline.', async t => {
    const transfersCopy = transfers.map(transfer => ({ ...transfer }))
    
    await prepareTransfers('SEED', transfersCopy, { inputs, remainderAddress, hmacKey: '9'.repeat(81) })
    
    t.deepEqual(
        transfers,
        transfersCopy,
        'prepareTransfers() should not mutate original transfers object.'
    )
})

test('prepareTransfers() with network prepares the correct array of trytes.', async t => {
    const trytes = await prepareTransfersWithNetwork('SEED', transfers)

    t.deepEqual(
        trytes,
        expected,
        'prepareTranfers() should prepare the correct array of trytes.'
    )
})

test.cb('prepareTransfers() invokes callback', t => {
    prepareTransfers('SEED', transfers, { inputs, remainderAddress }, t.end)
})

test.cb('prepareTransfers() passes correct arguments to callback', t => {
    prepareTransfers(
        'SEED',
        transfers,
        { inputs, remainderAddress },
        (err, res) => {
            t.is(
                err,
                null,
                'sendTrytes() should pass null as first argument in callback for successful calls.'
            )
          
            t.deepEqual(
                res,
                expected,
                'sendTrytes() should pass the correct trytes as second argument in callback'
            )
          
            t.end()  
        }
    )
})

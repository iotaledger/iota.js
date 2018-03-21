import test from 'ava'
import { asFinalTransactionTrytes, asTransactionTrytes, transactionTrytes } from '../../lib/utils'
import { bundle, bundleTrytes } from '../samples/bundle'
import { transactionObject } from '../samples/transactionObjects'
import { trytes } from '../samples/transactionTrytes'

test('asTransactionTrytes() converts transaction object to transaction trytes.', t => {
    t.deepEqual(
        asTransactionTrytes(transactionObject),
        trytes,
        'asTransactionTrytes() should convert transaction object to transaction trytes.'
    )
})

test('asTransactionTrytes() converts transaction object array to transaction trytes array.', t => {
    t.deepEqual(
        asTransactionTrytes([transactionObject]),
        [trytes],
        'asTransactionTrytes() should convert transaction object array to transaction trytes array.'
    )
})

test('transactionTrytes() converts transaction object to transaction trytes.', t => {
    t.deepEqual(
        transactionTrytes(transactionObject),
        trytes,
        'transactionTrytes() should convert transaction object to transaction trytes.'
    )
})


test('asFinalTransactionTrytes() converts transaction objects to reversed trytes.', t => {
    t.deepEqual(
        asFinalTransactionTrytes([...bundle]), 
        [...bundleTrytes].reverse(),
        'asFinalTransactionTrytes() should convert transaction objects to reversed trytes.'
    )
})

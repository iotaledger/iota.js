import { bundle, bundleTrytes } from '@iota/samples'
import test from 'ava'
import { asTransactionObject, asTransactionObjects, transactionObject } from '../src'

test('asTransactionObject() converts transaction trytes to transaction object.', t => {
    t.deepEqual(
        asTransactionObject(bundleTrytes[0]),
        bundle[0],
        'asTransactionObject() should convert transaction trytes to transaction object.'
    )
})

test('asTransactionObject() with hash option, converts transaction trytes to transaction object.', t => {
    t.deepEqual(
        asTransactionObject(bundleTrytes[0], bundle[0].hash),
        bundle[0],
        'asTransactionObject() with hash option, should convert transaction trytes to transaction object.'
    )
})

test('transactionObject() converts transaction trytes to transaction object.', t => {
    t.deepEqual(
        transactionObject(bundleTrytes[0]),
        bundle[0],
        'transactionObject() should convert transaction trytes to transaction object.'
    )
})

test('asTransactionObjects() converts array of transaction trytes to array of transaction objects.', t => {
    t.deepEqual(
        asTransactionObjects(bundle.map(tx => tx.hash))(bundleTrytes),
        bundle,
        'transactionObject() should convert array of transaction trytes to transaction objects.'
    )
})

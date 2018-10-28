import { transactionTrytes } from '@iota/samples'
import test from 'ava'
import { isTransactionTrytes } from '../src'

test('isTransactionTrytes() returns true for valid transaction trytes.', t => {
    t.is(
        isTransactionTrytes(transactionTrytes),
        true,
        'isTransactionTrytes() should return true for valid transaction trytes.'
    )
})

test('isTransactionTrytes() returns true if provided trytes are valid and minWeightMagnitude <= weightMagnitude.', t => {
    t.is(
        isTransactionTrytes(transactionTrytes, 3),
        true,
        'isTransactionTrytes() returns true if provided trytes are valid and minWeightMagnitude <= weightMagnitude.'
    )
})

test('isTransactionTrytes() returns false if provided trytes are invalid and minWeightMagnitude <= weightMagnitude.', t => {
    t.is(
        isTransactionTrytes(transactionTrytes.slice(4), 3),
        false,
        'isTransactionTrytes() returns false if provided trytes are invalid and minWeightMagnitude <= weightMagnitude.'
    )
})

test('isTransactionTrytes() returns false if provided trytes are valid and minWeightMagnitude > weightMagnitude.', t => {
    t.is(
        isTransactionTrytes(transactionTrytes, 5),
        false,
        'isTransactionTrytes() returns false if provided trytes are valid and minWeightMagnitude > weightMagnitude.'
    )
})

test('isTransactionTrytes() returns false for invalid transaction trytes.', t => {
    const invalidLength = transactionTrytes.slice(6)
    const invalidTrytes = `us${transactionTrytes.slice(2)}`

    t.is(
        isTransactionTrytes(invalidLength),
        false,
        'isTransactionTrytes() should return false for transaction trytes of invalid length.'
    )

    t.is(isTransactionTrytes(invalidTrytes), false, 'isTransactionTrytes() should return false for invalid trytes.')
})

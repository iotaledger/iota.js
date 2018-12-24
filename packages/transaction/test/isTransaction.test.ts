import { transactionObject } from '@iota/samples'
import test from 'ava'
import { isTransaction } from '../src'

test('isTransaction() returns false for transaction with invalid hash.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            hash: transactionObject.hash.slice(1),
        }),
        false,
        'isTransaction() should return false for transaction with invalid hash.'
    )
})

test('isTransaction() returns false for transaction with invalid signatureMessageFragment.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            signatureMessageFragment: transactionObject.signatureMessageFragment.slice(10),
        }),
        false,
        'isTransaction() should return false for transaction with invalid signatureMessageFragment.'
    )
})

test('isTransaction() returns false for transaction with invalid address.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            address: transactionObject.address.slice(1),
        }),
        false,
        'isTransaction() should return false for transaction with invalid address.'
    )
})

test('isTransaction() returns true for valid transaction with address (with checksum).', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            address: `${transactionObject.address}BBIQPUMVW`,
        }),
        true,
        'isTransaction() should return true for valid transaction with address (with checksum).'
    )
})

test('isTransaction() returns false for transaction with non-integer value.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            value: '0',
        }),
        false,
        'isTransaction() should return false for transaction with non-integer value.'
    )
})

test('isTransaction() returns false for transaction with invalid obsoleteTag.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            obsoleteTag: transactionObject.obsoleteTag.slice(1),
        }),
        false,
        'isTransaction() should return false for transaction with invalid obsoleteTag.'
    )
})

test('isTransaction() returns false for transaction with non-integer timestamp.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            timestamp: transactionObject.timestamp.toString(),
        }),
        false,
        'isTransaction() should return false for transaction with non-integer timestamp.'
    )
})

test('isTransaction() returns false for transaction with non-integer currentIndex.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            currentIndex: '0',
        }),
        false,
        'isTransaction() should return false for transaction with non-integer currentIndex.'
    )
})

test('isTransaction() returns false for transaction with negative currentIndex.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            currentIndex: -2,
        }),
        false,
        'isTransaction() should return false for transaction with negative currentIndex.'
    )
})

test('isTransaction() returns false for transaction with currentIndex greater than lastIndex.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            currentIndex: 3,
        }),
        false,
        'isTransaction() should return false for transaction with currentIndex greater than lastIndex.'
    )
})

test('isTransaction() returns false for transaction with non-integer lastIndex.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            lastIndex: transactionObject.lastIndex.toString(),
        }),
        false,
        'isTransaction() should return false for transaction with non-integer lastIndex.'
    )
})

test('isTransaction() returns false for transaction with invalid bundle.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            bundle: transactionObject.bundle.slice(1),
        }),
        false,
        'isTransaction() should return false for transaction with invalid bundle.'
    )
})

test('isTransaction() returns false for transaction with invalid trunkTransaction.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            trunkTransaction: transactionObject.trunkTransaction.slice(1),
        }),
        false,
        'isTransaction() should return false for transaction with invalid trunkTransaction.'
    )
})

test('isTransaction() returns false for transaction with invalid branchTransaction.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            branchTransaction: transactionObject.branchTransaction.slice(1),
        }),
        false,
        'isTransaction() should return false for transaction with invalid branchTransaction.'
    )
})

test('isTransaction() returns false for transaction with invalid tag.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            tag: transactionObject.tag.slice(1),
        }),
        false,
        'isTransaction() should return false for transaction with invalid tag.'
    )
})

test('isTransaction() returns false for transaction with non-integer attachmentTimestamp.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            attachmentTimestamp: transactionObject.attachmentTimestamp.toString(),
        }),
        false,
        'isTransaction() should return false for transaction with non-integer attachmentTimestamp.'
    )
})

test('isTransaction() returns false for transaction with non-integer attachmentTimestampLowerBound.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            attachmentTimestampLowerBound: transactionObject.attachmentTimestampLowerBound.toString(),
        }),
        false,
        'isTransaction() should return false for transaction with non-integer attachmentTimestampLowerBound.'
    )
})

test('isTransaction() returns false for transaction with non-integer attachmentTimestampUpperBound.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            attachmentTimestampUpperBound: transactionObject.attachmentTimestampUpperBound.toString(),
        }),
        false,
        'isTransaction() should return false for transaction with non-integer attachmentTimestampUpperBound.'
    )
})

test('isTransaction() returns false for transaction with invalid nonce.', t => {
    t.is(
        isTransaction({
            ...transactionObject,
            nonce: transactionObject.nonce.slice(1),
        }),
        false,
        'isTransaction() should return false for transaction with invalid nonce.'
    )
})

test('isTransaction() returns true for valid transaction.', t => {
    t.is(isTransaction(transactionObject), true, 'isTransaction() should return false for valid transaction.')
})

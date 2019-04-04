import { describe, Try } from 'riteway'
import * as errors from '../../errors'
import {
    address,
    ADDRESS_LENGTH,
    ADDRESS_OFFSET,
    ATTACHMENT_TIMESTAMP_OFFSET,
    attachmentTimestamp,
    attachmentTimestampLowerBound,
    attachmentTimestampUpperBound,
    branchTransaction,
    createBundle,
    createCurrentIndex,
    createLastIndex,
    createObsoleteTag,
    CURRENT_INDEX_LENGTH,
    isAttached,
    isHead,
    isMultipleOfTransactionLength,
    ISSUANCE_TIMESTAMP_LENGTH,
    issuanceTimestamp,
    isTail,
    isTransaction,
    LAST_INDEX_LENGTH,
    OBSOLETE_TAG_LENGTH,
    signatureOrMessage,
    tag,
    TRANSACTION_HASH_LENGTH,
    TRANSACTION_LENGTH,
    transactionBufferSlice,
    transactionEssence,
    transactionHash,
    transactionNonce,
    trunkTransaction,
    value,
    VALUE_LENGTH,
} from '../src/transaction'

import { tritsToTrytes, tritsToValue, trytesToTrits, valueToTrits } from '@iota/converter'
import { padTrits as pad } from '@iota/pad'
import { bundle as bundleTransactions, bundleTrytes } from '@iota/samples'

const transactionObject = bundleTransactions[0]
const transaction = trytesToTrits(bundleTrytes[0])
const transactionBuffer = new Int8Array(TRANSACTION_LENGTH * 2)
const offset = TRANSACTION_LENGTH
transactionBuffer.set(transaction, offset)

const transactionWithInvalidAddress = trytesToTrits(bundleTrytes[0])
const transactionWithInvalidAddressB = trytesToTrits(bundleTrytes[1])
const minWeightMagnitude = 14
const addressTrits = address(transactionWithInvalidAddress)
const addressTritsB = address(transactionWithInvalidAddressB)
addressTrits[ADDRESS_LENGTH - 1] = 1
addressTritsB[ADDRESS_LENGTH - 1] = 1
transactionWithInvalidAddress.set(addressTrits, ADDRESS_OFFSET)
transactionWithInvalidAddressB.set(addressTritsB, ADDRESS_OFFSET)

const expectedSignatureOrMessage = trytesToTrits(transactionObject.signatureMessageFragment)
const expectedAddress = trytesToTrits(transactionObject.address)
const expectedValue = transactionObject.value
const expectedObsoleteTag = trytesToTrits(transactionObject.obsoleteTag)
const expectedIssuanceTimestamp = transactionObject.timestamp
const expectedCurrentIndex = transactionObject.currentIndex
const expectedLastIndex = transactionObject.lastIndex
const expectedBundle = trytesToTrits(transactionObject.bundle)
const expectedTrunkTransaction = trytesToTrits(transactionObject.trunkTransaction)
const expectedBranchTransaction = trytesToTrits(transactionObject.branchTransaction)
const expectedTag = trytesToTrits(transactionObject.tag)
const expectedAttachmentTimestamp = transactionObject.attachmentTimestamp
const expectedAttachmentTimestampLowerBound = transactionObject.attachmentTimestampLowerBound
const expectedAttachmentTimestampUpperBound = transactionObject.attachmentTimestampUpperBound
const expectedTransactionNonce = trytesToTrits(transactionObject.nonce)
const expectedTransactionEssence = trytesToTrits(
    [
        transactionObject.address,
        tritsToTrytes(pad(VALUE_LENGTH)(valueToTrits(transactionObject.value))),
        tritsToTrytes(pad(OBSOLETE_TAG_LENGTH)(trytesToTrits(transactionObject.obsoleteTag))),
        tritsToTrytes(pad(ISSUANCE_TIMESTAMP_LENGTH)(valueToTrits(transactionObject.timestamp))),
        tritsToTrytes(pad(CURRENT_INDEX_LENGTH)(valueToTrits(transactionObject.currentIndex))),
        tritsToTrytes(pad(LAST_INDEX_LENGTH)(valueToTrits(transactionObject.lastIndex))),
    ].join('')
)

describe('isMultipleOfTransactionLength(lengthOrOffset: number): boolean', async assert => {
    assert({
        given: 'lengthOrOffset = undefined',
        should: 'throw TypeError',
        actual: Try(isMultipleOfTransactionLength, undefined as any),
        expected: new TypeError(errors.ILLEGAL_LENGTH_OR_OFFSET),
    })

    assert({
        given: 'lengthOrOffset = NaN',
        should: 'throw TypeError',
        actual: Try(isMultipleOfTransactionLength, NaN as any),
        expected: new TypeError(errors.ILLEGAL_LENGTH_OR_OFFSET),
    })

    assert({
        given: 'lengthOrOffset = null',
        should: 'throw TypeError',
        actual: Try(isMultipleOfTransactionLength, null as any),
        expected: new TypeError(errors.ILLEGAL_LENGTH_OR_OFFSET),
    })

    assert({
        given: 'lengthOrOffset = "1" (string)',
        should: 'throw TypeError',
        actual: Try(isMultipleOfTransactionLength, (TRANSACTION_LENGTH * 3).toString() as any),
        expected: new TypeError(errors.ILLEGAL_LENGTH_OR_OFFSET),
    })

    assert({
        given: 'lengthOrOffset = Infinity',
        should: 'throw TypeError',
        actual: Try(isMultipleOfTransactionLength, Infinity),
        expected: new TypeError(errors.ILLEGAL_LENGTH_OR_OFFSET),
    })

    assert({
        given: 'lengthOrOffset < 0',
        should: 'return false',
        actual: isMultipleOfTransactionLength(-TRANSACTION_LENGTH),
        expected: false,
    })

    assert({
        given: 'lengthOrOffset < 0',
        should: 'return false',
        actual: isMultipleOfTransactionLength(-TRANSACTION_LENGTH),
        expected: false,
    })

    assert({
        given: 'lengthOrOffset that is not multiple of TRANSACTION_SIZE',
        should: 'return false',
        actual: isMultipleOfTransactionLength(1),
        expected: false,
    })

    assert({
        given: 'lengthOrOffset that is multiple of TRANSACTION_SIZE',
        should: 'return true',
        actual: isMultipleOfTransactionLength(TRANSACTION_LENGTH * 3),
        expected: true,
    })
})

describe('transactionBufferSlice(transactionFieldOffset: number, transactionFieldLength: number): (transactionBuffer: Int8Array, transactionBufferOffset = 0) => Int8Array', async assert => {
    assert({
        given: 'transactionFieldOffset = undefined',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice, undefined as any, 1),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_FIELD_OFFSET),
    })

    assert({
        given: 'transactionFieldOffset = NaN',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice, NaN as any, 1),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_FIELD_OFFSET),
    })

    assert({
        given: 'transactionFieldOffset = null',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice, null as any, 1),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_FIELD_OFFSET),
    })

    assert({
        given: 'transactionFieldOffset = "1" (string)',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice, '1' as any, 1),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_FIELD_OFFSET),
    })

    assert({
        given: 'transactionFieldOffset = Infinity',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice, Infinity as any, 1),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_FIELD_OFFSET),
    })

    assert({
        given: 'transactionFieldOffset < 0',
        should: 'throw RangeError',
        actual: Try(transactionBufferSlice, -1, 1),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_FIELD_OFFSET),
    })

    assert({
        given: 'transactionFieldLength = undefined',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice, 0, undefined as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_FIELD_LENGTH),
    })

    assert({
        given: 'transactionFieldLength = NaN',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice, 0, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_FIELD_LENGTH),
    })

    assert({
        given: 'transactionFieldLength = null',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice, 0, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_FIELD_LENGTH),
    })

    assert({
        given: 'transactionFieldLength = "1" (string)',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice, 0, '1' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_FIELD_LENGTH),
    })

    assert({
        given: 'transactionFieldLength = Infinity',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice, 0, Infinity as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_FIELD_LENGTH),
    })

    assert({
        given: 'transactionFieldLength < 0',
        should: 'throw RangeError',
        actual: Try(transactionBufferSlice, 0, -1),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_FIELD_LENGTH),
    })

    assert({
        given: 'transactionBuffer = undefined',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice(0, 1), undefined as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_BUFFER),
    })

    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(transactionBufferSlice(0, 1), new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'transactionBufferOffset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(transactionBufferSlice(0, 1), new Int8Array(TRANSACTION_LENGTH), undefined as any),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'transactionBufferOffset = NaN',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice(0, 1), new Int8Array(TRANSACTION_LENGTH), NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'transactionBufferOffset = null',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice(0, 1), new Int8Array(TRANSACTION_LENGTH), null as any),
        expected: new TypeError(errors.ILLEGAL_LENGTH_OR_OFFSET),
    })

    assert({
        given: 'transactionBufferOffset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice(0, 1), new Int8Array(TRANSACTION_LENGTH), '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'transactionBufferOffset = Infinity',
        should: 'throw TypeError',
        actual: Try(transactionBufferSlice(0, 1), new Int8Array(TRANSACTION_LENGTH), Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'transactionBufferOffset < 0',
        should: 'throw RangeError',
        actual: Try(transactionBufferSlice(0, 1), new Int8Array(TRANSACTION_LENGTH), -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and transactionBufferOffset = 0',
        should: 'return the correct slice',
        actual: transactionBufferSlice(0, 1)(new Int8Array(TRANSACTION_LENGTH).map((trit, i) => (i === 0 ? 1 : 0)), 0),
        expected: new Int8Array(1).fill(1),
    })

    assert({
        given: 'valid transactionBuffer and valid transactionBufferOffset',
        should: 'return the correct slice',
        actual: transactionBufferSlice(0, 1)(
            new Int8Array(TRANSACTION_LENGTH * 2).map((trit, i) => (i === TRANSACTION_LENGTH ? 1 : trit)),
            TRANSACTION_LENGTH
        ),
        expected: new Int8Array(1).fill(1),
    })
})

describe('signatureOrMessage(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(signatureOrMessage, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(signatureOrMessage, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(signatureOrMessage, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(signatureOrMessage, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(signatureOrMessage, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(signatureOrMessage, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(signatureOrMessage, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct signature or message',
        actual: signatureOrMessage(transaction),
        expected: expectedSignatureOrMessage,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct signature or message',
        actual: signatureOrMessage(transactionBuffer, offset),
        expected: expectedSignatureOrMessage,
    })
})

describe('address(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(address, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(address, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(address, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(address, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(address, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(address, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(address, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct address',
        actual: address(transaction),
        expected: expectedAddress,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct address',
        actual: address(transactionBuffer, offset),
        expected: expectedAddress,
    })
})

describe('value(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(value, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(value, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(value, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(value, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(value, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(value, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(value, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct value',
        actual: tritsToValue(value(transaction)),
        expected: expectedValue,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct value',
        actual: tritsToValue(value(transactionBuffer, offset)),
        expected: expectedValue,
    })
})

describe('obsoleteTag(transactionBuffer, offset)', async assert => {
    const obsoleteTag = createObsoleteTag(true)

    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(obsoleteTag, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(obsoleteTag, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(obsoleteTag, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(obsoleteTag, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(obsoleteTag, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(obsoleteTag, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(obsoleteTag, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct obsoletTag',
        actual: obsoleteTag(transaction),
        expected: expectedObsoleteTag,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct obsoleteTag',
        actual: obsoleteTag(transactionBuffer, offset),
        expected: expectedObsoleteTag,
    })
})

describe('issuanceTimestamp(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(issuanceTimestamp, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(issuanceTimestamp, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(issuanceTimestamp, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(issuanceTimestamp, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(issuanceTimestamp, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(issuanceTimestamp, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(issuanceTimestamp, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct issuanceTimestamp',
        actual: tritsToValue(issuanceTimestamp(transaction)),
        expected: expectedIssuanceTimestamp,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct issuanceTimestamp',
        actual: tritsToValue(issuanceTimestamp(transactionBuffer, offset)),
        expected: expectedIssuanceTimestamp,
    })
})

describe('currentIndex(transactionBuffer, offset)', async assert => {
    const currentIndex = createCurrentIndex(true)

    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(currentIndex, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(currentIndex, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(currentIndex, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(currentIndex, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(currentIndex, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(currentIndex, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(currentIndex, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct currentIndex',
        actual: tritsToValue(currentIndex(transaction)),
        expected: expectedCurrentIndex,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct currentIndex',
        actual: tritsToValue(currentIndex(transactionBuffer, offset)),
        expected: expectedCurrentIndex,
    })
})

describe('lastIndex(transactionBuffer, offset)', async assert => {
    const lastIndex = createLastIndex(true)

    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(lastIndex, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(lastIndex, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(lastIndex, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(lastIndex, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(lastIndex, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(lastIndex, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(lastIndex, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct lastIndex',
        actual: tritsToValue(lastIndex(transaction)),
        expected: expectedLastIndex,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct lastIndex',
        actual: tritsToValue(lastIndex(transactionBuffer, offset)),
        expected: expectedLastIndex,
    })
})

describe('bundle(transactionBuffer, offset)', async assert => {
    const bundle = createBundle(true)

    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(bundle, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(bundle, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(bundle, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(bundle, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(bundle, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(bundle, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(bundle, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct bundle',
        actual: bundle(transaction),
        expected: expectedBundle,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct bundle',
        actual: bundle(transactionBuffer, offset),
        expected: expectedBundle,
    })
})

describe('trunkTransaction(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(trunkTransaction, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(trunkTransaction, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(trunkTransaction, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(trunkTransaction, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(trunkTransaction, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(trunkTransaction, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(trunkTransaction, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct trunkTransaction',
        actual: trunkTransaction(transaction),
        expected: expectedTrunkTransaction,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct trunkTransaction',
        actual: trunkTransaction(transactionBuffer, offset),
        expected: expectedTrunkTransaction,
    })
})

describe('branchTransaction(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(branchTransaction, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(value, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(branchTransaction, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(branchTransaction, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(branchTransaction, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(branchTransaction, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(branchTransaction, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct branchTransaction',
        actual: branchTransaction(transaction),
        expected: expectedBranchTransaction,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct branchTransaction',
        actual: branchTransaction(transactionBuffer, offset),
        expected: expectedBranchTransaction,
    })
})

describe('tag(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(tag, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(tag, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(tag, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(tag, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(tag, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(tag, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(tag, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct tag',
        actual: tag(transaction),
        expected: expectedTag,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct tag',
        actual: tag(transactionBuffer, offset),
        expected: expectedTag,
    })
})

describe('attachmentTimestamp(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(attachmentTimestamp, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(attachmentTimestamp, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(attachmentTimestamp, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(attachmentTimestamp, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(attachmentTimestamp, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(attachmentTimestamp, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(attachmentTimestamp, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct attachmentTimestamp',
        actual: tritsToValue(attachmentTimestamp(transaction)),
        expected: expectedAttachmentTimestamp,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct attachmentTimestamp',
        actual: tritsToValue(attachmentTimestamp(transactionBuffer, offset)),
        expected: expectedAttachmentTimestamp,
    })
})

describe('attachmentTimestampLowerBound(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(attachmentTimestampLowerBound, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(attachmentTimestampLoweBound, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(attachmentTimestampLowerBound, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(attachmentTimestampLowerBound, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(attachmentTimestampLowerBound, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(attachmentTimestampLowerBound, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(attachmentTimestampLowerBound, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct attachmentTimestampLowerBound',
        actual: tritsToValue(attachmentTimestampLowerBound(transaction)),
        expected: expectedAttachmentTimestampLowerBound,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct attachmentTimestampLowerBound',
        actual: tritsToValue(attachmentTimestampLowerBound(transactionBuffer, offset)),
        expected: expectedAttachmentTimestampLowerBound,
    })
})

describe('attachmentTimestampUpperBound(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(attachmentTimestampUpperBound, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(attachmentTimestampLoweBound, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(attachmentTimestampUpperBound, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(attachmentTimestampUpperBound, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(attachmentTimestampUpperBound, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(attachmentTimestampUpperBound, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(attachmentTimestampUpperBound, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct attachmentTimestampUpperBound',
        actual: tritsToValue(attachmentTimestampUpperBound(transaction)),
        expected: expectedAttachmentTimestampUpperBound,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct attachmentTimestampUpperBound',
        actual: tritsToValue(attachmentTimestampUpperBound(transactionBuffer, offset)),
        expected: expectedAttachmentTimestampUpperBound,
    })
})

describe('transactionNonce(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(transactionNonce, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(transactionNonce, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(transactionNonce, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(transactionNonce, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(transactionNonce, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(transactionNonce, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(transactionNonce, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct transactionNonce',
        actual: transactionNonce(transaction),
        expected: expectedTransactionNonce,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct transactionNonce',
        actual: transactionNonce(transactionBuffer, offset),
        expected: expectedTransactionNonce,
    })
})

describe('transactionEssence(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(transactionEssence, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(transactionEssence, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(transactionEssence, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(transactionEssence, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(transactionEssence, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(transactionEssence, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(transactionEssence, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct transactionEssence',
        actual: transactionEssence(transaction),
        expected: expectedTransactionEssence,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct transactionEssence',
        actual: transactionEssence(transactionBuffer, offset),
        expected: expectedTransactionEssence,
    })
})

describe('transactionHash(transactionBuffer, offset)', async assert => {
    assert({
        given: 'transactionBuffer of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(transactionHash, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'offset = undefined',
    //    should: 'throw TypeError',
    //    actual: Try(transactionHash, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'offset = NaN',
        should: 'throw TypeError',
        actual: Try(transactionHash, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = null',
        should: 'throw TypeError',
        actual: Try(transactionHash, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = "0" (string)',
        should: 'throw TypeError',
        actual: Try(transactionHash, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset = Infinity',
        should: 'throw TypeError',
        actual: Try(transactionHash, transaction, Infinity),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    assert({
        given: 'offset < 0',
        should: 'throw RangeError',
        actual: Try(transactionHash, transaction, -TRANSACTION_LENGTH),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    })

    const expectedTransactionHash = trytesToTrits(bundleTransactions[0].hash)

    assert({
        given: 'valid transactionBuffer and offset = 0',
        should: 'return correct transaction hash',
        actual: transactionHash(transaction),
        expected: expectedTransactionHash,
    })

    assert({
        given: 'valid transactionBuffer and valid offset',
        should: 'return correct transaction hash',
        actual: transactionHash(transactionBuffer, offset),
        expected: expectedTransactionHash,
    })
})

describe('isTransaction(transaction, minWeightMagnitude)', async assert => {
    if (
        tritsToValue(value(transactionWithInvalidAddress)) <= 0 ||
        tritsToValue(value(transactionWithInvalidAddressB)) > 0
    ) {
        throw new Error('Transaction value is assumed to be non-zero.')
    }

    assert({
        given: 'transaction of illegal length',
        should: 'return false',
        actual: isTransaction(new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: false,
    })

    assert({
        given: 'positive value transaction with last trit of address != 0',
        should: 'return false',
        actual: isTransaction(transactionWithInvalidAddress),
        expected: false,
    })

    assert({
        given: 'negative value transaction with last trit of address != 0',
        should: 'return false',
        actual: isTransaction(transactionWithInvalidAddressB),
        expected: false,
    })

    // undefined -> 0, because of default argument
    // assert({
    //    given: 'minWeightMagnitude = undefined',
    //    should: 'throw Error',
    //    actual: Try(isTransaction, transaction, undefined as any)),
    //    expected: new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET),
    // })

    assert({
        given: 'minWeightMagnitude = NaN',
        should: 'throw Error',
        actual: Try(isTransaction, transaction, NaN as any),
        expected: new TypeError(errors.ILLEGAL_MIN_WEIGHT_MAGNITUDE),
    })

    assert({
        given: 'minWeightMagnitude = null',
        should: 'throw Error',
        actual: Try(isTransaction, transaction, null as any),
        expected: new TypeError(errors.ILLEGAL_MIN_WEIGHT_MAGNITUDE),
    })

    assert({
        given: 'minWeightMagnitude = "0" (string)',
        should: 'throw Error',
        actual: Try(isTransaction, transaction, '0' as any),
        expected: new TypeError(errors.ILLEGAL_MIN_WEIGHT_MAGNITUDE),
    })

    assert({
        given: 'minWeightMagnitude < 0',
        should: 'throw RangeError',
        actual: Try(isTransaction, transaction, -1),
        expected: new RangeError(errors.ILLEGAL_MIN_WEIGHT_MAGNITUDE),
    })

    assert({
        given: 'minWeightMagnitude > TRANSACTION_HASH_LENGTH',
        should: 'throw RangeError',
        actual: Try(isTransaction, transaction, TRANSACTION_HASH_LENGTH + 1),
        expected: new RangeError(errors.ILLEGAL_MIN_WEIGHT_MAGNITUDE),
    })

    assert({
        given: 'valid transaction and higher minWeightMagnitude',
        should: 'return false',
        actual: isTransaction(transaction, minWeightMagnitude + 1),
        expected: false,
    })

    assert({
        given: 'valid transaction and exact minWeightMagnitude',
        should: 'return true',
        actual: isTransaction(transaction, minWeightMagnitude),
        expected: true,
    })

    assert({
        given: 'valid transaction and lower minWeightMagnitude',
        should: 'return true',
        actual: isTransaction(transaction, minWeightMagnitude - 1),
        expected: true,
    })

    assert({
        given: 'valid transaction',
        should: 'return true',
        actual: isTransaction(transaction),
        expected: true,
    })
})

describe('isTail(transaction)', async assert => {
    if (
        tritsToValue(value(transactionWithInvalidAddress)) <= 0 ||
        tritsToValue(value(transactionWithInvalidAddressB)) > 0
    ) {
        throw new Error('Transaction value is assumed to be non-zero.')
    }

    assert({
        given: 'transaction of illegal length',
        should: 'return false',
        actual: isTail(new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: false,
    })

    assert({
        given: 'positive value transaction with last trit of address != 0',
        should: 'return false',
        actual: isTail(transactionWithInvalidAddress),
        expected: false,
    })

    assert({
        given: 'negative value transaction with last trit of address != 0',
        should: 'return false',
        actual: isTail(transactionWithInvalidAddressB),
        expected: false,
    })

    assert({
        given: 'valid non-tail transaction (currentIndex > 0)',
        should: 'return false',
        actual: isTail(trytesToTrits(bundleTrytes[1])),
        expected: false,
    })

    assert({
        given: 'valid tail transaction (currentIndex = 0)',
        should: 'return true',
        actual: isTail(trytesToTrits(bundleTrytes[0])),
        expected: true,
    })
})

describe('isHead(transaction)', async assert => {
    if (
        tritsToValue(value(transactionWithInvalidAddress)) <= 0 ||
        tritsToValue(value(transactionWithInvalidAddressB)) > 0
    ) {
        throw new Error('Transaction value is assumed to be non-zero.')
    }

    assert({
        given: 'transaction of illegal length',
        should: 'return false',
        actual: isHead(new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: false,
    })

    assert({
        given: 'positive value transaction with last trit of address != 0',
        should: 'return false',
        actual: isHead(transactionWithInvalidAddress),
        expected: false,
    })

    assert({
        given: 'negative value transaction with last trit of address != 0',
        should: 'return false',
        actual: isHead(transactionWithInvalidAddressB),
        expected: false,
    })

    assert({
        given: 'valid non-tail transaction (currentIndex > 0)',
        should: 'return false',
        actual: isHead(trytesToTrits(bundleTrytes[0])),
        expected: false,
    })

    assert({
        given: 'valid tail transaction (currentIndex = 0)',
        should: 'return true',
        actual: isHead(trytesToTrits(bundleTrytes[bundleTrytes.length - 1])),
        expected: true,
    })
})

describe('isAttached(transaction)', async assert => {
    assert({
        given: 'transaction of illegal length',
        should: 'return false',
        actual: isAttached(new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: false,
    })

    assert({
        given: 'non-attached transaction',
        should: 'return false',
        actual: isAttached(new Int8Array(TRANSACTION_LENGTH)),
        expected: false,
    })

    assert({
        given: 'attached transaction',
        should: 'return true',
        actual: isAttached(
            new Int8Array(TRANSACTION_LENGTH).fill(1, ATTACHMENT_TIMESTAMP_OFFSET, ATTACHMENT_TIMESTAMP_OFFSET + 1)
        ),
        expected: true,
    })
})

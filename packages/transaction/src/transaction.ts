/**
 * @module transaction
 */
import { tritsToValue } from '@iota/converter'
import Curl from '@iota/curl'
import Kerl from '@iota/kerl'
import { FRAGMENT_LENGTH } from '@iota/signing'
import * as warning from 'warning'
import * as errors from '../../errors'
import { isTrits } from '../../guards'
import '../../typed-array'

export const SIGNATURE_OR_MESSAGE_OFFSET = 0
export const SIGNATURE_OR_MESSAGE_LENGTH = FRAGMENT_LENGTH

// export const EXTRA_DATA_DIGEST_OFFSET = SIGNATURE_OR_MESSAGE_OFFSET + SIGNATURE_OR_MESSAGE_LENGTH
// export const EXTRA_DATA_DIGEST_LENGTH = 243
export const ADDRESS_OFFSET = SIGNATURE_OR_MESSAGE_OFFSET + SIGNATURE_OR_MESSAGE_LENGTH // EXTRA_DATA_DIGEST_OFFSET + EXTRA_DATA_DIGEST_LENGTH
export const ADDRESS_LENGTH = Kerl.HASH_LENGTH
export const VALUE_OFFSET = ADDRESS_OFFSET + ADDRESS_LENGTH
export const VALUE_LENGTH = 81
export const OBSOLETE_TAG_OFFSET = VALUE_OFFSET + VALUE_LENGTH
export const OBSOLETE_TAG_LENGTH = 81
export const ISSUANCE_TIMESTAMP_OFFSET = OBSOLETE_TAG_OFFSET + OBSOLETE_TAG_LENGTH
export const ISSUANCE_TIMESTAMP_LENGTH = 27
// export const TIMELOCK_LOWER_BOUND_OFFSET = ISSUANCE_TIMESTAMP_OFFSET + ISSUANCE_TIMESTAMP_LENGTH
// export const TIMELOCK_LOWER_BOUND_LENGTH = 27
// export const TIMELOCK_UPPER_BOUND_OFFSET = TIMELOCK_LOWER_BOUND_OFFSET + TIMELOCK_LOWER_BOUND_LENGTH
// export const TIMELOCK_UPPER_BOUND_LENGTH = 27
export const CURRENT_INDEX_OFFSET = ISSUANCE_TIMESTAMP_OFFSET + ISSUANCE_TIMESTAMP_LENGTH
export const CURRENT_INDEX_LENGTH = 27
export const LAST_INDEX_OFFSET = CURRENT_INDEX_OFFSET + CURRENT_INDEX_LENGTH
export const LAST_INDEX_LENGTH = 27
// export const BUNDLE_NONCE_OFFSET = TIMELOCK_UPPER_BOUND_OFFSET + TIMELOCK_LOWER_BOUND_LENGTH
// export const BUNDLE_NONCE_LENGTH = 243

export const BUNDLE_OFFSET = LAST_INDEX_OFFSET + LAST_INDEX_LENGTH
export const BUNDLE_LENGTH = Kerl.HASH_LENGTH

export const TRUNK_TRANSACTION_OFFSET = BUNDLE_OFFSET + BUNDLE_LENGTH // BUNDLE_NONCE_OFFSET + BUNDLE_NONCE_LENGTH
export const TRUNK_TRANSACTION_LENGTH = Curl.HASH_LENGTH
export const BRANCH_TRANSACTION_OFFSET = TRUNK_TRANSACTION_OFFSET + TRUNK_TRANSACTION_LENGTH
export const BRANCH_TRANSACTION_LENGTH = Curl.HASH_LENGTH
export const TAG_OFFSET = BRANCH_TRANSACTION_OFFSET + BRANCH_TRANSACTION_LENGTH
export const TAG_LENGTH = 81
export const ATTACHMENT_TIMESTAMP_OFFSET = TAG_OFFSET + TAG_LENGTH
export const ATTACHMENT_TIMESTAMP_LENGTH = 27
export const ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET = ATTACHMENT_TIMESTAMP_OFFSET + ATTACHMENT_TIMESTAMP_LENGTH
export const ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH = 27
export const ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET =
    ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET + ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH
export const ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH = 27
export const TRANSACTION_NONCE_OFFSET =
    ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET + ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH
export const TRANSACTION_NONCE_LENGTH = 81

export const TRANSACTION_ESSENCE_OFFSET = ADDRESS_OFFSET // EXTRA_DATA_DIGEST_OFFSET
export const TRANSACTION_ESSENCE_LENGTH = BUNDLE_OFFSET - ADDRESS_OFFSET // BUNDLE_NONCE_OFFSET - EXTRA_DATA_DIGEST_OFFSET
export const TRANSACTION_LENGTH = TRANSACTION_NONCE_OFFSET + TRANSACTION_NONCE_LENGTH
export const TRANSACTION_HASH_LENGTH = Curl.HASH_LENGTH

/**
 * Checks if given value is a valid transaction buffer length or offset.
 *
 * @method isMultipleOfTransactionLength
 *
 * @param {Int8Array} lengthOrOffset
 *
 * @return {bolean}
 */
export const isMultipleOfTransactionLength = (lengthOrOffset: number) => {
    if (!Number.isInteger(lengthOrOffset)) {
        throw new TypeError(errors.ILLEGAL_LENGTH_OR_OFFSET)
    }

    return lengthOrOffset >= 0 && lengthOrOffset % TRANSACTION_LENGTH === 0
}

/**
 * Creates a function that copies a fixed size part of the buffer.
 *
 * @method transactionBufferSlice
 *
 * @param {number} transactionFieldOffset
 * @param {number} transactionFieldLength
 *
 * @return {Function}
 *
 * @ignore
 */
export const transactionBufferSlice = (transactionFieldOffset: number, transactionFieldLength: number) => {
    if (!Number.isInteger(transactionFieldOffset)) {
        throw new TypeError(errors.ILLEGAL_TRANSACTION_FIELD_OFFSET)
    }

    if (transactionFieldOffset < 0) {
        throw new RangeError(errors.ILLEGAL_TRANSACTION_FIELD_OFFSET)
    }

    if (!Number.isInteger(transactionFieldLength)) {
        throw new TypeError(errors.ILLEGAL_TRANSACTION_FIELD_LENGTH)
    }

    if (transactionFieldLength < 0) {
        throw new RangeError(errors.ILLEGAL_TRANSACTION_FIELD_LENGTH)
    }

    return (transactionBuffer: Int8Array, transactionOffset = 0): Int8Array => {
        if (!(transactionBuffer instanceof Int8Array)) {
            throw new Error(errors.ILLEGAL_TRANSACTION_BUFFER)
        }

        if (!isMultipleOfTransactionLength(transactionBuffer.length)) {
            throw new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH)
        }

        if (!isMultipleOfTransactionLength(transactionOffset)) {
            throw new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET)
        }

        return transactionBuffer.slice(
            transactionOffset + transactionFieldOffset,
            transactionOffset + transactionFieldOffset + transactionFieldLength
        )
    }
}

/**
 * Returns a copy of `signatureOrMessage` field.
 *
 * @method signatureOrMessage
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array}
 */
export const signatureOrMessage = transactionBufferSlice(SIGNATURE_OR_MESSAGE_OFFSET, SIGNATURE_OR_MESSAGE_LENGTH)

/**
 * Returns a copy of `address` field.
 *
 * @method address
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array}
 */
export const address = transactionBufferSlice(ADDRESS_OFFSET, ADDRESS_LENGTH)

/**
 * Returns a copy of `value` field.
 *
 * @method value
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array}
 */
export const value = transactionBufferSlice(VALUE_OFFSET, VALUE_LENGTH)

export const createObsoleteTag = (warn = true) =>
    /**
     * Returns a copy of `obsoleteTag` field.
     *
     * @method obsoleteTag
     *
     * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
     * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
     *
     * @return {Int8Array}
     */
    (buffer: Int8Array, offset = 0): Int8Array => {
        warning(warn, 'Deprecation warning: `obsoleteTag` field will be removed in final design.')

        return transactionBufferSlice(OBSOLETE_TAG_OFFSET, OBSOLETE_TAG_LENGTH)(buffer, offset)
    }

export const obsoleteTag = createObsoleteTag()

/**
 * Returns a copy of `issuanceTimestamp` field.
 *
 * @method issuanceTimestamp
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array}
 */
export const issuanceTimestamp = transactionBufferSlice(ISSUANCE_TIMESTAMP_OFFSET, ISSUANCE_TIMESTAMP_LENGTH)

export const createCurrentIndex = (warn = true) =>
    /**
     * Returns a copy of `currentIndex` field.
     *
     * @method currentIndex
     *
     * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
     * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
     *
     * @return {Int8Array}
     */
    (buffer: Int8Array, offset = 0): Int8Array => {
        warning(warn, 'Deprecation warning: `currentIndex` field will be removed in final design.')

        return transactionBufferSlice(CURRENT_INDEX_OFFSET, CURRENT_INDEX_LENGTH)(buffer, offset)
    }

export const currentIndex = createCurrentIndex()

export const createLastIndex = (warn = true) =>
    /**
     * Returns a copy of `lastIndex` field.
     *
     * @method lastIndex
     *
     * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
     * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
     *
     * @return {Int8Array}
     */
    (buffer: Int8Array, offset = 0): Int8Array => {
        warning(warn, 'Deprecation warning: `lastIndex` field will be removed in final design.')

        return transactionBufferSlice(LAST_INDEX_OFFSET, LAST_INDEX_LENGTH)(buffer, offset)
    }

export const lastIndex = createLastIndex()

export const createBundle = (warn = true) =>
    /**
     * Returns a copy of `bundle` field.
     *
     * @method bundle
     *
     * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
     * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
     *
     * @return {Int8Array}
     */
    (buffer: Int8Array, offset = 0): Int8Array => {
        warning(warn, 'Deprecation warning: `bundle` field will be removed in final design.')

        return transactionBufferSlice(BUNDLE_OFFSET, BUNDLE_LENGTH)(buffer, offset)
    }

export const bundle = createBundle()

/**
 * Returns a copy of `trunkTransaction` field.
 *
 * @method trunkTransaction
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array}
 */
export const trunkTransaction = transactionBufferSlice(TRUNK_TRANSACTION_OFFSET, TRUNK_TRANSACTION_LENGTH)

/**
 * Returns a copy of `branchTransaction` field.
 *
 * @method branchTransaction
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array}
 */
export const branchTransaction = transactionBufferSlice(BRANCH_TRANSACTION_OFFSET, BRANCH_TRANSACTION_LENGTH)

/**
 * Returns a copy of `tag` field.
 *
 * @method tag
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array}
 */
export const tag = transactionBufferSlice(TAG_OFFSET, TAG_LENGTH)

/**
 * Returns a copy of `attachmentTimestamp` field.
 *
 * @method attachmentTimestamp
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array}
 */
export const attachmentTimestamp = transactionBufferSlice(ATTACHMENT_TIMESTAMP_OFFSET, ATTACHMENT_TIMESTAMP_LENGTH)

/**
 * Returns a copy of `attachmentTimestampLowerBound` field.
 *
 * @method attachmentTimestampLowerBound
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array}
 */
export const attachmentTimestampLowerBound = transactionBufferSlice(
    ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET,
    ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH
)

/**
 * Returns a copy of `attachmentTimestampUpperBound` field.
 *
 * @method attachmentTimestampUpperBound
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array}
 */
export const attachmentTimestampUpperBound = transactionBufferSlice(
    ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET,
    ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH
)

/**
 * Returns a copy of `tansactionNonce` field.
 *
 * @method transactionNonce
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array}
 */
export const transactionNonce = transactionBufferSlice(TRANSACTION_NONCE_OFFSET, TRANSACTION_NONCE_LENGTH)

/**
 * Returns a copy of transaction essence fields.
 *
 * @method bundle
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be a multiple of transaction length.
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array}
 */
export const transactionEssence = transactionBufferSlice(TRANSACTION_ESSENCE_OFFSET, TRANSACTION_ESSENCE_LENGTH)

/**
 * Calculates the transaction hash.
 *
 * @method transactionHash
 *
 * @param {Int8Array} buffer - Transaction buffer. Buffer length must be multiple of transaction length.
 * @param {Number} [offset=0] - Transaction trit offset. It must be a multiple of transaction length.
 *
 * @return {Int8Array} Transaction hash
 */
export const transactionHash = (buffer: Int8Array, offset = 0): Int8Array => {
    if (!isMultipleOfTransactionLength(buffer.length)) {
        throw new Error(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH)
    }

    if (!isMultipleOfTransactionLength(offset)) {
        throw new Error(errors.ILLEGAL_TRANSACTION_OFFSET)
    }

    const output = new Int8Array(Curl.HASH_LENGTH)
    const sponge = new Curl()
    sponge.absorb(buffer, offset, TRANSACTION_LENGTH)
    sponge.squeeze(output, 0, Curl.HASH_LENGTH)

    return output
}

/* Guards */

/**
 * Checks if input trits represent a syntactically valid transaction.
 *
 * @method isTransaction
 *
 * @param {Int8Array} transaction - Transaction trits.
 * @param {number} [minWeightMagnitude=0] - Min weight magnitude.
 *
 * @return {boolean}
 */
export const isTransaction = (transaction: any, minWeightMagnitude = 0): boolean => {
    if (!Number.isInteger(minWeightMagnitude)) {
        throw new TypeError(errors.ILLEGAL_MIN_WEIGHT_MAGNITUDE)
    }

    if (minWeightMagnitude < 0 || minWeightMagnitude > TRANSACTION_HASH_LENGTH) {
        throw new RangeError(errors.ILLEGAL_MIN_WEIGHT_MAGNITUDE)
    }

    return (
        transaction.length === TRANSACTION_LENGTH &&
        isTrits(transaction) &&
        // Last address trit of value transaction must be 0.
        // Revisions in signature scheme may affect this in the future.
        (tritsToValue(value(transaction)) === 0 || transaction[ADDRESS_OFFSET + ADDRESS_LENGTH - 1] === 0) &&
        (!minWeightMagnitude ||
            transactionHash(transaction)
                .subarray(TRANSACTION_HASH_LENGTH - minWeightMagnitude, TRANSACTION_HASH_LENGTH)
                .every(trit => trit === 0))
    )
}

/**
 * Checks if given transaction is tail.
 * A tail transaction is the one with `currentIndex=0`.
 *
 * @method isTailTransaction
 *
 * @param {Int8Array} transaction
 *
 * @return {boolean}
 */
export const isTail = (transaction: any): transaction is Int8Array =>
    isTransaction(transaction) && tritsToValue(createCurrentIndex(false)(transaction)) === 0

/**
 * Checks if given transaction is head.
 * The head transaction is the one with `currentIndex=lastIndex`.
 *
 * @method isHeadTransaction
 *
 * @param {Int8Array} transaction
 *
 * @return {boolean}
 */
export const isHead = (transaction: any): transaction is Int8Array =>
    isTransaction(transaction) &&
    tritsToValue(createCurrentIndex(false)(transaction)) === tritsToValue(createLastIndex(false)(transaction))

/**
 * Checks if given transaction has been attached.
 *
 * @method isAttachedTransaction
 *
 * @param {Int8Array} transaction
 *
 * @return {boolean}
 */
export const isAttached = (transaction: Int8Array): boolean =>
    isTransaction(transaction) &&
    transaction
        .subarray(ATTACHMENT_TIMESTAMP_OFFSET, ATTACHMENT_TIMESTAMP_OFFSET + ATTACHMENT_TIMESTAMP_LENGTH)
        .some(trit => trit !== 0)

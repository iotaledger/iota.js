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
 * @return {boolean}
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
 * Gets the `signatureOrMessage` field of all transactions in a bundle.
 *
 * @method signatureOrMessage
 *
 * @param {Int8Array} buffer - Transaction trytes
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
 * This method takes transaction trits, and returns the transaction hash.
 * 
 * ## Related methods
 * 
 * To validate the length of transaction trits, use the [`isMultipleOfTransactionLength()`]{@link #module_transaction.isMultipleOfTransactionLength} method.
 * 
 * To get a transaction's trits from the Tangle, use the [`getTrytes()`]{@link #module_core.getTrytes} method, then convert them to trits, using the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
 * 
 * @method transactionHash
 * 
 * @summary Generates the transaction hash for a given transaction.
 *  
 * @memberof module:transaction
 *
 * @param {Int8Array} buffer - Transactions in trits
 * @param {Number} [offset=0] - Offset in trits to define a transaction to hash in the `buffer` argument
 * 
 * @example
 * ```js
 * let hash = Transaction.transactionHash(transactions);
 * ```
 * 
 * @return {Int8Array} Transaction hash
 * 
 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `buffer` argument contains 8,019 trits (the length of a transaction without the transaction hash).
 * @throws {errors.ILLEGAL_TRANSACTION_OFFSET}: Make sure that the `offset` argument is a multiple of 8,019 (the length of a transaction without the transaction hash).
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
 * This method takes an array of transaction trits and validates whether they form a valid transaction by checking the following:
 * 
 * - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
 * - The transaction would result in a valid hash, according to the given [`minWeightMagnitude`](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) argument
 *
 * ## Related methods
 * 
 * To get a transaction's trits from the Tangle, use the [`getTrytes()`]{@link #module_core.getTrytes} method, then convert them to trits, using the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
 * 
 * @method isTransaction
 * 
 * @summary Validates the structure and contents of a given transaction.
 *  
 * @memberof module:transaction
 *
 * @param {Int8Array} transaction - Transaction trits
 * @param {number} [minWeightMagnitude=0] - Minimum weight magnitude
 * 
 * @example
 * ```js
 * let valid = Transaction.isTransaction(transaction);
 * ```
 * 
 * @return {boolean} valid - Whether the transaction is valid.
 * 
 * @throws {errors.ILLEGAL_MIN_WEIGHT_MAGNITUDE}: Make sure that the `minWeightMagnitude` argument is a number between 1 and 81.
 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `transaction` argument contains 8,019 trits (the length of a transaction without the transaction hash).
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
 * This method takes an array of transaction trits, and checks its `currentIndex` field to validate whether it is the tail transaction in a bundle.
 *
 * ## Related methods
 * 
 * To get a transaction's trits from the Tangle, use the [`getTrytes()`]{@link #module_core.getTrytes} method, then convert them to trits, using the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
 * 
 * @method isTailTransaction
 * 
 * @summary Checks if the given transaction is a tail transaction in a bundle.
 *  
 * @memberof module:transaction
 *
 * @param {Int8Array} transaction - Transaction trits
 * 
 * @example
 * ```js
 * let tail = Transaction.isTailTransaction(transaction);
 * ```
 * 
 * @return {boolean} tail - Whether the transaction is a tail transaction.
 * 
 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `transaction` argument contains 8,019 trits (the length of a transaction without the transaction hash).
 */
export const isTail = (transaction: any): transaction is Int8Array =>
    isTransaction(transaction) && tritsToValue(createCurrentIndex(false)(transaction)) === 0

/**
 * This method takes an array of transaction trits, and checks its `currentIndex` field to validate whether it is the head transaction in a bundle.
 *
 * ## Related methods
 * 
 * To get a transaction's trits from the Tangle, use the [`getTrytes()`]{@link #module_core.getTrytes} method, then convert them to trits, using the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
 * 
 * @method isHeadTransaction
 * 
 * @summary Checks if the given transaction is a head transaction in a bundle.
 *  
 * @memberof module:transaction
 *
 * @param {Int8Array} transaction - Transaction trits
 * 
 * @example
 * ```js
 * let head = Transaction.isHeadTransaction(transaction);
 * ```
 * 
 * @return {boolean} head - Whether the transaction is a head transaction.
 * 
 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `transaction` argument contains 8,019 trits (the length of a transaction without the transaction hash).
 */
export const isHead = (transaction: any): transaction is Int8Array =>
    isTransaction(transaction) &&
    tritsToValue(createCurrentIndex(false)(transaction)) === tritsToValue(createLastIndex(false)(transaction))

/**
 * This method checks if the given transaction trits include a proof of work by validating that the its `attachmentTimestamp` field has a non-zero value.
 * 
 * The `attachmentTimestamp` field is set by the `attachToTangle` endpoint. Therefore, if this field is non-zero, this method assumes that proof of work was done.
 * 
 * **Note:** This method does not validate proof of work.
 *
 * ## Related methods
 * 
 * To get a transaction's trits from the Tangle, use the [`getTrytes()`]{@link #module_core.getTrytes} method, then convert them to trits, using the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
 * 
 * @method isAttachedTransaction
 * 
 * @ignore
 * 
 * @summary Checks if the given transaction has a non-zero value in its `attachmentTimestamp` field.
 *  
 * @memberof module:transaction
 *
 * @param {Int8Array} transaction - Transaction trits
 * 
 * @example
 * ```js
 * let attached = Transaction.isAttachedTransaction(transaction);
 * ```
 * 
 * @return {boolean} attached - Whether the transaction has a non-zero value in its `attachmentTimestamp` field.
 * 
 * @throws {errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH}: Make sure that the `transaction` argument contains 8,019 trits (the length of a transaction without the transaction hash).
 */
export const isAttached = (transaction: Int8Array): boolean =>
    isTransaction(transaction) &&
    transaction
        .subarray(ATTACHMENT_TIMESTAMP_OFFSET, ATTACHMENT_TIMESTAMP_OFFSET + ATTACHMENT_TIMESTAMP_LENGTH)
        .some(trit => trit !== 0)

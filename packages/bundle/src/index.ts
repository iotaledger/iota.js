/** @module bundle */

import { tritsToValue } from '@iota/converter'
import Kerl from '@iota/kerl'
import { increment, MAX_TRYTE_VALUE, normalizedBundle } from '@iota/signing'
import * as errors from '../../errors'
import '../../typed-array'

import {
    ADDRESS_LENGTH,
    ADDRESS_OFFSET,
    BUNDLE_LENGTH,
    BUNDLE_OFFSET,
    CURRENT_INDEX_OFFSET,
    isMultipleOfTransactionLength,
    ISSUANCE_TIMESTAMP_LENGTH,
    ISSUANCE_TIMESTAMP_OFFSET,
    LAST_INDEX_LENGTH,
    LAST_INDEX_OFFSET,
    lastIndex,
    OBSOLETE_TAG_LENGTH,
    OBSOLETE_TAG_OFFSET,
    SIGNATURE_OR_MESSAGE_LENGTH,
    SIGNATURE_OR_MESSAGE_OFFSET,
    TAG_LENGTH,
    TAG_OFFSET,
    TRANSACTION_ESSENCE_LENGTH,
    TRANSACTION_LENGTH,
    transactionEssence,
    value as transactionValue,
    VALUE_LENGTH,
    VALUE_OFFSET,
} from '@iota/transaction'

export interface BundleEntry {
    readonly signatureOrMessage: Int8Array
    // readonly extraDataDigest: Int8Array
    readonly address: Int8Array
    readonly value: Int8Array
    readonly obsoleteTag: Int8Array
    readonly issuanceTimestamp: Int8Array
    readonly tag: Int8Array
}

/**
 * Creates a bundle with given transaction entries.
 *
 * @method createBundle
 *
 * @param {BundleEntry[]} [entries=[]] - Entries of single or multiple transactions with the same address
 *
 * @return {Int8Array[]} List of transactions in the bundle
 */
export const createBundle = (entries: ReadonlyArray<Partial<BundleEntry>> = []): Int8Array =>
    entries.reduce((bundle, entry) => addEntry(bundle, entry), new Int8Array(0))

/**
 * Adds given transaction entry to a bundle.
 *
 * @method addEntry
 *
 * @param {object} entry - Entry of a single or multiple transactions with the same address.
 * @param {Int8Array} entry.address - Address.
 * @param {Int8Array} entry.value - Value to transfer in iotas.
 * @param {Int8Array} [entry.signatureOrMessage] - Signature or message fragment(s).
 * @param {Int8Array} [entry.timestamp] - Issuance timestamp (in seconds).
 * @param {Int8Array} [entry.tag] - Optional Tag, **Deprecated**.
 * @param {Int8Array} bundle - Bundle buffer.
 *
 * @return {Int8Array} Bundle copy with new entries.
 */
export const addEntry = (bundle: Int8Array, entry: Partial<BundleEntry>): Int8Array => {
    const {
        signatureOrMessage,
        // extraDataDigest,
        address,
        value,
        obsoleteTag,
        issuanceTimestamp,
        tag,
    } = entry

    /*
    warning(
        signatureOrMessage && !isNullTrits(signatureOrMessage),
        'Deprecation warning: \n' +
            ' - Use of "signatureOrMessage" field before bundle finalization is deprecated and will be removed in v1.0.0. \n'
    )

    warning(
        obsoleteTag && !isNullTrits(obsoleteTag),
        'Deprecation warning: \n' +
            ' - "obseleteTag" field is deprecated and will be removed in implementation of final design. \n' +
            ' - Use of "obsoleteTag" or "tag" field before bundle finalization is deprecated and will be removed in v1.0.0. \n'
    )

    warning(
        tag && !isNullTrits(tag),
        'Deprecation warning: \n' +
            ' - Use of "tag" field before bundle finalization is deprecated and will be removed in v1.0.0. \n'
    )
    */

    if (!isMultipleOfTransactionLength(bundle.length)) {
        throw new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH)
    }

    if (
        signatureOrMessage &&
        (signatureOrMessage.length === 0 || signatureOrMessage.length % SIGNATURE_OR_MESSAGE_LENGTH !== 0)
    ) {
        throw new RangeError(errors.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH)
    }

    if (address && address.length !== ADDRESS_LENGTH) {
        throw new RangeError(errors.ILLEGAL_ADDRESS_LENGTH)
    }

    if (value && value.length > VALUE_LENGTH) {
        throw new RangeError(errors.ILLEGAL_VALUE_LENGTH)
    }

    if (obsoleteTag && obsoleteTag.length > OBSOLETE_TAG_LENGTH) {
        throw new RangeError(errors.ILLEGAL_OBSOLETE_TAG_LENGTH)
    }

    if (issuanceTimestamp && issuanceTimestamp.length > ISSUANCE_TIMESTAMP_LENGTH) {
        throw new RangeError(errors.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH)
    }

    if (tag && tag.length > TAG_LENGTH) {
        throw new RangeError(errors.ILLEGAL_TAG_LENGTH)
    }

    const signatureOrMessageCopy = signatureOrMessage
        ? signatureOrMessage.slice()
        : new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH)
    const numberOfFragments = signatureOrMessageCopy.length / SIGNATURE_OR_MESSAGE_LENGTH
    const bundleCopy = new Int8Array(bundle.length + numberOfFragments * TRANSACTION_LENGTH)
    const currentIndexBuffer = bundle.length > 0 ? increment(lastIndex(bundle)) : new Int8Array(LAST_INDEX_LENGTH)
    const lastIndexBuffer = currentIndexBuffer.slice()
    let fragmentIndex = 0

    bundleCopy.set(bundle.slice())

    // Create and append transactions to the bundle.
    for (let offset = bundle.length; offset < bundleCopy.length; offset += TRANSACTION_LENGTH) {
        const signatureOrMessageCopyFragment = signatureOrMessageCopy.subarray(
            fragmentIndex * SIGNATURE_OR_MESSAGE_LENGTH,
            (fragmentIndex + 1) * SIGNATURE_OR_MESSAGE_LENGTH
        )

        bundleCopy.set(signatureOrMessageCopyFragment, offset + SIGNATURE_OR_MESSAGE_OFFSET)

        if (address) {
            bundleCopy.set(address, offset + ADDRESS_OFFSET)
        }

        if (value && fragmentIndex === 0) {
            bundleCopy.set(value, offset + VALUE_OFFSET)
        }

        if (obsoleteTag) {
            bundleCopy.set(obsoleteTag, offset + OBSOLETE_TAG_OFFSET)
        }

        if (issuanceTimestamp) {
            bundleCopy.set(issuanceTimestamp, offset + ISSUANCE_TIMESTAMP_OFFSET)
        }

        bundleCopy.set(currentIndexBuffer, offset + CURRENT_INDEX_OFFSET)

        if (tag) {
            bundleCopy.set(tag, offset + TAG_OFFSET)
        }

        lastIndexBuffer.set(currentIndexBuffer.slice())
        currentIndexBuffer.set(increment(currentIndexBuffer))
        fragmentIndex++
    }

    for (let offset = LAST_INDEX_OFFSET; offset < bundleCopy.length; offset += TRANSACTION_LENGTH) {
        bundleCopy.set(lastIndexBuffer, offset)
    }

    return bundleCopy
}

/**
 * Finalizes a bundle by calculating the bundle hash.
 *
 * @method finalizeBundle
 *
 * @param {Int8Array} bundle - Bundle transaction trits
 *
 * @return {Int8Array} List of transactions in the finalized bundle
 */
export const finalizeBundle = (bundle: Int8Array): Int8Array => {
    if (!isMultipleOfTransactionLength(bundle.length)) {
        throw new Error(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH)
    }

    const sponge = new Kerl()
    const bundleCopy = bundle.slice()
    const bundleHash = new Int8Array(BUNDLE_LENGTH)

    // This block recomputes bundle hash by incrementing `obsoleteTag` field of first transaction in the bundle.
    // Normalized bundle should NOT contain value `13`.
    while (true) {
        // Absorb essence trits to squeeze bundle hash.
        for (let offset = 0; offset < bundle.length; offset += TRANSACTION_LENGTH) {
            sponge.absorb(transactionEssence(bundleCopy, offset), 0, TRANSACTION_ESSENCE_LENGTH)
        }

        // Set new bundle hash value.
        sponge.squeeze(bundleHash, 0, BUNDLE_LENGTH)

        // Stop mutation if essence results to secure bundle.
        if (normalizedBundle(bundleHash).indexOf(MAX_TRYTE_VALUE /* 13 */) === -1) {
            // Essence results to secure bundle.
            break
        }

        // Essence results to insecure bundle. (Normalized bundle hash contains value `13`.)
        bundleCopy.set(
            increment(bundleCopy.subarray(OBSOLETE_TAG_OFFSET, OBSOLETE_TAG_OFFSET + OBSOLETE_TAG_LENGTH)),
            OBSOLETE_TAG_OFFSET
        )

        sponge.reset()
    }

    // Set bundle field of each transaction.
    for (let offset = BUNDLE_OFFSET; offset < bundle.length; offset += TRANSACTION_LENGTH) {
        bundleCopy.set(bundleHash, offset)
    }

    return bundleCopy
}

/**
 * Adds signature message fragments to transactions in a bundle starting at offset.
 *
 * @method addSignatureOrMessage
 *
 * @param {Int8Array} bundle - Bundle buffer.
 * @param {Int8Array} signatureOrMessage - Signature or message to add.
 * @param {number} index - Transaction index as entry point for signature or message fragments.
 *
 * @return {Int8Array} List of transactions in the updated bundle
 */
export const addSignatureOrMessage = (bundle: Int8Array, signatureOrMessage: Int8Array, index: number): Int8Array => {
    if (!isMultipleOfTransactionLength(bundle.length)) {
        throw new Error(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH)
    }

    if (!Number.isInteger(index)) {
        throw new TypeError(errors.ILLEGAL_TRANSACTION_INDEX)
    }

    if (signatureOrMessage.length === 0 || signatureOrMessage.length % SIGNATURE_OR_MESSAGE_LENGTH !== 0) {
        throw new RangeError(errors.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH)
    }

    if (index < 0 || bundle.length - index - signatureOrMessage.length / SIGNATURE_OR_MESSAGE_LENGTH < 0) {
        throw new RangeError(errors.ILLEGAL_TRANSACTION_INDEX)
    }

    const bundleCopy = bundle.slice()
    const numberOfFragmentsToAdd = signatureOrMessage.length / SIGNATURE_OR_MESSAGE_LENGTH

    for (let i = 0; i < numberOfFragmentsToAdd; i++) {
        bundleCopy.set(
            signatureOrMessage.slice(i * SIGNATURE_OR_MESSAGE_LENGTH, (i + 1) * SIGNATURE_OR_MESSAGE_LENGTH),
            (index + i) * TRANSACTION_LENGTH + SIGNATURE_OR_MESSAGE_OFFSET
        )
    }

    return bundleCopy
}

export const valueSum = (buffer: Int8Array, offset: number, length: number): number => {
    if (!isMultipleOfTransactionLength(buffer.length)) {
        throw new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH)
    }

    if (!Number.isInteger(offset)) {
        throw new TypeError(errors.ILLEGAL_TRANSACTION_OFFSET)
    }

    if (!isMultipleOfTransactionLength(offset)) {
        throw new RangeError(errors.ILLEGAL_TRANSACTION_OFFSET)
    }

    if (!Number.isInteger(length)) {
        throw new TypeError(errors.ILLEGAL_BUNDLE_LENGTH)
    }

    if (!isMultipleOfTransactionLength(length)) {
        throw new RangeError(errors.ILLEGAL_BUNDLE_LENGTH)
    }

    let sum = 0

    for (let bundleOffset = 0; bundleOffset < length; bundleOffset += TRANSACTION_LENGTH) {
        sum += tritsToValue(transactionValue(buffer, offset + bundleOffset))
    }

    return sum
}

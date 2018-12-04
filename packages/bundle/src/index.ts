/** @module bundle */

import { trits, trytes } from '@iota/converter'
import Kerl from '@iota/kerl'
import { padTag, padTrits, padTrytes } from '@iota/pad'
import { add, normalizedBundleHash } from '@iota/signing'
import '../../typed-array'
import {
    Bundle,
    Hash,
    Transaction, // tslint:disable-line no-unused-variable
    Trytes,
} from '../../types'

const NULL_HASH_TRYTES = '9'.repeat(81)
const NULL_TAG_TRYTES = '9'.repeat(27)
const NULL_NONCE_TRYTES = '9'.repeat(27)
const NULL_SIGNATURE_MESSAGE_FRAGMENT_TRYTES = '9'.repeat(2187)

export interface BundleEntry {
    readonly length: number
    readonly address: Hash
    readonly value: number
    readonly tag: string
    readonly timestamp: number
    readonly signatureMessageFragments: ReadonlyArray<Trytes>
}

export { Transaction, Bundle }

const getEntryWithDefaults = (entry: Partial<BundleEntry>): BundleEntry => ({
    length: entry.length || 1,
    address: entry.address || NULL_HASH_TRYTES,
    value: entry.value || 0,
    tag: entry.tag || NULL_TAG_TRYTES,
    timestamp: entry.timestamp || Math.floor(Date.now() / 1000),
    signatureMessageFragments: entry.signatureMessageFragments
        ? entry.signatureMessageFragments.map(padTrytes(2187))
        : Array(entry.length || 1).fill(NULL_SIGNATURE_MESSAGE_FRAGMENT_TRYTES),
})

/**
 * Creates a bunlde with given transaction entries.
 *
 * @method createBundle
 *
 * @param {BundleEntry[]} entries - Entries of signle or multiple transactions with the same address
 *
 * @return {Transaction[]} List of transactions in the bundle
 */
export const createBundle = (entries: ReadonlyArray<Partial<BundleEntry>> = []): Bundle =>
    entries.reduce((bundle: Bundle, entry) => addEntry(bundle, entry), [])

/**
 * Creates a bunlde with given transaction entries
 *
 * @method addEntry
 *
 * @param {Transaction[]} transactions - List of transactions currently in the bundle
 *
 * @param {object} entry - Entry of single or multiple transactions with the same address
 * @param {number} [entry.length=1] - Entry length, which indicates how many transactions in the bundle will occupy
 * @param {string} [entry.address] - Address, defaults to all-9s
 * @param {number} [entry.value = 0] - Value to transfer in _IOTAs_
 * @param {string[]} [entry.signatureMessageFragments] - Array of signature message fragments trytes, defaults to all-9s
 * @param {number} [entry.timestamp] - Transaction timestamp, defaults to `Math.floor(Date.now() / 1000)`
 * @param {string} [entry.tag] - Optional Tag, defaults to null tag (all-9s)
 *
 * @return {Transaction[]} Bundle
 */
export const addEntry = (transactions: Bundle, entry: Partial<BundleEntry>): Bundle => {
    const entryWithDefaults = getEntryWithDefaults(entry)
    const { length, address, value, timestamp, signatureMessageFragments } = entryWithDefaults
    const lastIndex = transactions.length - 1 + length
    const tag = padTag(entryWithDefaults.tag)
    const obsoleteTag = tag

    return transactions.map(transaction => ({ ...transaction, lastIndex })).concat(
        Array(length)
            .fill(null)
            .map((_, i) => ({
                address,
                value: i === 0 ? value : 0,
                tag,
                obsoleteTag,
                currentIndex: transactions.length + i,
                lastIndex,
                timestamp,
                signatureMessageFragment: signatureMessageFragments[i],
                trunkTransaction: NULL_HASH_TRYTES,
                branchTransaction: NULL_HASH_TRYTES,
                attachmentTimestamp: 0,
                attachmentTimestampLowerBound: 0,
                attachmentTimestampUpperBound: 0,
                bundle: NULL_HASH_TRYTES,
                nonce: NULL_NONCE_TRYTES,
                hash: NULL_HASH_TRYTES,
            }))
    )
}

/**
 * Adds a list of trytes in the bundle starting at offset
 *
 * @method addTrytes
 *
 * @param {Transaction[]} transactions - Transactions in the bundle
 *
 * @param {Trytes[]} fragments - Message signature fragments to add
 *
 * @param {number} [offset=0] - Optional offset to start appending signature message fragments
 *
 * @return {Transaction[]} Transactions of finalized bundle
 */
export const addTrytes = (transactions: Bundle, fragments: ReadonlyArray<Trytes>, offset = 0): Bundle =>
    transactions.map(
        (transaction, i) =>
            i >= offset && i < offset + fragments.length
                ? {
                      ...transaction,
                      signatureMessageFragment: padTrytes(27 * 81)(fragments[i - offset] || ''),
                  }
                : transaction
    )

/**
 * Finalizes the bundle by calculating the bundle hash
 *
 * @method finalizeBundle
 *
 * @param {Transaction[]} transactions - Transactions in the bundle
 *
 * @return {Transaction[]} Transactions of finalized bundle
 */
export const finalizeBundle = (transactions: Bundle): Bundle => {
    const valueTrits = transactions.map(tx => trits(tx.value)).map(padTrits(81))

    const timestampTrits = transactions.map(tx => trits(tx.timestamp)).map(padTrits(27))

    const currentIndexTrits = transactions.map(tx => trits(tx.currentIndex)).map(padTrits(27))

    const lastIndexTrits = padTrits(27)(trits(transactions[0].lastIndex))

    const obsoleteTagTrits = transactions.map(tx => trits(tx.obsoleteTag)).map(padTrits(81))

    let bundleHash: Hash
    let validBundle: boolean = false

    while (!validBundle) {
        const kerl = new Kerl()
        kerl.initialize()

        for (let i = 0; i < transactions.length; i++) {
            const essence = trits(
                transactions[i].address +
                    trytes(valueTrits[i]) +
                    trytes(obsoleteTagTrits[i]) +
                    trytes(timestampTrits[i]) +
                    trytes(currentIndexTrits[i]) +
                    trytes(lastIndexTrits)
            )
            kerl.absorb(essence, 0, essence.length)
        }

        const bundleHashTrits = new Int8Array(Kerl.HASH_LENGTH)
        kerl.squeeze(bundleHashTrits, 0, Kerl.HASH_LENGTH)
        bundleHash = trytes(bundleHashTrits)

        if (normalizedBundleHash(bundleHash).indexOf(13) !== -1) {
            // Insecure bundle, increment obsoleteTag and recompute bundle hash
            obsoleteTagTrits[0] = add(obsoleteTagTrits[0], new Int8Array(1).fill(1))
        } else {
            validBundle = true
        }
    }

    return transactions.map((transaction, i) => ({
        ...transaction,
        // overwrite obsoleteTag in first entry
        obsoleteTag: i === 0 ? trytes(obsoleteTagTrits[0]) : transaction.obsoleteTag,
        bundle: bundleHash,
    }))
}

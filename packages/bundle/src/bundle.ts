import { trits, trytes, value } from '@iota/converter'
import Kerl from '@iota/kerl'
import { padTag, padTrits, padTrytes } from '@iota/pad'
import { add, normalizedBundleHash, validateSignatures } from '@iota/signing'
import { Hash, Transaction, Trytes } from '../../types'

const NULL_HASH = '9'.repeat(81)
const NULL_TAG = '9'.repeat(27)
const NULL_NONCE = '9'.repeat(27)
const NULL_FRAGMENT = '9'.repeat(2187)

export interface BundleEntry {
    length: number,
    address: Hash,
    value: number,
    tag: string,
    timestamp: number,
    signatureMessageFragments: Trytes[]
}

export const getEntryWithDefaults = (entry: Partial<BundleEntry>): BundleEntry => ({
    length: entry.length || 1,
    address: entry.address || NULL_HASH,
    value: entry.value || 0,
    tag: entry.tag || NULL_TAG,
    timestamp: entry.timestamp || Math.floor(Date.now() - 1000),
    signatureMessageFragments: (
        entry.signatureMessageFragments ||
        Array(entry.length || 1).fill(NULL_FRAGMENT)
    ).map((fragment) => padTrytes(2187)(fragment))
})

/**
 * Creates a bunlde with given transaction entries
 *
 * @method createBundle
 *
 * @param {BundleEntry[]} entries - Entries of signle or multiple transactions with the same address
 * 
 * @return {Transaction[]} List of transactions in the bundle
 */
export const createBundle = (entries: Array<Partial<BundleEntry>> = []): Transaction[] =>
    entries.reduce((transactions: Transaction[], entry) => addEntry(transactions, entry), [])

/**
 * Creates a bunlde with given transaction entries
 *
 * @method addEntry 
 *
 * @param {Transaction[]} transactions - List of transactions currently in the bundle
 * 
 * @param {BundleEntry} entries - Entry of single or multiple transactions
 * with the same address
 * 
 * @return {Transaction[]} Bundle
 */
export const addEntry = (transactions: Transaction[], entry: Partial<BundleEntry>): Transaction[] => {
    const entryWithDefaults = getEntryWithDefaults(entry)
    const { length, address, timestamp, signatureMessageFragments } = entryWithDefaults
    const lastIndex = transactions.length - 1 + length
    const tag = padTag(entryWithDefaults.tag)
    const obsoleteTag = tag

    return transactions
        .map((transaction: Transaction) => ({
            ...transaction,
            lastIndex
        }))
        .concat(Array(length).fill(null).map((_, i) => ({
            address,
            value: i === 0 ? entryWithDefaults.value : 0,
            tag,
            obsoleteTag,
            currentIndex: transactions.length + i,
            lastIndex,
            timestamp,
            signatureMessageFragment: signatureMessageFragments[i],
            trunkTransaction: NULL_HASH,
            branchTransaction: NULL_HASH,
            attachmentTimestamp: 0,
            attachmentTimestampLowerBound: 0,
            attachmentTimestampUpperBound: 0,
            bundle: NULL_HASH,
            nonce: NULL_NONCE,
            hash: NULL_HASH
        })))
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
export const addTrytes = (transactions: Transaction[], fragments: Trytes[], offset = 0): Transaction[] =>
    transactions.map((transaction, i) => (i >= offset && i < (offset + fragments.length))
        ? { ...transaction, signatureMessageFragment: padTrytes(27 * 81)(fragments[i - offset] || '') }
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
export const finalizeBundle = (transactions: Transaction[]): Transaction[] => {
    const valueTrits = transactions.map(tx => padTrits(81)(trits(tx.value)))
    const timestampTrits = transactions.map(tx => padTrits(27)(trits(tx.timestamp)))
    const currentIndexTrits = transactions.map(tx => padTrits(27)(trits(tx.currentIndex)))
    const lastIndexTrits = padTrits(27)(trits(transactions[0].lastIndex))
    const obsoleteTagTrits = transactions.map(tx => padTrits(81)(trits(tx.obsoleteTag)))
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
        bundle: bundleHash
    }))
}
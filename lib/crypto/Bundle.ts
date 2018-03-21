import { Transaction } from '../api/types'
import { padTag, padTrits, padTrytes } from '../utils'  

import add from './add'
import { trits, trytes, value } from './Converter'
import Kerl from './Kerl'

export interface BundleEntry {
    length: number,
    address: string,
    value: number,
    tag: string,
    timestamp: number,
    signatureMessageFragments: string[]
}

const NULL_HASH = '9'.repeat(81)
const NULL_TAG = '9'.repeat(27)
const NULL_NONCE = '9'.repeat(27)
const NULL_FRAGMENT = '9'.repeat(2187)

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

export const createBundle = (entries: Array<Partial<BundleEntry>> = []): Transaction[] =>
    entries.reduce((transactions: Transaction[], entry) => addEntry(transactions, entry), [])

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

export const addTrytes = (transactions: Transaction[], tryteFragments: string[], offset = 0): Transaction[] => 
    transactions.map((transaction, i) => (i >= offset && i < (offset + tryteFragments.length))
        ? { ...transaction, signatureMessageFragment: padTrytes(27 * 81)(tryteFragments[i - offset] || '') }
        : transaction
    )

export const finalizeBundle = (transactions: Transaction[]): Transaction[] => {
    const valueTrits = transactions.map(tx => padTrits(81)(trits(tx.value)))
    const timestampTrits = transactions.map(tx => padTrits(27)(trits(tx.timestamp)))
    const currentIndexTrits = transactions.map(tx => padTrits(27)(trits(tx.currentIndex)))
    const lastIndexTrits = padTrits(27)(trits(transactions[0].lastIndex))

    const obsoleteTagTrits = transactions.map(tx => padTrits(81)(trits(tx.obsoleteTag)))

    let bundleHash: string
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

export const normalizedBundleHash = (bundleHash: string): Int8Array => {
    const n = new Int8Array(81)

    for (let i = 0; i < 3; i++) {
        let sum = 0
        for (let j = 0; j < 27; j++) {
            sum += n[i * 27 + j] = value(trits(bundleHash.charAt(i * 27 + j)))
        }

        if (sum >= 0) {
            while (sum-- > 0) {
                for (let j = 0; j < 27; j++) {
                    if (n[i * 27 + j] > -13) {
                        n[i * 27 + j]--
                        break
                    }
                }
            }
        } else {
            while (sum++ < 0) {
                for (let j = 0; j < 27; j++) {
                    if (n[i * 27 + j] < 13) {
                        n[i * 27 + j]++
                        break
                    }
                }
            }
        }
    }

    return n
}

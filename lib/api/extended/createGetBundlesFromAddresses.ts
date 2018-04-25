import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { Bundle, Callback, Provider, Transaction } from '../types'

import { createFindTransactionObjects, createGetLatestInclusion } from './index'

export const createGetBundlesFromAddresses = (provider: Provider) => function (
    addresses: string[],
    inclusionStates?: boolean,
    callback?: Callback<Bundle[]>
): Promise<Bundle[]> {
    const findTransactionObjects = createFindTransactionObjects(provider)
    const getLatestInclusion = createGetLatestInclusion(provider)

    // 1. Get txs associated with addresses
    return (
        findTransactionObjects({ addresses })
            // 2. Get all transactions by bundle hashes
            .then((transactions: Transaction[]) =>
                findTransactionObjects({
                    bundles: transactions.filter(tx => tx.currentIndex === 0).map(tx => tx.bundle),
                })
            )

            // 3. Group transactions into bundles
            .then(groupTransactionsIntoBundles)

            // 4. If requested, add persistence status to each bundle
            .then((bundles: Transaction[][]) => {
                if (!inclusionStates) {
                    return bundles
                }

                return addPersistence(getLatestInclusion, bundles)
            })

            // 5. Sort bundles by timestamp
            .then(sortByTimestamp)
    ).asCallback((arguments.length === 2 && typeof arguments[1] === 'function') ? arguments[1] : callback)
}

// Groups an array of transaction objects into array of bundles
export const groupTransactionsIntoBundles = (transactions: Transaction[]): Bundle[] =>
    transactions.reduce(
        (acc: Bundle[], transaction: Transaction) => {
            if (transaction.currentIndex === 0) {
                acc.push(getBundleSync(transactions, transaction))
            }
            return acc
        }, []
    )


// Collects all transactions of a bundle starting from a given tail and traversing through trunk.
export const getBundleSync = (
    transactions: Transaction[],
    transaction: Transaction,
    bundle: Bundle = []
): Bundle => {
    if (transaction.currentIndex === 0) {
        bundle.push(transaction)
    }

    if (transaction && transaction.currentIndex !== transaction.lastIndex) {
        const nextTrunkTransaction = transactions.find(
            (nextTransaction: Transaction) =>
                nextTransaction.hash === transaction.trunkTransaction &&
                nextTransaction.bundle === transaction.bundle &&
                nextTransaction.currentIndex === transaction.currentIndex + 1
        )

        if (nextTrunkTransaction) {
            bundle.push(nextTrunkTransaction)
            return getBundleSync(transactions, nextTrunkTransaction, bundle)
        }
    }

    return bundle
}

export const zip2 = <A, B>(as: A[], bs: B[]) =>
    as.map((a, i) => {
        return [a, bs[i]] as [A, B]
    })

export const zipPersistence = (bundles: Bundle[]) => (states: boolean[]): Bundle[] =>
    // Since bundles are atomic, all transactions have the same state
    zip2(bundles, states).map(([bundle, state]) => bundle.map(tx => ({ ...tx, persistence: state })))

type GetLatestInclusion = (transactions: string[], callback?: Callback<boolean[]> | undefined) => Promise<boolean[]>

export const addPersistence = (getLatestInclusion: GetLatestInclusion, bundles: Bundle[]) => {
    // Get the first hash of each bundle
    const hashes = bundles.map(bundle => bundle[0].hash)

    return getLatestInclusion(hashes).then(zipPersistence(bundles))
}

export const sortByTimestamp = (bundles: Bundle[]) =>
    [...bundles].sort((a: Bundle, b: Bundle) => a[0].attachmentTimestamp - b[0].attachmentTimestamp)

import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { Bundle, Callback, Settings, Transaction } from '../types'

import { createFindTransactionObjects, createGetLatestInclusion } from './index'

/**
 *  Collects all transactions of a bundle starting from a given tail
 *  and traversing through trunk.
 *
 *  @method createGetBundle
 *  @param {array} transactions
 *  @param {object} transaction
 *  @param {array} [bundle]
 */
export const getTransactionsFromBundle = (
    transactions: Transaction[],
    transaction: Transaction,
    bundle: Bundle = []
): Bundle => {
    if (transaction && transaction.currentIndex !== transaction.lastIndex) {
        const nextTrunkTransaction = transactions.find(
            (nextTransaction: Transaction) =>
                nextTransaction.hash === transaction.trunkTransaction &&
                nextTransaction.bundle === transaction.bundle &&
                nextTransaction.currentIndex === transaction.currentIndex + 1
        )
        if (nextTrunkTransaction) {
            bundle.push(nextTrunkTransaction)
            return getTransactionsFromBundle(transactions, nextTrunkTransaction, bundle)
        }
        return bundle
    }
    return bundle
}

/**
 *  Groups an array of transaction objects into array of bundles
 *
 *  @method groupTransactionsIntoBundles
 *  @param {array} transactions
 *  @return {array} bundles
 */
export const groupTransactionsIntoBundles = (transactions: Transaction[]): Bundle[] =>
    transactions.reduce(
        (acc: Bundle[], transaction: Transaction) =>
            transaction.currentIndex === 0 ? acc.concat(getTransactionsFromBundle(transactions, transaction)) : acc,
        []
    )

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
    bundles.sort((a: Bundle, b: Bundle) => a[0].attachmentTimestamp - b[0].attachmentTimestamp)

/**
 *   Gets an array of bundles given a list of associated addresses
 *
 *   @method bundlesFromAddresses
 *   @param {array} addresses - Array of addresses
 *   @param {bool} inclusionStates - Flag to include persistence status
 *   @returns {array} bundles - Array of bundles
 */
export const createGetBundlesFromAddresses = (settings: Settings) => {
    const getBundlesFromAddresses = (
        addresses: string[],
        inclusionStates?: boolean,
        callback?: Callback<Bundle[]>
    ): Promise<Bundle[]> => {
        const findTransactionObjects = createFindTransactionObjects(settings)
        const getLatestInclusion = createGetLatestInclusion(settings)

        // 1. Get txs associated with addresses
        return (
            findTransactionObjects({ addresses })
                // 2. Get all transactions by bundle hashes
                .then(transactions =>
                    findTransactionObjects({
                        bundles: transactions.filter(tx => tx.currentIndex === 0).map(tx => tx.bundle),
                    })
                )

                // 3. Group transactions into bundles
                .then(groupTransactionsIntoBundles)

                // 4. If requested, add persistence status to each bundle
                .then(bundles => {
                    if (!inclusionStates) {
                        return bundles
                    }

                    return addPersistence(getLatestInclusion, bundles)
                })

                // 5. Sort bundles by timestamp
                .then(sortByTimestamp)
        )
    }

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(getBundlesFromAddresses, { setSettings })
}

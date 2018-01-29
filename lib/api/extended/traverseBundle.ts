import { transactionObject } from '../../utils'

import { API, Bundle, Callback } from  '../types'

/**
 *   Basically traverse the Bundle by going down the trunkTransactions until
 *   the bundle hash of the transaction is no longer the same. In case the input
 *   transaction hash is not a tail, we return an error.
 *
 *   @method traverseBundle
 *   @param {string} trunkTx Hash of a trunk or a tail transaction  of a bundle
 *   @param {string} bundleHash
 *   @param {array} bundle List of bundles to be populated
 *   @returns {array} bundle Transaction objects
 **/
export default function traverseBundle(
    this: API,
    trunkTransaction: string,
    bundleHash: string | null,
    bundle: Bundle,
    callback?: Callback<Bundle | void>
): Promise<Bundle | void> {

    const promise: Promise<Bundle | void> = new Promise((resolve, reject) => {
        // Get trytes of transaction hash
        this.getTrytes([trunkTransaction])
            .then((trytes: string[]): Bundle | void | Promise<Bundle | void> => {
                if (!trytes) {
                    return reject('Bundle transactions not visible')
                }

                // get the transaction object
                const transaction = transactionObject(trytes[0]) 

                if (!transaction) {
                    return reject('Invalid trytes, could not create object')
                }

                // If first transaction to search is not a tail, return error
                if (!bundleHash && transaction.currentIndex !== 0) {
                    return reject('Invalid tail transaction supplied.')
                }

                // If no bundle hash, define it
                if (!bundleHash) {
                    bundleHash = transaction.bundle
                }

                // If different bundle hash, return with bundle
                if (bundleHash !== transaction.bundle) {
                    return resolve(bundle)
                }

                // If only one bundle element, return
                if (transaction.lastIndex === 0 && transaction.currentIndex === 0) {
                    return resolve([transaction])
                }

                // Define new trunkTransaction for search
                const nextTrunkTransaction = transaction.trunkTransaction

                // Add transaction object to bundle
                bundle.push(transaction)

                // Continue traversing with new trunkTx
                return this.traverseBundle(nextTrunkTransaction, bundleHash, bundle)
            })
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}

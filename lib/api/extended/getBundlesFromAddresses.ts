import errors from '../../errors'

import { API, Bundle, Callback, Transaction } from '../types'

/**
 *  Collects all transactions of a bundle starting from a given tail
 *  and traversing through trunk.
 *  
 *  @method getBundle
 *  @param {array} transactions
 *  @param {object} transaction
 *  @param {array} [bundle]
 */
export const getBundle = (
    transactions: Transaction[],
    transaction: Transaction,
    bundle: Bundle = []
): Bundle => {
    if (transaction && transaction.currentIndex !== transaction.lastIndex) {
        const nextTrunkTransaction = transactions
            .find((nextTransaction: Transaction) =>
                nextTransaction.hash === transaction.trunkTransaction &&
                nextTransaction.bundle === transaction.bundle &&
                nextTransaction.currentIndex === transaction.currentIndex + 1
            )
        if (nextTrunkTransaction) {
            bundle.push(nextTrunkTransaction)
            return getBundle(transactions, nextTrunkTransaction, bundle)
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
export const groupTransactionsIntoBundles = (
    transactions: Transaction[]
): Bundle[] => transactions
    .reduce((acc: Bundle[], transaction: Transaction) => transaction.currentIndex === 0
        ? acc.concat(getBundle(transactions, transaction))
        : acc, []) 

/**
 *   Gets an array of bundles given a list of associated addresses 
 *
 *   @method bundlesFromAddresses
 *   @param {array} addresses - Array of addresses
 *   @param {bool} inclusionStates - Flag to include persistence status
 *   @returns {array} bundles - Array of bundles
 */
export default function getBundlesFromAddresses(
  this: API,
  addresses: string[],
  inclusionStates?: boolean,
  callback?: Callback<Bundle[]>
): Promise<Bundle[]> {
    // 1. Get txs associated with addresses
    const promise: Promise<Bundle[]> = this.findTransactionObjects({ addresses })
      
      // 2. Get all transactions by bundle hashes
      .then((transactions: Transaction[]) => this.findTransactionObjects(
          {
              bundles: transactions
                  .filter(transaction => transaction.currentIndex === 0)
                  .map(transaction => transaction.bundle)
          }
      ))

      // 3. Group transactions into bundles
      .then((transactions: Transaction[]) => groupTransactionsIntoBundles(transactions))

      // 4. If requested, add persistance status to each bundle 
      .then((bundles: Bundle[]) => inclusionStates
        ? this.getLatestInclusion(bundles.map((bundle: Bundle) => bundle[0].hash))
            .then((states: boolean[]): Bundle[] => bundles
                .map((bundle: Bundle, i: number) => bundle
                    .map(transaction => ({
                        ...transaction,
                        persistence: states[i]
                    }))
                )
            )
        : bundles
      )

      // 5. Sort bundles by timestamp
      .then((bundles: Bundle[]) => bundles
          .sort((a: Bundle, b: Bundle) => a[0].attachmentTimestamp - b[0].attachmentTimestamp))

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}

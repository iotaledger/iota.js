import { TRYTE_WIDTH } from '@iota/converter'
import { TRANSACTION_HASH_LENGTH } from '@iota/transaction'
import { asTransactionObject } from '@iota/transaction-converter'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { isTrytesOfExactLength, validate } from '../../guards'
import { Callback, Hash, Provider, Transaction } from '../../types'
import { createGetTrytes } from './'

/**
 * @method createTraverseBundle
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider
 *
 * @return {function} {@link #module_core.traverseBundle `traverseBundle`}
 */
export const createTraverseBundle = (provider: Provider) => {
    const getTrytes = createGetTrytes(provider)

    /**
     * Gets all transactions in the bundle of a given tail transaction hash, by traversing its `trunkTransaction` field.
     * 
     * **Note:** This method does not validate the bundle.
     * 
     * ## Related methods
     * 
     * To get and validate all transactions in a bundle, use the [`getBundle()`]{@link #module_core.getBundle} method.
     *
     * @method traverseBundle
     * 
     * @summary Gets all transaction in the bundle of a given tail transaction hash.
     *
     * @memberof module:core
     *
     * @param {Hash} trunkTransaction - Tail transaction hash
     * @param {Hash} [bundle=[]] - Array of existing transaction objects to include in the returned bundle
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * 
     * ```js
     * traverseBundle(tailTransactionHash)
     * .then(bundle => {
     *     console.log(`Successfully found the following transactions in the bundle:`);
     *     console.log(JSON.stringify(bundle));
     * }).catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     * })
     * ```
     *
     * @returns {Promise}
     * 
     * @fulfil {Transaction[]} bundle - Array of transaction objects
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hash is 81 trytes long
     * -`INVALID_TAIL_TRANSACTION`: Make sure that the tail transaction hash is for a transaction whose `currentIndex` field is 0
     * - `INVALID_BUNDLE`: Check the tail transaction's bundle for the following:
     *   - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
     *   - Transactions in the bundle array are in the same order as their currentIndex field
     *   - The total value of all transactions in the bundle sums to 0
     *   - The bundle hash is valid
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function traverseBundle(
        trunkTransaction: Hash,
        bundle: ReadonlyArray<Transaction> = [],
        callback?: Callback<ReadonlyArray<Transaction>>
    ): Promise<ReadonlyArray<Transaction>> {
        return Promise.resolve(
            validate([
                trunkTransaction,
                t => isTrytesOfExactLength(t, TRANSACTION_HASH_LENGTH / TRYTE_WIDTH),
                errors.INVALID_TRANSACTION_HASH,
            ])
        )
            .then(() => getTrytes([trunkTransaction]))
            .then(([trytes]) => asTransactionObject(trytes, trunkTransaction))
            .tap(transaction =>
                validate(
                    bundle.length === 0 && [transaction, t => t.currentIndex === 0, errors.INVALID_TAIL_TRANSACTION]
                )
            )
            .then(transaction =>
                transaction.currentIndex === transaction.lastIndex
                    ? bundle.concat(transaction)
                    : traverseBundle(transaction.trunkTransaction, bundle.concat(transaction))
            )
            .asCallback(arguments[1] === 'function' ? arguments[1] : callback)
    }
}

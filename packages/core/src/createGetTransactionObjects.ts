import { asTransactionObjects } from '@iota/transaction-converter'
import * as Promise from 'bluebird'
import { Callback, Hash, Provider, Transaction } from '../../types'
import { createGetTrytes } from './'

/**
 * @method createGetTransactionObjects
 * 
 * @summary Creates a new `getTransactionObjects()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getTransactionObjects`]{@link #module_core.getTransactionObjects}  - A new `getTransactionObjects()` function that uses your chosen Provider instance.
 */
export const createGetTransactionObjects = (provider: Provider) => {
    const getTrytes = createGetTrytes(provider)

    /**
     * This method returns transaction objects in the same order as the given hashes.
     * For example, if the node doesn't have any transactions with a given hash, the value at that index in the returned array is empty.
     * 
     * ## Related methods
     * 
     * To find all transaction objects in a specific bundle, use the [`getBundle()`]{@link #module_core.getBundle} method.
     * 
     * @method getTransactionObjects
     * 
     * @summary Searches the Tangle for transactions with the given hashes and returns their contents as objects.
     *
     * @memberof module:core
     *
     * @param {Hash[]} hashes - Array of transaction hashes
     * @param {Function} [callback] - Optional callback function
     * 
     * @example
     *
     * ```js
     * getTransactionObjects(transactionHashes)
     *   .then(transactionObjects => {
     *     console.log('Found the following transactions:');
     *     console.log(JSON.stringify(transactionObjects));
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`);
     *   });
     * ```
     *
     * @returns {Promise}
     * 
     * @fulfil {Transaction[]} - Array of transaction objects
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_TRANSACTION_HASH`: Make sure that the transaction hashes are 81 trytes long
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function getTransactionObjects(
        hashes: ReadonlyArray<Hash>,
        callback?: Callback<ReadonlyArray<Transaction>>
    ): Promise<ReadonlyArray<Transaction>> {
        return getTrytes(hashes)
            .then(asTransactionObjects(hashes))
            .asCallback(callback)
    }
}

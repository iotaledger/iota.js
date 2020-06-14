import { bundleValidator } from '@iota/bundle-validator'
import * as Promise from 'bluebird'
import { validate } from '../../guards'
import {
    Bundle,
    Callback,
    Hash,
    Provider,
    Transaction, // tslint:disable-line no-unused-variable
} from '../../types'
import { createTraverseBundle } from './'

/**
 * @method createGetBundle
 * 
 * @summary Creates a new `getBundle()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getBundle`]{@link #module_core.getBundle}  - A new `getBundle()` function that uses your chosen Provider instance.
 */
export const createGetBundle = (provider: Provider) => {
    const traverseBundle = createTraverseBundle(provider)

    /**
     * This method uses the [`traverseBundle()`]{@link #module_core.traverseBundle} method to find all transactions in a bundle, validate them, and return them as transaction objects.
     * 
     * For more information about what makes a bundles and transactions valid, see [this guide](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).
     * 
     * ## Related methods
     * 
     * To find transaction objects that aren't in the same bundle, use the [`getTransactionObjects()`]{@link #module_core.getTransactionObjects} method.
     * 
     * @method getBundle
     * 
     * @summary Searches the Tangle for a valid bundle that includes the given tail transaction hash.
     *
     * @memberof module:core
     *
     * @param {Hash} tailTransactionHash - Tail transaction hash
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     *
     * ```js
     * getBundle(tail)
     *    .then(bundle => {
     *     console.log(`Bundle found:)
     *     console.log(JSON.stringify(bundle));
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     *    })
     * ```
     *
     * @returns {Promise}
     * 
     * @fulfil {Transaction[]} bundle - Array of transaction objects that are in the bundle
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hash is 81 trytes long
     * - `INVALID_TAIL_HASH`: Make sure that the tail transaction hash is for a transaction whose `currentIndex` field is 0
     * - `INVALID_BUNDLE`: Check the tail transaction's bundle for the following:
     *   - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
     *   - Transactions in the bundle array are in the same order as their currentIndex field
     *   - The total value of all transactions in the bundle sums to 0
     *   - The bundle hash is valid
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function getBundle(tailTransactionHash: Hash, callback?: Callback<Bundle>): Promise<Bundle> {
        return traverseBundle(tailTransactionHash)
            .tap(bundle => validate(bundleValidator(bundle)))
            .asCallback(callback)
    }
}

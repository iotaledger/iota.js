import * as Promise from 'bluebird'
import { Callback, Hash, Provider } from '../../types'
import { createGetInclusionStates, createGetNodeInfo } from './'

/**
 * @method createGetLatestInclusion
 * 
 * @summary Creates a new `getLatestInclusion()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getLatestInclusion`]{@link #module_core.getLatestInclusion}  - A new `getLatestInclusion()` function that uses your chosen Provider instance.
 */
export const createGetLatestInclusion = (provider: Provider) => {
    const getInclusionStates = createGetInclusionStates(provider)
    const getNodeInfo = createGetNodeInfo(provider)

    /**
     * This method uses the node's `latestSolidSubtangleMilestone` field as the `tips` argument to make sure that the given transactions are referenced by the node's latest solid milestone.
     *
     * An invalid transaction will always remain in a pending state.
     * 
     * **Note:** If a valid transaction is in a pending state for too long, you can [increase its chances of being confirmed](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/confirm-pending-bundle).
     * 
     * ## Related methods
     * 
     * If you want to check if transactions are referenced by a non-milestone transaction, use the [`getInclusionStates()`]{@link #module_core.getInclusionStates} method.
     * 
     * @method getLatestInclusion
     * 
     * @summary Finds out if one or more given transactions are [confirmed or pending](https://docs.iota.org/docs/getting-started/0.1/network/the-tangle#transaction-states).
     *
     * @memberof module:core
     *
     * @param {Array<Hash>} transactions - List of transactions hashes to check
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     *
     * ```js
     * iota.getLatestInclusionState(['transactionHash'])
     * .then(states => {
     *    for(let i = 0; i < states.length; i++){
     *        states[i]? console.log(`Transaction ${i} is confirmed`) :
     *        console.log(`transaction ${i} is pending`);
     *    }
     *  })
     * .catch(error => {
     *     console.log(`Something went wrong: ${error}`);
     *  });
     * ```
     * 
     * @return {Promise}
     * 
     * @fulfil {boolean[]} states - Array of inclusion states, where `true` means that the transaction is confirmed and `false` means that it's not.
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_HASH`: Make sure that the transaction hashes are 81 trytes long
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function getLatestInclusion(
        transactions: ReadonlyArray<Hash>,
        callback?: Callback<ReadonlyArray<boolean>>
    ): Promise<ReadonlyArray<boolean>> {
        return getNodeInfo()
            .then(nodeInfo => getInclusionStates(transactions, [nodeInfo.latestSolidSubtangleMilestone]))
            .asCallback(callback)
    }
}

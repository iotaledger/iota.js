import * as Promise from 'bluebird'
import { Callback, Hash, Provider } from '../../types'
import { createGetInclusionStates, createGetNodeInfo } from './'

/**
 * @method createGetLatestInclusion
 *
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider for accessing IRI
 *
 * @return {function} {@link #module_core.getLatestInclusion `getLatestInclusion`}
 */
export const createGetLatestInclusion = (provider: Provider) => {
    const getInclusionStates = createGetInclusionStates(provider)
    const getNodeInfo = createGetNodeInfo(provider)

    /**
     * Fetches inclusion states of given transactions and a list of tips,
     * by calling [`getInclusionStates`]{@link #module_core.getInclusionStates} on `latestSolidSubtangleMilestone`.
     *
     * @example
     *
     * ```js
     * getLatestInclusion(hashes)
     *    .then(states => {
     *        // ...
     *    })
     *    .catch(err => {
     *        // handle error
     *    })
     * ```
     *
     * @method getLatestInclusion
     *
     * @memberof module:core
     *
     * @param {Array<Hash>} transactions - List of transactions hashes
     * @param {number} tips - List of tips to check if transactions are referenced by
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {boolean[]} List of inclusion states
     * @reject {Error}
     * - `INVALID_HASH`: Invalid transaction hash
     * - Fetch error
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

import * as Promise from 'bluebird'
import { Callback, GetTipsCommand, GetTipsResponse, Hash, IRICommand, Provider } from '../../types'

/**
 * @method createGetTips
 * 
 * @summary Creates a new `getTips()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getTips`]{@link #module_core.getTips}  - A new `getTips()` function that uses your chosen Provider instance.
 */
export const createGetTips = ({ send }: Provider) =>
    /**
     * This method finds all transactions that aren't referenced by other transactions in the Tangle
     * by calling the connected IRI node's [`getTips`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#gettips) endpoint.
     * 
     * ## Related methods
     * 
     * If you want to find two consistent tip transactions to use as branch and trunk transactions, use the [`getTransactionsToApprove()`]{@link #module_core.getTransactionsToApprove} method.
     * 
     * @method getTips
     * 
     * @summary Searches the Tangle for tip transactions.
     *
     * @memberof module:core
     *
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     *
     * ```js
     * getTips()
     *   .then(tips => {
     *     console.log('Found the following tip transactions:');
     *     console.log(JSON.stringify(tips));
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`);
     *   })
     * ```
     *
     * @return {Promise}
     * @fulfil {Hash[]} tips - Array of tip transaction hashes
     * @reject {Error} error - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    (callback?: Callback<ReadonlyArray<Hash>>): Promise<ReadonlyArray<Hash>> =>
        send<GetTipsCommand, GetTipsResponse>({ command: IRICommand.GET_TIPS })
            .then(({ hashes }) => hashes)
            .asCallback(callback)

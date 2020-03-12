import { TRYTE_WIDTH } from '@iota/converter'
import { TRANSACTION_HASH_LENGTH } from '@iota/transaction'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { isTrytesOfExactLength, validate } from '../../guards'
import { Callback, GetTrytesCommand, GetTrytesResponse, Hash, IRICommand, Provider, Trytes } from '../../types'

/**
 * @method createGetTrytes
 * 
 * @summary Creates a new `getTrytes()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getTrytes`]{@link #module_core.getTrytes}  - A new `getTrytes()` function that uses your chosen Provider instance.
 */
export const createGetTrytes = ({ send }: Provider) =>
    /**
     * This method uses the connected IRI node's
     * [`getTrytes`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#gettrytes) endpoint.
     * 
     * The transaction trytes include all transaction fields except the transaction hash.
     * 
     * **Note:** If the connected IRI node doesn't have the given transaction in its ledger, the value at the index of that transaction hash is either `null` or a string of `9`s.
     * 
     * ## Related methods
     * 
     * To get transaction objects instead of trytes, use the [`getTransactionObjects()`]{@link #module_core.getTransactionObjects} method.
     * 
     * @method getTrytes
     * 
     * @summary Gets the transaction trytes for the given transaction hashes.
     *
     * @memberof module:core
     *
     * @param {Array<Hash>} hashes - Array of transaction hashes
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * ```js
     * getTrytes(hashes)
     *   .then(trytes => {
     *   .then(transactionTrytes => {
     *     console.log(Found the following transaction trytes:);
     *     console.log(JSON.stringify(transactionTrytes));
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`);
     *   });
     * ```
     *
     * @return {Promise}
     * 
     * @fulfil {Trytes[]} transactionTrytes - Array of transaction trytes
     * 
     * @reject Error{} error - An error that contains one of the following:
     * - `INVALID_TRANSACTION_HASH`: Make sure that the transaction hashes are 81 trytes long
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    function getTrytes(
        hashes: ReadonlyArray<Hash>,
        callback?: Callback<ReadonlyArray<Trytes>>
    ): Promise<ReadonlyArray<Trytes>> {
        return Promise.resolve(
            validate([
                hashes,
                arr => arr.every((h: Hash) => isTrytesOfExactLength(h, TRANSACTION_HASH_LENGTH / TRYTE_WIDTH)),
                errors.INVALID_TRANSACTION_HASH,
            ])
        )
            .then(() =>
                send<GetTrytesCommand, GetTrytesResponse>({
                    command: IRICommand.GET_TRYTES,
                    hashes,
                })
            )
            .then(({ trytes }) => trytes)
            .asCallback(callback)
    }

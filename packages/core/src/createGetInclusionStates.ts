import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { arrayValidator, hashValidator, validate } from '../../guards'
import {
    Callback,
    GetInclusionStatesCommand,
    GetInclusionStatesResponse,
    Hash,
    IRICommand,
    Provider,
} from '../../types'

/**
 * @method createGetInclusionStates
 *
 * @summary Creates a new `getInclusionStates()` method, using a custom Provider instance.
 *
 * @memberof module:core
 *
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getInclusionStates`]{@link #module_core.getInclusionStates}  - A new `getInclusionStates()` function that uses your chosen Provider instance.
 */
export const createGetInclusionStates = ({ send }: Provider) =>
    /**
     * This method uses the connected IRI node's [`getInclusionStates`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#getinclusionstates) endpoint.
     *
     * If the given tip transactions reference a given transaction, the returned state is `true`.
     *
     * If the given tip transactions do not reference a given transaction, the returned state is `false`.
     *
     * @method getInclusionStates
     *
     * @summary Finds out if one or more given transactions are referenced by one or more other given transactions.
     *
     * @memberof module:core
     *
     * @param {Hash[]} transactions - Array of transaction hashes to check
     * @param {Callback} [callback] - Optional callback function
     *
     * @example
     * ```js
     * getInclusionStates(transactions)
     *   .then(states => {
     *      for(let i = 0; i < states.length; i++){
     *          states? console.log(`Transaction ${i} is referenced by the given transactions`) :
     *          console.log(`Transaction ${i} is not referenced by the given transactions`);
     *      }
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     *   });
     * ```
     *
     * @return {Promise}
     *
     * @fulfil {boolean[]} states - Array of inclusion states, where `true` means that the transaction is referenced by the given transacions and `false` means that it's not.
     *
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_TRANSACTION_HASH`: Make sure that the transaction hashes are 81 trytes long
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
     */
    (transactions: ReadonlyArray<Hash>, callback?: Callback<ReadonlyArray<boolean>>): Promise<ReadonlyArray<boolean>> =>
        Promise.resolve(validate(arrayValidator(hashValidator)(transactions, errors.INVALID_TRANSACTION_HASH)))
            .then(() =>
                send<GetInclusionStatesCommand, GetInclusionStatesResponse>({
                    command: IRICommand.GET_INCLUSION_STATES,
                    transactions,
                })
            )
            .then(({ states }) => states)
            .asCallback(callback)

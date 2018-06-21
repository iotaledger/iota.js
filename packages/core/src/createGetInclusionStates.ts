import * as Promise from 'bluebird'
import { hashArrayValidator, validate } from '@iota/validators'
import {
    Callback,
    Hash,
    IRICommand,
    Provider,
    GetInclusionStatesCommand,
    GetInclusionStatesResponse
} from '../../types'

/**
 * @method createGetInclusionStates
 * 
 * @param {Provider} provider - Network provider for accessing IRI 
 * 
 * @return {function} {@link getInclusionStates}
 */
export const createGetInclusionStates = ({ send }: Provider) =>

    /**
     * Fetches inclusion states of given list of transactions, by calling
     * [`getInclusionStates`](https://docs.iota.works/iri/api#endpoints/getInclusionsStates) command.
     *
     * ### Example
     * getInclusionStates(transactions)
     *   .then(states => {
     *     // ...   
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     *
     * @method getInclusionStates
     * 
     * @param {Hash[]} transactions - List of transaction hashes 
     * @param {Hash[]} tips - List of tips to check if transactions are referenced by
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise} 
     * @fulfil {boolean[]} Array of inclusion state
     * @reject {Error}
     * - `INVALID_HASH_ARRAY`: Invalid `hashes` or `tips` 
     * - Fetch error
     */
    (
        transactions: ReadonlyArray<Hash>,
        tips: ReadonlyArray<Hash>,
        callback?: Callback<ReadonlyArray<boolean>>
    ): Promise<ReadonlyArray<boolean>> =>
        Promise.resolve(validate(hashArrayValidator(transactions), hashArrayValidator(tips)))
            .then(() => send<GetInclusionStatesCommand, GetInclusionStatesResponse>({
                command: IRICommand.GET_INCLUSION_STATES,
                transactions,
                tips,
            }))
            .then(({ states }) => states)
            .asCallback(callback)
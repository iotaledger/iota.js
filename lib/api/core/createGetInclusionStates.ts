import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashArrayValidator, validate } from '../../utils'

import { BaseCommand, Callback, Hash, IRICommand, Provider } from '../types'

export interface GetInclusionStatesCommand extends BaseCommand {
    command: IRICommand.GET_INCLUSION_STATES
    transactions: string[]
    tips: string[]
}

export interface GetInclusionStatesResponse {
    states: boolean[]
    duration: number
}

export const validateGetInclusionStates = (transactions: Hash[], tips: Hash[]) =>
    validate(hashArrayValidator(transactions), hashArrayValidator(tips))

/**
 * @method createGetInclusionStates
 * 
 * @param {Provider} provider - Network provider for accessing IRI 
 * 
 * @return {function} {@link getInclusionStates}
 */
export const createGetInclusionStates = (provider: Provider) =>

    /**
     * Fetches inclusion states of given list of transactions and tips, by calling
     * [`getInclusionStates`]{@link https://docs.iota.works/iri/api#endpoints/getInclusionsStates} command.
     *
     * @example
     * getInclusionStates(transactions)
     *    .then(state => {
     *        // ...
     *    })
     *    .catch(err => {
     *        // handle errors
     *    })
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
        transactions: Hash[],
        tips: Hash[],
        callback?: Callback<boolean[]>
    ): Promise<boolean[]> =>
        Promise.resolve(validateGetInclusionStates(transactions, tips))
            .then(() =>
                provider.sendCommand<GetInclusionStatesCommand, GetInclusionStatesResponse>({
                    command: IRICommand.GET_INCLUSION_STATES,
                    transactions,
                    tips,
                })
            )
            .then((res: GetInclusionStatesResponse) => res.states)
            .asCallback(callback)

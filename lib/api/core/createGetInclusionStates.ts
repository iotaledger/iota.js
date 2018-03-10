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
 *   @method getInclusionStates
 *   @param {array} transactions
 *   @param {array} tips
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const createGetInclusionStates = (provider: Provider) => ( 
    transactions: string[],
    tips: string[],
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
        .then(res => res.states)
        .asCallback(callback)

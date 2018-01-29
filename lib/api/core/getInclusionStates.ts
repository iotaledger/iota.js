import errors from '../../errors'
import { isArrayOfHashes } from '../../utils'

import { API, BaseCommand, Callback, IRICommand } from '../types'

export interface GetInclusionStatesCommand extends BaseCommand {
    command: IRICommand.GET_INCLUSION_STATES
    transactions: string[]
    tips: string[]
}

export interface GetInclusionStatesResponse {
    states: boolean[]
    duration: number
}

/**
 *   @method getInclusionStates
 *   @param {array} transactions
 *   @param {array} tips
 *   @returns {function} callback
 *   @returns {object} success
 **/
export default function getInclusionStates(
    this: API,
    transactions: string[], 
    tips: string[], 
    callback?: Callback<boolean[]>): Promise<boolean[]> {

    const promise = new Promise<boolean[]>((resolve, reject) => {
        if (!isArrayOfHashes(transactions)) {
            return reject(errors.INVALID_TRYTES)
        }

        if (!isArrayOfHashes(tips)) {
            return reject(errors.INVALID_TRYTES)
        }

        resolve(
            this.sendCommand<GetInclusionStatesCommand, GetInclusionStatesResponse>(
                {
                    command: IRICommand.GET_INCLUSION_STATES,
                    transactions,
                    tips,
                }
            )
                .then(res => res.states)
        )
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}

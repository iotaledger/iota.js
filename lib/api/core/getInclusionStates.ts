import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'
import Utils from '../../utils/utils'

import { API } from '../index'
import { Callback, GetInclusionStatesCommand, keysOf } from '../types/commands'
import { GetInclusionStatesResponse } from '../types/response'

import { getInclusionStatesCommand } from './commands'
import { parseGetInclusionStates } from './parsers'
import sendCommand from './sendCommand'

/**
 *   @method getInclusionStates
 *   @param {array} transactions
 *   @param {array} tips
 *   @returns {function} callback
 *   @returns {object} success
 **/
function getInclusionStates(this: API, transactions: string[], tips: string[], callback: Callback): Promise<boolean[]> {
    const promise = new Promise<boolean[]>((resolve, reject) => {
        // Check if correct transaction hashes
        if (!inputValidator.isArrayOfHashes(transactions)) {
            return reject(errors.INVALID_TRYTES)
        }

        // Check if correct tips
        if (!inputValidator.isArrayOfHashes(tips)) {
            return reject(errors.INVALID_TRYTES)
        }

        resolve(
            this.sendCommand<GetInclusionStatesCommand, GetInclusionStatesResponse>(
                getInclusionStatesCommand(transactions, tips)
            ).then(parseGetInclusionStates)
        )
    })

    if (typeof callback === 'function') {
        promise.then(res => callback(null, res), err => callback(err))
    }

    return promise
}

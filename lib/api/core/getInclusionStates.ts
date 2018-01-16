import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'
import Utils from '../../utils/utils'

import { Callback, keysOf } from '../types/commands'
import { GetInclusionStatesResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
import sendCommand from './sendCommand'

/**
 *   @method getInclusionStates
 *   @param {array} transactions
 *   @param {array} tips
 *   @returns {function} callback
 *   @returns {object} success
 **/
function getInclusionStates(transactions: string[], tips: string[], callback: Callback<GetInclusionStatesResponse>) {
    // Check if correct transaction hashes
    if (!inputValidator.isArrayOfHashes(transactions)) {
        return callback(errors.invalidTrytes())
    }

    // Check if correct tips
    if (!inputValidator.isArrayOfHashes(tips)) {
        return callback(errors.invalidTrytes())
    }

    const command = commandBuilder.getInclusionStates(transactions, tips)

    return sendCommand(command, callback)
}

import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'

import { Callback } from '../types/commands'
import { GetTransactionsToApproveResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
import sendCommand from './sendCommand'

/**
 *   @method getTransactionsToApprove
 *   @param {int} depth
 *   @param {string} reference
 *   @returns {function} callback
 *   @returns {object} success
 **/
function getTransactionsToApprove(
    depth: number,
    reference: string,
    callback: Callback<GetTransactionsToApproveResponse>
) {
    // Check if correct depth
    if (!inputValidator.isValue(depth)) {
        return callback(errors.invalidInputs())
    }

    const command = commandBuilder.getTransactionsToApprove(depth, reference)

    return sendCommand(command, callback)
}

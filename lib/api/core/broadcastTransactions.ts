import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'

import { Callback } from '../types/commands'
import { BroadcastTransactionsResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
import sendCommand from './sendCommand'

/**
 *   @method broadcastTransactions
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
function broadcastTransactions(trytes: string[], callback: Callback<BroadcastTransactionsResponse>) {
    if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {
        return callback(errors.invalidAttachedTrytes())
    }

    const command = commandBuilder.broadcastTransactions(trytes)

    return sendCommand(command, callback)
}

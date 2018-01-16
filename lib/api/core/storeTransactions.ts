import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'

import { Callback } from '../types/commands'
import { StoreTransactionsResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
import sendCommand from './sendCommand'

/**
 *   @method storeTransactions
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
function storeTransactions(trytes: string[], callback: Callback<StoreTransactionsResponse>) {
    if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {
        return callback(errors.invalidAttachedTrytes())
    }

    const command = commandBuilder.storeTransactions(trytes)

    return this.sendCommand(command, callback)
}

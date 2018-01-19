import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'

import { Callback } from '../types/commands'
import { StoreTransactionsResponse } from '../types/responses'

import { storeTransactionsCommand } from './commands'
import sendCommand from './sendCommand'

/**
 *   @method storeTransactions
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
function storeTransactions(this: any, trytes: string[], callback: Callback<StoreTransactionsResponse>): Promise<StoreTransactionsResponse> {
    const promise: Promise<StoreTransactionsResponse> = new Promise((resolve, reject) => {
      if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {
        reject(errors.INVALID_ATTACHED_TRYTES)
      }
      resolve(this.sendCommand(storeTransactionsCommand(trytes)))
    })

    if (typeof callback === 'function') {
      promise.then(
        (res) => callback(null, res),
        (err) => callback(err)
      ) 
    }

    return promise
}

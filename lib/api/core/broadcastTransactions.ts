import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'

import { Callback } from '../types/commands'
import { BroadcastTransactionsResponse } from '../types/responses'

import { broadcastTransactionsCommand } from './commands'
import sendCommand from './sendCommand'

/**
 *   @method broadcastTransactions
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
function broadcastTransactions(this: any, trytes: string[], callback: Callback<BroadcastTransactionsResponse>): Promise<BroadcastTransactionsResponse> {
    const promise: Promise<BroadcastTransactionsResponse> = new Promise((resolve, reject) => {
      if (!inputValidator.isArrayOfAttachedTrytes(trytes)) {
        reject(callback(errors.INVALID_ATTACHED_TRYTES))
      } else {
        resolve(this.sendCommand(broadcastTransactionsCommand(trytes)))
      }    
    })

    if (typeof callback === 'function') {
      promise.then(
        res => callback(null, res),
        err => callback(err)
      )
    }

    return promise
}

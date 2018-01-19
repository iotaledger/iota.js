import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'
import Utils from '../../utils/utils'

import { Callback, keysOf } from '../types/commands'
import { GetInclusionStatesResponse } from '../types/responses'

import { getInclusionStatesCommand } from './commands'
import sendCommand from './sendCommand'

/**
 *   @method getInclusionStates
 *   @param {array} transactions
 *   @param {array} tips
 *   @returns {function} callback
 *   @returns {object} success
 **/
function getInclusionStates(this: any, transactions: string[], tips: string[], callback: Callback<boolean[]>): Promise<boolean[]> {
    const promise: Promise<boolean[]> = new Promise((resolve, reject) => {
      // Check if correct transaction hashes
      if (!inputValidator.isArrayOfHashes(transactions)) {
          return reject(errors.INVALID_TRYTES)
      }

      // Check if correct tips
      if (!inputValidator.isArrayOfHashes(tips)) {
          return reject(errors.INVALID_TRYTES)
      }

      resolve(this.sendCommand(getInclusionStatesCommand(transactions, tips)).then(
        (res) => ({res.states})
      ))
    })
  
    if (typeof callback === 'function') {
      promise.then(
        res => callback(null, res),
        err => callback(err)  
      )
    }

    return promise
}

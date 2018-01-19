import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'
import Utils from '../../utils/utils'

import { Callback, keysOf } from '../types/commands'
import { GetBalancesResponse } from '../types/responses'

import { getBalancesCommand } from './commands'
import sendCommand from './sendCommand'

/**
 *   @method getBalances
 *   @param {array} addresses
 *   @param {int} threshold
 *   @returns {function} callback
 *   @returns {object} success
 **/
function getBalances(this: any, addresses: string[], threshold: number, callback: Callback<GetBalancesResponse>): Promise<GetBalancesResponse> {
  const promise: Promise<GetBalancesResponse> = new Promise((resolve, reject) => {
    // Check if correct transaction hashes
    if (!inputValidator.isArrayOfHashes(addresses)) {
      reject(errors.INVALID_TRYTES)
    } else {
      resolve(
        this.sendCommand(
          getBalancesCommand(addresses.map(address => Utils.noChecksum(address)), threshold)
        )
      )
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

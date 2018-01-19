import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'

import { Callback } from '../types/commands'
import { AttachToTangleResponse } from '../types/responses'

import { attachToTangleCommand } from './commands'
import sendCommand from './sendCommand'

/**
 *   @method attachToTangle
 *   @param {string} trunkTransaction
 *   @param {string} branchTransaction
 *   @param {integer} minWeightMagnitude
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
function attachToTangle(
    this: any,
    trunkTransaction: string,
    branchTransaction: string,
    minWeightMagnitude: number,
    trytes: string[],
    callback: Callback<AttachToTangleResponse>
): Promise<AttachToTangleResponse> {
  const promise: Promise<AttachToTangleResponse> = new Promise((resolve, reject) => {
      // inputValidator: Check if correct hash
      if (!inputValidator.isHash(trunkTransaction)) {
          return reject(errors.INVALID_TRUNK_TRANSACTION)
      }

      // inputValidator: Check if correct hash
      if (!inputValidator.isHash(branchTransaction)) {
          return reject(errors.INVALID_BRANCH_TRANSACTION)
      }

      // inputValidator: Check if int
      if (!inputValidator.isValue(minWeightMagnitude)) {
          return reject(errors.NOT_INT)
      }

      // inputValidator: Check if array of trytes
      if (!inputValidator.isArrayOfTrytes(trytes)) {
          return reject(errors.INVALID_TRYTES)
      }

      resolve(
        this.sendCommand(
          attachToTangleCommand(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)
        )
      )
  })
  
  if (typeof callback === 'function') {
    promise.then(
      res => callback(null, res),
      err => callback(err)
    )
  }

  return promise
}

import errors from '../../errors'
import { isArrayOfTrytes, isHash } from '../../utils'

import { API, BaseCommand, Callback, IRICommand } from '../types'

export interface AttachToTangleCommand extends BaseCommand {
    command: IRICommand.ATTACH_TO_TANGLE
    trunkTransaction: string
    branchTransaction: string
    minWeightMagnitude: number
    trytes: string[]
}

export interface AttachToTangleResponse {
    trytes: string[]
}

/**
 *   @method attachToTangle
 *   @param {string} trunkTransaction
 *   @param {string} branchTransaction
 *   @param {integer} minWeightMagnitude
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export default function attachToTangle(
    this: API,
    trunkTransaction: string,
    branchTransaction: string,
    minWeightMagnitude: number,
    trytes: string[],
    callback?: Callback<string[]>): Promise<string[]> {
        
    const promise: Promise<string[]> = new Promise((resolve, reject) => {
        // Check if correct hash
        if (!isHash(trunkTransaction)) {
            return reject(errors.INVALID_TRUNK_TRANSACTION)
        }

        // Check if correct hash
        if (!isHash(branchTransaction)) {
            return reject(errors.INVALID_BRANCH_TRANSACTION)
        }

        // Check if int
        if (!Number.isInteger(minWeightMagnitude)) {
            return reject(errors.INVALID_MIN_WEIGHT_MAGNITUDE)
        }

        // Check if array of trytes
        if (!isArrayOfTrytes(trytes)) {
            return reject(errors.INVALID_TRYTES)
        }

        resolve(
            this.sendCommand<AttachToTangleCommand, AttachToTangleResponse>(
                {
                    command: IRICommand.ATTACH_TO_TANGLE,
                    trunkTransaction,
                    branchTransaction,
                    minWeightMagnitude,
                    trytes,
                }
            )
            .then(res => res.trytes)
        )
    })

    // Invoke callback if present
    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    } 
  
    return promise
}

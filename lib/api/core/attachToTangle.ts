import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'

import { Callback } from '../types/commands'
import { AttachToTangleResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
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
    trunkTransaction: string,
    branchTransaction: string,
    minWeightMagnitude: number,
    trytes: string[],
    callback: Callback<AttachToTangleResponse>
): Promise<AttachToTangleResponse> | void {
    // inputValidator: Check if correct hash
    if (!inputValidator.isHash(trunkTransaction)) {
        return callback(errors.invalidTrunkOrBranch(trunkTransaction))
    }

    // inputValidator: Check if correct hash
    if (!inputValidator.isHash(branchTransaction)) {
        return callback(errors.invalidTrunkOrBranch(branchTransaction))
    }

    // inputValidator: Check if int
    if (!inputValidator.isValue(minWeightMagnitude)) {
        return callback(errors.notInt())
    }

    // inputValidator: Check if array of trytes
    if (!inputValidator.isArrayOfTrytes(trytes)) {
        return callback(errors.invalidTrytes())
    }

    const command = commandBuilder.attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)

    return sendCommand(command, callback)
}

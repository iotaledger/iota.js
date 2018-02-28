import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashValidator, mwmValidator, trytesArrayValidator, validate } from '../../utils'
import { API, BaseCommand, Callback, Hash, IRICommand, Trytes } from '../types'
import { sendCommand } from './sendCommand'

export interface AttachToTangleCommand extends BaseCommand {
    command: IRICommand.ATTACH_TO_TANGLE
    trunkTransaction: Hash
    branchTransaction: Hash
    minWeightMagnitude: number
    trytes: Trytes[]
}

export interface AttachToTangleResponse {
    trytes: Trytes[]
}

export const validateAttachToTangle = (
    trunkTransaction: Hash,
    branchTransaction: Hash,
    minWeightMagnitude: number,
    trytes: Trytes[]
) =>
    validate([
        hashValidator(trunkTransaction),
        hashValidator(branchTransaction),
        mwmValidator(minWeightMagnitude),
        trytesArrayValidator(trytes),
    ])

/**
 *   @method attachToTangle
 *   @param {string} trunkTransaction
 *   @param {string} branchTransaction
 *   @param {integer} minWeightMagnitude
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const attachToTangle = (
    trunkTransaction: Hash,
    branchTransaction: Hash,
    minWeightMagnitude: number,
    trytes: Trytes[],
    callback?: Callback<string[]>
): Promise<string[]> =>
    Promise.try(() => validateAttachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes))
        .then(() =>
            sendCommand<AttachToTangleCommand, AttachToTangleResponse>({
                command: IRICommand.ATTACH_TO_TANGLE,
                trunkTransaction,
                branchTransaction,
                minWeightMagnitude,
                trytes,
            })
        )
        .then(res => res.trytes)
        .asCallback(callback)

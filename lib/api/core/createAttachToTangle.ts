import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashValidator, mwmValidator, trytesArrayValidator, validate } from '../../utils'
import { AttachToTangle, BaseCommand, Callback, Hash, IRICommand, Provider, Trytes } from '../types'

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
    validate(
        hashValidator(trunkTransaction, errors.INVALID_TRUNK_TRANSACTION),
        hashValidator(branchTransaction, errors.INVALID_BRANCH_TRANSACTION),
        mwmValidator(minWeightMagnitude),
        trytesArrayValidator(trytes)
    )

/**
 *   By default, attachToTangle sends the `attachToTangle` command to an IRI
 *   node. This can be replaced with a remote PoWbox, for example. 
 *   @method attachToTangle
 *   @param {string} trunkTransaction
 *   @param {string} branchTransaction
 *   @param {integer} minWeightMagnitude
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 */
export const createAttachToTangle = (provider: Provider) => (
    trunkTransaction: Hash,
    branchTransaction: Hash,
    minWeightMagnitude: number,
    trytes: Trytes[],
    callback?: Callback<string[]>
): Promise<string[]> =>
    Promise.resolve(validateAttachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes))
        .then(() => provider.sendCommand<AttachToTangleCommand, AttachToTangleResponse>({
            command: IRICommand.ATTACH_TO_TANGLE,
            trunkTransaction,
            branchTransaction,
            minWeightMagnitude,
            trytes,
        }))
        .then(res => res.trytes)
        .asCallback(callback)

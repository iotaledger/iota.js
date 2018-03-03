import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashValidator, mwmValidator, trytesArrayValidator, validate } from '../../utils'
import { AttachToTangle, BaseCommand, Callback, Hash, IRICommand, Settings, Trytes } from '../types'
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
    validate(
        hashValidator(trunkTransaction),
        hashValidator(branchTransaction),
        mwmValidator(minWeightMagnitude),
        trytesArrayValidator(trytes)
    )

/**
 * By default, attachToTangle sends the `attachToTangle` command to an IRI
 * node. This can be replaced with a remote PoWbox, for example.
 *
 * We use this helper method in `composeApi` to create the default behavior.
 */
export const defaultAttachFn = ({ provider }: Settings): AttachToTangle => (
    trunkTransaction,
    branchTransaction,
    minWeightMagnitude,
    trytes
) =>
    sendCommand<AttachToTangleCommand, AttachToTangleResponse>(provider, {
        command: IRICommand.ATTACH_TO_TANGLE,
        trunkTransaction,
        branchTransaction,
        minWeightMagnitude,
        trytes,
    }).then(res => res.trytes)

/**
 *   @method attachToTangle
 *   @param {string} trunkTransaction
 *   @param {string} branchTransaction
 *   @param {integer} minWeightMagnitude
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 */
export const createAttachToTangle = (attachFn: AttachToTangle) => (
    trunkTransaction: Hash,
    branchTransaction: Hash,
    minWeightMagnitude: number,
    trytes: Trytes[],
    callback?: Callback<string[]>
): Promise<string[]> =>
    Promise.resolve(validateAttachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes))
        .then(() => attachFn(trunkTransaction, branchTransaction, minWeightMagnitude, trytes))
        .asCallback(callback)

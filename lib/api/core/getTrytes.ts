import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, Hash, IRICommand } from '../types'
import { sendCommand } from './sendCommand'

export interface GetTrytesCommand extends BaseCommand {
    command: IRICommand.GET_TRYTES
    hashes: string[]
}

export interface GetTrytesResponse {
    trytes: string[]
}

export const validateGetTrytes = (hashes: Hash[]) => validate([hashArrayValidator(hashes)])

/**
 *   @method getTrytes
 *   @param {array} hashes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const getTrytes = (hashes: string[], callback?: Callback<string[]>): Promise<string[]> =>
    Promise.try(() => validateGetTrytes(hashes))
        .then(() =>
            sendCommand<GetTrytesCommand, GetTrytesResponse>({
                command: IRICommand.GET_TRYTES,
                hashes,
            })
        )
        .then(res => res.trytes)
        .asCallback(callback)

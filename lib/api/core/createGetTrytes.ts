import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, Hash, IRICommand, Provider } from '../types'

export interface GetTrytesCommand extends BaseCommand {
    command: IRICommand.GET_TRYTES
    hashes: string[]
}

export interface GetTrytesResponse {
    trytes: string[]
}

export const validateGetTrytes = (hashes: Hash[]) => validate(hashArrayValidator(hashes))

/**
 *   @method getTrytes
 *   @param {array} hashes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const createGetTrytes = (provider: Provider) =>
    (hashes: string[], callback?: Callback<string[]>): Promise<string[]> =>
        Promise.resolve(validateGetTrytes(hashes))
            .then(() =>
                provider.sendCommand<GetTrytesCommand, GetTrytesResponse>({
                    command: IRICommand.GET_TRYTES,
                    hashes,
                })
            )
            .then(res => res.trytes)
            .asCallback(callback)

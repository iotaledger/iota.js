import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, Hash, IRICommand, Settings } from '../types'
import { sendCommand } from './sendCommand'

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
export const createGetTrytes = (settings: Settings) => {
    let { provider } = settings

    const getTrytes = (hashes: string[], callback?: Callback<string[]>): Promise<string[]> =>
        Promise.resolve(validateGetTrytes(hashes))
            .then(() =>
                sendCommand<GetTrytesCommand, GetTrytesResponse>(provider, {
                    command: IRICommand.GET_TRYTES,
                    hashes,
                })
            )
            .then(res => res.trytes)
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        provider = newSettings.provider
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(getTrytes, { setSettings })
}

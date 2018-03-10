import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand, Provider } from '../types'

export interface GetTipsCommand extends BaseCommand {
    command: IRICommand.GET_TIPS
}

export interface GetTipsResponse {
    hashes: string[]
    duration: number
}

/**
 *   @method getTips
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const createGetTips = (provider: Provider) =>
    (callback?: Callback<string[]>): Promise<string[]> =>
        provider.sendCommand<GetTipsCommand, GetTipsResponse>({
            command: IRICommand.GET_TIPS,
        })
            .then(res => {
                return res.hashes
            })
            .asCallback(callback)

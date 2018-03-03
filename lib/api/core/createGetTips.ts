import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand, Settings } from '../types'
import { sendCommand } from './sendCommand'

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
export const createGetTips = (settings: Settings) => {
    let { provider } = settings

    const getTips = (callback?: Callback<string[]>): Promise<string[]> =>
        sendCommand<GetTipsCommand, GetTipsResponse>(provider, {
            command: IRICommand.GET_TIPS,
        })
            .then(res => {
                return res.hashes
            })
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        provider = newSettings.provider
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(getTips, { setSettings })
}

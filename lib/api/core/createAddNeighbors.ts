import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { uriArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Settings } from '../types'
import { sendCommand } from './sendCommand'

export interface AddNeighborsCommand extends BaseCommand {
    command: IRICommand.ADD_NEIGHBORS
    uris: string[]
}

export interface AddNeighborsResponse {
    addedNeighbors: number
    duration: number
}

export const validateAddNeighbors = (uris: string[]) => validate(uriArrayValidator(uris))

/**
 *   @method addNeighbors
 *   @param {Array} uris List of URI's
 *   @returns {Promise}
 **/
export const createAddNeighbors = (settings: Settings) => {
    let { provider } = settings

    const addNeighbors = (uris: string[], callback?: Callback<number>): Promise<number> =>
        Promise.resolve(validateAddNeighbors(uris))
            .then(() =>
                sendCommand<AddNeighborsCommand, AddNeighborsResponse>(provider, {
                    command: IRICommand.ADD_NEIGHBORS,
                    uris,
                })
            )
            .then(res => res.addedNeighbors)
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        provider = newSettings.provider
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(addNeighbors, { setSettings })
}

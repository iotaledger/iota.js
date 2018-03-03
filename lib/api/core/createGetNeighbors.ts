import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand, Neighbor, Neighbors, Settings } from '../types'
import { sendCommand } from './sendCommand'

export interface GetNeighborsCommand extends BaseCommand {
    command: IRICommand.GET_NEIGHBORS
}

export interface GetNeighborsResponse {
    duration: number
    neighbors: Neighbors
}

/**
 *   @method getNeighbors
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const createGetNeighbors = (settings: Settings) => {
    let { provider } = settings

    const getNeighbors = (callback?: Callback<Neighbors>): Promise<Neighbors> =>
        sendCommand<GetNeighborsCommand, GetNeighborsResponse>(provider, {
            command: IRICommand.GET_NEIGHBORS,
        })
            .then(res => res.neighbors)
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        provider = newSettings.provider
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(getNeighbors, { setSettings })
}

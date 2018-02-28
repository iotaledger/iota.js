import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand, Neighbors } from '../types'
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
export const getNeighbors = (callback?: Callback<Neighbors>): Promise<Neighbors> =>
    sendCommand<GetNeighborsCommand, GetNeighborsResponse>({
        command: IRICommand.GET_NEIGHBORS,
    })
        .then(res => res.neighbors)
        .asCallback(callback)

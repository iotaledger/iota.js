import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand, Neighbor, Neighbors, Provider } from '../types'

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
export const createGetNeighbors = (provider: Provider) =>
    (callback?: Callback<Neighbors>): Promise<Neighbors> =>
        provider.sendCommand<GetNeighborsCommand, GetNeighborsResponse>({
            command: IRICommand.GET_NEIGHBORS,
        })
            .then(res => res.neighbors)
            .asCallback(callback)

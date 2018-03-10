import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { uriArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Provider } from '../types'

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
export const createAddNeighbors = (provider: Provider) => 
    (uris: string[], callback?: Callback<number>): Promise<number> =>
        Promise.resolve(validateAddNeighbors(uris))
            .then(() =>
                provider.sendCommand<AddNeighborsCommand, AddNeighborsResponse>({
                    command: IRICommand.ADD_NEIGHBORS,
                    uris,
                })
            )
            .then(res => res.addedNeighbors)
            .asCallback(callback)

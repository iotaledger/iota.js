import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { uriArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Provider } from '../types'

export interface RemoveNeighborsCommand extends BaseCommand {
    command: IRICommand.REMOVE_NEIGHBORS
    uris: string[]
}

export interface RemoveNeighborsResponse {
    removedNeighbors: number
    duration: number
}

export const validateRemoveNeighbors = (uris: string[]) => validate(uriArrayValidator(uris))

/**
 *   @method removeNeighbors
 *   @param {Array} uris List of URI's
 *   @param {function} callback
 *   @returns {object} success
 **/
export const createRemoveNeighbors = (provider: Provider) =>
    (uris: string[], callback?: Callback<number>): Promise<number> =>
        Promise.resolve(validateRemoveNeighbors(uris))
            .then(() =>
                provider.sendCommand<RemoveNeighborsCommand, RemoveNeighborsResponse>({
                    command: IRICommand.REMOVE_NEIGHBORS,
                    uris,
                })
            )
            .then(res => res.removedNeighbors)
            .asCallback(callback)

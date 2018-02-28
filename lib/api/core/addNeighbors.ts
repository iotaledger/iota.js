import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { uriArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand } from '../types'
import { sendCommand } from './sendCommand'

export interface AddNeighborsCommand extends BaseCommand {
    command: IRICommand.ADD_NEIGHBORS
    uris: string[]
}

export interface AddNeighborsResponse {
    addedNeighbors: number
    duration: number
}

export const validateAddNeighbors = (uris: string[]) => validate([uriArrayValidator(uris)])

/**
 *   @method addNeighbors
 *   @param {Array} uris List of URI's
 *   @returns {Promise}
 **/
export const addNeighbors = (uris: string[], callback?: Callback<number>): Promise<number> =>
    Promise.try(() => validateAddNeighbors(uris))
        .then(() =>
            sendCommand<AddNeighborsCommand, AddNeighborsResponse>({
                command: IRICommand.ADD_NEIGHBORS,
                uris,
            })
        )
        .then(res => res.addedNeighbors)
        .asCallback(callback)

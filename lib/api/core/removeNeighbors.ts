import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { uriArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand } from '../types'
import { sendCommand } from './sendCommand'

export interface RemoveNeighborsCommand extends BaseCommand {
    command: IRICommand.REMOVE_NEIGHBORS
    uris: string[]
}

export interface RemoveNeighborsResponse {
    removedNeighbors: number
    duration: number
}

export const validateRemoveNeighbors = (uris: string[]) => validate([uriArrayValidator(uris)])

/**
 *   @method removeNeighbors
 *   @param {Array} uris List of URI's
 *   @param {function} callback
 *   @returns {object} success
 **/
export const removeNeighbors = (uris: string[], callback?: Callback<number>): Promise<number> =>
    Promise.try(() => validateRemoveNeighbors(uris))
        .then(() =>
            sendCommand<RemoveNeighborsCommand, RemoveNeighborsResponse>({
                command: IRICommand.REMOVE_NEIGHBORS,
                uris,
            })
        )
        .then(res => res.removedNeighbors)
        .asCallback(callback)

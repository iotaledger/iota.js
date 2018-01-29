import errors from '../../errors'
import { isUri } from '../../utils'

import { API, BaseCommand, Callback, IRICommand } from '../types'

export interface RemoveNeighborsCommand extends BaseCommand {
    command: IRICommand.REMOVE_NEIGHBORS
    uris: string[]
}

export interface RemoveNeighborsResponse {
    removedNeighbors: number
    duration: number
}

/**
 *   @method removeNeighbors
 *   @param {Array} uris List of URI's
 *   @param {function} callback
 *   @returns {object} success
 **/
export default function removeNeighbors(
    this: API, 
    uris: string[],
    callback?: Callback<number>): Promise<number> {
        
    const promise: Promise<number> = new Promise((resolve, reject) => {
        if (uris.some(uri => !isUri(uri))) {
            reject(new Error(errors.INVALID_URI))
        }

        resolve(
            this.sendCommand<RemoveNeighborsCommand, RemoveNeighborsResponse>(
                {
                    command: IRICommand.REMOVE_NEIGHBORS,
                    uris 
                }
            )
                .then(res => res.removedNeighbors)
        )
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}

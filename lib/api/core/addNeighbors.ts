import errors from '../../errors'
import { isUri } from '../../utils'

import { API, BaseCommand, Callback, IRICommand } from '../types'

export interface AddNeighborsCommand extends BaseCommand {
    command: IRICommand.ADD_NEIGHBORS
    uris: string[]
}

export interface AddNeighborsResponse {
    addedNeighbors: number
    duration: number
}

/**
 *   @method addNeighbors
 *   @param {Array} uris List of URI's
 *   @returns {Promise}
 **/
export default function addNeighbors(
    this: API,
    uris: string[],
    callback?: Callback<number>): Promise<number> {
    
    const promise: Promise<number> = new Promise((resolve, reject) => {
        if (!uris.every(uri => isUri(uri))) {
            reject(new Error(errors.INVALID_URI))
        }

        resolve(
            this.sendCommand<AddNeighborsCommand, AddNeighborsResponse>(
                {
                    command: IRICommand.ADD_NEIGHBORS,
                    uris
                }
            )
                .then(res => res.addedNeighbors)
        )
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}

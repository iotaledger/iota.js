import { API, BaseCommand, Callback, IRICommand, Neighbors } from '../types'

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
export default function getNeighbors(
    this: API,
    callback?: Callback<Neighbors>): Promise<Neighbors> {
        
    const promise: Promise<Neighbors> = new Promise((resolve, reject) =>
        resolve(
            this.sendCommand<GetNeighborsCommand, GetNeighborsResponse>(
                {
                    command: IRICommand.GET_NEIGHBORS
                }
            )
                .then(res => res.neighbors)
        )
    )

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}

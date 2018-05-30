import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand, Neighbors, Provider } from '../../types'

export interface GetNeighborsCommand extends BaseCommand {
    command: IRICommand.GET_NEIGHBORS
}

export interface GetNeighborsResponse {
    duration: number
    neighbors: Neighbors
}

/**  
 * @method createGetNeighbors 
 * 
 * @param {Provider} provider Network provider
 * 
 * @return {function} {@link getNeighbors}
 */
export const createGetNeighbors = ({ send }: Provider) => {

    /**  
     * Returns list of connected neighbors. 
     *
     * @method getNeighbors
     * 
     * @param {Callback} callback - Optional callback
     *
     * @return {Promise}
     * @fulfil {Neighbors}
     * @reject {Error}
     * - Fetch error
     */
    const getNeighbors = (callback?: Callback<Neighbors>): Promise<Neighbors> =>
        send<GetNeighborsCommand, GetNeighborsResponse>({
            command: IRICommand.GET_NEIGHBORS,
        })
            .then(({ neighbors }) => neighbors)
            .asCallback(callback)

    return getNeighbors
}
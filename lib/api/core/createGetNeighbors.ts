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
 * @method createGetNeighbors 
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {function} {@link getNeighbors}
 */
export const createGetNeighbors = (provider: Provider) =>

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
    (callback?: Callback<Neighbors>): Promise<Neighbors> =>
        provider.sendCommand<GetNeighborsCommand, GetNeighborsResponse>({
            command: IRICommand.GET_NEIGHBORS,
        })
            .then((res: GetNeighborsResponse) => res.neighbors)
            .asCallback(callback)

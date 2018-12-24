import * as Promise from 'bluebird'
import {
    Callback,
    GetNeighborsCommand,
    GetNeighborsResponse,
    IRICommand,
    Neighbor, // tslint:disable-line no-unused-variable
    Neighbors,
    Provider,
} from '../../types'

/**
 * @method createGetNeighbors
 *
 * @memberof module:core
 *
 * @param {Provider} provider Network provider
 *
 * @return {function} {@link #module_core.getNeighbors `getNeighbors`}
 */
export const createGetNeighbors = ({ send }: Provider) => {
    /**
     * Returns list of connected neighbors.
     *
     * @method getNeighbors
     *
     * @memberof module:core
     *
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {Neighbors}
     * @reject {Error}
     * - Fetch error
     */
    return function getNeighbors(callback?: Callback<Neighbors>): Promise<Neighbors> {
        return send<GetNeighborsCommand, GetNeighborsResponse>({
            command: IRICommand.GET_NEIGHBORS,
        })
            .then(({ neighbors }) => neighbors)
            .asCallback(callback)
    }
}

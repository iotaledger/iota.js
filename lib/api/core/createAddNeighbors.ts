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
 * @method createAddNeighbors
 *
 * @param {Provider} provider - Network provider
 * 
 * @return {Function} {@link addNeighbors}
 */
export const createAddNeighbors = (provider: Provider) =>

    /**
     * Adds a list of neighbors to the connected IRI node by calling 
     * [`addNeighbors`]{@link https://docs.iota.works/iri/api#endpoints/addNeighbors} command. 
     * Assumes `addNeighbors` command is available on the node.
     * 
     * This method has temporary effect until your node relaunches.
     *
     * @method addNeighbors
     *
     * @param {Array} uris - List of URI's
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {number} Number of neighbors that were added
     * @reject {Error}
     * - `INVALID_URI`: Invalid uri
     * - Fetch error
     */
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

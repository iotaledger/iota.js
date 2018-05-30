import * as Promise from 'bluebird'
import { uriArrayValidator, validate } from '@iota/utils'
import * as errors from './errors'
import { BaseCommand, Callback, IRICommand, Provider } from './types'

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
 * @method createRemoveNeighbors
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {function} {@link removeNeighbors}
 */
export const createRemoveNeighbors = ({ send }: Provider) =>

    /**
     * Removes a list of neighbors from the connected IRI node by calling
     * [`removeNeighbors`]{@link https://docs.iota.works/iri/api#endpoints/removeNeighbors} command. 
     * Assumes `removeNeighbors` command is available on the node.
     * 
     * This method has temporary effect until your IRI node relaunches.
     *
     * @method removeNeighbors
     *
     * @param {Array} uris - List of URI's
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {number} Number of neighbors that were removed
     * @reject {Error}
     * - `INVALID URI`: Invalid uri(s)
     * - Fetch error
     */
    (uris: string[], callback?: Callback<number>): Promise<number> =>
        Promise.resolve(validateRemoveNeighbors(uris))
            .then(() =>
                send<RemoveNeighborsCommand, RemoveNeighborsResponse>({
                    command: IRICommand.REMOVE_NEIGHBORS,
                    uris,
                })
            )
            .then(res => res.removedNeighbors)
            .asCallback(callback)

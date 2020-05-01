import * as Promise from 'bluebird'
import { arrayValidator, uriValidator, validate } from '../../guards'
import { Callback, IRICommand, Provider, RemoveNeighborsCommand, RemoveNeighborsResponse } from '../../types'

/**
 * @method createRemoveNeighbors
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - Network provider
 *
 * @return {function} {@link #module_core.removeNeighbors `removeNeighbors`}
 */
export const createRemoveNeighbors = ({ send }: Provider) =>
    /**
     * This method removes a list of neighbors from the connected IRI node by calling its
     * [`removeNeighbors`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#removeneighbors) endpoint.
     *
     * These neighbors are re-added when the node is restarted.
     * 
     * ## Related methods
     * 
     * To see statistics about the connected IRI node's neighbors, use the [`getNeighbors()`]{@link #module_core.getNeighbors} method.
     *
     * @method removeNeighbors
     * 
     * @summary Removes a list of neighbors from the connected IRI node.
     *
     * @memberof module:core
     *
     * @param {Array} uris - Array of neighbor URIs that you want to add to the node
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     *
     * ```js
     * iota.addNeighbors(['tcp://148.148.148.148:15600'])
     *   .then(numberOfNeighbors => {
     *     console.log(`Successfully removed ${numberOfNeighbors} neighbors`)
     *   }).catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     *   })
     * ```
     * 
     * @return {Promise}
     * 
     * @fulfil {number} numberOfNeighbors - Number of neighbors that were removed
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_URI`: Make sure that the URI is valid (for example URIs must start with `udp://` or `tcp://`)
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    (uris: ReadonlyArray<string>, callback?: Callback<number>): Promise<number> =>
        Promise.resolve(validate(arrayValidator(uriValidator)(uris)))
            .then(() =>
                send<RemoveNeighborsCommand, RemoveNeighborsResponse>({
                    command: IRICommand.REMOVE_NEIGHBORS,
                    uris,
                })
            )
            .then(res => res.removedNeighbors)
            .asCallback(callback)

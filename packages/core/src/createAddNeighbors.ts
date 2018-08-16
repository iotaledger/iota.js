import * as Promise from 'bluebird'
import { arrayValidator, uriValidator, validate } from '../../guards'
import { AddNeighborsCommand, AddNeighborsResponse, Callback, IRICommand, Provider } from '../../types'

/**
 * @method createAddNeighbors
 *
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider
 *
 * @return {Function} {@link #module_core.addNeighbors `addNeighbors`}
 */
export const createAddNeighbors = ({ send }: Provider) =>
    /**
     * Adds a list of neighbors to the connected IRI node by calling
     * [`addNeighbors`](https://docs.iota.works/iri/api#endpoints/addNeighbors) command.
     * Assumes `addNeighbors` command is available on the node.
     *
     * `addNeighbors` has temporary effect until your node relaunches.
     *
     * @example
     *
     * ```js
     * addNeighbors(['udp://148.148.148.148:14265'])
     *   .then(numAdded => {
     *     // ...
     *   }).catch(err => {
     *     // ...
     *   })
     * ```
     *
     * @method addNeighbors
     *
     * @memberof module:core
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
    function addedNeighbors(uris: ReadonlyArray<string>, callback?: Callback<number>): Promise<number> {
        return Promise.resolve(validate(arrayValidator<string>(uriValidator)(uris)))
            .then(() =>
                send<AddNeighborsCommand, AddNeighborsResponse>({
                    command: IRICommand.ADD_NEIGHBORS,
                    uris,
                })
            )
            .then(res => res.addedNeighbors)
            .asCallback(callback)
    }

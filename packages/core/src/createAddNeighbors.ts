import * as Promise from 'bluebird'
import { arrayValidator, uriValidator, validate } from '../../guards'
import { AddNeighborsCommand, AddNeighborsResponse, Callback, IRICommand, Provider } from '../../types'

/**
 * @method createAddNeighbors
 * 
 * @summary Creates a new `addNeighbors()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`addNeighbors`]{@link #module_core.addNeighbors}  - A new `addNeighbors()` function that uses your chosen Provider instance.
 */
export const createAddNeighbors = ({ send }: Provider) =>
    /**
     * 
     * This method adds temporary neighbors to the connected IRI node by calling the its
     * [`addNeighbors`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#addNeighbors) endpoint.
     * 
     * These neighbors are removed when the node is restarted.
     * 
     * ## Related methods
     * 
     * To see statistics about the connected IRI node's neighbors, use the [`getNeighbors()`]{@link #module_core.getNeighbors} method.
     * 
     * @method addNeighbors
     * 
     * @summary Adds temporary neighbors to the connected IRI node.
     *  
     * @memberof module:core
     *
     * @param {Array.<string>} URIs - Comma-separated URIs of neighbor nodes that you want to add
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * ```js
     * addNeighbors(['tcp://148.148.148.148:15600'])
     *   .then(numberOfNeighbors => {
     *     console.log(`Successfully added ${numberOfNeighbors} neighbors`)
     *   }).catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     *   })
     * ```
     *
     * @return {Promise}
     * 
     * @fulfil {number} numberOfNeighbors - Number of neighbors that were added
     * 
     * @reject {Error} error - One of the following errors:
     * - `INVALID_URI`: Make sure that the URI is a string and starts with `tcp://`
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     * 
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

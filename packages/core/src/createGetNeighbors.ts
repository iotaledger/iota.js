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
 * @summary Creates a new `getNeighbors()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getNeighbors`]{@link #module_core.getNeighbors}  - A new `getNeighbors()` function that uses your chosen Provider instance.
 */
export const createGetNeighbors = ({ send }: Provider) => {
    /**
     * This method uses the connected IRI node's [`getNeighbors`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#getneighbors) endpoint to find information about the neighbors' activity.
     * 
     * All statistics are aggregated until the node restarts.
     * 
     * ## Related methods
     * 
     * To add neighbors to the node, use the [`addNeighbors()`]{@link #module_core.addNeighbors} method.
     * 
     * @method getNeighbors
     * 
     * @summary Gets information and statistics about the connected IRI node's neighbors.
     *
     * @memberof module:core
     *
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * 
     * ```js
     * getNeighbors()
     * .then(neighbors => {
     *     console.log(`Node is connected to the following neighbors: \n`)
     *     console.log(JSON.stringify(neighbors));
     * })
     * .catch(error => {
     *     console.log(`Something went wrong: ${error}`);
     * });
     *```
     *
     * @return {Promise}
     * 
     * @fulfil {Neighbors} neighbors - Array that contains the following:
     * - neighbors.address: IP address of the neighbor
     * - neighbors.domain: Domain name of the neighbor
     * - neighbors.numberOfAllTransactions: Number of transactions in the neighbors ledger (including invalid ones)
     * - neighbors.numberOfRandomTransactionRequests: Number of random tip transactions that the neighbor has requested from the connected node
     * - neighbors.numberOfNewTransactions: Number of new transactions that the neighbor has sent to the connected node
     * - neighbors.numberOfInvalidTransactions: Number of invalid transactions that the neighbor sent to the connected node
     * - neighbors.numberOfStaleTransactions: Number of transactions that the neighbor sent to the connected node, which contain a timestamp that's older than the connected node's latest snapshot
     * - neighbors.numberOfSentTransactions: Number of transactions that the connected node has sent to the neighbor
     * - neighbors.numberOfDroppedSentPackets: Number of network packets that the neighbor dropped because its queue was full
     * - neighbors.connectionType: The transport protocol that the neighbor uses to sent packets to the connected node
     * - neighbors.connected: Whether the neighbor is connected to the node
     * 
     * @reject {Error} error - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function getNeighbors(callback?: Callback<Neighbors>): Promise<Neighbors> {
        return send<GetNeighborsCommand, GetNeighborsResponse>({
            command: IRICommand.GET_NEIGHBORS,
        })
            .then(({ neighbors }) => neighbors)
            .asCallback(callback)
    }
}

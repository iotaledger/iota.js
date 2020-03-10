import * as Promise from 'bluebird'
import { Callback, GetNodeInfoCommand, GetNodeInfoResponse, IRICommand, Provider } from '../../types'

/**
 * @method createGetNodeInfo
 * 
 * @summary Creates a new `getNodeInfo()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getNodeInfo`]{@link #module_core.getNodeInfo}  - A new `getNodeInfo()` function that uses your chosen Provider instance.
 */
export const createGetNodeInfo = ({ send }: Provider) =>
    /**
     * This method uses the connected IRI node's
     * [`getNodeInfo`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#getnodeinfo) endpoint.
     * 
     * ## Related methods
     * 
     * To get statistics about the connected node's neighbors, use the [`getNeighbors()`]{@link #module_core.getNeighbors} method.
     * 
     * @method getNodeInfo
     * 
     * @summary Gets information about the connected IRI node.
     *
     * @memberof module:core
     *
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * ```js
     * getNodeInfo()
     *   .then(info => console.log(JSON.stringify(info)))
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`);
     *   })
     * ```
     *
     * @return {Promise}
     * 
     * @fulfil {NodeInfo} info - Object that contains the following information:
     * info.appName: Name of the IRI network
     * info.appVersion: Version of the [IRI node software](https://docs.iota.org/docs/node-software/0.1/iri/introduction/overview)
     * info.jreAvailableProcessors: Available CPU cores on the node
     * info.jreFreeMemory: Amount of free memory in the Java virtual machine
     * info.jreMaxMemory: Maximum amount of memory that the Java virtual machine can use
     * info.jreTotalMemory: Total amount of memory in the Java virtual machine
     * info.jreVersion: The version of the Java runtime environment
     * info.latestMilestone: Transaction hash of the latest [milestone](https://docs.iota.org/docs/getting-started/0.1/network/the-coordinator)
     * info.latestMilestoneIndex: Index of the latest milestone
     * info.latestSolidSubtangleMilestone: Transaction hash of the node's latest solid milestone
     * info.latestSolidSubtangleMilestoneIndex: Index of the node's latest solid milestone
     * info.milestoneStartIndex: Start milestone for the current version of the IRI node software
     * info.lastSnapshottedMilestoneIndex: Index of the last milestone that triggered a [local snapshot](https://docs.iota.org/docs/getting-started/0.1/network/nodes#local-snapshots) on the node
     * info.neighbors: Total number of connected neighbors
     * info.packetsQueueSize: Size of the node's packet queue
     * info.time: Unix timestamp
     * info.tips: Number of tips transactions
     * info.transactionsToRequest: Total number of transactions that the node is missing in its ledger
     * info.features: Enabled configuration options on the node
     * info.coordinatorAddress: Address (Merkle root) of the [Coordinator](https://docs.iota.org/docs/getting-started/0.1/network/the-coordinator)
     * info.duration: Number of milliseconds it took to complete the request
     * 
     * @reject {Error} error - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    function getNodeInfo(callback?: Callback<GetNodeInfoResponse>): Promise<GetNodeInfoResponse> {
        return send<GetNodeInfoCommand, GetNodeInfoResponse>({
            command: IRICommand.GET_NODE_INFO,
        }).asCallback(callback)
    }

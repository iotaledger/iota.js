import * as Promise from 'bluebird'
import { Callback, GetNodeInfoCommand, GetNodeInfoResponse, IRICommand, Provider } from '../../types'

/**
 * @method createGetNodeInfo
 *
 * @param {Provider} provider - Network provider
 *
 * @memberof module:core
 *
 * @return {function} {@link #module_core.getNodeInfo `getNodeInfo`}
 */
export const createGetNodeInfo = ({ send }: Provider) =>
    /**
     * Returns information about connected node by calling
     * [`getNodeInfo`](https://docs.iota.works/iri/api#endpoints/getNodeInfo) command.
     *
     * @example
     *
     * ```js
     * getNodeInfo()
     *   .then(info => console.log(info))
     *   .catch(err => {
     *     // ...
     *   })
     * ```
     *
     * @method getNodeInfo
     *
     * @memberof module:core
     *
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {NodeInfo} Object with information about connected node.
     * @reject {Error}
     * - Fetch error
     */
    function getNodeInfo(callback?: Callback<GetNodeInfoResponse>): Promise<GetNodeInfoResponse> {
        return send<GetNodeInfoCommand, GetNodeInfoResponse>({
            command: IRICommand.GET_NODE_INFO,
        }).asCallback(callback)
    }

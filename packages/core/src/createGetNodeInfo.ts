import * as Promise from 'bluebird'
import { BaseCommand, Callback, Hash, IRICommand, Provider } from './types'

export interface GetNodeInfoCommand extends BaseCommand {
    command: IRICommand.GET_NODE_INFO
}

/**
 * @typedef {object} NodeInfo
 *
 * @prop {string} appName
 * @prop {string} appVersion
 * @prop {number} duration
 * @prop {number} jreAvailableProcessors
 * @prop {number} jreFreeMemory
 * @prop {number} jreMaxMemory
 * @prop {number} jreTotalMemory
 * @prop {Hash} latestMilestone
 * @prop {number} latestMilestoneIndex
 * @prop {Hash} latestSolidSubtangleMilestone
 * @prop {number} latestSolidSubtangleMilestoneIndex
 * @prop {number} neighbors
 * @prop {number} packetsQueueSize
 * @prop {number} time
 * @prop {number} tips
 * @prop {number} transactionsToRequest
 */
export interface GetNodeInfoResponse {
    appName: string
    appVersion: string
    duration: number
    jreAvailableProcessors: number
    jreFreeMemory: number
    jreMaxMemory: number
    jreTotalMemory: number
    latestMilestone: Hash
    latestMilestoneIndex: number
    latestSolidSubtangleMilestone: Hash
    latestSolidSubtangleMilestoneIndex: number
    neighbors: number
    packetsQueueSize: number
    time: number
    tips: number
    transactionsToRequest: number
}

/**
 * @method createGetNodeInfo
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {function} {@link getNodeInfo}
 */
export const createGetNodeInfo = ({ send }: Provider) =>

    /**
     * Returns information about connected node by calling
     * [`getNodeInfo`]{@link https://docs.iota.works/iri/api#endpoints/getNodeInfo} command.
     *
     * @method getNodeInfo
     *
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {NodeInfo} Object with information about connected node.
     * @reject {Error}
     * - Fetch error
     */
    (callback?: Callback<GetNodeInfoResponse>): Promise<GetNodeInfoResponse> =>
        send<GetNodeInfoCommand, GetNodeInfoResponse>({
            command: IRICommand.GET_NODE_INFO,
        }).asCallback(callback)
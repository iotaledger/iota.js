import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand, Provider } from '../types'

export interface GetNodeInfoCommand extends BaseCommand {
    command: IRICommand.GET_NODE_INFO
}

export interface GetNodeInfoResponse {
    appName: string
    appVersion: string
    duration: number
    jreAvailableProcessors: number
    jreFreeMemory: number
    jreMaxMemory: number
    jreTotalMemory: number
    latestMilestone: string
    latestMilestoneIndex: number
    latestSolidSubtangleMilestone: string
    latestSolidSubtangleMilestoneIndex: number
    neighbors: number
    packetsQueueSize: number
    time: number
    tips: number
    transactionsToRequest: number
}

/**
 *   @method getNodeInfo
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const createGetNodeInfo = (provider: Provider) =>
    (callback?: Callback<GetNodeInfoResponse>): Promise<GetNodeInfoResponse> =>
        provider.sendCommand<GetNodeInfoCommand, GetNodeInfoResponse>({
            command: IRICommand.GET_NODE_INFO,
        }).asCallback(callback)

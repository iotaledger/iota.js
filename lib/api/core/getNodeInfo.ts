import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand } from '../types'
import { sendCommand } from './sendCommand'

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
export const getNodeInfo = (callback?: Callback<GetNodeInfoResponse>): Promise<GetNodeInfoResponse> =>
    sendCommand<GetNodeInfoCommand, GetNodeInfoResponse>({
        command: IRICommand.GET_NODE_INFO,
    }).asCallback(callback)

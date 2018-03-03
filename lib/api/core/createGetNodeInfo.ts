import * as Promise from 'bluebird'
import { BaseCommand, Callback, IRICommand, Settings } from '../types'
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
export const createGetNodeInfo = (settings: Settings) => {
    let { provider } = settings

    const getNodeInfo = (callback?: Callback<GetNodeInfoResponse>): Promise<GetNodeInfoResponse> =>
        sendCommand<GetNodeInfoCommand, GetNodeInfoResponse>(provider, {
            command: IRICommand.GET_NODE_INFO,
        }).asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        provider = newSettings.provider
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(getNodeInfo, { setSettings })
}

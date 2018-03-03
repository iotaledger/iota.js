import * as Promise from 'bluebird'
import { createGetInclusionStates, createGetNodeInfo, GetNodeInfoResponse } from '../core'
import { Callback, Settings } from '../types'

/**
 *   Wrapper function for getNodeInfo and getInclusionStates
 *
 *   @method getLatestInclusion
 *   @param {array} hashes
 *   @returns {function} callback
 *   @returns {object} success
 */
export const createGetLatestInclusion = (settings: Settings) => {
    const getInclusionStates = createGetInclusionStates(settings)
    const getNodeInfo = createGetNodeInfo(settings)

    const getLatestInclusion = (transactions: string[], callback?: Callback<boolean[]>): Promise<boolean[]> =>
        getNodeInfo()
            .then(nodeInfo => getInclusionStates(transactions, [nodeInfo.latestSolidSubtangleMilestone]))
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(getLatestInclusion, { setSettings })
}

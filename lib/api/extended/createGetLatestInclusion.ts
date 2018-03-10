import * as Promise from 'bluebird'
import { createGetInclusionStates, createGetNodeInfo, GetNodeInfoResponse } from '../core'
import { Callback, Provider } from '../types'

/**
 *   Wrapper function for getNodeInfo and getInclusionStates
 *
 *   @method getLatestInclusion
 *   @param {array} hashes
 *   @returns {function} callback
 *   @returns {object} success
 */
export const createGetLatestInclusion = (provider: Provider) => {
    const getInclusionStates = createGetInclusionStates(provider)
    const getNodeInfo = createGetNodeInfo(provider)

    return (transactions: string[], callback?: Callback<boolean[]>): Promise<boolean[]> =>
        getNodeInfo()
            .then(nodeInfo => getInclusionStates(transactions, [nodeInfo.latestSolidSubtangleMilestone]))
            .asCallback(callback)
}

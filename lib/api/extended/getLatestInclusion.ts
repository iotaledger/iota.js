import * as Promise from 'bluebird'
import { getInclusionStates, getNodeInfo } from '../core'
import { Callback, GetNodeInfoResponse } from '../types'

/**
 *   Wrapper function for getNodeInfo and getInclusionStates
 *
 *   @method getLatestInclusion
 *   @param {array} hashes
 *   @returns {function} callback
 *   @returns {object} success
 */
export const getLatestInclusion = (
    transactions: string[],
    callback?: Callback<boolean[]>
): Promise<boolean[]> =>
    getNodeInfo()
        .then(nodeInfo => getInclusionStates(
            transactions, 
            [nodeInfo.latestSolidSubtangleMilestone]
        ))
        .asCallback(callback) 


import { API, Callback, GetNodeInfoResponse } from '../types'

/**
 *   Wrapper function for getNodeInfo and getInclusionStates
 *
 *   @method getLatestInclusion
 *   @param {array} hashes
 *   @returns {function} callback
 *   @returns {object} success
 */
export default function getLatestInclusion(
    this: API,
    transactions: string[],
    callback?: Callback<boolean[]>
): Promise<boolean[]> {

    // 1. Call getNodeInfo to get latest solid subtangle milestone
    const promise: Promise<any> = this.getNodeInfo()

        // 2. Query for inclusion states based of that latest mileston
        .then(nodeInfo => this.getInclusionStates(
            transactions, 
            [nodeInfo.latestSolidSubtangleMilestone]
        ))
  
    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise 
}

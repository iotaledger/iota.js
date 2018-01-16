/**
 *   Wrapper function for getNodeInfo and getInclusionStates
 *
 *   @method getLatestInclusion
 *   @param {array} hashes
 *   @returns {function} callback
 *   @returns {object} success
 **/
function getLatestInclusion(hashes: string[], callback: Callback) {
    this.getNodeInfo((e, nodeInfo) => {
        if (e) {
            return callback(e)
        }

        const latestMilestone = nodeInfo.latestSolidSubtangleMilestone

        return this.getInclusionStates(hashes, Array(latestMilestone), callback)
    })
}

/**
 *   Replays a transfer by doing Proof of Work again
 *
 *   @method replayBundle
 *   @param {string} tail
 *   @param {int} depth
 *   @param {int} minWeightMagnitude
 *   @param {function} callback
 *   @returns {object} analyzed Transaction objects
 **/
function replayBundle(tail: string, depth: number, minWeightMagnitude: number, callback: Callback) {
    // Check if correct tail hash
    if (!inputValidator.isHash(tail)) {
        return callback(errors.invalidTrytes())
    }

    // Check if correct depth and minWeightMagnitude
    if (!inputValidator.isValue(depth) || !inputValidator.isValue(minWeightMagnitude)) {
        return callback(errors.invalidInputs())
    }

    this.getBundle(tail, (error, bundle) => {
        if (error) {
            return callback(error)
        }

        // Get the trytes of all the bundle objects
        const bundleTrytes: string[] = []

        bundle!.forEach(bundleTx => {
            bundleTrytes.push(Utils.transactionTrytes(bundleTx))
        })

        return this.sendTrytes(bundleTrytes.reverse(), depth, minWeightMagnitude, {}, callback)
    })
}

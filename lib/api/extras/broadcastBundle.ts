/**
 *   Re-Broadcasts a transfer
 *
 *   @method broadcastBundle
 *   @param {string} tail
 *   @param {function} callback
 *   @returns {object} analyzed Transaction objects
 **/
function broadcastBundle(tail: string, callback: Callback) {
    // Check if correct tail hash
    if (!inputValidator.isHash(tail)) {
        return callback(errors.invalidTrytes())
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

        return this.broadcastTransactions(bundleTrytes.reverse(), callback)
    })
}

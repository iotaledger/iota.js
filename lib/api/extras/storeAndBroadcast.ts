/**
 *   Broadcasts and stores transaction trytes
 *
 *   @method storeAndBroadcast
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
function storeAndBroadcast(trytes: string[], callback: Callback) {
    this.storeTransactions(trytes, (error, success) => {
        if (error) {
            return callback(error)
        }

        // If no error
        return this.broadcastTransactions(trytes, callback)
    })
}

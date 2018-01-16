/**
 *   Gets transactions to approve, attaches to Tangle, broadcasts and stores
 *
 *   @method sendTrytes
 *   @param {array} trytes
 *   @param {int} depth
 *   @param {int} minWeightMagnitude
 *   @param {object} options
 *   @param {function} callback
 *   @returns {object} analyzed Transaction objects
 **/
function sendTrytes(trytes: string[], depth: number, minWeightMagnitude: number, options: any, callback: Callback) {
    // If no options provided, switch arguments
    if (arguments.length === 4 && Object.prototype.toString.call(options) === '[object Function]') {
        callback = options
        options = {}
    }

    // Check if correct depth and minWeightMagnitude
    if (!inputValidator.isValue(depth) || !inputValidator.isValue(minWeightMagnitude)) {
        return callback(errors.invalidInputs())
    }

    // Get branch and trunk
    this.getTransactionsToApprove(depth, options.reference, (error, toApprove) => {
        if (error) {
            return callback(error)
        }

        // attach to tangle - do pow
        this.attachToTangle(
            toApprove.trunkTransaction,
            toApprove.branchTransaction,
            minWeightMagnitude,
            trytes,
            (attachErr, attached) => {
                if (attachErr) {
                    return callback(attachErr)
                }

                // If the user is connected to the sandbox, we have to monitor the POW queue
                // to check if the POW job was completed
                if (this.sandbox) {
                    const job = this.sandbox + '/jobs/' + (attached as any).id

                    // Do the Sandbox send function
                    this.provider.sandboxSend(job, 15000, (sendErr, attachedTrytes) => {
                        if (sendErr) {
                            return callback(sendErr)
                        }

                        this.storeAndBroadcast(attachedTrytes!, (storeErr, success) => {
                            if (storeErr) {
                                return callback(storeErr)
                            }

                            const finalTxs = attachedTrytes!.map(ea => Utils.transactionObject(ea))

                            return callback(null, finalTxs)
                        })
                    })
                } else {
                    // Broadcast and store tx
                    this.storeAndBroadcast(attached!, (storeErr, success) => {
                        if (storeErr) {
                            return callback(storeErr)
                        }

                        const finalTxs = attached!.map(ea => Utils.transactionObject(ea))

                        return callback(null, finalTxs)
                    })
                }
            }
        )
    })
}

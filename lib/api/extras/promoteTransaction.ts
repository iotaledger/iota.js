/**
 * Promotes a transaction by adding spam on top of it.
 * Will promote {maximum} transfers on top of the current one with {delay} interval.
 *
 * @param {string} tail
 * @param {int} depth
 * @param {int} minWeightMagnitude
 * @param {array} transfer
 * @param {object} params
 * @param callback
 *
 * @returns {array} transaction objects
 */
function promoteTransaction(
    tail: string,
    depth: number,
    minWeightMagnitude: number,
    transfer: Transfer[],
    params: PromoteTransactionOptions,
    callback: Callback
) {
    if (!inputValidator.isHash(tail)) {
        return callback(errors.invalidTrytes())
    }

    this.isPromotable(tail)
        .then(isPromotable => {
            if (!isPromotable) {
                return callback(errors.inconsistentSubtangle(tail))
            }

            if (params.interrupt === true || (typeof params.interrupt === 'function' && params.interrupt())) {
                return callback(null, tail)
            }

            this.sendTransfer(
                transfer[0].address,
                depth,
                minWeightMagnitude,
                transfer,
                { reference: tail },
                (err, res) => {
                    if (err == null && params.delay && params.delay > 0) {
                        setTimeout(() => {
                            this.promoteTransaction(tail, depth, minWeightMagnitude, transfer, params, callback)
                        }, params.delay)
                    } else {
                        return callback(err, res)
                    }
                }
            )
        })
        .catch(err => {
            callback(err)
        })
}

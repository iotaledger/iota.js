/**
 *   Prepares Transfer, gets transactions to approve
 *   attaches to Tangle, broadcasts and stores
 *
 *   @method sendTransfer
 *   @param {string} seed
 *   @param {int} depth
 *   @param {int} minWeightMagnitude
 *   @param {array} transfers
 *   @param {object} options
 *       @property {array} inputs List of inputs used for funding the transfer
 *       @property {string} address if defined, this address wil be used for sending the remainder value to
 *   @param {function} callback
 *   @returns {object} analyzed Transaction objects
 **/
function sendTransfer(
    seed: string,
    depth: number,
    minWeightMagnitude: number,
    transfers: Transfer[],
    options: any,
    callback: Callback
) {
    // Validity check for number of arguments
    if (arguments.length < 5) {
        return callback(new Error('Invalid number of arguments'))
    }

    // If no options provided, switch arguments
    if (arguments.length === 5 && Object.prototype.toString.call(options) === '[object Function]') {
        callback = options
        options = {}
    }

    // Check if correct depth and minWeightMagnitude
    if (!inputValidator.isValue(depth) || !inputValidator.isValue(minWeightMagnitude)) {
        return callback(errors.invalidInputs())
    }

    this.prepareTransfers(seed, transfers, options, (error, trytes) => {
        if (error) {
            return callback(error)
        }

        this.sendTrytes(trytes, depth, minWeightMagnitude, options, callback)
    })
}

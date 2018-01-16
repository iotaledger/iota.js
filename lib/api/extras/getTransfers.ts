/**
 *   @method getTransfers
 *   @param {string} seed
 *   @param {object} options
 *       @property {int} start Starting key index
 *       @property {int} end Ending key index
 *       @property {int} security security level to be used for getting inputs and addresses
 *       @property {bool} inclusionStates returns confirmation status of all transactions
 *   @param {function} callback
 *   @returns {object} success
 **/
function getTransfers(seed: string, options: GetTransfersOptions, callback: Callback) {
    // inputValidator: Check if correct seed
    if (!inputValidator.isTrytes(seed)) {
        return callback(errors.invalidSeed())
    }

    const start = options.start || 0
    const end = options.end || null
    const inclusionStates = options.inclusionStates || false
    const security = options.security || 2

    // If start value bigger than end, return error
    // or if difference between end and start is bigger than 500 keys
    if (start > end! || end! > start + 500) {
        return callback(new Error('Invalid inputs provided'))
    }

    // first call findTransactions
    // If a transaction is non tail, get the tail transactions associated with it
    // add it to the list of tail transactions

    const addressOptions: GetNewAddressOptions = {
        index: start,
        total: end ? end - start : null,
        returnAll: true,
        security,
    }

    //  Get a list of all addresses associated with the users seed
    this.getNewAddress(seed, addressOptions, (error, addresses) => {
        if (error) {
            return callback(error)
        }

        return this._bundlesFromAddresses(addresses, inclusionStates, callback)
    })
}

/**
 *   Similar to getTransfers, just that it returns additional account data
 *
 *   @method getAccountData
 *   @param {string} seed
 *   @param {object} options
 *       @property {int} start Starting key index
 *       @property {int} security security level to be used for getting inputs and addresses
 *       @property {int} end Ending key index
 *   @param {function} callback
 *   @returns {object} success
 **/
function getAccountData(seed: string, options: GetAccountDataOptions, callback: Callback) {
    // inputValidator: Check if correct seed
    if (!inputValidator.isTrytes(seed)) {
        return callback(errors.invalidSeed())
    }

    const start = options.start || 0
    const end = options.end || null
    const security = options.security || 2

    // If start value bigger than end, return error
    // or if difference between end and start is bigger than 1000 keys
    if (end && (start > end || end > start + 1000)) {
        return callback(new Error('Invalid inputs provided'))
    }

    //  These are the values that will be returned to the original caller
    //  @latestAddress: latest unused address
    //  @addresses:     all addresses associated with this seed that have been used
    //  @transfers:     all sent / received transfers
    //  @inputs:        all inputs of the account
    //  @balance:       the confirmed balance
    const valuesToReturn = {
        latestAddress: '',
        addresses: [],
        transfers: [],
        inputs: [],
        balance: 0,
    }

    // first call findTransactions
    // If a transaction is non tail, get the tail transactions associated with it
    // add it to the list of tail transactions
    const addressOptions: GetNewAddressOptions = {
        index: start,
        total: end && end - start,
        returnAll: true,
        security,
    }

    //  Get a list of all addresses associated with the users seed
    this.getNewAddress(seed, addressOptions, (error, addresses) => {
        if (error) {
            return callback(error)
        }

        // assign the last address as the latest address
        // since it has no transactions associated with it
        valuesToReturn.latestAddress = addresses[addresses.length - 1]

        // Add all returned addresses to the lsit of addresses
        // remove the last element as that is the most recent address
        valuesToReturn.addresses = addresses.slice(0, -1)

        // get all bundles from a list of addresses
        this._bundlesFromAddresses(addresses, true, (bundlesError, bundles) => {
            if (bundlesError) {
                return callback(bundlesError)
            }

            // add all transfers
            valuesToReturn.transfers = bundles

            // Get the correct balance count of all addresses
            this.getBalances(valuesToReturn.addresses, 100, (balancesError, balances) => {
                if (balancesError) {
                    return callback(balancesError)
                }

                balances.balances.forEach((balance: number, index: number) => {
                    valuesToReturn.balance += balance

                    if (balance > 0) {
                        const newInput = {
                            address: valuesToReturn.addresses[index],
                            keyIndex: index,
                            security,
                            balance,
                        }

                        valuesToReturn.inputs.push(newInput)
                    }
                })

                return callback(null, valuesToReturn)
            })
        })
    })
}

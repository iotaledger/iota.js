/**
 *   Generates a new address either deterministically or index-based
 *
 *   @method getNewAddress
 *   @param {string} seed
 *   @param {object} options
 *       @property   {int} index         Key index to start search from
 *       @property   {bool} checksum     add 9-tryte checksum
 *       @property   {int} total         Total number of addresses to return
 *       @property   {int} security      Security level to be used for the private key / address. Can be 1, 2 or 3
 *       @property   {bool} returnAll    return all searched addresses
 *   @param {function} callback
 *   @returns {string | array} address List of addresses
 **/
function getNewAddress(seed: string, options: GetNewAddressOptions, callback: Callback) {
    // validate the seed
    if (!inputValidator.isTrytes(seed)) {
        return callback(errors.invalidSeed())
    }

    // default index value
    let index = 0

    if ('index' in options) {
        index = options.index as number

        // validate the index option
        if (!inputValidator.isValue(index) || index < 0) {
            return callback(errors.invalidIndex())
        }
    }

    const checksum = options.checksum || false
    const total = options.total || null

    // If no user defined security, use the standard value of 2
    let security = 2

    if ('security' in options) {
        security = options.security as number

        // validate the security option
        if (!inputValidator.isValue(security) || security < 1 || security > 3) {
            return callback(errors.invalidSecurity())
        }
    }

    const allAddresses: string[] = []

    // Case 1: total
    //
    // If total number of addresses to generate is supplied, simply generate
    // and return the list of all addresses
    if (total) {
        // Increase index with each iteration
        for (let i = 0; i < total; i++, index++) {
            const address = this._newAddress(seed, index, security, checksum)
            allAddresses.push(address)
        }

        return callback(null, allAddresses)
    } else {
        //  Case 2: no total provided
        //
        //  Continue calling findTransactions to see if address was already created
        //  if null, return list of addresses
        //
        async.doWhilst(
            cb => {
                // Iteratee function

                const newAddress = this._newAddress(seed, index, security, checksum)

                this.findTransactions({ addresses: Array(newAddress) }, (error, transactions) => {
                    if (error) {
                        return cb(error)
                    }
                    cb(void 0, newAddress, transactions)
                })
            },
            (address, transactions) => {
                // Test function with validity check

                if (options.returnAll) {
                    allAddresses.push(address as string)
                }

                // Increase the index
                index += 1

                // Validity check
                return (transactions as any).length > 0
            },
            (err: any, address: any) => {
                // Final callback

                if (err) {
                    return callback(err)
                } else {
                    // If returnAll, return list of allAddresses
                    // else return the last address that was generated
                    const addressToReturn = options.returnAll ? allAddresses : address

                    return callback(null, addressToReturn)
                }
            }
        )
    }
}

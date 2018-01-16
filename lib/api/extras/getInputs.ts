/**
 *   Gets the inputs of a seed
 *
 *   @method getInputs
 *   @param {string} seed
 *   @param {object} options
 *       @property {int} start Starting key index
 *       @property {int} end Ending key index
 *       @property {int} threshold Min balance required
 *       @property {int} security secuirty level of private key / seed
 *   @param {function} callback
 **/
function getInputs(seed: string, options: GetInputsOptions, callback: Callback) {
    // validate the seed
    if (!inputValidator.isTrytes(seed)) {
        return callback(errors.invalidSeed())
    }

    const start = options.start || 0
    const end = options.end || null
    const threshold = options.threshold || null
    // If no user defined security, use the standard value of 2
    const security = options.security || 2

    // If start value bigger than end, return error
    // or if difference between end and start is bigger than 500 keys
    if (options.end && (start > end! || end! > start + 500)) {
        return callback(new Error('Invalid inputs provided'))
    }

    //  Calls getBalances and formats the output
    //  returns the final inputsObject then
    const getBalanceAndFormat = (addresses: string[]) => {
        this.getBalances(addresses, 100, (error, balances) => {
            if (error) {
                return callback(error)
            } else {
                const inputsObject: { inputs: Input[]; totalBalance: number } = {
                    inputs: [],
                    totalBalance: 0,
                }

                // If threshold defined, keep track of whether reached or not
                // else set default to true
                let thresholdReached = threshold ? false : true

                for (let i = 0; i < addresses.length; i++) {
                    const balance = parseInt(balances.balances[i], 10)

                    if (balance > 0) {
                        const newEntry: Input = {
                            address: addresses[i],
                            balance,
                            keyIndex: start + i,
                            security,
                        }

                        // Add entry to inputs
                        inputsObject.inputs.push(newEntry)
                        // Increase totalBalance of all aggregated inputs
                        inputsObject.totalBalance += balance

                        if (threshold && inputsObject.totalBalance >= threshold) {
                            thresholdReached = true
                            break
                        }
                    }
                }

                if (thresholdReached) {
                    return callback(null, inputsObject)
                } else {
                    return callback(new Error('Not enough balance'))
                }
            }
        })
    }

    //  Case 1: start and end
    //
    //  If start and end is defined by the user, simply iterate through the keys
    //  and call getBalances
    if (end) {
        const allAddresses = []

        for (let i = start; i < end; i++) {
            const address = this._newAddress(seed, i, security, false)
            allAddresses.push(address)
        }

        getBalanceAndFormat(allAddresses)
    } else {
        //  Case 2: iterate till threshold || end
        //
        //  Either start from index: 0 or start (if defined) until threshold is reached.
        //  Calls getNewAddress and deterministically generates and returns all addresses
        //  We then do getBalance, format the output and return it
        this.getNewAddress(seed, { index: start, returnAll: true, security }, (error, addresses) => {
            if (error) {
                return callback(error)
            } else {
                getBalanceAndFormat(addresses)
            }
        })
    }
}

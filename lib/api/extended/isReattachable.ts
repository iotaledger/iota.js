/**
 *   Determines whether you should replay a transaction
 *   or make a new one (either with the same input, or a different one)
 *
 *   @method isReattachable
 *   @param {String || Array} inputAddresses Input address you want to have tested
 *   @returns {Bool}
 **/
function isReattachable(inputAddresses: string | string[], callback: Callback<boolean | boolean[]>) {
    // if string provided, make array
    if (typeof inputAddresses === 'string') {
        inputAddresses = new Array(inputAddresses)
    }

    // Categorized value transactions
    // hash -> txarray map
    const addressTxsMap: any = {}
    const addresses: string[] = []

    for (let i = 0; i < inputAddresses.length; i++) {
        let address = inputAddresses[i]

        if (!inputValidator.isAddress(address)) {
            return callback(errors.invalidInputs())
        }

        address = Utils.noChecksum(address)

        addressTxsMap[address] = new Array()
        addresses.push(address)
    }

    this.findTransactionObjects({ addresses }, (e, transactions) => {
        if (e) {
            return callback(e)
        }

        const valueTransactions: string[] = []

        transactions!.forEach(thisTransaction => {
            if (thisTransaction.value < 0) {
                const txAddress = thisTransaction.address
                const txHash = thisTransaction.hash

                // push hash to map
                addressTxsMap[txAddress].push(txHash)

                valueTransactions.push(txHash)
            }
        })

        if (valueTransactions.length > 0) {
            // get the includion states of all the transactions
            this.getLatestInclusion(valueTransactions, (latestInclError, inclusionStates) => {
                // bool array
                let results: boolean | boolean[] = addresses.map(address => {
                    const txs = addressTxsMap[address]
                    const numTxs = txs.length

                    if (numTxs === 0) {
                        return true
                    }

                    let shouldReattach = true

                    for (let i = 0; i < numTxs; i++) {
                        const tx = txs[i]

                        const txIndex = valueTransactions.indexOf(tx)
                        const isConfirmed = inclusionStates[txIndex]
                        shouldReattach = isConfirmed ? false : true

                        // if tx confirmed, break
                        if (isConfirmed) {
                            break
                        }
                    }

                    return shouldReattach
                })

                // If only one entry, return first
                if (results.length === 1) {
                    results = results[0]
                }

                return callback(null, results)
            })
        } else {
            let results: boolean | boolean[] = []
            const numAddresses = addresses.length

            // prepare results array if multiple addresses
            if (numAddresses > 1) {
                for (let i = 0; i < numAddresses; i++) {
                    results.push(true)
                }
            } else {
                results = true
            }

            return callback(null, results)
        }
    })
}

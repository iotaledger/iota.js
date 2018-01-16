/**
 *   Wrapper function for getTrytes and transactionObjects
 *   gets the trytes and transaction object from a list of transaction hashes
 *
 *   @method getTransactionsObjects
 *   @param {array} hashes
 *   @returns {function} callback
 *   @returns {object} success
 **/
function getTransactionsObjects(hashes: string[], callback: Callback) {
    // If not array of hashes, return error
    if (!inputValidator.isArrayOfHashes(hashes)) {
        return callback(errors.invalidInputs())
    }

    // get the trytes of the transaction hashes
    this.getTrytes(hashes, (error, trytes) => {
        if (error) {
            return callback(error)
        }

        const transactionObjects: Array<Transaction | null> = []

        // call transactionObjects for each trytes
        trytes!.forEach(thisTrytes => {
            // If no trytes returned, simply push null as placeholder
            if (!thisTrytes) {
                transactionObjects.push(null)
            } else {
                transactionObjects.push(Utils.transactionObject(thisTrytes))
            }
        })

        return callback(null, transactionObjects)
    })
}

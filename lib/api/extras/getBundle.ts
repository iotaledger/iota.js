/**
 *   Gets the associated bundle transactions of a single transaction
 *   Does validation of signatures, total sum as well as bundle order
 *
 *   @method getBundle
 *   @param {string} transaction Hash of a tail transaction
 *   @returns {list} bundle Transaction objects
 **/
function getBundle(transaction: string, callback: Callback<Transaction[]>) {
    // inputValidator: Check if correct hash
    if (!inputValidator.isHash(transaction)) {
        return callback(errors.invalidInputs(transaction))
    }

    // Initiate traverseBundle
    this.traverseBundle(transaction, null, Array(), (error, bundle) => {
        if (error) {
            return callback(error)
        }

        if (!Utils.isBundle(bundle)) {
            return callback(new Error('Invalid Bundle provided'))
        } else {
            // Return bundle element
            return callback(null, bundle)
        }
    })
}

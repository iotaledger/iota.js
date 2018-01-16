/**
 *   Wrapper function for findTransactions, getTrytes and transactionObjects
 *   Returns the transactionObject of a transaction hash. The input can be a valid
 *   findTransactions input
 *
 *   @method getTransactionsObjects
 *   @param {object} input
 *   @returns {function} callback
 *   @returns {object} success
 **/
function findTransactionObjects(input: FindTransactionsSearchValues, callback: Callback<Transaction[]>) {
    this.findTransactions(input, (error, transactions) => {
        if (error) {
            return callback(error)
        }

        // get the transaction objects of the transactions
        this.getTransactionsObjects(transactions, callback)
    })
}

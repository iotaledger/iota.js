/**
 *   Basically traverse the Bundle by going down the trunkTransactions until
 *   the bundle hash of the transaction is no longer the same. In case the input
 *   transaction hash is not a tail, we return an error.
 *
 *   @method traverseBundle
 *   @param {string} trunkTx Hash of a trunk or a tail transaction  of a bundle
 *   @param {string} bundleHash
 *   @param {array} bundle List of bundles to be populated
 *   @returns {array} bundle Transaction objects
 **/
function traverseBundle(trunkTx: string, bundleHash: string | null, bundle: Transaction[], callback: Callback) {
    // Get trytes of transaction hash
    this.getTrytes(Array(trunkTx), (error, trytesList) => {
        if (error) {
            return callback(error)
        }

        const trytes = trytesList![0]

        if (!trytes) {
            return callback(new Error('Bundle transactions not visible'))
        }

        // get the transaction object
        const txObject = Utils.transactionObject(trytes)

        if (!txObject) {
            return callback(new Error('Invalid trytes, could not create object'))
        }

        // If first transaction to search is not a tail, return error
        if (!bundleHash && txObject.currentIndex !== 0) {
            return callback(new Error('Invalid tail transaction supplied.'))
        }

        // If no bundle hash, define it
        if (!bundleHash) {
            bundleHash = txObject.bundle
        }

        // If different bundle hash, return with bundle
        if (bundleHash !== txObject.bundle) {
            return callback(null, bundle)
        }

        // If only one bundle element, return
        if (txObject.lastIndex === 0 && txObject.currentIndex === 0) {
            return callback(null, Array(txObject))
        }

        // Define new trunkTransaction for search
        const newTrunkTx = txObject.trunkTransaction

        // Add transaction object to bundle
        bundle.push(txObject)

        // Continue traversing with new trunkTx
        return this.traverseBundle(newTrunkTx, bundleHash, bundle, callback)
    })
}

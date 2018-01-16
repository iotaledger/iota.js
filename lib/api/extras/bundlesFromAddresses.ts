/**
 *   Internal function to get the formatted bundles of a list of addresses
 *
 *   @method _bundlesFromAddresses
 *   @param {list} addresses List of addresses
 *   @param {bool} inclusionStates
 *   @returns {list} bundles Transaction objects
 **/
function bundlesFromAddresses(addresses: string[], inclusionStates: boolean, callback: Callback) {
    // call wrapper function to get txs associated with addresses
    this.findTransactionObjects({ addresses }, (error, transactionObjects) => {
        if (error) {
            return callback(error)
        }

        // set of tail transactions
        const tailTransactions = new Set()
        const nonTailBundleHashes = new Set()

        transactionObjects!.forEach(thisTransaction => {
            // Sort tail and nonTails
            if (thisTransaction.currentIndex === 0) {
                tailTransactions.add(thisTransaction.hash)
            } else {
                nonTailBundleHashes.add(thisTransaction.bundle)
            }
        })

        // Get tail transactions for each nonTail via the bundle hash
        this.findTransactionObjects({ bundles: Array.from(nonTailBundleHashes) }, (findTxError, bundleObjects) => {
            if (findTxError) {
                return callback(findTxError)
            }

            bundleObjects!.forEach(thisTransaction => {
                if (thisTransaction.currentIndex === 0) {
                    tailTransactions.add(thisTransaction.hash)
                }
            })

            const finalBundles: Transaction[][] = []
            const tailTxArray = Array.from(tailTransactions)

            // If inclusionStates, get the confirmation status
            // of the tail transactions, and thus the bundles
            async.waterfall([
                //
                // 1. Function
                //
                (cb: any) => {
                    if (inclusionStates) {
                        this.getLatestInclusion(tailTxArray, (getInclError, states) => {
                            // If error, return it to original caller
                            if (getInclError) {
                                return callback(getInclError)
                            }

                            cb(null, states)
                        })
                    } else {
                        cb(null, [])
                    }
                },

                //
                // 2. Function
                //
                (tailTxStates: string[], cb: any) => {
                    // Map each tail transaction to the getBundle function
                    // format the returned bundles and add inclusion states if necessary
                    async.mapSeries(
                        tailTxArray,
                        (tailTx, cb2) => {
                            this.getBundle(tailTx, (getBundleError, bundle) => {
                                // If error returned from getBundle, simply ignore it
                                // because the bundle was most likely incorrect
                                if (!getBundleError) {
                                    // If inclusion states, add to each bundle entry
                                    if (inclusionStates) {
                                        const thisInclusion = tailTxStates[tailTxArray.indexOf(tailTx)]

                                        bundle!.forEach(bundleTx => {
                                            ;(bundleTx as any).persistence = thisInclusion
                                        })
                                    }

                                    finalBundles.push(bundle!)
                                }
                                cb2(void 0, true)
                            })
                        },
                        (mapError, results) => {
                            // credit: http://stackoverflow.com/a/8837505
                            // Sort bundles by timestamp
                            finalBundles.sort((a, b) => {
                                const x = a[0].attachmentTimestamp
                                const y = b[0].attachmentTimestamp
                                return x < y ? -1 : x > y ? 1 : 0
                            })

                            return callback(mapError as any, finalBundles)
                        }
                    )
                },
            ])
        })
    })
}

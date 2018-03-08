import { Hash, Transaction } from '../api/types'
/**
 *   Categorizes a list of transfers between sent and received
 *
 *   @method categorizeTransfers
 *   @param {object} transfers Transfers (bundles)
 *   @param {list} addresses List of addresses that belong to the user
 *   @returns {String} trytes
 **/
export const categorizeTransfers = (transfers: Transaction[][], addresses: Hash[]) => {
    const categorized: {
        sent: Transaction[][]
        received: Transaction[][]
    } = {
        sent: [],
        received: [],
    }

    // Iterate over all bundles and sort them between incoming and outgoing transfers
    transfers.forEach(bundle => {
        let spentAlreadyAdded = false

        // Iterate over every bundle entry
        bundle.forEach((bundleEntry, bundleIndex) => {
            // If bundle address in the list of addresses associated with the seed
            // add the bundle to the
            if (addresses.indexOf(bundleEntry.address) > -1) {
                // Check if it's a remainder address
                const isRemainder = bundleEntry.currentIndex === bundleEntry.lastIndex && bundleEntry.lastIndex !== 0

                // check if sent transaction
                if (bundleEntry.value < 0 && !spentAlreadyAdded && !isRemainder) {
                    categorized.sent.push(bundle)

                    // too make sure we do not add transactions twice
                    spentAlreadyAdded = true
                } else if (bundleEntry.value >= 0 && !spentAlreadyAdded && !isRemainder) {
                    // check if received transaction, or 0 value (message)
                    // also make sure that this is not a 2nd tx for spent inputs
                    categorized.received.push(bundle)
                }
            }
        })
    })

    return categorized
}


import * as Promise from 'bluebird'
import { asArray, hashArrayValidator, isArray, removeChecksum, trytesArrayValidator, validate } from '../../utils'
import { Callback, Hash, Settings, Transaction, Trytes } from '../types'
import { createFindTransactionObjects, createGetLatestInclusion } from './index'

/**
 * Filters out all receiving or 0-value transactions
 * Note: Transaction value < 0 is a tx-out (spending transaction)
 *
 * @param transactions
 */
const filterSpendingTransactions = (transactions: Transaction[]) => transactions.filter(tx => tx.value < 0)

/**
 * Appends the confirmation status to each transaction
 *
 * @param transactions
 */
const withInclusionState = (settings: Settings, transactions: Transaction[]) =>
    createGetLatestInclusion(settings)(transactions.map(tx => tx.hash)).then(states =>
        transactions.map((tx, i) => ({
            ...tx,
            confirmed: states[i],
        }))
    )

/**
 * Checks whether any address in the list has at least one confirmed transaction
 *
 * @param addresses
 * @param transactions
 */
const hasConfirmedTxs = (addresses: Hash[], transactions: Transaction[]) =>
    addresses.map(addr => transactions.some(tx => !!tx.confirmed && tx.address === addr))

/**
 * An address may be considered "reattachable" if it has either:
 *  (A) No spending transactions, OR
 *  (B) No _confirmed_ spending transactions
 *
 * @param inputAddresses
 */
export const createIsReattachable = (settings: Settings) => {
    const findTransactionObjects = createFindTransactionObjects(settings)

    const isReattachable = (
        inputAddresses: Trytes | Trytes[],
        callback?: Callback<boolean | boolean[]>
    ): Promise<boolean | boolean[]> => {
        const useArray = Array.isArray(inputAddresses)
        const inputAddressArray = asArray(inputAddresses)
        let addresses: Hash[]

        return (
            Promise.try(() => {
                // 1. Remove checksum and validate addresses
                validate(trytesArrayValidator(inputAddressArray))

                addresses = inputAddressArray.map(addr => removeChecksum(addr))

                validate(hashArrayValidator(addresses))
            })
                // 2. Find all transactions for these addresses
                .then(() => findTransactionObjects({ addresses }))

                // 3. Filter out all 0-value or receiving transactions
                .then(filterSpendingTransactions)

                .then(spendingTransactions => {
                    // 4. Case (A) Break early if no spending transactions found
                    if (spendingTransactions.length === 0) {
                        return useArray ? addresses.map(_ => true) : true
                    }

                    // 5. Add the inclusion state for value-transactions
                    return (
                        withInclusionState(settings, spendingTransactions)
                            // 6. Map addresses to inclusion state
                            .then(txsWithInclusionState => hasConfirmedTxs(addresses, txsWithInclusionState))

                            // 7. Case (B) No confirmed spending transactions found;
                            //    isReattachable === reverse inclusion state
                            .then(confirmedTransactions => confirmedTransactions.map(conf => !conf))
                            .then(reattachable => (useArray ? reattachable : reattachable[0]))
                    )
                })
                .asCallback(callback)
        )
    }

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(isReattachable, { setSettings })
}
// /**
//  *   Determines whether you should replay a transaction
//  *   or make a new one (either with the same input, or a different one)
//  *
//  *   @method isReattachable
//  *   @param {String || Array} inputAddresses Input address you want to have tested
//  *   @returns {Bool}
//  **/
// export const isReattachable = (inputAddresses: Trytes[], callback: Callback<boolean[]>): Promise<boolean[]> => {
//     // Categorized value transactions
//     // hash -> txarray map
//     const addressTxsMap: any = {}
//     const addresses: Hash[] = []

//     return Promise.resolve(validate(trytesArrayValidator(inputs)))
//         .then(() => {
//             for (const input of inputs) {
//                 const address = removeChecksum(input)
//                 addresses.push(address)
//                 addressTxsMap[address] = []
//             }

//             validate(hashArrayValidator(addresses))
//         })
//         .then(() => findTransactionObjects({ addresses }))
//         .then(transactions => {
//             const valueTransactions: Hash[] = []

//             for (const tx of transactions) {
//                 if (tx.value < 0) {
//                     addressTxsMap[tx.address].push(tx.hash)
//                     valueTransactions.push(tx.hash)
//                 }
//             }

//             return valueTransactions
//         })
//         .then(transactions => {
//             if (transactions.length > 0) {
//                 return getLatestInclusion(transactions).then(states => {
//                     let results: boolean | boolean[] = addresses.map(address => {
//                         const txs = addressTxsMap[address]
//                         const numTxs = txs.length

//                         if (numTxs === 0) {
//                             return true
//                         }

//                         let shouldReattach = true

//                         for (let i = 0; i < numTxs; i++) {
//                             const tx = txs[i]

//                             const txIndex = transactions.indexOf(tx)
//                             const isConfirmed = states[txIndex]
//                             shouldReattach = isConfirmed ? false : true

//                             // if tx confirmed, break
//                             if (isConfirmed) {
//                                 break
//                             }
//                         }

//                         return shouldReattach
//                     })

//                     if (results.length === 1 && !useArray) {
//                         return results[0]
//                     }

//                     return results
//                 })
//             }

//             let results: boolean[] = []
//             const numAddresses = addresses.length

//             // prepare results array if multiple addresses
//             if (numAddresses > 1) {
//                 for (let i = 0; i < numAddresses; i++) {
//                     results.push(true)
//                 }
//             } else {
//                 results = [true]
//             }

//             return results
//         })

//     this.findTransactionObjects({ addresses }, (e, transactions) => {
//         if (e) {
//             return callback(e)
//         }

//         const valueTransactions: string[] = []

//         transactions!.forEach(thisTransaction => {
//             if (thisTransaction.value < 0) {
//                 const txAddress = thisTransaction.address
//                 const txHash = thisTransaction.hash

//                 // push hash to map
//                 addressTxsMap[txAddress].push(txHash)

//                 valueTransactions.push(txHash)
//             }
//         })

//         if (valueTransactions.length > 0) {
//             // get the includion states of all the transactions
//             this.getLatestInclusion(valueTransactions, (latestInclError, inclusionStates) => {
//                 // bool array
//                 let results: boolean | boolean[] = addresses.map(address => {
//                     const txs = addressTxsMap[address]
//                     const numTxs = txs.length

//                     if (numTxs === 0) {
//                         return true
//                     }

//                     let shouldReattach = true

//                     for (let i = 0; i < numTxs; i++) {
//                         const tx = txs[i]

//                         const txIndex = valueTransactions.indexOf(tx)
//                         const isConfirmed = inclusionStates[txIndex]
//                         shouldReattach = isConfirmed ? false : true

//                         // if tx confirmed, break
//                         if (isConfirmed) {
//                             break
//                         }
//                     }

//                     return shouldReattach
//                 })

//                 // If only one entry, return first
//                 if (results.length === 1) {
//                     results = results[0]
//                 }

//                 return callback(null, results)
//             })
//         } else {
//             let results: boolean | boolean[] = []
//             const numAddresses = addresses.length

//             // prepare results array if multiple addresses
//             if (numAddresses > 1) {
//                 for (let i = 0; i < numAddresses; i++) {
//                     results.push(true)
//                 }
//             } else {
//                 results = true
//             }

//             return callback(null, results)
//         }
//     })
// }

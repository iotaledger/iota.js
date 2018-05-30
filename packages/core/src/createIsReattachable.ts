import * as Promise from 'bluebird'
import { asArray, hashArrayValidator, isArray, removeChecksum, trytesArrayValidator, validate } from '@iota/utils'
import { createFindTransactionObjects, createGetLatestInclusion } from './'
import { Callback, Hash, Provider, Transaction, Trytes } from './types'

// Filters out all receiving or 0-value transactions
// Note: Transaction value < 0 is a tx-out (spending transaction)
const filterSpendingTransactions = (transactions: Transaction[]) => transactions.filter(tx => tx.value < 0)

// Appends the confirmation status to each transaction
const withInclusionState = (provider: Provider, transactions: Transaction[]) =>
    createGetLatestInclusion(provider)(transactions.map(tx => tx.hash)).then(states =>
        transactions.map((tx, i) => ({
            ...tx,
            confirmed: states[i],
        }))
    )

// Checks whether any address in the list has at least one confirmed transaction
const hasConfirmedTxs = (addresses: Hash[], transactions: Transaction[]) =>
    addresses.map(addr => transactions.some(tx => !!tx.confirmed && tx.address === addr))

// An address may be considered "reattachable" if it has either:
// (A) No spending transactions, OR
// (B) No _confirmed_ spending transactions
export const createIsReattachable = (provider: Provider) => {
    const findTransactionObjects = createFindTransactionObjects(provider)
    return (
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
                        withInclusionState(provider, spendingTransactions)
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
}
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { MAX_INDEX_DIFF, trytesValidator, validate, securityLevelValidator, asArray } from '../../utils'
import { getBalances } from '../core'
import { Bundle, Callback, GetBalancesResponse, Input, Transaction, Trytes } from '../types'
import { getBundlesFromAddresses } from './getBundlesFromAddresses'
import { getNewAddress } from './getNewAddress'

/**
 * Account data object
 */
export interface AccountData {
    addresses: string[]
    inputs: Input[]
    transfers: Transaction[]
    latestAddress: string
    balance: number
}

export interface GetAccountDataOptions {
    start?: number
    end?: number
    security?: number
}

export const blankAccountData = (): AccountData => ({
    latestAddress: '',
    addresses: [],
    transfers: [],
    inputs: [],
    balance: 0,
})

export const verifyGetAccountData = (seed: Trytes, opts: GetAccountDataOptions) => {
    validate(trytesValidator(seed), securityLevelValidator(opts.security!))

    const { start, end, security } = opts

    if (start && end) {
        if (start > end) {
            throw new Error(errors.INVALID_START_OPTION)
        }

        if (end - start > MAX_INDEX_DIFF) {
            throw new Error(errors.INVALID_START_END_OPTIONS)
        }
    }
}

/**
 *   Similar to getTransfers, just that it returns additional account data
 *
 *   @method getAccountData
 *   @param {string} seed
 *   @param {object} options
 *   @param {int} [options.start=0] - Starting key index
 *   @param {int} [options.security=0] - Security level to be used for getting inputs and addresses
 *   @param {int} [options.end] - Ending key index
 *   @param {function} callback
 *   @returns {object} success
 */
export const getAccountData = (
    seed: string,
    { start = 0, end, security = 2 }: GetAccountDataOptions = {},
    callback: Callback<AccountData | void>
): Promise<Maybe<AccountData>> => {
    const accountData = blankAccountData()

    return Promise.resolve(verifyGetAccountData(seed, { start, end, security }))
        .then(() =>
            getNewAddress(seed, {
                index: start,
                total: end ? end - start : undefined,
                returnAll: true,
                security,
            })
        )
        .then(address => {
            const addresses = asArray(address)

            // 2. Assign the last address as the latest address
            accountData.latestAddress = addresses[addresses.length - 1]

            // 3. Add all returned addresses to the list of addresses
            // remove the last element as that is the most recent address
            accountData.addresses = (addresses as string[]).slice(0, -1)

            return getBundlesFromAddresses(addresses, true)
        })
        .then((bundles: Bundle[]) => {
            // Add bundles to account data
            accountData.transfers = bundles

            // 5. Get balances for all addresses
            return getBalances(accountData.addresses, 100)
        })
        .then((res: GetBalancesResponse) => {
            res.balances.map((balance: string) => parseInt(balance, 10)).forEach((balance: number, index: number) => {
                accountData.balance += balance

                // 6. Mark all addresses with balance as inputs
                if (balance > 0) {
                    accountData.inputs.push({
                        address: accountData.addresses[index],
                        keyIndex: index,
                        security,
                        balance,
                    })
                }
            })
        })
}

//     const promise: Promise<AccountData | void> = new Promise((resolve, reject) => {
//         if (!isTrytes(seed)) {
//             return reject(errors.INVALID_SEED)
//         }

//         // Reject if start value bigger than end,
//         // or if difference between end and start is bigger than 1000 key indexes
//         if (end && (start > end || end > start + 1000)) {
//             return reject(errors.INVALID_INPUTS)
//         }

//         //  These are the values that will be returned to the original caller
//         //  - latestAddress: latest unused address
//         //  - addresses:     all addresses associated with this seed that have been used
//         //  - transfers:     all sent / received transfers
//         //  - inputs:        all inputs of the account
//         //  - balance:       the confirmed balance
//         const accountData: AccountData = {
//             latestAddress: '',
//             addresses: [],
//             transfers: [],
//             inputs: [],
//             balance: 0,
//         }

//         // 1. Get all addresses associated with the seed
//         resolve(
//             getNewAddress(seed, {
//                 index: start,
//                 total: end ? end - start : undefined,
//                 returnAll: true,
//                 security,
// }).then((addresses: string[] | string) => {
// 2. Assign the last address as the latest address
// accountData.latestAddress = addresses[addresses.length - 1]

//                 // 3. Add all returned addresses to the list of addresses
//                 // remove the last element as that is the most recent address
//                 accountData.addresses = (addresses as string[]).slice(0, -1)

//                 // 4. Get bundles associated with all addresses
//                 getbundlesFromAddresses(addresses, true).then((bundles: Transaction[]) => {
//                     // Add bundles to account data
//                     accountData.transfers = bundles

//                     // 5. Get balances for all addresses
//                     this.getBalances(accountData.addresses, 100).then((balances: GetBalancesResponse) => {
//                         ;(balances.balances as string[])
//                             .map((balance: string) => parseInt(balance, 10))
//                             .forEach((balance: number, index: number) => {
//                                 accountData.balance += balance

//                                 // 6. Mark all addresses with balance as inputs
//                                 if (balance > 0) {
//                                     accountData.inputs.push({
//                                         address: accountData.addresses[index],
//                                         keyIndex: index,
//                                         security,
//                                         balance,
//                                     })
//                                 }
//                             })
//                     })
//                 })
//             })
//         )
//     })

//     if (typeof callback === 'function') {
//         promise.then(callback.bind(null, null), callback)
//     }

//     return promise
// }

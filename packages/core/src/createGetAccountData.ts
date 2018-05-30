import * as Promise from 'bluebird'
import {
    securityLevelValidator,
    seedValidator,
    startEndOptionsValidator,
    startOptionValidator,
    validate,
} from '@iota/validators'
import { createGetBalances, createGetNewAddress, GetBalancesResponse } from './'
import { createGetBundlesFromAddresses } from './createGetBundlesFromAddresses'
import { createWereAddressesSpentFrom } from './createWereAddressesSpentFrom'
import {
    Address, asArray, Bundle, getOptionsWithDefaults, Hash, Callback,
    Maybe, Provider, Transaction, Trytes
} from '../../types'

/**
 * Account data object
 */
export interface AccountData {
    addresses: Hash[]
    inputs: Address[]
    transfers: Bundle[]
    latestAddress: Hash
    balance: number
}

export interface GetAccountDataOptions {
    start: number
    end?: number
    security: number
}

const defaults: GetAccountDataOptions = {
    start: 0,
    security: 2,
}

export const blankAccountData = (): AccountData => ({
    latestAddress: '',
    addresses: [],
    transfers: [],
    inputs: [],
    balance: 0,
})

export const verifyGetAccountData = (seed: Trytes, opts: GetAccountDataOptions) => {
    const validators = [seedValidator(seed), securityLevelValidator(opts.security!)]

    const { start, end } = opts

    if (start) {
        validators.push(startOptionValidator(start))
    }

    if (typeof end === 'number') {
        validators.push(startEndOptionsValidator({ start, end }))
    }

    validate(...validators)
}

export const getAccountDataOptions = getOptionsWithDefaults(defaults)

/**  
 * @method createGetAccountData
 *
 * @param {Provider} provider - Network provider for accessing IRI
 * 
 * @return {function} {@link getAccountData}
 */
export const createGetAccountData = (provider: Provider) => {
    const getNewAddress = createGetNewAddress(provider)
    const getBundlesFromAddresses = createGetBundlesFromAddresses(provider)
    const getBalances = createGetBalances(provider)
    const wereAddressesSpentFrom = createWereAddressesSpentFrom(provider)

    /**
     * Returns an {@link AccountData} object, containing account information about `addresses`, `transactions`
     * and `inputs`.
     *
     * @example
     * getAccountData(seed, {
     *    start: 0,
     *    security: 2
     * })
     *    .then(accountData => {
     *        const { addresses, inputs, transfers, balance } = accountData
     *        // ...
     *    })
     *    .catch(err => {
     *        // handle errors
     *    })
     *
     * @method getAccountData
     * 
     * @param {string} seed
     * @param {object} options
     * @param {number} [options.start=0] - Starting key index
     * @param {number} [options.security = 0] - Security level to be used for getting inputs and addresses
     * @param {number} [options.end] - Ending key index
     * @param {Callback} [callback] - Optional callback
     *
     * @returns {Promise}
     * @fulfil {AccountData}
     * @reject {Error}
     * - `INVALID_SEED`
     * - `INVALID_START_OPTION`
     * - `INVALID_START_END_OPTIONS`: Invalid combination of start & end options`
     * - Fetch error
     */
    return (
        seed: string,
        options: Partial<GetAccountDataOptions> = {},
        callback?: Callback<Maybe<AccountData>>
    ): Promise<Maybe<AccountData>> => {
        const { start, end, security } = getAccountDataOptions(options)
        const accountData = blankAccountData()

        return Promise.resolve(verifyGetAccountData(seed, { start, end, security }))
            .then(() =>
                getNewAddress(seed, {
                    index: start,
                    total: end ? end - start : 0,
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
                accountData.addresses = addresses

                return getBundlesFromAddresses(addresses, true)
            })
            .then((bundles: Bundle[]) => {
                // Add bundles to account data
                accountData.transfers = bundles
                // 5. Get balances for all addresses
                return getBalances(accountData.addresses, 100)
            })
            .then((res: GetBalancesResponse) => {
                res.balances
                    .map((balance: string) => parseInt(balance, 10))
                    .forEach((balance: number, index: number) => {
                        accountData.balance += balance

                        // 6. Mark all addresses with balance as inputs
                        if (balance > 0) {
                            accountData.inputs.push({
                                address: accountData.addresses[index],
                                keyIndex: index,
                                security,
                                balance: balance.toString(),
                            })
                        }
                    })
            })
            .then(() => wereAddressesSpentFrom(accountData.inputs.map(input => input.address)))
            .then((states: boolean[]) => {
                accountData.inputs = accountData.inputs.filter((input, i) => !states[i])
                return accountData
            })
            .asCallback(callback)
    }
}

import * as Promise from 'bluebird'
import {
    securityLevelValidator,
    seedValidator,
    startEndOptionsValidator,
    startOptionValidator,
    validate,
} from '../../guards'
import {
    Address,
    asArray,
    Bundle,
    Callback,
    getOptionsWithDefaults,
    Hash,
    makeAddress,
    Provider,
    Transaction, // tslint:disable-line no-unused-variable
} from '../../types'
import { createGetBalances, createGetNewAddress } from './'
import { createGetBundlesFromAddresses } from './createGetBundlesFromAddresses'
import { createWereAddressesSpentFrom } from './createWereAddressesSpentFrom'

/**
 * Account data object
 */
export interface AccountData {
    readonly addresses: ReadonlyArray<Hash>
    readonly inputs: ReadonlyArray<Address>
    readonly transfers: ReadonlyArray<Bundle>
    readonly transactions: ReadonlyArray<Hash>
    readonly latestAddress: Hash
    readonly balance: number
}

export interface GetAccountDataOptions {
    readonly start: number
    readonly end?: number
    readonly security: number
}

const defaults: GetAccountDataOptions = {
    start: 0,
    security: 2,
}

export const getAccountDataOptions = getOptionsWithDefaults(defaults)

/**
 * @method createGetAccountData
 *
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider for accessing IRI
 *
 * @return {function} {@link #module_core.getAccountData `getAccountData`}
 */
export const createGetAccountData = (provider: Provider, caller?: string) => {
    const getNewAddress = createGetNewAddress(provider, /* Called by */ 'lib')
    const getBundlesFromAddresses = createGetBundlesFromAddresses(provider, /* Called by */ 'lib')
    const getBalances = createGetBalances(provider)
    const wereAddressesSpentFrom = createWereAddressesSpentFrom(provider, /* Called by */ 'lib')

    /**
     * Returns an `AccountData` object, containing account information about `addresses`, `transactions`,
     * `inputs` and total account balance.
     *
     * @example
     *
     * ```js
     * getAccountData(seed, {
     *    start: 0,
     *    security: 2
     * })
     *   .then(accountData => {
     *     const { addresses, inputs, transactions, balance } = accountData
     *     // ...
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     * ```
     *
     * @method getAccountData
     *
     * @memberof module:core
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
        callback?: Callback<AccountData>
    ): Promise<AccountData> => {
        const { start, end, security } = getAccountDataOptions(options)

        if (caller !== 'lib') {
            /* tslint:disable-next-line:no-console */
            console.warn(
                '`AccountData.transfers` field is deprecated, and `AccountData.transactions` field should be used instead.\n' +
                    'Fetching of full bundles should be done lazily.'
            )
        }

        return (
            Promise.resolve(
                validate(
                    seedValidator(seed),
                    securityLevelValidator(security),
                    !!start && startOptionValidator(start),
                    !!start && !!end && startEndOptionsValidator({ start, end })
                )
            )
                // 1. Generate addresses up to first unused address
                .then(() =>
                    getNewAddress(seed, {
                        index: start,
                        total: end ? end - start : undefined,
                        returnAll: true,
                        security,
                    })
                )
                // In case getNewAddress returned string, depends on options...
                .then(addresses => asArray(addresses))
                // 2. Query to fetch the complete bundles, balances and spending states of addresses
                // Bundle fetching is intensive task networking wise, and will be removed in v.2.0.0
                .then(addresses =>
                    Promise.all([
                        getBundlesFromAddresses(addresses, true),
                        // findTransactions({ addresses }), // Find transactions instead of getBundlesFromAddress as of v2.0.0
                        getBalances(addresses, 100),
                        wereAddressesSpentFrom(addresses),
                        addresses,
                    ])
                )
                .then(([transfers /* transactions */, { balances }, spentStates, addresses]) => ({
                    // 2. Assign the last address as the latest address
                    latestAddress: addresses[addresses.length - 1],

                    // 3. Add bundles to account data
                    transfers,

                    // 4. As replacement for `transfers` field, `transactions` contains transactions directly
                    // related to account addresses. Use of `getBundlesFromAddresses(addresses)` will be replaced by
                    // `findTransactions({ address })` in v2.0.0.
                    // Full bundles should be fetched lazily if there are relevant use cases...
                    transactions: transfers.reduce(
                        (acc: ReadonlyArray<Hash>, bundle) =>
                            acc.concat(
                                bundle
                                    .filter(({ address }) => addresses.indexOf(address) > -1)
                                    .map(transaction => transaction.hash)
                            ),
                        []
                    ),

                    // transactions,

                    // 5. Add balances and extract inputs
                    inputs: addresses
                        // We mark unspent addresses with balance as inputs
                        .reduce(
                            (acc: ReadonlyArray<Address>, address, i) =>
                                !spentStates[i] && balances[i] > 0
                                    ? acc.concat(makeAddress(address, balances[i], start + i, security))
                                    : acc,
                            []
                        ),

                    // List of all account addresses
                    addresses,

                    // Calculate total balance
                    // Don't count balance of spent addresses!
                    balance: balances.reduce((acc, balance, i) => (spentStates[i] ? acc : (acc += balance)), 0),
                }))
                .asCallback(callback)
        )
    }
}

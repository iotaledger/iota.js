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
 * @summary Creates a new `getAccountData()` method, using a custom Provider instance.
 *
 * @memberof module:core
 *
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getAccountData`]{@link #module_core.getAccountData}  - A new `getAccountData()` function that uses your chosen Provider instance.
 */
export const createGetAccountData = (provider: Provider, caller?: string) => {
    const getNewAddress = createGetNewAddress(provider, /* Called by */ 'lib')
    const getBundlesFromAddresses = createGetBundlesFromAddresses(provider, /* Called by */ 'lib')
    const getBalances = createGetBalances(provider)
    const wereAddressesSpentFrom = createWereAddressesSpentFrom(provider, /* Called by */ 'lib')

    /**
     * This method generates [addresses](https://docs.iota.org/docs/getting-started/0.1/clients/addresses) for a given seed, and searches the Tangle for data about those addresses such as transactions, inputs, and total balance.
     *
     * **Note:** The given seed is used to [generate addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/generate-an-address) on your local device. It is never sent anywhere.
     *
     * If you don't pass an `options.end` argument to this method, it will continue to generate addresses until it finds an unspent one.
     *
     * **Note:** The total balance does not include IOTA tokens on [spent addresses](https://docs.iota.org/docs/getting-started/0.1/clients/addresses#spent-addresses).
     *
     * ## Related methods
     *
     * To find the balance of specific addresses, which don't have to belong to your seed, use the [`getBalances()`]{@link #module_core.getBalances} method.
     *
     * To find only inputs (objects that contain information about addresses with a postive balance), use the [`getInputs()`]{@link #module_core.getInputs} method.
     *
     * @method getAccountData
     *
     * @summary Searches the Tangle for transctions, addresses, and balances that are associated with a given seed.
     *
     * @memberof module:core
     *
     * @param {string} seed - The seed to use to generate addresses
     * @param {Object} options - Options object
     * @param {number} [options.start=0] - The key index from which to start generating addresses
     * @param {number} [options.security=2] - The [security level](https://docs.iota.org/docs/getting-started/0.1/clients/security-levels) to use to generate the addresses
     * @param {number} [options.end] - The key index at which to stop generating addresses
     * @param {Callback} [callback] - Optional callback function
     *
     * @example
     *
     * ```js
     * getAccountData(seed)
     *   .then(accountData => {
     *     const { addresses, inputs, transactions, balance } = accountData
     *     console.log(`Successfully found the following transactions:)
     *     console.log(JSON.stringify(transactions));
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     *   })
     * ```
     *
     * @returns {Promise}
     *
     * @fulfil {AccountData} accountData - Object that contains the following:
     * - accountData.transfers: (deprecated) Array of transaction objects that contain one of the seed's addresses
     * - accountData.transactions: Array of transaction hashes for transactions that contain one of the seed's addresses
     * - accountData.addresses: Array of spent addresses
     * - accountData.inputs: Array of input objects for any unspent addresses
     *   - accountData.inputs.address: The 81-tryte address (without checksum)
     *   - accountData.inputs.keyIndex: The key index of the address
     *   - accountData.inputs.security: Security level of the address
     *   - accountData.inputs.balance: Balance of the address
     * - accountData.balance: The total balance of unspent addresses
     *
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_SEED`: Make sure that the seed contains only trytes
     * - `INVALID_SECURITY_LEVEL`: Make sure that the security level is a number between 1 and 3
     * - `INVALID_START_OPTION`: Make sure that the `options.start` argument is greater than zero
     * - `INVALID_START_END_OPTIONS`: Make sure that the `options.end` argument is not greater than the `options.start` argument by more than 1,000`
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
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
                'The returned `accountData.transfers` field is deprecated, therefore do not rely on this field in your applications.\n' +
                    'Instead, you can get only the transactions that you need by using the transaction hashes returned in the `accountData.transactions` field.'
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
                        getBalances(addresses),
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

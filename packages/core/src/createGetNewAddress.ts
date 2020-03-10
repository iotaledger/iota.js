import { addChecksum } from '@iota/checksum'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { indexValidator, securityLevelValidator, seedValidator, validate } from '../../guards'
import { Callback, getOptionsWithDefaults, Provider, Trytes } from '../../types'
import { createFindTransactions, generateAddress } from './'
import { createWereAddressesSpentFrom } from './createWereAddressesSpentFrom'

export interface GetNewAddressOptions {
    readonly index: number
    readonly security: number
    readonly checksum: boolean
    readonly total?: number
    readonly returnAll: boolean
}

export type GetNewAddressResult = Trytes | ReadonlyArray<Trytes>

export interface AddressState {
    readonly isUsed: boolean
    readonly isSpent: boolean
    readonly transactions: ReadonlyArray<Trytes>
}

export const createIsAddressUsed = (provider: Provider) => {
    const wereAddressesSpentFrom = createWereAddressesSpentFrom(provider, 'lib')
    const findTransactions = createFindTransactions(provider)

    return (address: Trytes): Promise<AddressState> =>
        wereAddressesSpentFrom([address]).then(([isSpent]) =>
            findTransactions({ addresses: [address] }).then(transactions => ({
                isUsed: isSpent || transactions.length > 0,
                isSpent,
                transactions,
            }))
        )
}

/**
 * Generates and returns all addresses up to the first unused addresses including it.
 *
 * @method getUntilFirstUnusedAddress
 *
 * @ignore
 *
 * @memberof module:core
 *
 * @param {string} seed
 * @param {options} [options]
 * @param {number} [options.start=0] - Key index offset to start the search at
 * @param {number} [options.security=2] - Security level
 *
 * @return {Promise}
 * 
 * @fulfil {Hash[]} List of addresses up to (and including) first unused address
 *
 * @reject {Error}
 * - `INVALID_SEED`
 * - `INVALID_START_OPTION`
 * - `INVALID_SECURITY`
 * - Fetch error
 */
export const getUntilFirstUnusedAddress = (
    isAddressUsed: (address: Trytes) => Promise<AddressState>,
    seed: Trytes,
    index: number,
    security: number,
    returnAll: boolean
) => {
    const addressList: Trytes[] = []

    const iterate = (): Promise<ReadonlyArray<Trytes>> => {
        const nextAddress = generateAddress(seed, index++, security)

        if (returnAll) {
            addressList.push(nextAddress)
        }

        return isAddressUsed(nextAddress).then(({ isUsed }) => {
            if (isUsed) {
                return iterate()
            }

            // It may have already been added
            if (!returnAll) {
                addressList.push(nextAddress)
            }

            return addressList
        })
    }

    return iterate
}

export const generateAddresses = (seed: Trytes, index: number, security: number, total: number = 1) =>
    Array(total)
        .fill('')
        .map(() => generateAddress(seed, index++, security))

export const applyChecksumOption = (checksum: boolean) => (addresses: Trytes | ReadonlyArray<Trytes>) =>
    checksum
        ? Array.isArray(addresses)
            ? addresses.map(addr => addChecksum(addr))
            : addChecksum(addresses as Trytes)
        : addresses

export const applyReturnAllOption = (returnAll: boolean, total?: number) => (addresses: ReadonlyArray<Trytes>) =>
    returnAll || total ? addresses : addresses[addresses.length - 1]

export const getNewAddressOptions = getOptionsWithDefaults<GetNewAddressOptions>({
    index: 0,
    security: 2,
    checksum: false,
    total: undefined,
    returnAll: false,
})

/**
 * @method createGetNewAddress
 * 
 * @summary Creates a new `getNewAddress()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getNewAddress`]{@link #module_core.getNewAddress}  - A new `getNewAddress()` function that uses your chosen Provider instance.
 */
export const createGetNewAddress = (provider: Provider, caller?: string) => {
    const isAddressUsed = createIsAddressUsed(provider)

    /**
     * This method uses the connected IRI node's [`findTransactions`]{@link #module_core.findTransactions}
     * endpoint to search every transactions in the Tangle for each generated address. If an address is found in a transaction, a new address is generated until one is found that isn't in any transactions.
     * 
     * **Note:** The given seed is used to [generate addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/generate-an-address) on your local device. It is never sent anywhere.
     * 
     * **Note:** Because of local snapshots, this method is not a reliable way of generating unspent addresses. Instead, you should use the [account module](https://docs.iota.org/docs/client-libraries/0.1/account-module/introduction/overview) to keep track of your spent addresses.
     * 
     * ## Related methods
     * 
     * To find out which of your addresses are spent, use the [`getAccountData()`]{@link #module_core.getAccountData} method.
     * 
     * @method getNewAddress
     * 
     * @summary Generates a new address for a given seed.
     *
     * @memberof module:core
     *
     * @param {string} seed - The seed to use to generate addresses
     * @param {Object} [options] - Options object
     * @param {number} [options.index=0] - The key index from which to start generating addresses
     * @param {number} [options.security=2] - The [security level](https://docs.iota.org/docs/getting-started/0.1/clients/security-levels) to use to generate the addresses
     * @param {boolean} [options.checksum=false] - `Deprecated`
     * @param {number} [options.total] - `Deprecated`
     * @param {boolean} [options.returnAll=false] - `Deprecated`
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * ```js
     * getNewAddress(seed)
     *   .then(address => {
     *     console.log(`Here's your new address: ${address})
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`);
     *   })
     * ```
     *
     * @return {Promise}
     * 
     * @fulfil {Hash|Hash[]} address - A single new address or an array of new addresses
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_SEED`: Make sure that the seed contains only trytes
     * - `INVALID_SECURITY_LEVEL`: Make sure that the security level is a number between 1 and 3
     * - `INVALID_START_OPTION`: Make sure that the `options.start` argument is greater than zero
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function getNewAddress(
        seed: Trytes,
        options: Partial<GetNewAddressOptions> = {},
        callback?: Callback<Trytes | ReadonlyArray<Trytes>>
    ): Promise<Trytes | ReadonlyArray<Trytes>> {
        if (caller !== 'lib') {
            const deprecated = []
            if (options.total !== undefined) {
                deprecated.push(options.total)
            }
            if (options.returnAll !== undefined) {
                deprecated.push(options.returnAll)
            }
            if (options.checksum !== undefined) {
                deprecated.push(options.checksum)
            }
            /* tslint:disable-next-line:no-console */
            console.warn(
                `\`GetNewAddressOptions\`: ${deprecated.join(
                    ','
                )} options are deprecated and will be removed in v.2.0.0. \n`
            )
        }

        const { index, security, total, returnAll, checksum } = getNewAddressOptions(options)

        return Promise.resolve(
            validate(
                seedValidator(seed),
                indexValidator(index),
                securityLevelValidator(security),
                (!!total || total === 0) && [total, t => Number.isInteger(t) && t > 0, errors.INVALID_TOTAL_OPTION]
            )
        )
            .then(() =>
                total && total > 0
                    ? generateAddresses(seed, index, security, total)
                    : Promise.try(getUntilFirstUnusedAddress(isAddressUsed, seed, index, security, returnAll))
            )
            .then(applyReturnAllOption(returnAll, total))
            .then(applyChecksumOption(checksum))
            .asCallback(callback)
    }
}

import { addChecksum } from '@iota/checksum'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { indexValidator, securityLevelValidator, seedValidator, validate } from '../../guards'
import { asArray, Callback, getOptionsWithDefaults, Provider, Trytes } from '../../types'
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

export const createIsAddressUsed = (provider: Provider) => {
    const wereAddressesSpentFrom = createWereAddressesSpentFrom(provider, 'lib')
    const findTransactions = createFindTransactions(provider)

    return (address: Trytes) =>
        wereAddressesSpentFrom(asArray(address)).then(
            ([spent]) =>
                spent || findTransactions({ addresses: asArray(address) }).then(transactions => transactions.length > 0)
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
 * @fulfil {Hash[]} List of addresses up to (and including) first unused address
 * @reject {Error}
 * - `INVALID_SEED`
 * - `INVALID_START_OPTION`
 * - `INVALID_SECURITY`
 * - Fetch error
 */
export const getUntilFirstUnusedAddress = (
    isAddressUsed: (address: Trytes) => Promise<boolean>,
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

        return isAddressUsed(nextAddress).then(used => {
            if (used) {
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
 * @param {Provider} provider - Network provider
 *
 * @memberof module:core
 *
 * @return {function} {@link #module_core.getNewAddress `getNewAddress`}
 */
export const createGetNewAddress = (provider: Provider, caller?: string) => {
    const isAddressUsed = createIsAddressUsed(provider)

    /**
     * Generates and returns a new address by calling [`findTransactions`]{@link #module_core.findTransactions}
     * until the first unused address is detected. This stops working after a snapshot.
     *
     * @example
     * ```js
     * getNewAddress(seed, { index })
     *   .then(address => {
     *     // ...
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     * ```
     *
     * @method getNewAddress
     *
     * @memberof module:core
     *
     * @param {string} seed - At least 81 trytes long seed
     * @param {object} [options]
     * @param {number} [options.index=0] - Key index to start search at
     * @param {number} [options.security=2] - Security level
     * @param {boolean} [options.checksum=false] - `Deprecated` Flag to include 9-trytes checksum or not
     * @param {number} [options.total] - `Deprecated` Number of addresses to generate.
     * @param {boolean} [options.returnAll=false] - `Deprecated` Flag to return all addresses, from start up to new address.
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {Hash|Hash[]} New (unused) address or list of addresses up to (and including) first unused address
     * @reject {Error}
     * - `INVALID_SEED`
     * - `INVALID_START_OPTION`
     * - `INVALID_SECURITY`
     * - Fetch error
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
            .then(
                () =>
                    total && total > 0
                        ? generateAddresses(seed, index, security, total)
                        : Promise.try(getUntilFirstUnusedAddress(isAddressUsed, seed, index, security, returnAll))
            )
            .then(applyReturnAllOption(returnAll, total))
            .then(applyChecksumOption(checksum))
            .asCallback(callback)
    }
}

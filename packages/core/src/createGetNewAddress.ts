import * as Promise from 'bluebird'
import * as errors from './errors'
import {
    addChecksum,
    asArray,
    getOptionsWithDefaults,
    indexValidator,
    integerValidator,
    securityLevelValidator,
    seedValidator,
    startEndOptionsValidator,
    validate,
} from '@iota/utils'
import { createFindTransactions, generateAddress, Callback, Provider, Trytes } from './'
import { createWereAddressesSpentFrom } from './createWereAddressesSpentFrom'

export interface GetNewAddressOptions {
    index: number
    security: number
    checksum: boolean
    total: number
    returnAll: boolean
}

export type GetNewAddressResult = Trytes | Trytes[]

export const createIsAddressUsed = (provider: Provider) => {
    const wereAddressesSpentFrom = createWereAddressesSpentFrom(provider)
    const findTransactions = createFindTransactions(provider)

    return (address: Trytes) => wereAddressesSpentFrom(asArray(address))
        .then(([spent]) =>
            spent ||
            findTransactions({ addresses: asArray(address) })
                .then(transactions => transactions.length > 0)
        )
}

/**
 * Generates and returns all addresses up to the first unused addresses including it.
 *
 * @example
 * getUpToFirstUnusedAddress(seed, {start, security})
 *    .then(addresses => {
 *        // ...
 *    })
 *    .catch(err => {
 *        // handle errors
 *    })
 *
 * @method getUntilFirstUnusedAddress
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

    const iterate = (): Promise<Trytes[]> => {
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

export const generateAddresses = (seed: Trytes, index: number, security: number, total: number): Trytes[] =>
    Array(total).fill('').map(() => generateAddress(seed, index++, security))

export const applyChecksumOption = (checksum: boolean) => (addresses: Trytes | Trytes[]): Trytes | Trytes[] =>
    checksum ? addChecksum(addresses as any) : addresses

export const applyReturnAllOption = (returnAll: boolean, total: number) => (addresses: Trytes[]): Trytes | Trytes[] =>
    (returnAll || total) ? addresses : addresses[addresses.length - 1]

export const getNewAddressOptions = getOptionsWithDefaults<GetNewAddressOptions>({
    index: 0,
    security: 2,
    checksum: false,
    total: 0,
    returnAll: false,
})

export const validateGetNewAddressArguments = (seed: string, index: number, security: number, total?: number) => {
    const validators = [
        seedValidator(seed),
        indexValidator(index),
        securityLevelValidator(security),
    ]

    if (total) {
        validators.push(integerValidator(total))
    }

    validate(...validators)
}

/**
 * @method createGetNewAddress
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {function} {@link getNewAddress}
 */
export const createGetNewAddress = (provider: Provider) => {
    const isAddressUsed = createIsAddressUsed(provider)

    /**
     * Generates and returns a new address by calling `{@link findTransactions}`
     * until the first unused address is detected. This stops working after a snapshot.
     *
     * @example 
     * getNewAddress(seed, { index })
     *    .then(address => {
     *        // ...
     *     })
     *     .catch(err => {
     *        // handle errors
     *     })
     *
     * @method getNewAddress
     *
     * @param {string} seed - At least 81 trytes long seed
     * @param {object} [options]
     * @param {number} [options.index=0] - Key index to start search at
     * @param {number} [options.security=2] - Security level
     * @param {boolean} [options.checksum=false] 
     * @param {number} [options.total]
     * @param {boolean} [options.returnAll=false]
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
    return (
        seed: Trytes,
        options: Partial<GetNewAddressOptions> = {},
        callback?: Callback<GetNewAddressResult>
    ): Promise<Trytes | Trytes[]> => {
        const { index, security, total, returnAll, checksum } = getNewAddressOptions(options)

        return Promise.resolve(validateGetNewAddressArguments(seed, index, security, total))
            .then(() => total! > 0
                ? generateAddresses(seed, index, security, total)
                : Promise.try(getUntilFirstUnusedAddress(isAddressUsed, seed, index, security, returnAll))
            )
            .then(applyReturnAllOption(returnAll!, total))
            .then(applyChecksumOption(checksum!))
            .asCallback(callback)
    }
}

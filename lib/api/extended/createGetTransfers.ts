import * as Promise from 'bluebird'
import * as errors from '../../errors'
import {
    getOptionsWithDefaults,
    securityLevelValidator,
    seedValidator,
    startEndOptionsValidator,
    startOptionValidator,
    validate,
} from '../../utils'
import { Callback, Provider, Transaction } from '../types'
import { createGetBundlesFromAddresses, createGetNewAddress, getNewAddressOptions, GetNewAddressOptions } from './index'

export interface GetTransfersOptions {
    start: number
    end?: number
    inclusionStates: boolean
    security: number
}

const defaults: GetTransfersOptions = {
    start: 0,
    end: undefined,
    inclusionStates: false,
    security: 2,
}

export const transferToAddressOptions = (start: number, end: number | undefined, security: number) =>
    getNewAddressOptions({
        index: start,
        total: end ? end - start : undefined,
        security,
        returnAll: true,
    })

export const getTransfersOptions = getOptionsWithDefaults(defaults)

/**
 * @method createGetTransfers
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {Function} {@link getTransfers}
 */
export const createGetTransfers = (provider: Provider) => {
    const getNewAddress = createGetNewAddress(provider)
    const getBundlesFromAddresses = createGetBundlesFromAddresses(provider)

    /**
     * @method getTransfers
     * 
     * @param {String} seed
     * @param {Object} [options]
     * @param {Number} [options.start=0] Starting key index
     * @param {Number} [options.end] Ending key index
     * @param {Number} [options.security=2] - Security level to be used for generating addresses
     * @param {Boolean} [options.inclusionStates=false] - returns confirmation status of all transactions
     * @param {Function} [callback] - optional callback
     * 
     * @returns {Promise}
     * @fulfil {Transaction[][]}
     * @reject {Error}
     * - `INVALID_SEED`
     * - `INVALID_SECURITY_LEVEL`
     * - `INVALID_START_OPTION`
     * - `INVALID_START_END_OPTIONS`
     * - Fetch error
     */
    return (
        seed: string,
        options: Partial<GetTransfersOptions> = {},
        callback?: Callback<Transaction[][]>
    ): Promise<Transaction[][]> => {
        const { start, end, security, inclusionStates } = getTransfersOptions(options)

        return Promise.resolve(
            validate(
                seedValidator(seed),
                securityLevelValidator(security),
                startOptionValidator(start),
                startEndOptionsValidator({ start, end })
            )
        )
            .then(() => transferToAddressOptions(start, end, security))
            .then(addrOptions => getNewAddress(seed, addrOptions))
            .then(addresses => getBundlesFromAddresses(addresses as string[], inclusionStates))
            .asCallback(callback)
    }
}

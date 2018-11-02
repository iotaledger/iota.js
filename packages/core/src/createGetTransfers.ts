import * as Promise from 'bluebird'
import {
    securityLevelValidator,
    seedValidator,
    startEndOptionsValidator,
    startOptionValidator,
    validate,
} from '../../guards'
import {
    asArray,
    Bundle,
    Callback,
    getOptionsWithDefaults,
    Provider,
    Transaction, // tslint:disable-line no-unused-variable
} from '../../types'
import { createGetBundlesFromAddresses } from './createGetBundlesFromAddresses'
import { createGetNewAddress, getNewAddressOptions, GetNewAddressOptions } from './createGetNewAddress'

export interface GetTransfersOptions {
    readonly start: number
    readonly end?: number
    readonly inclusionStates: boolean
    readonly security: number
}

const defaults: GetTransfersOptions = {
    start: 0,
    end: undefined,
    inclusionStates: false,
    security: 2,
}

export const transferToAddressOptions = (
    start: number,
    end: number | undefined,
    security: number
): GetNewAddressOptions =>
    getNewAddressOptions({
        index: start,
        total: end ? end - start : undefined,
        security,
        returnAll: true,
    })

export const getTransfersOptions = getOptionsWithDefaults(defaults)

/**
 * @ignore
 *
 * @method createGetTransfers
 *
 * @param {Provider} provider - Network provider
 *
 * @return {Function} {@link getTransfers}
 */
export const createGetTransfers = (provider: Provider, caller?: string) => {
    const getNewAddress = createGetNewAddress(provider, 'lib')
    const getBundlesFromAddresses = createGetBundlesFromAddresses(provider, 'lib')

    /**
     * @ignore
     *
     * @method getTransfers
     *
     * @param {String} seed
     * @param {Object} [options]
     * @param {Number} [options.start=0] Starting key index
     * @param {Number} [options.end] Ending key index
     * @param {Number} [options.security=2] - Security level to be used for generating addresses
     * @param {Boolean} [options.inclusionStates=false] - Flag that enables fetching of inclusion states
     * for each transfer
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
    return function getTransfers(
        seed: string,
        options: Partial<GetTransfersOptions> = {},
        callback?: Callback<ReadonlyArray<Bundle>>
    ): Promise<ReadonlyArray<Bundle>> {
        if (caller !== 'lib') {
            /* tslint:disable-next-line:no-console */
            console.warn(
                '`getTransfers()` is deprecated and will be removed in v2.0.0. ' +
                    '`findTransactions()` should be used instead.'
            )
        }

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
            .then(addresses => getBundlesFromAddresses(asArray(addresses), inclusionStates))
            .asCallback(callback)
    }
}

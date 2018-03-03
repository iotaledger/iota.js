import * as Promise from 'bluebird'
import * as errors from '../../errors'
import {
    getOptionsWithDefaults,
    indexValidator,
    securityLevelValidator,
    seedValidator,
    startEndOptionsValidator,
    validate,
} from '../../utils'
import { Bundle, Callback, Settings, Transaction } from '../types'
import { createGetBundlesFromAddresses, createGetNewAddress, getNewAddressOptions, GetNewAddressOptions } from './index'

export interface GetTransfersOptions {
    start: number
    end: number
    inclusionStates: boolean
    security: number
}

const defaults: GetTransfersOptions = {
    start: 0,
    end: 0,
    inclusionStates: false,
    security: 2,
}

export const transferToAddressOptions = (start: number, end: number, security: number) =>
    getNewAddressOptions({
        index: start,
        total: end ? end - start : undefined,
        security,
        returnAll: true,
    })

export const getTransfersOptions = getOptionsWithDefaults(defaults)

/**
 *   @method getTransfers
 *   @param {string} seed
 *   @param {object} [options]
 *   @param {int} [options.start=0] Starting key index
 *   @param {int} [options.end] Ending key index
 *   @param {int} [options.security=2] - security level to be used for getting inputs and addresses
 *   @param {bool} [options.inclusionStates=false] - returns confirmation status of all transactions
 *   @param {function} callback
 *   @returns {object} success
 */
export const createGetTransfers = (settings: Settings) => {
    const getNewAddress = createGetNewAddress(settings)
    const getBundlesFromAddresses = createGetBundlesFromAddresses(settings)

    const getTransfers = (
        seed: string,
        options: Partial<GetTransfersOptions> = {},
        callback?: Callback<Bundle[]>
    ): Promise<Bundle[]> => {
        const { start, end, security, inclusionStates } = getTransfersOptions(options)

        return Promise.resolve(
            validate(
                seedValidator(seed),
                securityLevelValidator(security),
                indexValidator(start),
                startEndOptionsValidator({ start, end })
            )
        )
            .then(() => transferToAddressOptions(start, end, security))
            .then(addrOptions => getNewAddress(seed, addrOptions))
            .then(addresses => getBundlesFromAddresses(addresses as string[], inclusionStates))
            .asCallback(callback)
    }

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(getTransfers, { setSettings })
}

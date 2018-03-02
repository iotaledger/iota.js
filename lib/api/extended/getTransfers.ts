import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { indexValidator, securityLevelValidator, seedValidator, startEndOptionsValidator, validate } from '../../utils'
import { Bundle, Callback, GetNewAddressOptions } from '../types'
import { getBundlesFromAddresses, getNewAddress } from './'

export interface GetTransfersOptions {
    start?: number
    end?: number
    inclusionStates?: boolean
    security?: number
}

export const getNewAddressOptions = (
    start: number,
    end: number,
    security: number = 2
): GetNewAddressOptions => ({
    index: start,
    total: end ? end - start : undefined,
    returnAll: true,
    security,
})

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
export const getTransfers = (
    seed: string,
    {
      start = 0,
      end,
      inclusionStates = false,
      security = 2
    }: GetTransfersOptions = {},
    callback?: Callback<Bundle[]>
): Promise<Bundle[]> =>
    Promise
        .try(validate(
            seedValidator(seed),
            securityLevelValidator(security),
            indexValidator(start),
            startEndOptionsValidator({start, end})
        ))
        .then(() => getNewAddressOptions(start, end, security))
        .then((options) => getNewAddress(seed, options))
        .then((addresses) => getBundlesFromAddresses(addresses as string[], inclusionStates))
        .asCallback(callback)

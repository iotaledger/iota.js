import * as Promise from 'bluebird'
import * as errors from '../../errors'
import {
    asArray,
    getInputsThresholdValidator,
    getOptionsWithDefaults,
    isInteger,
    securityLevelValidator,
    seedValidator,
    startEndOptionsValidator,
    startOptionValidator,
    validate,
} from '../../utils'
import { createGetBalances } from '../core'
import { Address, Balance, Callback, Hash, Inputs, makeAddress, Provider, Trytes } from '../types'
import { createGetNewAddress, getNewAddressOptions, GetNewAddressOptions } from './createGetNewAddress'

export interface GetInputsOptions {
    start: number
    end?: number
    threshold?: number
    security: number
}

const defaults: GetInputsOptions = {
    start: 0,
    end: undefined,
    threshold: undefined,
    security: 2,
}

/**  
 * @method createGetInputs
 *
 * @param {Provider} provider - Network provider for accessing IRI
 *
 * @return {function} {@link getInputs}
 */
export const createGetInputs = (provider: Provider) => {
    const getNewAddress = createGetNewAddress(provider)
    const getBalances = createGetBalances(provider)

    /**  
     * Creates and returns an `{@link Inputs}` objects by generating addresses and fetching their latest balance.
     *
     * @example
     * import iota from '@iota/core'
     * import errors from '@iota/core'
     *
     * const { getInputs } = iota()
     * 
     * const seed = 'SEED'
     * const threshold = 999
     *
     * getInputs(seed, { start: 0, threhold })
     *    .then(({ inputs, totalBalance }) => {
     *        // ...
     *    })
     *    .catch(err => {
     *        if (err.message === errors.INSUFFICIENT_BALANCE) {
     *            // handle insufficient balance case
     *        }
     *        // ...
     *    })
     *
     * @method getInputs 
     *
     * @param {string} seed
     * @param {object} [options]
     * @param {number} [options.start=0] - Index offset indicating from which address we start scanning for balance
     * @param {number} [options.end] - Last index up to which we stop scanning
     * @param {number} [options.security=2] - Security level of inputs
     * @param {threshold} [options.threshold] - Minimum amount of balance required
     *
     * @return {Promise}
     *
     * @fulfil {Inputs} Inputs object containg a list of `{@Address}` objects and `totalBalance` field
     * @reject {Error}
     * - `INVALID_SEED`
     * - `INVALID_SECURITY_LEVEL`
     * - `INVALID_START_OPTION`
     * - `INVALID_START_END_OPTIONS`
     * - `INVALID_THRESHOLD`
     * - `INSUFFICIENT_BALANCE`
     * - Fetch error
     */
    return (
        seed: Trytes,
        options: Partial<GetInputsOptions> = {},
        callback?: Callback<Inputs>
    ): Promise<Inputs> => {
        const { start, end, security, threshold } = getInputsOptions(options)

        return Promise.resolve(validateGetInputsOptions(seed, { start, end, security, threshold }))
            .then(() => inputsToAddressOptions({ start, end, security, threshold }))
            .then(newAddressOptions => getNewAddress(seed, newAddressOptions))
            .then(allAddresses => asArray(allAddresses))
            .then(allAddresses => getBalances(allAddresses, 100)
                .then(res => createInputsObject(allAddresses, res.balances, start, security))
                .then(res => filterByThreshold(res, threshold))
                .tap(inputs => checkSufficientBalance(inputs, threshold))
            )
            .asCallback(callback)
    }
}

export const getInputsOptions = getOptionsWithDefaults(defaults)

export const validateGetInputsOptions = (seed: Trytes, options: GetInputsOptions) => {
    const { security, start, end, threshold } = options

    const validators = [
        seedValidator(seed),
        securityLevelValidator(security),
        startOptionValidator(start),
    ]

    if (typeof end === 'number') {
        validators.push(startEndOptionsValidator({ start, end }))
    }

    if (threshold) {
        validators.push(getInputsThresholdValidator(threshold))
    }

    validate(...validators)
}

export const inputsToAddressOptions = ({ start, end, security }: GetInputsOptions) => end
    ? getNewAddressOptions({ index: start, total: end - start + 1, security, returnAll: true })
    : getNewAddressOptions({ index: start, security, returnAll: true })

export const createInputsObject = (addresses: Hash[], balances: string[], start: number, security: number): Inputs => {
    const inputs = addresses.map((address, i) => makeAddress(address, balances[i], start + i, security))
    const totalBalance = inputs.reduce((acc, addr) => (acc += parseInt(addr.balance, 10)), 0)
    return { inputs, totalBalance }
}

export const filterByThreshold = (inputs: Inputs, threshold?: number): Inputs => threshold
    ? inputs.inputs.reduce((acc: Inputs, input: Address) => {
        if (acc.totalBalance < threshold) {
            acc.inputs.push(input)
            acc.totalBalance += parseInt(input.balance, 10)
        }
        return acc
    }, { inputs: [], totalBalance: 0 })
    : inputs

export const checkSufficientBalance = ({ totalBalance }: Inputs, threshold?: number) => {
    if (threshold && totalBalance < threshold) {
        throw new Error(errors.INSUFFICIENT_BALANCE)
    }
}

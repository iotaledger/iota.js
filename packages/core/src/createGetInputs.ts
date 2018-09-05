import * as Promise from 'bluebird'
import * as errors from '../../errors'
import {
    getInputsThresholdValidator,
    securityLevelValidator,
    seedValidator,
    startEndOptionsValidator,
    startOptionValidator,
    validate,
} from '../../guards'
import {
    Address,
    asArray,
    Callback,
    getOptionsWithDefaults,
    Hash,
    Inputs,
    makeAddress,
    Provider,
    Trytes,
} from '../../types'
import { createGetBalances } from './'
import { createGetNewAddress, getNewAddressOptions, GetNewAddressOptions } from './createGetNewAddress'

export interface GetInputsOptions {
    readonly start: number
    readonly end?: number
    readonly threshold?: number
    readonly security: number
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
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider for accessing IRI
 *
 * @return {function} {@link #module_core.getInputs `getInputs`}
 */
export const createGetInputs = (provider: Provider) => {
    const getNewAddress = createGetNewAddress(provider, 'lib')
    const getBalances = createGetBalances(provider)

    /**
     * Creates and returns an `Inputs` object by generating addresses and fetching their latest balance.
     *
     * @example
     *
     * ```js
     * getInputs(seed, { start: 0, threhold })
     *   .then(({ inputs, totalBalance }) => {
     *     // ...
     *   })
     *   .catch(err => {
     *     if (err.message === errors.INSUFFICIENT_BALANCE) {
     *        // ...
     *     }
     *     // ...
     *   })
     * ```
     *
     * @method getInputs
     *
     * @memberof module:core
     *
     * @param {string} seed
     * @param {object} [options]
     * @param {number} [options.start=0] - Index offset indicating from which address we start scanning for balance
     * @param {number} [options.end] - Last index up to which we stop scanning
     * @param {number} [options.security=2] - Security level of inputs
     * @param {threshold} [options.threshold] - Minimum amount of balance required
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     *
     * @fulfil {Inputs} Inputs object containg a list of `{@link Address}` objects and `totalBalance` field
     * @reject {Error}
     * - `INVALID_SEED`
     * - `INVALID_SECURITY_LEVEL`
     * - `INVALID_START_OPTION`
     * - `INVALID_START_END_OPTIONS`
     * - `INVALID_THRESHOLD`
     * - `INSUFFICIENT_BALANCE`
     * - Fetch error
     */
    return (seed: Trytes, options: Partial<GetInputsOptions> = {}, callback?: Callback<Inputs>): Promise<Inputs> => {
        const { start, end, security, threshold } = getInputsOptions(options)

        return Promise.resolve(validateGetInputsOptions(seed, { start, end, security, threshold }))
            .then(() => inputsToAddressOptions({ start, end, security, threshold }))
            .then(newAddressOptions => getNewAddress(seed, newAddressOptions))
            .then(allAddresses => asArray(allAddresses))
            .then(allAddresses =>
                getBalances(allAddresses, 100)
                    .then(({ balances }) => createInputsObject(allAddresses, balances, start, security))
                    .then(res => filterByThreshold(res, threshold))
                    .tap(inputs => hasSufficientBalance(inputs, threshold))
            )
            .asCallback(callback)
    }
}

export const getInputsOptions = getOptionsWithDefaults(defaults)

export const validateGetInputsOptions = (seed: Trytes, options: GetInputsOptions) => {
    const { security, start, end, threshold } = options

    return validate(
        seedValidator(seed),
        securityLevelValidator(security),
        startOptionValidator(start),
        typeof end !== undefined && startEndOptionsValidator({ start, end }),
        !!threshold && getInputsThresholdValidator(threshold)
    )
}

export const inputsToAddressOptions = ({ start, end, security }: GetInputsOptions): GetNewAddressOptions =>
    end
        ? getNewAddressOptions({ index: start, total: end - start + 1, security, returnAll: true })
        : getNewAddressOptions({ index: start, security, returnAll: true })

export const createInputsObject = (
    addresses: ReadonlyArray<Hash>,
    balances: ReadonlyArray<number>,
    start: number,
    security: number
): Inputs => {
    const inputs = addresses
        .map((address, i) => makeAddress(address, balances[i], start + i, security))
        .filter(address => address.balance > 0)
    const totalBalance = inputs.reduce((acc, addr) => (acc += addr.balance), 0)
    return { inputs, totalBalance }
}

export const filterByThreshold = ({ inputs, totalBalance }: Inputs, threshold?: number): Inputs =>
    threshold
        ? inputs.reduce(
              (acc: Inputs, input: Address) =>
                  acc.totalBalance < threshold
                      ? { inputs: [...acc.inputs, input], totalBalance: acc.totalBalance + input.balance }
                      : acc,
              { inputs: [], totalBalance: 0 }
          )
        : { inputs, totalBalance }

export const hasSufficientBalance = (inputs: Inputs, threshold?: number) => {
    if (threshold && inputs.totalBalance < threshold) {
        throw new Error(errors.INSUFFICIENT_BALANCE)
    }

    return inputs
}

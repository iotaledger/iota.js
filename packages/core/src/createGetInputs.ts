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
 * @summary Creates a new `getInputs()` method, using a custom Provider instance.
 *
 * @memberof module:core
 *
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getInputs`]{@link #module_core.getInputs}  - A new `getInputs()` function that uses your chosen Provider instance.
 */
export const createGetInputs = (provider: Provider) => {
    const getNewAddress = createGetNewAddress(provider, 'lib')
    const getBalances = createGetBalances(provider)

    /**
     * This method generates [addresses](https://docs.iota.org/docs/getting-started/0.1/clients/addresses) for a given seed and finds those that have a positive balance.
     *
     * **Note:** The given seed is used to [generate addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/generate-an-address) on your local device. It is never sent anywhere.
     *
     * To find a certain amount of [IOTA tokens](https://docs.iota.org/docs/getting-started/0.1/clients/token) and return only the addresses that, when combined, contain that amount, pass it to the `options.threshold` argument.
     *
     * ## Related methods
     *
     * You may want to use this method to find inputs for the [`prepareTransfers()`]{@link #module_core.prepareTransfers} method.
     *
     * @method getInputs
     *
     * @summary Finds a seed's addresses that have a positive balance.
     *
     * @memberof module:core
     *
     * @param {string} seed - The seed to use to generate addresses
     * @param {Object} [options] - Options object
     * @param {number} [options.start=0] - The key index from which to start generating addresses
     * @param {number} [options.security=2] - The [security level](https://docs.iota.org/docs/getting-started/0.1/clients/security-levels) to use to generate the addresses
     * @param {number} [options.end] - The key index at which to stop generating addresses
     * @param {number} [options.threshold] - The amount of IOTA tokens that you want to find
     * @param {Callback} [callback] - Optional callback function
     *
     * @example
     *
     * ```js
     * getInputs(seed)
     *   .then(({ inputs, totalBalance }) => {
     *     console.log(`Your seed has a total of ${totalBalance} IOTA tokens \n` +
     *     `on the following addresses:`)
     *      for(let i = 0; i < inputs.length; i++) {
     *          console.log(`${inputs[i].address}: ${inputs[i].balance}`)
     *      }
     *   })
     *   .catch(error => {
     *     if (error.message === errors.INSUFFICIENT_BALANCE) {
     *        console.log('You have no IOTA tokens');
     *     }
     *   });
     * ```
     *
     * @return {Promise}
     *
     * @fulfil {Inputs} - Array that contains the following:
     * - input.addresses: An address
     * - input.keyIndex: The key index of the address
     * - input.security: The security level of the address
     * - input.balance: The amount of IOTA tokens in the address
     * - inputs.totalBalance: The combined balance of all addresses
     *
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_SEED`: Make sure that the seed contains only trytes
     * - `INVALID_SECURITY_LEVEL`: Make sure that the security level is a number between 1 and 3
     * - `INVALID_START_OPTION`: Make sure that the `options.start` argument is greater than zero
     * - `INVALID_START_END_OPTIONS`: Make sure that the `options.end` argument is not greater than the `options.start` argument by more than 1,000`
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) `
     * - `INVALID_THRESHOLD`: Make sure that the threshold is a number greater than zero
     * - `INSUFFICIENT_BALANCE`: Make sure that the seed has addresses that contain IOTA tokens
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
     */
    return (seed: Trytes, options: Partial<GetInputsOptions> = {}, callback?: Callback<Inputs>): Promise<Inputs> => {
        const { start, end, security, threshold } = getInputsOptions(options)

        return Promise.resolve(validateGetInputsOptions(seed, { start, end, security, threshold }))
            .then(() => inputsToAddressOptions({ start, end, security, threshold }))
            .then(newAddressOptions => getNewAddress(seed, newAddressOptions))
            .then(allAddresses => asArray(allAddresses))
            .then(allAddresses =>
                getBalances(allAddresses)
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

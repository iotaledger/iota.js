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

export const createGetInputs = (provider: Provider) => {
    const getNewAddress = createGetNewAddress(provider)
    const getBalances = createGetBalances(provider)

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

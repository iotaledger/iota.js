import errors from '../../errors'

import {
    invokeCallback,
    isSecurity,
    isSeed,
    isStart,
    isStartEnd,
    isSufficientBalance,
    isThreshold,
    keys,
    merge
} from '../utils'

import {
    Address,
    Addresses,
    Balance,
    Callback,
    Normalized,
    Settings
} from '../types'

import {
    getBalances,
    NormalizedGetBalancesResponse
} from '../core/getBalances'

import {
    getNewAddressCurried as getNewAddress,
    GetNewAddressOptions
} from './getNewAddress'

export interface Inputs {
    inputs: Address[]
    totalBalance: number
}

export interface NormalizedInputs {
    inputs: Addresses,
    totalBalance: number
}

export interface GetInputsOptions {
    start?: number
    end?: number
    threshold?: number
    security?: number
}

export const getNewAddressOptions = ({
    start = 0,
    end,
    security = 2
}: GetInputsOptions = {}): GetNewAddressOptions => 
    Number.isInteger(end)
        ? { index: start, total: end - start, security }
        : { index: start, returnAll: true, security }

export const calculateTotalBalance = (balances: Normalized<Balance>): number =>
    keys(balances).reduce((acc, k) => acc + (parseInt(balances[k].balance, 10) || 0), 0)

export const formatInputs = (addresses: Addresses) => 
    (balancesResponse: NormalizedGetBalancesResponse): NormalizedInputs => ({
        inputs: merge(addresses)(balancesResponse.balances),
        totalBalance: calculateTotalBalance(balancesResponse.balances)
    })

export const getInputs = ({
    provider,
    normalizeOutput = true
}: Settings = {}) => (
    seed: string,
    {
        start = 0,
        end,
        threshold,
        security = 2 
    }: GetInputsOptions = {},
    callback?: Callback<Inputs | void>
): Promise<Inputs | void | any> =>
    Promise.resolve(
        isSeed(seed) &&
        isSecurity(security) &&
        isStart(start) &&
        isStartEnd({ start, end }) &&
        isThreshold(threshold)
    )
        .then(() => ({ start, end, security}))
        .then(getNewAddressOptions)
        .then(getNewAddress({ provider })(seed))
        .then((addresses: Addresses) => getBalances({ provider })(addresses, 100)
            .then(formatInputs(addresses))
            .then(isSufficientBalance(threshold))
            .then(invokeCallback(callback))

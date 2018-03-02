import * as Promise from 'bluebird'
import * as errors from '../../errors'

import { validate } from '../../utils'

import { Address, Balance, Callback, Normalized, Settings } from '../types'

import { getBalances } from '../core/getBalances'

import { getNewAddressCurried as getNewAddress, GetNewAddressOptions } from './getNewAddress'

export interface Inputs {
    inputs: Address[]
    totalBalance: number
}

export interface NormalizedInputs {
    inputs: Addresses
    totalBalance: number
}

export interface GetInputsOptions {
    start?: number
    end?: number
    threshold?: number
    security?: number
}

export const getNewAddressOptions = ({ start = 0, end, security = 2 }: GetInputsOptions = {}): GetNewAddressOptions =>
    Number.isInteger(end) ? { index: start, total: end - start, security } : { index: start, returnAll: true, security }

export const calculateTotalBalance = (balances: Balance): number =>
    keys(balances).reduce((acc, k) => acc + (parseInt(balances[k].balance, 10) || 0), 0)

export const formatInputs = (addresses: Addresses) => (
    balancesResponse: NormalizedGetBalancesResponse
): NormalizedInputs => ({
    inputs: merge(addresses)(balancesResponse.balances),
    totalBalance: calculateTotalBalance(balancesResponse.balances),
})

export const getInputs = (
    seed: string,
    { start = 0, end, threshold, security = 2 }: GetInputsOptions = {},
    callback?: Callback<Inputs | void>
): Promise<Maybe<Inputs>> =>
    Promise.resolve(
        isSeed(seed) && isSecurity(security) && isStart(start) && isStartEnd({ start, end }) && isThreshold(threshold)
    )
        .then(() => ({ start, end, security }))
        .then(getNewAddressOptions)
        .then(getNewAddress(seed))
        .then((addresses: Addresses) => getBalances(addresses, 100))
        .then(formatInputs(addresses))
        .then(isSufficientBalance(threshold))
        .asCallback(callback)

import errors from '../../errors'

import {
    Address,
    Addresses,
    Balance,
    BaseCommand, 
    Callback,
    Normalized,
    Settings,
} from '../types'

import {
    invokeCallback,
    keys,
    normalize, 
    removeChecksum,
    validate,
    validateAddresses, 
    validateThreshold,
} from '../utils'

import { sendCommand } from './sendCommand'

import { getSettings } from './settings'

export interface GetBalancesCommand extends BaseCommand {
    command: string 
    addresses: string[]
    threshold: number
}

export interface GetBalancesResponse {
    balances: string[]
    duration: number
    milestone: string
    milestoneIndex: number
}

export interface NormalizedGetBalancesResponse {
    balances: Normalized<Balance>
    duration: number
    milestone: string,
    milestoneIndex: number
}

export const makeGetBalancesCommand = (
    addresses: string[],
    threshold: number
): GetBalancesCommand => ({
    command: 'getBalances',
    addresses,
    threshold
}) 

export const normalizeBalances = (addresses: string[]) => 
    normalize<string, Balance>(addresses, (address, balance) => ({
        [address]: { balance }
    }))

export const formatGetBalancesResponse = (addresses: string[], normalizeOutput: boolean = true) =>
    (res: GetBalancesResponse): GetBalancesResponse | NormalizedGetBalancesResponse =>
        normalizeOutput
            ? { ...res, balances: normalizeBalances(addresses)(res.balances) }
            : res

export const getBalances = (
    addresses: Addresses | string[],
    threshold: number,
    callback?: Callback<GetBalancesResponse | NormalizedGetBalancesResponse>
): Promise<GetBalancesResponse | NormalizedGetBalancesResponse> =>
    Promise.resolve()
        .then(() => validate({
          address: validateAddresses(addresses),
          threshold: validateThreshold(threshold)
        }))
        .then(() => keys(addresses))
        .then(removeChecksum)
        .then((addressesArray) =>
            Promise.resolve(makeGetBalancesCommand(addressesArray as string[], threshold))
                .then((command) => sendCommand<GetBalancesCommand, GetBalancesResponse>(command))
                .then(formatGetBalancesResponse(addressesArray as string[], getSettings().normalizeOutput))
                .then(invokeCallback(callback)))

export const getBalancesCurried = (settings: Settings) => (threshold: number) =>
    (addresses: Addresses) => getBalances(addresses, threshold)

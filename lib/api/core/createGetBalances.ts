import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashArrayValidator, isInteger, removeChecksum, thresholdValidator, validate } from '../../utils'
import { BaseCommand, Callback, Hash, IRICommand, Settings } from '../types'
import { sendCommand } from './sendCommand'

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

export const validateGetBalances = (addresses: Hash[], threshold: number) =>
    validate(hashArrayValidator(addresses), thresholdValidator(threshold))

export const createGetBalances = (settings: Settings) => {
    let { provider } = settings

    const getBalances = (
        addresses: Hash[],
        threshold: number,
        callback?: Callback<GetBalancesResponse>
    ): Promise<GetBalancesResponse> => {
        // Addresses passed to IRI should not have the checksum
        addresses = removeChecksum(addresses)

        return Promise.resolve(validateGetBalances(addresses, threshold))
            .then(() => {
                return sendCommand<GetBalancesCommand, GetBalancesResponse>(provider, {
                    command: IRICommand.GET_BALANCES,
                    addresses,
                    threshold,
                })
            })
            .asCallback(callback)
    }

    const setSettings = (newSettings: Settings) => {
        provider = newSettings.provider
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(getBalances, { setSettings })
}

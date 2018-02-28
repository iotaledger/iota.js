import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashArrayValidator, isInteger, removeChecksum, thresholdValidator, validate } from '../../utils'
import { BaseCommand, Callback, Hash, IRICommand } from '../types'
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
    validate([hashArrayValidator(addresses), thresholdValidator(threshold)])

export const getBalances = (
    addresses: Hash[],
    threshold: number,
    callback?: Callback<GetBalancesResponse>
): Promise<GetBalancesResponse> => {
    // Addresses passed to IRI should not have the checksum
    addresses = removeChecksum(addresses)

    return Promise.try(() => {
        validateGetBalances(addresses, threshold)
    })
        .then(() => {
            return sendCommand<GetBalancesCommand, GetBalancesResponse>({
                command: IRICommand.GET_BALANCES,
                addresses,
                threshold,
            })
        })
        .asCallback(callback)
}

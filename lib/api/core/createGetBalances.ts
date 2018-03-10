import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashArrayValidator, isInteger, removeChecksum, thresholdValidator, validate } from '../../utils'
import { BaseCommand, Callback, Hash, IRICommand, Maybe, Provider } from '../types'

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

export const createGetBalances = (provider: Provider) => (
    addresses: Hash[],
    threshold: number,
    callback?: Callback<GetBalancesResponse>
): Promise<GetBalancesResponse> =>
    Promise.resolve(validateGetBalances(addresses, threshold))
        .then(() => provider.sendCommand<GetBalancesCommand, GetBalancesResponse>({
            command: IRICommand.GET_BALANCES,
            addresses: removeChecksum(addresses), // Addresses passed to IRI should not have the checksum
            threshold,
        }))
        .asCallback(callback)

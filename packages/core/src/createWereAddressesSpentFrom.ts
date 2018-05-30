import * as Promise from 'bluebird'
import { removeChecksum, validate } from '@iota/checksum'
import { hashArrayValidator } from '@iota/validators'
import { BaseCommand, Callback, Hash, IRICommand, Provider } from '../../types'

export interface WereAddressesSpentFromCommand extends BaseCommand {
    command: string
    addresses: string[]
}

export interface WereAddressesSpentFromResponse {
    states: boolean[]
}

export const makeWereAddressesSpentFromCommand = (addresses: string[]) => ({
    command: 'wereAddressesSpentFrom',
    addresses,
})

export const validateWereAddressesSpentFrom = (addresses: Hash[]) => validate(hashArrayValidator(addresses))

export const createWereAddressesSpentFrom = ({ send }: Provider) =>
    (addresses: Hash[], callback?: Callback<boolean[]>): Promise<boolean[]> =>
        Promise.resolve(validateWereAddressesSpentFrom(addresses))
            .then(() =>
                send<WereAddressesSpentFromCommand, WereAddressesSpentFromResponse>({
                    command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
                    addresses: removeChecksum(addresses),
                })
            )
            .then(res => res.states)
            .asCallback(callback)

import { removeChecksum } from '@iota/checksum'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { arrayValidator, hashValidator, validate } from '../../guards'
import { BaseCommand, Callback, Hash, IRICommand, Provider } from '../../types'

export interface WereAddressesSpentFromCommand extends BaseCommand {
    command: string
    readonly addresses: ReadonlyArray<Hash>
}

export interface WereAddressesSpentFromResponse {
    readonly states: ReadonlyArray<boolean>
}

export const createWereAddressesSpentFrom = ({ send }: Provider, caller?: string) => (
    addresses: ReadonlyArray<Hash>,
    callback?: Callback<ReadonlyArray<boolean>>
): Promise<ReadonlyArray<boolean>> => {
    if (caller !== 'lib') {
        /* tslint:disable-next-line:no-console */
        console.warn(
            'Avoid using `wereAddressesSpentFrom()`. Instead, use the account module to keep track of spent addresses.\n' +
                '`wereAddressesSpentFrom()` will be removed from the library in a future version.'
        )
    }

    return Promise.resolve(validate(arrayValidator(hashValidator)(addresses, errors.INVALID_ADDRESS)))
        .then(() =>
            send<WereAddressesSpentFromCommand, WereAddressesSpentFromResponse>({
                command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
                addresses: addresses.map(removeChecksum),
            })
        )
        .then(res => res.states)
        .asCallback(callback)
}

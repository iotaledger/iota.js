import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashArrayValidator, removeChecksum, validate } from '../../utils'
import { BaseCommand, Callback, Hash, IRICommand, Settings } from '../types'
import { sendCommand } from './sendCommand'

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

/**
 * Check whether addresses have already been spent from, to prevent re-using a one-time signature
 *
 * @param addresses
 * @param callback
 */
export const createWereAddressesSpentFrom = (settings: Settings) => {
    let { provider } = settings

    const wereAddressesSpentFrom = (addresses: Hash[], callback?: Callback<boolean[]>): Promise<boolean[]> => {
        addresses = removeChecksum(addresses)

        return Promise.resolve(validateWereAddressesSpentFrom(addresses))
            .then(() =>
                sendCommand<WereAddressesSpentFromCommand, WereAddressesSpentFromResponse>(provider, {
                    command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
                    addresses,
                })
            )
            .then(res => res.states)
            .asCallback(callback)
    }
    const setSettings = (newSettings: Settings) => {
        provider = newSettings.provider
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(wereAddressesSpentFrom, { setSettings })
}

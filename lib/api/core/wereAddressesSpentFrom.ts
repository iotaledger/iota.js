import errors from '../../errors'
import { isAddress, noChecksum } from '../../utils'

import { Address, Addresses, BaseCommand, Callback, IRICommand, Normalized, Settings } from '../types'

import { sendCommand } from '../core/sendCommand'

import { invokeCallback, isAddresses, keys, normalize, removeChecksum } from '../utils'

export interface WereAddressesSpentFromCommand extends BaseCommand {
    command: string
    addresses: string[]
}

export interface WereAddressesSpentFromResponse {
    states: boolean[]
}

export const makeWereAddressesSpentFromCommand = (addresses: string[]) => ({
    command: 'wereAddressesSpentFrom',
    addresses
})

export const normalizeSpentStates = (addresses: string[]) =>
    normalize<boolean, Normalized<boolean>>(addresses, (address, spent) => ({
        [address]: { spent }
    }))

export const formatWereAddressesSpentFromResponse = (addresses: string[], normalizeOutput: boolean = true) =>
    (res: WereAddressesSpentFromResponse): Normalized<{[key: string]: boolean}> | boolean[] =>
        normalizeOutput
            ? normalizeSpentStates(addresses)(res.states)
            : res.states 

export const wereAddressesSpentFrom = ({
    provider,
    normalizeOutput = true
}: Settings = {}) => (
    addresses: string[] | Addresses,
    callback?: Callback<boolean[]>
): Promise<boolean[] | Normalized<boolean>> =>
    Promise.resolve(
        isAddresses(addresses) 
    )
        .then(() => keys(addresses))
        .then(removeChecksum)
        .then((addressesArray) => Promise.resolve(
            makeWereAddressesSpentFromCommand(addressesArray)
        )
            .then(sendCommand<WereAddressesSpentFromCommand, WereAddressesSpentFromResponse>(provider))
            .then(formatWereAddressesSpentFromResponse(addressesArray))
            .then(invokeCallback(callback)))

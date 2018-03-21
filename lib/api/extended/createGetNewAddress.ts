import * as Promise from 'bluebird'
import { generateAddress } from '../../crypto'
import * as errors from '../../errors'
import {
    addChecksum,
    asArray,
    getOptionsWithDefaults,
    indexValidator,
    integerValidator,
    securityLevelValidator,
    seedValidator,
    startEndOptionsValidator,
    validate,
} from '../../utils'
import { createFindTransactions, createWereAddressesSpentFrom } from '../core'
import { Callback, Provider, Trytes } from '../types'

export interface GetNewAddressOptions {
    index: number
    security: number
    checksum: boolean
    total: number
    returnAll: boolean
}

export type GetNewAddressResult = Trytes | Trytes[]

export const createIsAddressUsed = (provider: Provider) => {
    const wereAddressesSpentFrom = createWereAddressesSpentFrom(provider)
    const findTransactions = createFindTransactions(provider)

    return (address: Trytes) => wereAddressesSpentFrom(asArray(address))
        .then(([spent]) =>
            spent ||
            findTransactions({ addresses: asArray(address) })
              .then(transactions => transactions.length > 0)
        )
}

export const getUntilFirstUnusedAddress = (
    isAddressUsed: (address: Trytes) => Promise<boolean>,
    seed: Trytes,
    index: number,
    security: number,
    returnAll: boolean
) => {
    const addressList: Trytes[] = []

    const iterate = (): Promise<Trytes[]> => {
        const nextAddress = generateAddress(seed, index++, security)

        if (returnAll) {
            addressList.push(nextAddress)
        }

        return isAddressUsed(nextAddress).then(used => {
            if (used) {
                return iterate()
            }

            // It may have already been added
            if (!returnAll) {
                addressList.push(nextAddress)
            }

            return addressList
        })
    }

    return iterate
}

export const generateAddresses = (seed: Trytes, index: number, security: number, total: number): Trytes[] => 
    Array(total).fill('').map(() => generateAddress(seed, index++, security))

export const applyChecksumOption = (checksum: boolean) => (addresses: Trytes | Trytes[]): Trytes | Trytes[] =>
    checksum ? addChecksum(addresses as any) : addresses

export const applyReturnAllOption = (returnAll: boolean, total: number) => (addresses: Trytes[]): Trytes | Trytes[] =>
    (returnAll || total) ? addresses : addresses[addresses.length - 1]

export const getNewAddressOptions = getOptionsWithDefaults<GetNewAddressOptions>({
    index: 0,
    security: 2,
    checksum: false,
    total: 0,
    returnAll: false,
})

export const validateGetNewAddressArguments = (seed: string, index: number, security: number, total?: number) => {
  const validators = [
      seedValidator(seed),
      indexValidator(index),
      securityLevelValidator(security),
  ]

  if (total) {
      validators.push(integerValidator(total))
  }

  validate(...validators)
}

export const createGetNewAddress = (provider: Provider) => { 
    const isAddressUsed = createIsAddressUsed(provider)

    return (
        seed: Trytes,
        options: Partial<GetNewAddressOptions> = {},
        callback?: Callback<GetNewAddressResult>
    ): Promise<Trytes | Trytes[]> => {
        const { index, security, total, returnAll, checksum } = getNewAddressOptions(options)

        return Promise.resolve(validateGetNewAddressArguments(seed, index, security, total))
            .then(() => total! > 0
                ? generateAddresses(seed, index, security, total)
                : Promise.try(getUntilFirstUnusedAddress(isAddressUsed, seed, index, security, returnAll))
            )
            .then(applyReturnAllOption(returnAll!, total))
            .then(applyChecksumOption(checksum!))
            .asCallback(callback)
    }
}

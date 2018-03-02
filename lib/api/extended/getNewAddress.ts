import _ from 'async'
import * as Promise from 'bluebird'
import { generateAddress } from '../../crypto'
import * as errors from '../../errors'
import {
    addChecksum,
    indexValidator,
    integerValidator,
    securityLevelValidator,
    seedValidator,
    startEndOptionsValidator,
    validate
} from '../../utils'
import { findTransactions } from '../core'
import { Callback } from '../types'

export interface GetNewAddressOptions {
    index?: number,
    security?: number,
    checksum?: boolean,
    total?: number,
    returnAll?: boolean
}

export const generateAddresses = (seed: string, {
    index = 0,
    security = 2,
    total
}: GetNewAddressOptions = {}): string[] =>
    total
        ? Array(total).fill('').map((a) => getNewAddress(seed, (index || 0)++, security))
        // TODO: fetch new addresses.
        : ['']

export const applyChecksumOption = (checksum?: boolean) =>
    (addresses: string[]): string[] =>
        checksum
            ? addresses.map((a) => addChecksum(a))
            : addresses


export const applyReturnAllOption = (returnAll?: boolean) =>
    (addresses: string[]): string | string[] =>
        returnAll
            ? addresses
            : addresses[addresses.length - 1]

export const getNewAddress = (
    seed: string,
    {
        index = 0,
        security = 2,
        checksum,
        total,
        returnAll
    }: GetNewAddressOptions = {},
    callback?: Callback
) =>
    Promise
        .try(validate(
            seedValidator(seed),
            indexValidator(index),
            securityLevelValidator(security),
            integerValidator(total)
        ))
        .then(() => generateAddresses(seed, { index, security, total }))
        .then(applyChecksumOption(checksum))
        .then(applyReturnAllOption(returnAll))
        .asCallback(callback) 

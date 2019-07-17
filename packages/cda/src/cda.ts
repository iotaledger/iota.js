import { tritsToTrytes, tritsToValue, trytesToTrits, valueToTrits } from '@iota/converter'
import Curl from '@iota/curl'
import { padTrits } from '@iota/pad'
import { ADDRESS_LENGTH, VALUE_LENGTH } from '@iota/transaction'
import * as querystring from 'querystring'
import * as errors from '../../errors'
import { isTrytesOfExactLength } from '../../guards'
import '../../typed-array'
import { Trytes } from '../../types'

export interface AbstractCDA {
    readonly timeoutAt: number
    readonly expectedAmount?: number
    readonly multiUse?: boolean
}

export interface CDAParams extends AbstractCDA {
    readonly security?: 1 | 2 | 3
}

export interface CDA extends AbstractCDA {
    readonly address: Trytes
}

export interface CDAInput extends AbstractCDA {
    readonly address: Int8Array
    readonly index: Int8Array
    readonly security: 1 | 2 | 3
    readonly balance?: number
}

export interface CDATransfer extends CDA {
    readonly value: number
}

const TRYTE_WIDTH = 3

export const CDA_ADDRESS_OFFSET = 0
export const CDA_CHECKSUM_OFFSET = CDA_ADDRESS_OFFSET + ADDRESS_LENGTH
export const CDA_CHECKSUM_LENGTH = 27

export const CDA_INDEX_OFFSET = CDA_CHECKSUM_OFFSET + CDA_CHECKSUM_LENGTH
export const CDA_INDEX_LENGTH = 35
export const CDA_SECURITY_OFFSET = CDA_INDEX_OFFSET + CDA_INDEX_LENGTH
export const CDA_SECURITY_LENGTH = 1

export const CDA_TIMEOUT_AT_OFFSET = CDA_SECURITY_OFFSET + CDA_SECURITY_LENGTH
export const CDA_TIMEOUT_AT_LENGTH = 27
export const CDA_MULTI_USE_OFFSET = CDA_TIMEOUT_AT_OFFSET + CDA_TIMEOUT_AT_LENGTH
export const CDA_MULTI_USE_LENGTH = 1
export const CDA_EXPECTED_AMOUNT_OFFSET = CDA_MULTI_USE_OFFSET + CDA_MULTI_USE_LENGTH

export const CDA_LENGTH = CDA_EXPECTED_AMOUNT_OFFSET + VALUE_LENGTH

export const CDASecurityValueAsTrit = (security: 1 | 2 | 3) => new Int8Array(1).fill([2, -1, 0, 1][security])
export const CDASecurityTritAsValue = (trit: Int8Array): 1 | 2 | 3 => (trit[0] === -1 ? 1 : trit[0] === 0 ? 2 : 3)
export const CDAMultiUseBooleanAsTrit = (multiUse?: boolean) => new Int8Array(1).fill(multiUse ? 1 : 0)
export const CDAMultiUseTritAsBoolean = (trit: Int8Array) => (trit[0] === 1 ? true : false)

export const CDAddress = (trits: Int8Array): Int8Array =>
    trits.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_OFFSET + ADDRESS_LENGTH)

export const CDATimeoutAt = (trits: Int8Array): number =>
    tritsToValue(trits.slice(CDA_TIMEOUT_AT_OFFSET, CDA_TIMEOUT_AT_OFFSET + CDA_TIMEOUT_AT_LENGTH))

export const CDAExpectedAmount = (trits: Int8Array): number =>
    tritsToValue(trits.slice(CDA_EXPECTED_AMOUNT_OFFSET, CDA_EXPECTED_AMOUNT_OFFSET + VALUE_LENGTH))

export const CDAMultiUse = (trits: Int8Array): boolean =>
    CDAMultiUseTritAsBoolean(trits.slice(CDA_MULTI_USE_OFFSET, CDA_MULTI_USE_OFFSET + CDA_MULTI_USE_LENGTH))

export const isAlive = (currentTime: number, { timeoutAt, multiUse, expectedAmount }: AbstractCDA): boolean =>
    timeoutAt > currentTime

export const isExpired = (currentTime: number, cda: AbstractCDA): boolean => !isAlive(currentTime, cda)

export const CDAChecksum = (
    address: Int8Array,
    timeoutAt: Int8Array,
    multiUse: Int8Array,
    expectedAmount: Int8Array
): Int8Array => {
    const sponge = new Curl(81)
    const checksum = new Int8Array(Curl.HASH_LENGTH)

    sponge.absorb(address, 0, Curl.HASH_LENGTH)
    sponge.squeeze(checksum, 0, Curl.HASH_LENGTH)
    sponge.reset()

    checksum.set(
        padTrits(CDA_TIMEOUT_AT_LENGTH)(timeoutAt),
        Curl.HASH_LENGTH - CDA_TIMEOUT_AT_LENGTH - CDA_MULTI_USE_LENGTH - VALUE_LENGTH
    )

    if (CDAMultiUseTritAsBoolean(multiUse)) {
        checksum.set(multiUse, Curl.HASH_LENGTH - CDA_MULTI_USE_LENGTH - VALUE_LENGTH)
        checksum.set(new Int8Array(VALUE_LENGTH), Curl.HASH_LENGTH - VALUE_LENGTH)
    } else {
        checksum.set(new Int8Array(0), Curl.HASH_LENGTH - CDA_MULTI_USE_LENGTH - VALUE_LENGTH)
        checksum.set(padTrits(VALUE_LENGTH)(expectedAmount), Curl.HASH_LENGTH - VALUE_LENGTH)
    }

    sponge.absorb(checksum, 0, Curl.HASH_LENGTH)
    sponge.squeeze(checksum, 0, Curl.HASH_LENGTH)

    return checksum.slice(-CDA_CHECKSUM_LENGTH)
}

export const isCDAWithValidChecksum = ({ address, timeoutAt, multiUse, expectedAmount }: CDA) =>
    address.slice(-(CDA_CHECKSUM_LENGTH / TRYTE_WIDTH)) ===
    tritsToTrytes(
        CDAChecksum(
            trytesToTrits(address),
            valueToTrits(timeoutAt),
            CDAMultiUseBooleanAsTrit(multiUse),
            valueToTrits(expectedAmount || 0)
        )
    )

export const serializeCDAInput = ({
    address,
    timeoutAt,
    multiUse,
    expectedAmount,
    security,
    index,
}: CDAInput): Int8Array => {
    const trits = new Int8Array(CDA_LENGTH)
    const timeoutAtTrits = valueToTrits(timeoutAt)
    const multiUseTrits = CDAMultiUseBooleanAsTrit(multiUse)
    const expectedAmountTrits = valueToTrits(expectedAmount || 0)

    trits.set(address.slice(0, ADDRESS_LENGTH), CDA_ADDRESS_OFFSET)
    trits.set(CDAChecksum(address, timeoutAtTrits, multiUseTrits, expectedAmountTrits), CDA_CHECKSUM_OFFSET)
    trits.set(index, CDA_INDEX_OFFSET)
    trits.set(CDASecurityValueAsTrit(security), CDA_SECURITY_OFFSET)
    trits.set(timeoutAtTrits, CDA_TIMEOUT_AT_OFFSET)
    trits.set(expectedAmountTrits, CDA_EXPECTED_AMOUNT_OFFSET)
    trits.set(multiUseTrits, CDA_MULTI_USE_OFFSET)

    return trits
}

export const deserializeCDAInput = (trits: Int8Array): CDAInput => ({
    address: CDAddress(trits),
    index: trits.slice(CDA_INDEX_OFFSET, CDA_INDEX_OFFSET + CDA_INDEX_LENGTH),
    security: CDASecurityTritAsValue(trits.slice(CDA_SECURITY_OFFSET, CDA_SECURITY_OFFSET + CDA_SECURITY_LENGTH)),
    timeoutAt: CDATimeoutAt(trits),
    multiUse: CDAMultiUse(trits),
    expectedAmount: CDAExpectedAmount(trits),
})

export const deserializeCDA = (trits: Int8Array): CDA => ({
    address:
        tritsToTrytes(trits.slice(CDA_ADDRESS_OFFSET, CDA_ADDRESS_OFFSET + ADDRESS_LENGTH)) +
        tritsToTrytes(trits.slice(CDA_CHECKSUM_OFFSET, CDA_CHECKSUM_OFFSET + CDA_CHECKSUM_LENGTH)),
    timeoutAt: tritsToValue(trits.slice(CDA_TIMEOUT_AT_OFFSET, CDA_TIMEOUT_AT_OFFSET + CDA_TIMEOUT_AT_LENGTH)),
    multiUse: CDAMultiUseTritAsBoolean(trits.slice(CDA_MULTI_USE_OFFSET, CDA_MULTI_USE_OFFSET + CDA_MULTI_USE_LENGTH)),
    expectedAmount: tritsToValue(trits.slice(CDA_EXPECTED_AMOUNT_OFFSET, CDA_EXPECTED_AMOUNT_OFFSET + VALUE_LENGTH)),
})

export const serializeCDAMagnet = ({ address, timeoutAt, multiUse, expectedAmount }: CDA): string => {
    let magnet = 'iota://' + address + '/?timeout_at=' + timeoutAt

    magnet += '&multi_use=' + (multiUse === true ? '1' : '0')

    if (expectedAmount) {
        magnet += '&expected_amount=' + expectedAmount
    }

    return magnet
}

export const parseCDAMagnet = (magnet: string): CDA => {
    magnet = magnet.trim()

    const scheme = 'iota://'

    if (
        magnet.indexOf(scheme) === -1 ||
        magnet.length < scheme.length + ADDRESS_LENGTH / TRYTE_WIDTH + CDA_CHECKSUM_LENGTH / TRYTE_WIDTH
    ) {
        throw new Error('Invalid magnet link: Unknown scheme')
    }

    const address = magnet.slice(
        scheme.length,
        scheme.length + ADDRESS_LENGTH / TRYTE_WIDTH + CDA_CHECKSUM_LENGTH / TRYTE_WIDTH
    )

    if (!isTrytesOfExactLength(address, ADDRESS_LENGTH / TRYTE_WIDTH + CDA_CHECKSUM_LENGTH / TRYTE_WIDTH)) {
        throw new Error('Invalid magnet link: Invalid address trytes')
    }

    const { timeout_at, multi_use, expected_amount } = querystring.parse(
        magnet
            .slice(scheme.length + ADDRESS_LENGTH / TRYTE_WIDTH + CDA_CHECKSUM_LENGTH / TRYTE_WIDTH)
            .replace(/^(\/\?)/g, '')
    )

    if (typeof timeout_at !== 'string') {
        throw new Error('Invalid magnet link: Missing `timeout_at` field')
    }

    if (typeof multi_use !== 'undefined' && multi_use !== '1' && multi_use !== '0') {
        throw new Error('Invalid magnet link: Invalid `multi_use` field')
    }

    if (multi_use && expected_amount && multi_use === '1' && expected_amount !== '0') {
        throw new TypeError('Only one of the following fields can be set: multiUse, expectedAmount')
    }

    /* istanbul ignore next */
    if (typeof expected_amount !== 'undefined' && typeof expected_amount !== 'string') {
        /* istanbul ignore next */
        throw new Error('Invalid magnet link: Invalid `expected_amount` field')
    }

    const timeoutAt = parseInt(timeout_at, 10)

    if (!Number.isInteger(timeoutAt)) {
        throw new Error('Invalid magnet link: Invalid `timeout_at` field')
    }

    const multiUse = multi_use === '1' ? true : false

    const expectedAmount = typeof expected_amount !== 'undefined' ? parseInt(expected_amount, 10) : undefined

    const cda = {
        address,
        timeoutAt,
        multiUse,
        expectedAmount,
    }

    verifyCDAChecksum(cda)

    return cda
}

export const verifyAbstractCDA = (currentTime: number, { timeoutAt, multiUse, expectedAmount }: AbstractCDA) => {
    if (!Number.isInteger(timeoutAt)) {
        throw new TypeError('Illegal timeout. Must be an integer.')
    }

    if (multiUse && expectedAmount) {
        throw new TypeError('Only one of the following fields can be set: multiUse, expectedAmount')
    }

    if (typeof multiUse !== 'undefined' && typeof multiUse !== 'boolean') {
        throw new TypeError('Illegal multi-use value. Must be boolean.')
    }

    if (typeof expectedAmount !== 'undefined' && (!Number.isInteger(expectedAmount) || expectedAmount < 0)) {
        throw new TypeError('Illegal expected amount.')
    }

    if (timeoutAt <= currentTime) {
        throw new Error('Expired timeout.')
    }
}

export const verifyCDAParams = (currentTime: number, { timeoutAt, multiUse, expectedAmount, security }: CDAParams) => {
    verifyAbstractCDA(currentTime, { timeoutAt, multiUse, expectedAmount })

    if (security && (!Number.isInteger(security) || [1, 2, 3].indexOf(security) === -1)) {
        throw new Error(errors.INVALID_SECURITY_LEVEL)
    }
}

export const verifyCDA = (currentTime: number, { address, timeoutAt, multiUse, expectedAmount }: CDA) => {
    if (!isTrytesOfExactLength(address, ADDRESS_LENGTH / TRYTE_WIDTH + CDA_CHECKSUM_LENGTH / TRYTE_WIDTH)) {
        throw new Error('Illegal address trytes.')
    }
    verifyAbstractCDA(currentTime, { timeoutAt, multiUse, expectedAmount })
    verifyCDAChecksum({ address, timeoutAt, multiUse, expectedAmount })
}

export const verifyCDAChecksum = (cda: CDA) => {
    if (!isCDAWithValidChecksum(cda)) {
        throw new Error('Invalid CDA checksum.')
    }
}

export const verifyCDATransfer = (
    currentTime: number,
    { address, timeoutAt, multiUse, expectedAmount, value }: CDATransfer
) => {
    if (!Number.isInteger(value)) {
        throw new Error('Illegal value.')
    }

    if (expectedAmount && value > expectedAmount) {
        throw new Error('Value cannot exceed expected amount of ' + expectedAmount + ' iotas.')
    }

    verifyCDA(currentTime, { address, timeoutAt, multiUse, expectedAmount })
}

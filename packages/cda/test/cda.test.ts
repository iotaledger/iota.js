import { trytesToTrits, valueToTrits } from '@iota/converter'
import { padTrits } from '@iota/pad'
import { ADDRESS_LENGTH } from '@iota/transaction'
import { describe, Try } from 'riteway'
import * as errors from '../../errors'
import {
    CDA_INDEX_LENGTH,
    CDAMultiUseBooleanAsTrit,
    deserializeCDAInput,
    isAlive,
    isExpired,
    parseCDAMagnet,
    serializeCDAInput,
    serializeCDAMagnet,
    verifyCDAParams,
    verifyCDATransfer,
} from '../src/cda'

enum security {
    TWO = 2,
}

const address = 'A'.repeat(ADDRESS_LENGTH / 3)
const checksum = 'WOWRMBLMD'
const addressChecksum = address + checksum
const timeoutAt = 1552847640
const multiUse = false
const expectedAmount = 1000
const magnet = `iota://${address}${checksum}/?timeout_at=${timeoutAt}&multi_use=${CDAMultiUseBooleanAsTrit(
    multiUse
)}&expected_amount=${expectedAmount}`

const cda = {
    address: addressChecksum,
    timeoutAt,
    multiUse,
    expectedAmount,
}
const cdaInput = {
    ...cda,
    address: trytesToTrits(address),
    index: padTrits(CDA_INDEX_LENGTH)(valueToTrits(0)),
    security: security.TWO,
}

const addressB = 'B'.repeat(ADDRESS_LENGTH / 3)
const checksumB = 'JMYXQUGCZ'
const addressChecksumB = addressB + checksumB
const timeoutAtB = 1552847640
const multiUseB = true
const expectedAmountB = 0
const magnetBShort = `iota://${addressB}${checksumB}/?timeout_at=${timeoutAtB}&multi_use=${CDAMultiUseBooleanAsTrit(
    multiUseB
)}`

const cdaB = {
    address: addressChecksumB,
    timeoutAt: timeoutAtB,
    multiUse: multiUseB,
    expectedAmount: expectedAmountB,
}
const cdaInputB = {
    ...cdaB,
    address: trytesToTrits(addressB),
    index: padTrits(CDA_INDEX_LENGTH)(valueToTrits(12183423)),
    security: security.TWO,
}

const magnetWithInvalidChecksum = `iota://${address}${checksumB}/?timeout_at=${timeoutAt}&multi_use=${CDAMultiUseBooleanAsTrit(
    multiUse
)}&expected_amount=${expectedAmount}`
const magnetWithMultiUseAndExpectedAmount = `iota://${address}LWZUEUTVH/?timeout_at=${timeoutAt}&multi_use=${CDAMultiUseBooleanAsTrit(
    !multiUse
)}&expected_amount=${expectedAmount}`
const magnetLinkWithInvalidAddressTrytes = `iota://adr${address}LWZUEUTVH/?timeout_at=${timeoutAt}&multi_use=${CDAMultiUseBooleanAsTrit(
    !multiUse
)}&expected_amount=${expectedAmount}`
const magnetLinkWithInvalidTimeoutAtField = `iota://${address}LWZUEUTVH/?timeout_at=sadf&multi_use=${CDAMultiUseBooleanAsTrit(
    !multiUse
)}`
const magnetLinkWithInvalidMultiUseField = `iota://${address}LWZUEUTVH/?timeout_at=${timeoutAt}&multi_use=3`
const magnetLinkWithInvalidScheme = `iot://${address}LWZUEUTVH/?timeout_at=${timeoutAt}&multi_use=1`
const magnetLinkWithMissingTimeoutField = `iota://${address}LWZUEUTVH/?multi_use=1`

const currentTime = Math.floor(Date.now() / 1000)
const pastTime = currentTime - 1
const futureTime = currentTime + 1

const expiredCda = {
    address: addressChecksum,
    timeoutAt: pastTime,
}

const aliveCda = {
    address: addressChecksum,
    timeoutAt: futureTime,
    expectedAmount: 100,
}

describe('isExpired', async assert => {
    assert({
        given: 'alive CDA',
        should: 'return false',
        actual: isExpired(currentTime, aliveCda),
        expected: false,
    })

    assert({
        given: 'expired cda',
        should: 'return true',
        actual: isExpired(currentTime, expiredCda),
        expected: true,
    })
})

describe('isExpired', async assert => {
    assert({
        given: 'alive CDA',
        should: 'return true',
        actual: isAlive(currentTime, aliveCda),
        expected: true,
    })

    assert({
        given: 'expired cda',
        should: 'return false',
        actual: isAlive(currentTime, expiredCda),
        expected: false,
    })
})

describe('(de)serializeCDAInput', async assert => {
    assert({
        given: 'a CDA input with expected amount',
        should: 'serialize and deserialize it',
        actual: deserializeCDAInput(serializeCDAInput(cdaInput)),
        expected: cdaInput,
    })

    assert({
        given: 'a CDA input with multi-use set to 1',
        should: 'serialize and deserialize it',
        actual: deserializeCDAInput(serializeCDAInput(cdaInputB)),
        expected: cdaInputB,
    })

    assert({
        given: 'a CDA input with security level 1',
        should: 'serialize and deserialize it',
        actual: deserializeCDAInput(
            serializeCDAInput({
                ...cdaInputB,
                security: 1,
            })
        ),
        expected: { ...cdaInputB, security: 1 },
    })

    assert({
        given: 'a CDA input with security level 3',
        should: 'serialize and deserialize it',
        actual: deserializeCDAInput(
            serializeCDAInput({
                ...cdaInputB,
                security: 3,
            })
        ),
        expected: { ...cdaInputB, security: 3 },
    })
})

describe('serializeCDAMagnet / parseCDAMagnet', async assert => {
    assert({
        given: 'a magnet link with expected amount',
        should: 'parse and serialize magnet',
        actual: serializeCDAMagnet(parseCDAMagnet(magnet)),
        expected: magnet,
    })

    assert({
        given: 'a magnet link with multi-use set to 1',
        should: 'parse and serialize magnet',
        actual: serializeCDAMagnet(parseCDAMagnet(magnetBShort)),
        expected: magnetBShort,
    })

    assert({
        given: 'a magnet link with invalid checksum',
        should: 'throw "Invalid CDA checksum" Error',
        actual: Try(x => serializeCDAMagnet(parseCDAMagnet(x)), magnetWithInvalidChecksum).message,
        expected: 'Invalid CDA checksum.',
    })

    assert({
        given: 'a magnet link with multi-use and expected amount set to 1',
        should: 'throw error',
        actual: Try(x => serializeCDAMagnet(parseCDAMagnet(x)), magnetWithMultiUseAndExpectedAmount).message,
        expected: 'Only one of the following fields can be set: multiUse, expectedAmount',
    })

    assert({
        given: 'a magnet link with invalid address trytes',
        should: 'throw error',
        actual: Try(x => serializeCDAMagnet(parseCDAMagnet(x)), magnetLinkWithInvalidAddressTrytes).message,
        expected: 'Invalid magnet link: Invalid address trytes',
    })

    assert({
        given: 'a magnet link with invalid multi-use field',
        should: 'throw error',
        actual: Try(x => serializeCDAMagnet(parseCDAMagnet(x)), magnetLinkWithInvalidMultiUseField).message,
        expected: 'Invalid magnet link: Invalid `multi_use` field',
    })

    assert({
        given: 'a magnet link with invalid address trytes',
        should: 'throw error',
        actual: Try(x => serializeCDAMagnet(parseCDAMagnet(x)), magnetLinkWithInvalidTimeoutAtField).message,
        expected: 'Invalid magnet link: Invalid `timeout_at` field',
    })

    assert({
        given: 'a magnet link with unknown scheme',
        should: 'throw error',
        actual: Try(x => serializeCDAMagnet(parseCDAMagnet(x)), magnetLinkWithInvalidScheme).message,
        expected: 'Invalid magnet link: Unknown scheme',
    })

    assert({
        given: 'a magnet link with missing timeout field',
        should: 'throw error',
        actual: Try(x => serializeCDAMagnet(parseCDAMagnet(x)), magnetLinkWithMissingTimeoutField).message,
        expected: 'Invalid magnet link: Missing `timeout_at` field',
    })
})

describe('verifyCDATransfer', async assert => {
    assert({
        given: 'a valid CDA transfer',
        should: 'not throw',
        actual: verifyCDATransfer(timeoutAt - 1, {
            ...cda,
            value: 1000,
        }),
        expected: undefined,
    })

    assert({
        given: 'a CDA transfer with invalid address trytes',
        should: 'throw "Illegal address trytes" error',
        actual: Try(verifyCDATransfer, timeoutAt - 1, {
            ...cda,
            address: 'asdf' + address,
            value: 1000,
        }).message,
        expected: 'Illegal address trytes.',
    })

    assert({
        given: 'a CDA transfer with value that exceeds expected amount',
        should: 'throw error',
        actual: Try(verifyCDATransfer, timeoutAt - 1, {
            ...cda,
            value: 1001,
        }).message,
        expected: 'Value cannot exceed expected amount of ' + cda.expectedAmount + ' iotas.',
    })

    assert({
        given: 'a CDA transfer with invalid value',
        should: 'throw "Illegal value" error',
        actual: Try(verifyCDATransfer, timeoutAt - 1, {
            ...cda,
            value: '1000' as any,
        }).message,
        expected: 'Illegal value.',
    })
})

describe('verifyCDAParams', async assert => {
    assert({
        given: 'valid CDA params',
        should: 'not throw error',
        actual: verifyCDAParams(timeoutAt - 1, {
            timeoutAt,
            multiUse,
            expectedAmount,
            security: security.TWO,
        } as any),
        expected: undefined,
    })

    assert({
        given: 'expired timeout',
        should: 'throw "Expired timeout" error',
        actual: Try(verifyCDAParams, timeoutAt, {
            timeoutAt,
            multiUse,
            expectedAmount,
            security: security.TWO,
        } as any).message,
        expected: 'Expired timeout.',
    })

    assert({
        given: 'illegal timeout value',
        should: 'throw "Illegal multi-use value" error',
        actual: Try(verifyCDAParams, timeoutAt - 1, {
            timeoutAt: timeoutAt.toString(),
            multiUse,
            security: security.TWO,
        } as any).message,
        expected: 'Illegal timeout. Must be an integer.',
    })

    assert({
        given: 'illegal multi-use value',
        should: 'throw "Illegal multi-use value" error',
        actual: Try(verifyCDAParams, timeoutAt - 1, {
            timeoutAt,
            multiUse: '1',
            security: security.TWO,
        } as any).message,
        expected: 'Illegal multi-use value. Must be boolean.',
    })

    assert({
        given: 'illegal expected amount',
        should: 'throw "Illegal expected amount." error',
        actual: Try(verifyCDAParams, timeoutAt - 1, {
            timeoutAt,
            expectedAmount: '1',
            security: security.TWO,
        } as any).message,
        expected: 'Illegal expected amount.',
    })

    assert({
        given: 'expected amount & multi-use',
        should: 'throw error',
        actual: Try(verifyCDAParams, timeoutAt - 1, {
            timeoutAt,
            multiUse: true,
            expectedAmount: 1000,
            security: security.TWO,
        } as any).message,
        expected: 'Only one of the following fields can be set: multiUse, expectedAmount',
    })

    assert({
        given: 'invalid security value',
        should: 'throw error',
        actual: Try(verifyCDAParams, timeoutAt - 1, {
            timeoutAt,
            expectedAmount: 1000,
            security: 4,
        } as any).message,
        expected: errors.INVALID_SECURITY_LEVEL,
    })
})

import { describe, Try } from 'riteway'
import { asciiToTrytes, tritsToTrytes, tritsToValue, trytesToAscii, trytesToTrits, valueToTrits } from '../src'

import * as errors from '../src/errors'

describe('asciiToTrytes(ascii)', async assert => {
    assert({
        given: 'ascii',
        should: 'convert to trytes',
        actual: asciiToTrytes('IOTA'),
        expected: 'SBYBCCKB',
    })

    assert({
        given: 'utf8 as input',
        should: 'throw error',
        actual: Try(asciiToTrytes, 'Γιώτα'),
        expected: new Error(errors.INVALID_ASCII_CHARS),
    })
})

describe('trytesToAscii(trytes)', async assert => {
    assert({
        given: 'tryte-encoded ascii',
        should: 'convert to ascii',
        actual: trytesToAscii('SBYBCCKB'),
        expected: 'IOTA',
    })

    assert({
        given: 'non-trytes',
        should: 'throw error',
        actual: Try(trytesToTrits, 'AAfasds'),
        expected: new Error(errors.INVALID_TRYTES),
    })

    assert({
        given: 'trytes of odd length',
        should: 'throw error',
        actual: Try(trytesToAscii, 'AAA'),
        expected: new Error(errors.INVALID_ODD_LENGTH),
    })
})

describe('tritsToTrytes(trytesToTrits(trytes))', async assert => {
    assert({
        given: 'trytes',
        should: 'convert to trits and back',
        actual: tritsToTrytes(trytesToTrits('IOTA')),
        expected: 'IOTA',
    })
})

describe('tritsToValue(valueToTrits(value))', async assert => {
    assert({
        given: 'value',
        should: 'convert to trits and back',
        actual: tritsToValue(valueToTrits(999999)),
        expected: 999999,
    })
})

import test from 'ava'
import { trytesToAscii } from '../src'
import * as errors from '../src/errors'

const { INVALID_ODD_LENGTH, INVALID_TRYTES } = errors

test('trytesToAscii()', t => {
    const trytes = 'SBYBCCKB'
    const expected = 'IOTA'

    const nonTrytes = 'AAAfasds'
    const trytesOfOddLength = 'AAA'

    t.is(trytesToAscii(trytes), expected, 'fromTrytes() should convert trytes to ascii.')

    const invalidTrytesError = t.throws(
        () => trytesToAscii(nonTrytes),
        Error,
        'fromTrytes() should throw error for non-trytes.'
    )

    t.is(invalidTrytesError.message, INVALID_TRYTES, 'incorrect error message')

    const oddLengthError = t.throws(
        () => trytesToAscii(trytesOfOddLength),
        Error,
        'fromTrytes() should throw error for trytes of odd length.'
    )

    t.is(oddLengthError.message, INVALID_ODD_LENGTH, 'incorrect error message')
})

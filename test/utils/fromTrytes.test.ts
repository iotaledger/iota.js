import test from 'ava'
import { INVALID_ODD_LENGTH, INVALID_TRYTES } from '../../lib/errors'
import { fromTrytes } from '../../lib/utils'

test('fromTrytes', t => {
    const trytes = 'SBYBCCKB'
    const expected = 'IOTA'
  
    const nonTrytes = "AAAfasds"
    const trytesOfOddLength = "AAA" 

    t.is(
        fromTrytes(trytes),
        expected,
        'fromTrytes() should convert trytes to ascii.'
    )

    const invalidTrytesError = t.throws(
        () => fromTrytes(nonTrytes),
        Error,
        'fromTrytes() should throw error for non-trytes.'
    )

    t.is(invalidTrytesError.message, INVALID_TRYTES, 'incorrect error message')

    const oddLengthError = t.throws(
        () => fromTrytes(trytesOfOddLength),
        Error,
        'fromTrytes() should throw error for trytes of odd length.'
    )

    t.is(oddLengthError.message, INVALID_ODD_LENGTH, 'incorrect error message')
})

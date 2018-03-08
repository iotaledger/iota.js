import test from 'ava'
import { INVALID_ASCII_INPUT } from '../../lib/errors'
import { toTrytes } from '../../lib/utils'

test('toTrytes()', t => {
    const ascii = 'IOTA'
    const utf8 = 'Γιώτα'
    const expected = 'SBYBCCKB'

    t.is(
        toTrytes(ascii),
        expected,
        'toTrytes() should correctly convert ascii to trytes.'
    )

    const error = t.throws(
        () => toTrytes(utf8),
        Error,
        'toTrytes() should throw error for non-ascii input.'
    )
    
    t.is(error.message, INVALID_ASCII_INPUT)
})

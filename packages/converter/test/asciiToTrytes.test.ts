import test from 'ava'
import { asciiToTrytes } from '../src'
import { INVALID_ASCII_CHARS } from '../src/errors'

test('asciiToTrytes()', t => {
    const ascii = 'IOTA'
    const utf8 = 'Γιώτα'
    const expected = 'SBYBCCKB'

    t.is(asciiToTrytes(ascii), expected, 'toTrytes() should correctly convert ascii to trytes.')

    const error = t.throws(() => asciiToTrytes(utf8), Error, 'toTrytes() should throw error for non-ascii input.')

    t.is(error.message, INVALID_ASCII_CHARS)
})

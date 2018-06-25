import test from 'ava'
import { padTrytes } from '../src'

test('padTrytes() adds padding to trytes.', t => {
    const trytes = 'IOTA'
    const expected = 'IOTA99'
    t.is(padTrytes(6)(trytes), expected, 'padTrits() should add padding to trytes.')
})

test('padTrytes() returns the given string as is, if exceeds given length.', t => {
    const trytes = 'IOTA'
    const expected = 'IOTA'

    t.is(padTrytes(4)(trytes), expected, 'padTrits() should return the given string as is, if exceeds given length.')
})

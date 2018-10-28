import test from 'ava'
import { padTrits } from '../src'

test('padTrits() adds padding to trit array.', t => {
    const trits = new Int8Array([-1, 0, 1])
    const expected = new Int8Array([-1, 0, 1, 0, 0, 0])

    t.deepEqual(padTrits(6)(trits), expected, 'padTrits() should add padding to trit array.')
})

test('padTrits() returns the trit array as is, if exceeds given length.', t => {
    const trits = new Int8Array([-1, 0, 1])
    const expected = new Int8Array([-1, 0, 1])

    t.deepEqual(padTrits(3)(trits), expected, 'padTrits() should return the trit array as is, if exceeds given length.')
})

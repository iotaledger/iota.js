import test from 'ava'
import { isStartEndOptions } from '../src'

test('isStartEndOptions() returns true for valid options.', t => {
    t.is(isStartEndOptions({ start: 2, end: 10 }), true, 'isStartEndOptions() should return true for valid options.')

    t.is(isStartEndOptions({ start: 2, end: 2 }), true, 'isStartEndOptions() should return true for valid options.')
})

test('isStartEndOptions() returns false for invalid end option.', t => {
    t.is(isStartEndOptions({ start: 2, end: 1 }), false, 'isStartEndOptions() should return false if start > end')
})

test('isStartEndOptions() returns false if threshold is reached.', t => {
    t.is(
        isStartEndOptions({ start: 0, end: 1001 }),
        false,
        'isStartEndOptions() should return false if thresshold difference is reached.'
    )
})

import test from 'ava'
import { isTagArray } from '../src'

test('isTagArray() returns true for valid tag.', t => {
    t.is(isTagArray(['TAG']), true, 'isTagArray() should return true for valid tag.')

    t.is(isTagArray(['TAG'.repeat(9)]), true, 'isTagArray() should return true for valid tag.')
})

test('isTagArray() returns false for tag tag.', t => {
    t.is(isTagArray(['Tag']), false, 'isTagArray() should return false for tag of invalid trytes.')

    t.is(isTagArray(['TAG'.repeat(9) + 'A']), false, 'isTagArray() shoud return false for tag of invalid length.')
})

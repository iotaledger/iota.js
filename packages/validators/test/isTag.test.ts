import test from 'ava'
import { isTag } from '../src'

test('isTag() returns true for valid tag.', t => {
    t.is(isTag('TAG'), true, 'isTag() should return true for valid tag.')

    t.is(isTag('TAG'.repeat(9)), true, 'isTag() should return true for valid tag.')
})

test('isTag() returns false for tag tag.', t => {
    t.is(isTag('Tag'), false, 'isTag() should return false for tag of invalid trytes.')

    t.is(isTag('TAG'.repeat(9) + 'A'), false, 'isTag() shoud return false for tag of invalid length.')
})

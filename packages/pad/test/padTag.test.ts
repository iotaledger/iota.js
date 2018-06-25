import test from 'ava'
import { padTag, padTagArray } from '../src'

test('padTag() adds correct padding to tag.', t => {
    const tag = 'IOTA'
    const expected = 'IOTA' + '9'.repeat(23)

    t.is(padTag(tag), expected, 'padTag() should add correct padding to tag.')
})

test('padTag() adds no padding to 27-trytes long tags.', t => {
    const tag = 'TAG'.repeat(9)

    t.is(padTag(tag), tag, 'padTag() should add no padding to 27-trytes long tags.')
})

test('padTagArray() adds correct padding to tag array.', t => {
    const tags = ['IOTA']
    const expected = ['IOTA' + '9'.repeat(23)]

    t.deepEqual(padTagArray(tags), expected, 'padTag() should add correct padding to tag array.')
})

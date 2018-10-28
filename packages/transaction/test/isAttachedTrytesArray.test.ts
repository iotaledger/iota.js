import { attachedTrytes, attachedTrytesOfInvalidChars, attachedTrytesOfInvalidLength } from '@iota/samples'
import test from 'ava'
import { isAttachedTrytesArray } from '../src'

test('isAttachedTrytesArray()', t => {
    t.is(isAttachedTrytesArray(attachedTrytes), true, 'isAttachedTrytesArray() returns true for valid attached trytes')

    t.is(
        isAttachedTrytesArray(attachedTrytesOfInvalidChars),
        false,
        'isAttachedTrytesArray() returns false for invalid trytes'
    )

    t.is(
        isAttachedTrytesArray(attachedTrytesOfInvalidLength),
        false,
        'isAttachedTrytesArray() return false for trytes of invalid length'
    )
})

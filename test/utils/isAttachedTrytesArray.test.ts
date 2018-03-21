import test from 'ava'
import { isAttachedTrytesArray } from '../../lib/utils'
import {
    attachedTrytes,
    attachedTrytesOfInvalidChars,
    attachedTrytesOfInvalidLength
} from '../samples/attachedTrytes'

test('isAttachedTrytesArray()', t => {
    t.is(
        isAttachedTrytesArray(attachedTrytes),
        true,
        'isAttachedTrytesArray() returns true for valid attached trytes' 
    )

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

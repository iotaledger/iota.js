import test from 'ava'
import { isBundle } from '../../lib/utils/'
import {
    bundle,
    invalidBundle
} from '../samples/bundle'


test('isBundle', t => {
    t.is(
        isBundle(bundle),
        true,
        'isBundle() should return true for valid bundle.'
    )
/*
    t.is(
        isBundle(invalidBundle),
        false,
        'isBundle() should return false for bundle with invalid signature.'
    )
  
    t.is(
        isBundle(invalidBundle),
        false,
        'isBundle() should return false for bundle with illegal transaction order.'
    )
  
    t.is(
        isBundle(invalidBundle),
        false,
        'isBundle() should return false for bundle with non-zero value sum.'
    )

    t.is(
        isBundle(invalidBundle),
        false,
        'isBundle() should return false for bundle with invalid bundle hash.'
    )

    t.is(
        isBundle(invalidBundle),
        false,
        'isBundle() should return false if for last transaction in bundle: currentIndex !== lastIndex.'
    ) */ 
})

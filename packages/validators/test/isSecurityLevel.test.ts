import test from 'ava'
import { isSecurityLevel } from '../src'

test('isSecurityLevel() returns true for valid security level.', t => {
    t.is(isSecurityLevel(2), true, 'isSecurityLevel() should return true for valid security level.')
})

test('isSecurityLevel() returns false for invalid security level.', t => {
    t.is(isSecurityLevel(-1), false, 'isTransactionHash() should return false for negative security level.')

    t.is(isSecurityLevel(0), false, 'isSecurityLevel() should return fasle for security level of 0.')
})

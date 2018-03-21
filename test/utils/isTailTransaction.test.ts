import test from 'ava'
import { isTailTransaction } from '../../lib/utils'
import { bundle } from '../samples/bundle'

test('isTailTransaction() returns true for valid tail transaction.', t => {
    t.is(
        isTailTransaction(bundle[0]),
        true,
        'isTailTransaction() should return true for valid tail transaction.'
    )
})

test('isTailTransaction() returns false for non-tail transaction.', t => {
    t.is(
        isTailTransaction(bundle[1]),
        false,
        'isTransactionHash() should return false for non-tail transaction.'
    )
})

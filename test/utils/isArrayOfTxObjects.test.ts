import test from 'ava'
import { isTransactionArray } from '../../lib/utils'

import { invalidTransactionObject, transactionObject } from '../samples/transactionObjects'

test('isTransactionArray()', t => {
    t.is(
        isTransactionArray([transactionObject]),
        true, 
        'isTransactionsArray() returns for valid transaction array.'
    )
    t.is(
        isTransactionArray([invalidTransactionObject]),
        false,
        'isTransactionsArray() returns false for invalid transaction array.'
    )
})

import * as Promise from 'bluebird'
import * as erros from '../../errors'
import { hashValidator, isHash, transactionsToFinalTrytes, validate } from '../../utils'
import { broadcastTransactions } from '../core'
import { Callback, Transaction } from '../types'
import { getBundle } from './'

/**
 *   Re-broadcasts a transfer by tail transaction
 *
 *   @method broadcastBundle
 *   @param {string} tailTransaction
 *   @param {function} [callback]
 *   @returns {object} Transaction objects
 **/
export const broadcastBundle = (
  tailTransactionHash: string,
  callback: Callback<void>
): Promise<void> =>
    Promise
        .try(() => validate(hashValidator(tailTransactionHash)))
        .then(() => getBundle(tailTransactionHash))
        .then(transactionsToFinalTrytes)
        .then(broadcastTransactions)
        .asCallback(callback) 

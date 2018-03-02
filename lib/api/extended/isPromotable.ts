import * as Promise from 'bluebird'
import { checkConsistency } from '../core'
import { Callback, Trytes } from '../types'

/**
 *  @method isPromotable
 *  @deprecated
 *  @alias checkConsistency
 */
export const isPromotable = (transactions: Trytes | Trytes[], callback?: Callback<boolean>): Promise<boolean> =>
    checkConsistency(transactions, callback)

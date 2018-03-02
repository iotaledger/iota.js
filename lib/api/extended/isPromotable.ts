import * as Promise from 'bluebird'
import { checkConsistency } from '../core'
import { Callback } from '../types'

/**
 *  @method isPromotable
 *  @deprecated
 *  @alias checkConsistency
 */
export const isPromotable = (transactions: string | string[], callback?: Callback<boolean>): Promise<boolean> =>
    checkConsistency(transactions, callback)

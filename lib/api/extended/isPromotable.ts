import { API, Callback } from '../types'

/**
 *  @method isPromotable
 *  @deprecated
 *  @alias checkConsistency
 */
export default function isPromotable(
    this: API,
    transactions: string | string[],
    callback?: Callback<boolean>
): Promise<boolean> {
    return this.checkConsistency(transactions, callback)
} 

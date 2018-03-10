import * as Promise from 'bluebird'
import { createCheckConsistency } from '../core'
import { Callback, Provider, Trytes } from '../types'

/**
 *  @method isPromotable
 *  @deprecated
 *  @alias checkConsistency
 */
export const createIsPromotable = (provider: Provider) => {
    const checkConsistency = createCheckConsistency(provider)

    return (transactions: Trytes | Trytes[], callback?: Callback<boolean>): Promise<boolean> =>
        checkConsistency(transactions, callback)
}

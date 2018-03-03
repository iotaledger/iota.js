import * as Promise from 'bluebird'
import { createCheckConsistency } from '../core'
import { Callback, Settings, Trytes } from '../types'

/**
 *  @method isPromotable
 *  @deprecated
 *  @alias checkConsistency
 */
export const createIsPromotable = (settings: Settings) => {
    const checkConsistency = createCheckConsistency(settings)

    const isPromotable = (transactions: Trytes | Trytes[], callback?: Callback<boolean>): Promise<boolean> =>
        checkConsistency(transactions, callback)

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(isPromotable, { setSettings })
}

import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { asArray, hashArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Trytes } from '../types'
import { sendCommand } from './sendCommand'

export interface CheckConsistencyCommand extends BaseCommand {
    command: IRICommand.CHECK_CONSISTENCY
    transactions: Trytes[]
}

export interface CheckConsistencyResponse {
    state: boolean
}

export const validateCheckConsistency = (transactions: string[]) => validate([hashArrayValidator(transactions)])

export const checkConsistency = (transactions: string | string[], callback?: Callback<boolean>): Promise<boolean> => {
    const transactionsArray = asArray(transactions)

    return Promise.try(() => validateCheckConsistency(transactionsArray))
        .then(() =>
            sendCommand<CheckConsistencyCommand, CheckConsistencyResponse>({
                command: IRICommand.CHECK_CONSISTENCY,
                transactions: transactionsArray,
            })
        )
        .then(res => res.state)
        .asCallback(callback)
}

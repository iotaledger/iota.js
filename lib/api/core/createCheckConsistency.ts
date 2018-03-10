import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { asArray, hashArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Provider, Trytes } from '../types'

export interface CheckConsistencyCommand extends BaseCommand {
    command: IRICommand.CHECK_CONSISTENCY
    transactions: Trytes[]
}

export interface CheckConsistencyResponse {
    state: boolean
}

export const validateCheckConsistency = (transactions: string[]) => validate(hashArrayValidator(transactions))

export const createCheckConsistency = (provider: Provider) =>
    (transactions: string | string[], callback?: Callback<boolean>): Promise<boolean> => {
        const transactionsArray = asArray(transactions)

        return Promise.resolve(validateCheckConsistency(transactionsArray))
            .then(() =>
                provider.sendCommand<CheckConsistencyCommand, CheckConsistencyResponse>({
                    command: IRICommand.CHECK_CONSISTENCY,
                    transactions: transactionsArray,
                })
            )
            .then(res => res.state)
            .asCallback(callback)
    }

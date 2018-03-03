import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { depthValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Settings } from '../types'
import { sendCommand } from './sendCommand'

export interface GetTransactionsToApproveResponse {
    trunkTransaction: string
    branchTransaction: string
    duration?: number
}

export interface GetTransactionsToApproveCommand extends BaseCommand {
    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE
    depth: number
    reference?: string
}

export const validateGetTransactionsToApprove = (depth: number) => validate(depthValidator(depth))

/**
 * @method getTransactionsToApprove
 * @param {int} depth
 * @param {string} reference
 * @returns {function} callback
 * @returns {object} success
 **/
export const createGetTransactionsToApprove = (settings: Settings) => {
    let { provider } = settings

    const getTransactionsToApprove = (
        depth: number,
        reference?: string, // this is missing in IRI docs?
        callback?: Callback<GetTransactionsToApproveResponse>
    ): Promise<GetTransactionsToApproveResponse> =>
        Promise.resolve(validateGetTransactionsToApprove(depth))
            .then(() =>
                sendCommand<GetTransactionsToApproveCommand, GetTransactionsToApproveResponse>(provider, {
                    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
                    depth,
                    reference,
                })
            )
            .then(({ trunkTransaction, branchTransaction }) => ({
                trunkTransaction,
                branchTransaction,
            }))
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        provider = newSettings.provider
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(getTransactionsToApprove, { setSettings })
}

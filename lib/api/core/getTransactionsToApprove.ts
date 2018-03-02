import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { depthValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand } from '../types'
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
export const getTransactionsToApprove = (
    depth: number,
    reference?: string, // this is missing in IRI docs?
    callback?: Callback<GetTransactionsToApproveResponse>
): Promise<GetTransactionsToApproveResponse> =>
    Promise.resolve(validateGetTransactionsToApprove(depth))
        .then(() =>
            sendCommand<GetTransactionsToApproveCommand, GetTransactionsToApproveResponse>({
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

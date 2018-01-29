import errors from '../../errors'

import { API, BaseCommand, Callback, IRICommand } from '../types'

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

/**
 * @method getTransactionsToApprove
 * @param {int} depth
 * @param {string} reference
 * @returns {function} callback
 * @returns {object} success
 **/
export default function getTransactionsToApprove(
    this: API,
    depth: number,
    reference?: string,
    callback?: Callback<GetTransactionsToApproveResponse>): Promise<GetTransactionsToApproveResponse> {

      const promise: Promise<GetTransactionsToApproveResponse> = new Promise((resolve, reject) => {

        if (!Number.isInteger(depth)) {
            reject(new Error(errors.INVALID_DEPTH))
        }

        resolve(
            this.sendCommand<GetTransactionsToApproveCommand, GetTransactionsToApproveResponse>(
                {
                    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
                    depth,
                    reference
                }
            )
                .then(({trunkTransaction, branchTransaction}) => ({
                    trunkTransaction,
                    branchTransaction
                }))
        )
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}

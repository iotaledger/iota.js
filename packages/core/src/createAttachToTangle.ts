import { TRYTE_WIDTH, trytesToTrits } from '@iota/converter'
import { isTransaction, TRANSACTION_HASH_LENGTH, TRANSACTION_LENGTH } from '@iota/transaction'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { isTrytesOfExactLength, validate } from '../../guards'
import {
    AttachToTangle,
    AttachToTangleCommand,
    AttachToTangleResponse,
    Callback,
    Hash,
    IRICommand,
    Provider,
    Trytes,
} from '../../types'

/**
 * @method createAttachToTangle
 *
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider
 *
 * @return {Function} {@link #module_core.attachToTangle `attachToTangle`}
 */
export const createAttachToTangle = ({ send }: Provider): AttachToTangle => {
    /**
     * Performs the Proof-of-Work required to attach a transaction to the Tangle by
     * calling [`attachToTangle`](https://docs.iota.works/iri/api#endpoints/attachToTangle) command.
     * Returns list of transaction trytes and overwrites the following fields:
     *  - `hash`
     *  - `nonce`
     *  - `attachmentTimestamp`
     *  - `attachmentTimestampLowerBound`
     *  - `attachmentTimestampUpperBound`
     *
     * This method can be replaced with a local equivalent such as
     * [`ccurl.interface.js`](https://github.com/iotaledger/ccurl.interface.js) in node.js,
     * [`curl.lib.js`](https://github.com/iotaledger/curl.lib.js) which works on WebGL 2 enabled browsers
     * or remote [`PoWbox`](https://powbox.devnet.iota.org/).
     *
     * `trunkTransaction` and `branchTransaction` hashes are given by
     * {@link #module_core.getTransactionsToApprove `getTransactionsToApprove`}.
     *
     * **Note:** Persist the transaction trytes in local storage __before__ calling this command, to ensure
     * that reattachment is possible, until your bundle has been included.
     *
     * @example
     *
     * ```js
     * getTransactionsToApprove(depth)
     *   .then(({ trunkTransaction, branchTransaction }) =>
     *     attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)
     *   )
     *   .then(attachedTrytes => {
     *     // ...
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     * ```
     *
     * @method attachToTangle
     *
     * @memberof module:core
     *
     * @param {Hash} trunkTransaction - Trunk transaction as returned by
     * [`getTransactionsToApprove`]{@link #module_core.getTransactionsToApprove}
     * @param {Hash} branchTransaction - Branch transaction as returned by
     * [`getTransactionsToApprove`]{@link #module_core.getTransactionsToApprove}
     * @param {number} minWeightMagnitude - Number of minimum trailing zeros in tail transaction hash
     * @param {TransactionTrytes[]} trytes - List of transaction trytes
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {TransactionTrytes[]} Array of transaction trytes with nonce and attachment timestamps
     * @reject {Error}
     * - `INVALID_TRUNK_TRANSACTION`: Invalid `trunkTransaction`
     * - `INVALID_BRANCH_TRANSACTION`: Invalid `branchTransaction`
     * - `INVALID_MIN_WEIGHT_MAGNITUDE`: Invalid `minWeightMagnitude` argument
     * - `INVALID_TRANSACTION_TRYTES`: Invalid transaction trytes
     * - `INVALID_TRANSACTIONS_TO_APPROVE`: Invalid transactions to approve
     * - Fetch error
     */
    return function attachToTangle(
        trunkTransaction: Hash,
        branchTransaction: Hash,
        minWeightMagnitude: number,
        trytes: ReadonlyArray<Trytes>,
        callback?: Callback<ReadonlyArray<Trytes>>
    ): Promise<ReadonlyArray<Trytes>> {
        return Promise.resolve(
            validate(
                [
                    trunkTransaction,
                    t => isTrytesOfExactLength(t, TRANSACTION_HASH_LENGTH / TRYTE_WIDTH),
                    errors.INVALID_TRUNK_TRANSACTION,
                ],
                [
                    branchTransaction,
                    t => isTrytesOfExactLength(t, TRANSACTION_HASH_LENGTH / TRYTE_WIDTH),
                    errors.INVALID_BRANCH_TRANSACTION,
                ],
                [
                    minWeightMagnitude,
                    mwm => Number.isInteger(mwm) && mwm <= TRANSACTION_HASH_LENGTH,
                    errors.INVALID_MIN_WEIGHT_MAGNITUDE,
                ],
                [
                    trytes,
                    arr =>
                        arr.every(
                            (t: Trytes) =>
                                isTrytesOfExactLength(t, TRANSACTION_LENGTH / TRYTE_WIDTH) &&
                                isTransaction(trytesToTrits(t))
                        ),
                    errors.INVALID_TRANSACTION_TRYTES,
                ]
            )
        )
            .then(() =>
                send<AttachToTangleCommand, AttachToTangleResponse>({
                    command: IRICommand.ATTACH_TO_TANGLE,
                    trunkTransaction,
                    branchTransaction,
                    minWeightMagnitude,
                    trytes,
                })
            )
            .then(res => res.trytes)
            .asCallback(typeof arguments[2] === 'function' ? arguments[2] : callback)
    }
}

import { TRYTE_WIDTH } from '@iota/converter'
import { TRANSACTION_HASH_LENGTH } from '@iota/transaction'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { isTrytesOfExactLength, validate } from '../../guards'
import { Callback, GetTrytesCommand, GetTrytesResponse, Hash, IRICommand, Provider, Trytes } from '../../types'

/**
 * @method createGetTrytes
 *
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider
 *
 * @return {function} {@link #module_core.getTrytes `getTrytes`}
 */
export const createGetTrytes = ({ send }: Provider) =>
    /**
     * Fetches the transaction trytes given a list of transaction hashes, by calling
     * [`getTrytes`](https://docs.iota.works/iri/api#endpoints/getTrytes) command.
     *
     * @example
     * ```js
     * getTrytes(hashes)
     *   // Parsing as transaction objects
     *   .then(trytes => asTransactionObjects(hashes)(trytes))
     *   .then(transactions => {
     *     // ...
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     * ```
     *
     * @method getTrytes
     *
     * @memberof module:core
     *
     * @param {Array<Hash>} hashes - List of transaction hashes
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {Trytes[]} - Transaction trytes
     * @reject Error{}
     * - `INVALID_TRANSACTION_HASH`: Invalid hash
     * - Fetch error
     */
    function getTrytes(
        hashes: ReadonlyArray<Hash>,
        callback?: Callback<ReadonlyArray<Trytes>>
    ): Promise<ReadonlyArray<Trytes>> {
        return Promise.resolve(
            validate([
                hashes,
                arr => arr.every((h: Hash) => isTrytesOfExactLength(h, TRANSACTION_HASH_LENGTH / TRYTE_WIDTH)),
                errors.INVALID_TRANSACTION_HASH,
            ])
        )
            .then(() =>
                send<GetTrytesCommand, GetTrytesResponse>({
                    command: IRICommand.GET_TRYTES,
                    hashes,
                })
            )
            .then(({ trytes }) => trytes)
            .asCallback(callback)
    }

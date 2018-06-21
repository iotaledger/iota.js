import * as Promise from 'bluebird'
import { hashArrayValidator, validate } from '@iota/validators'
import {
    Callback,
    GetTrytesCommand,
    GetTrytesResponse,
    Hash,
    IRICommand,
    Provider,
    Trytes
} from '../../types'

/**
 * @method createGetTrytes 
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {function} {@link getTrytes}
 */
export const createGetTrytes = ({ send }: Provider) =>

    /**
     * Fetches the transaction trytes given a list of transaction hashes, by calling
     * [`getTrytes`]{@link https://docs.iota.works/iri/api#endpoints/getTrytes} command.
     *  
     * ### Example
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
     *
     * @method getTrytes 
     *
     * @param {Array<Hash>} hashes - List of transaction hashes
     * @param {Callback} [callback] - Optional callback
     * 
     * @return {Promise}
     * @fulfil {Trytes[]} - Transaction trytes
     * @reject Error{}
     * - `INVALID_HASH_ARRAY`: Invalid array of hashes
     * - Fetch error
     */
    function getTrytes(
        hashes: ReadonlyArray<Hash>,
        callback?: Callback<ReadonlyArray<Trytes>>
    ): Promise<ReadonlyArray<Trytes>> {
        return Promise.resolve(validate(hashArrayValidator(hashes)))
            .then(() => send<GetTrytesCommand, GetTrytesResponse>({
                command: IRICommand.GET_TRYTES,
                hashes,
            }))
            .then(({ trytes }) => trytes)
            .asCallback(callback)
    }

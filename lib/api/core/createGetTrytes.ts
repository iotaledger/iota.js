import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, Hash, IRICommand, Provider } from '../types'

export interface GetTrytesCommand extends BaseCommand {
    command: IRICommand.GET_TRYTES
    hashes: string[]
}

export interface GetTrytesResponse {
    trytes: string[]
}

export const validateGetTrytes = (hashes: Hash[]) => validate(hashArrayValidator(hashes))

/**
 * @method createGetTrytes 
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {function} {@link getTrytes}
 */
export const createGetTrytes = (provider: Provider) =>

    /**
     * Fetches the transaction trytes given a list of transaction hashes, by calling
     * [`getTrytes`]{@link https://docs.iota.works/iri/api#endpoints/getTrytes} command.
     *  
     * @example
     * import { iota } from '@iota/core'
     * import { asTransactionObjects } from '@iota/utils'
     *
     * const { getTrytes } = iota({ provider })
     *
     * getTrytes(hashes)
     *    // Parsing as transaction objects
     *    .then(trytes => asTransactionObjects(hashes)(trytes))
     *    .then(transactions => {
     *        // ...
     *    })
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
    (hashes: string[], callback?: Callback<string[]>): Promise<string[]> =>
        Promise.resolve(validateGetTrytes(hashes))
            .then(() =>
                provider.sendCommand<GetTrytesCommand, GetTrytesResponse>({
                    command: IRICommand.GET_TRYTES,
                    hashes,
                })
            )
            .then(res => res.trytes)
            .asCallback(callback)

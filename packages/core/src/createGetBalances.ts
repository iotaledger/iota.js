import { removeChecksum } from '@iota/checksum'
import { TRYTE_WIDTH } from '@iota/converter'
import { TRANSACTION_HASH_LENGTH } from '@iota/transaction'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { isHash, isTrytesOfExactLength, validate } from '../../guards'
import { Balances, Callback, GetBalancesCommand, GetBalancesResponse, Hash, IRICommand, Provider } from '../../types'

/**
 * @method createGetBalances
 *
 * @summary Creates a new `getBalances()` method, using a custom Provider instance.
 *
 * @memberof module:core
 *
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getBalances`]{@link #module_core.getBalances}  - A new `getBalances()` function that uses your chosen Provider instance.
 */
export const createGetBalances = ({ send }: Provider) =>
    /**
     * This method uses the connected IRI node's [`getBalances`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#getbalances) endpoint.
     *
     * Any pending output transactions are not included in the balance.
     * For example, if a pending output transaction deposits 10 Mi into an address that contains 50 Mi, this method will return a balance of 50 Mi not 60 Mi.
     *
     * ## Related methods
     *
     * To find the balance of all addresses that belong to your seed, use the [`getAccountData()`]{@link #module_core.getAccountData} method.
     *
     * @method getBalances
     *
     * @summary Gets the confirmed balances of the given addresses.
     *
     * @memberof module:core
     *
     * @param {Hash[]} addresses - Array of addresses
     * @param {Hash[]} [tips] - Array of past transaction hashes from which to calculate the balances of the addresses. The balance will be calculated from the latest milestone that references these transactions.
     * @param {Callback} [callback] - Optional callback function
     *
     * @example
     * ```js
     * getBalances([address])
     *   .then( balances => {
     *     console.log(`Balance of the first address: `$balances.balances[0])
     *     console.log(JSON.stringify(transactions));
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     * }
     * ```
     *
     * @return {Promise}
     *
     * @fulfil {Balances} balances - Object that contains the following:
     * - balances.addresses: Array of balances in the same order as the `addresses` argument
     * - balances.references: Either the transaction hash of the latest milestone, or the transaction hashes that were passed to the `tips` argument
     * - balances.milestoneIndex: The latest milestone index that confirmed the balance
     * - balances.duration: The number of milliseconds that it took for the node to return a response
     *
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_HASH`: Make sure that the addresses contain only trytes
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors)
     */
    (addresses: ReadonlyArray<Hash>, tips?: ReadonlyArray<Hash>, callback?: Callback<Balances>): Promise<Balances> => {
        // If no tips are provided, switch arguments
        if (tips && typeof tips === 'function') {
            callback = tips
            tips = []
        }

        return Promise.resolve(
            validate(
                [addresses, (arr: Hash[]) => arr.every(isHash), errors.INVALID_ADDRESS],
                !!tips && [
                    tips,
                    (arr: Hash[]) => arr.every(h => isTrytesOfExactLength(h, TRANSACTION_HASH_LENGTH / TRYTE_WIDTH)),
                    errors.INVALID_TRANSACTION_HASH,
                ]
            )
        )
            .then(() =>
                send<GetBalancesCommand, GetBalancesResponse>({
                    command: IRICommand.GET_BALANCES,
                    addresses: addresses.map(removeChecksum), // Addresses passed to IRI should not have the checksum
                    ...(Array.isArray(tips) && tips.length && { tips }),
                })
            )
            .then(res => ({
                ...res,
                balances: res.balances.map(balance => parseInt(balance, 10)),
            }))
            .asCallback(callback)
    }

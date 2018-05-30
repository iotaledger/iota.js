import * as Promise from 'bluebird'
import { BaseCommand, Callback, Hash, IRICommand, Provider } from './types'

export interface GetTipsCommand extends BaseCommand {
    command: IRICommand.GET_TIPS
}

export interface GetTipsResponse {
    hashes: string[]
    duration: number
}

/**  
 * @method createGetTips 
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {function} {@link getTips}
 */
export const createGetTips = ({ send }: Provider) =>

    /**
     * Returns a list of tips (transactions not referenced by other transactions),
     * as seen by the connected node.
     * 
     * @method getTips
     *
     * @param {Callback} [callback] - Optional callback
     * 
     * @return {Promise} 
     * @fulfil {Hash[]} List of tip hashess
     * @reject {Error}
     * - Fetch error
     */
    (callback?: Callback<Hash[]>): Promise<Hash[]> =>
        send<GetTipsCommand, GetTipsResponse>({ command: IRICommand.GET_TIPS })
            .then(({ hashes }) => hashes)
            .asCallback(callback)
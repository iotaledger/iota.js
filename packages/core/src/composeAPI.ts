import * as Bluebird from 'bluebird'
import { createHttpClient, HttpClientSettings } from '@iota/http-client'
import {
    createAddNeighbors,
    createAttachToTangle,
    createBroadcastTransactions,
    createCheckConsistency,
    createFindTransactions,
    createGetBalances,
    createGetInclusionStates,
    createGetNeighbors,
    createGetNodeInfo,
    createGetTips,
    createGetTransactionsToApprove,
    createGetTrytes,
    createInterruptAttachingToTangle,
    createRemoveNeighbors,
    createStoreTransactions,
    // createWereAddressesSpentFrom,
    createBroadcastBundle,
    createFindTransactionObjects,
    createGetAccountData,
    createGetBundle,
    createGetInputs,
    createGetLatestInclusion,
    createGetNewAddress,
    createGetTransactionObjects,
    createIsPromotable,
    createIsReattachable,
    createPrepareTransfers,
    createPromoteTransaction,
    createReplayBundle,
    // createSendTransfer,
    createSendTrytes,
    createStoreAndBroadcast,
    createTraverseBundle,
    // Types
    AccountData,
    Balances,
    CheckConsistencyOptions,
    FindTransactionsQuery,
    GetAccountDataOptions,
    GetInputsOptions,
    GetNewAddressOptions,
    GetNodeInfoResponse,
    PrepareTransfersOptions,
    PromoteTransactionOptions,
    TransactionsToApprove,
} from './'
import { createGetTransfers, GetTransfersOptions } from './createGetTransfers'
import { createGetBundlesFromAddresses } from './createGetBundlesFromAddresses'
import {
    AttachToTangle,
    Provider,
    BaseCommand,
    Inputs,
    Neighbor,
    Transaction,
    Transfer,
    CreateProvider,
} from '../../types'

export interface Settings extends HttpClientSettings {
    readonly attachToTangle?: AttachToTangle
}

export type Func<T> = (...args: any[]) => T

export function returnType<T>(func: Func<T>) {
    return {} as T // tslint:disable-line no-object-literal-type-assertion
}

/**
 * Composes API object from it's components
 *
 * @method composeApi
 *
 * @memberof module:core
 *
 * @param {object | Function} [settings={} | provider] - Connection settings or `provider` factory
 * @param {string} [settings.provider=http://localhost:14265] Uri of IRI node
 * @param {function} [settings.attachToTangle] - Function to override
 * [`attachToTangle`]{@link #module_core.attachToTangle} with
 * @param {string | number} [settings.apiVersion=1] - IOTA Api version to be sent as `X-IOTA-API-Version` header.
 * @param {number} [settings.requestBatchSize=1000] - Number of search values per request.
 *
 * @return {API}
 */
export const composeAPI = (input: Partial<Settings> | CreateProvider = {}) => {
    const isFn = typeof input === 'function'
    const settings: Partial<Settings> = isFn ? {} : <Partial<Settings>>input
    const provider: Provider = isFn ? (input as CreateProvider)() : createHttpClient(settings)

    let attachToTangle: AttachToTangle = settings.attachToTangle || createAttachToTangle(provider)

    /**
     * Defines network provider configuration and [`attachToTangle`]{@link #module_core.attachToTangle} method.
     *
     * @method setSettings
     *
     * @memberof API
     *
     * @param {object} settings - Provider settings object
     * @param {string} [settings.provider] - Http `uri` of IRI node
     * @param {function} [settings.attachToTangle] - Function to override
     * [`attachToTangle`]{@link #module_core.attachToTangle} with
     */
    function setSettings(newSettings: Partial<Settings> = {}) {
        provider.setSettings(newSettings)

        if (newSettings.attachToTangle) {
            attachToTangle = newSettings.attachToTangle
        }
    }

    /**
     * Overides default [`attachToTangle`]{@link #module_core.attachToTangle} with a local equivalent or
     * [`PoWBox`](https://powbox.devnet.iota.org/)
     *
     * @method overrideAttachToTangle
     *
     * @memberof API
     *
     * @param {function} attachToTangle - Function to override
     * [`attachToTangle`]{@link #module_core.attachToTangle} with
     */
    function overrideAttachToTangle(attachFn: AttachToTangle) {
        attachToTangle = attachFn
    }

    /** @namespace API */
    const api = {
        // IRI commands
        addNeighbors: createAddNeighbors(provider),
        attachToTangle,
        broadcastTransactions: createBroadcastTransactions(provider),
        checkConsistency: createCheckConsistency(provider),
        findTransactions: createFindTransactions(provider),
        getBalances: createGetBalances(provider),
        getInclusionStates: createGetInclusionStates(provider),
        getNeighbors: createGetNeighbors(provider),
        getNodeInfo: createGetNodeInfo(provider),
        getTips: createGetTips(provider),
        getTransactionsToApprove: createGetTransactionsToApprove(provider),
        getTrytes: createGetTrytes(provider),
        interruptAttachingToTangle: createInterruptAttachingToTangle(provider),
        removeNeighbors: createRemoveNeighbors(provider),
        storeTransactions: createStoreTransactions(provider),
        // wereAddressesSpentFrom: createWereAddressesSpentFrom(provider),
        sendCommand: provider.send,

        // Wrapper methods
        broadcastBundle: createBroadcastBundle(provider),
        getAccountData: createGetAccountData(provider),
        getBundle: createGetBundle(provider),
        getBundlesFromAddresses: createGetBundlesFromAddresses(provider),
        getLatestInclusion: createGetLatestInclusion(provider),
        getNewAddress: createGetNewAddress(provider),
        getTransactionObjects: createGetTransactionObjects(provider),
        findTransactionObjects: createFindTransactionObjects(provider),
        getInputs: createGetInputs(provider),
        getTransfers: createGetTransfers(provider), // Deprecated
        isPromotable: createIsPromotable(provider),
        isReattachable: createIsReattachable(provider), // Deprecated
        prepareTransfers: createPrepareTransfers(provider),
        promoteTransaction: createPromoteTransaction(provider, attachToTangle),
        replayBundle: createReplayBundle(provider, attachToTangle),
        // sendTransfer: createSendTransfer(provider, attachToTangle),
        sendTrytes: createSendTrytes(provider, attachToTangle),
        storeAndBroadcast: createStoreAndBroadcast(provider),
        traverseBundle: createTraverseBundle(provider),
        setSettings,
        overrideAttachToTangle,
    }

    return isFn
        ? (settings: Partial<Settings>) => {
              setSettings(settings)
              return api
          }
        : api
}

export const apiType = returnType(composeAPI)

export type API = typeof apiType

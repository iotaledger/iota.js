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
    FindTransactionsQuery,
    GetAccountDataOptions,
    GetInputsOptions,
    GetNewAddressOptions,
    GetNodeInfoResponse,
    PrepareTransfersOptions,
    PromoteTransactionOptions,
    TransactionsToApprove
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
    Transfer
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
 * @param {object} [settings={}] - Connection settings
 * @param {string} [settings.provider=http://localhost:14265] Uri of IRI node
 * @param {string | number} [apiVersion=1] - IOTA Api version to be sent as `X-IOTA-API-Version` header. 
 * @param {number} [requestBatchSize=1000] - Number of search values per request.
 * 
 * @return {API}
 */
export const composeAPI = (settings: Partial<Settings> = {}) => {
    const _provider: Provider = createHttpClient(settings) // tslint:disable-line variable-name
    let _attachFn = settings.attachToTangle || createAttachToTangle(_provider) // tslint:disable-line variable-name

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
        _provider.setSettings(newSettings)

        if (newSettings.attachToTangle) {
            _attachFn = newSettings.attachToTangle
        }
    }

    /**
     * Overides default [`attachToTangle`]{@link #module_core.attachToTangle} with a local equivalent or
     * [`PoWBox`](https://powbox.testnet.iota.org/)
     *
     * @method overrideAttachToTangle
     * 
     * @memberof API
     * 
     * @param {function} attachToTangle - Function to override
     * [`attachToTangle`]{@link #module_core.attachToTangle} with
     */
    function overrideAttachToTangle(attachFn: AttachToTangle) {
        _attachFn = attachFn
    }

    /** @namespace API */
    return {
        // IRI commands
        addNeighbors: createAddNeighbors(_provider),
        attachToTangle: _attachFn,
        broadcastTransactions: createBroadcastTransactions(_provider),
        checkConsistency: createCheckConsistency(_provider),
        findTransactions: createFindTransactions(_provider),
        getBalances: createGetBalances(_provider),
        getInclusionStates: createGetInclusionStates(_provider),
        getNeighbors: createGetNeighbors(_provider),
        getNodeInfo: createGetNodeInfo(_provider),
        getTips: createGetTips(_provider),
        getTransactionsToApprove: createGetTransactionsToApprove(_provider),
        getTrytes: createGetTrytes(_provider),
        interruptAttachingToTangle: createInterruptAttachingToTangle(_provider),
        removeNeighbors: createRemoveNeighbors(_provider),
        storeTransactions: createStoreTransactions(_provider),
        // wereAddressesSpentFrom: createWereAddressesSpentFrom(_provider),
        sendCommand: _provider.send,

        // Wrapper methods
        broadcastBundle: createBroadcastBundle(_provider),
        getAccountData: createGetAccountData(_provider),
        getBundle: createGetBundle(_provider),
        getBundlesFromAddresses: createGetBundlesFromAddresses(_provider),
        getLatestInclusion: createGetLatestInclusion(_provider),
        getNewAddress: createGetNewAddress(_provider),
        getTransactionObjects: createGetTransactionObjects(_provider),
        findTransactionObjects: createFindTransactionObjects(_provider),
        getInputs: createGetInputs(_provider),
        getTransfers: createGetTransfers(_provider), // Deprecated
        isPromotable: createIsPromotable(_provider),
        isReattachable: createIsReattachable(_provider), // Deprecated
        prepareTransfers: createPrepareTransfers(_provider),
        promoteTransaction: createPromoteTransaction(_provider, _attachFn),
        replayBundle: createReplayBundle(_provider, _attachFn),
        // sendTransfer: createSendTransfer(_provider, _attachFn),
        sendTrytes: createSendTrytes(_provider, _attachFn),
        storeAndBroadcast: createStoreAndBroadcast(_provider),
        traverseBundle: createTraverseBundle(_provider),
        setSettings,
        overrideAttachToTangle
    }
}

export const apiType = returnType(composeAPI)

export type API = typeof apiType
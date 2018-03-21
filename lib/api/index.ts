import * as Bluebird from 'bluebird'

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
    createWereAddressesSpentFrom,
    FindTransactionsQuery,
    GetBalancesResponse,
    GetNodeInfoResponse,
    GetTransactionsToApproveResponse,
    validateAttachToTangle,
} from './core'

import {
    AccountData,
    createBroadcastBundle,
    createFindTransactionObjects,
    createGetAccountData,
    createGetBundle,
    createGetBundlesFromAddresses,
    createGetInputs,
    createGetLatestInclusion,
    createGetNewAddress,
    createGetTransactionObjects,
    createGetTransfers,
    createIsPromotable,
    createIsReattachable,
    createPrepareTransfers,
    createPromoteTransaction,
    createReplayBundle,
    createSendTransfer,
    createSendTrytes,
    createStoreAndBroadcast,
    createTraverseBundle,
    GetAccountDataOptions,
    GetInputsOptions,
    GetNewAddressOptions,
    GetTransfersOptions,
    PrepareTransfersOptions,
    PromoteTransactionOptions,
    SendTransferOptions,
    SendTrytesOptions
} from './extended'

import { validateSettings } from './settings'

import { provider } from '../utils'

import { AttachToTangle, BaseCommand, Inputs, Neighbor, Provider, Settings, Transaction, Transfer } from './types'

export type Func<T> = ([...args]: any) => T

export function returnType<T>(func: Func<T>) {
    return {} as T // tslint:disable-line no-object-literal-type-assertion
}

/**
 * Composes API object from it's components
 *
 * @method composeApi
 * @param {object} [settings] - connection settings
 **/
export const composeApi = (settings: Partial<Settings> = {}) => {
    const _settings: Settings = validateSettings(settings) // tslint:disable-line variable-name
    const _provider: Provider = provider(_settings) // tslint:disable-line variable-name
    let _attachFn = settings.attachToTangle || createAttachToTangle(_provider) // tslint:disable-line variable-name

    const api = {
        // core
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
        wereAddressesSpentFrom: createWereAddressesSpentFrom(_provider),
        sendCommand: _provider.sendCommand,

        // extended
        broadcastBundle: createBroadcastBundle(_provider),
        createGetAccountData: createGetAccountData(_provider),
        createGetBundle: createGetBundle(_provider),
        createGetBundlesFromAddresses: createGetBundlesFromAddresses(_provider),
        createGetLatestInclusion: createGetLatestInclusion(_provider),
        createGetNewAddress: createGetNewAddress(_provider),
        createGetTransactionObjects: createGetTransactionObjects(_provider),
        findTransactionObjects: createFindTransactionObjects(_provider),
        getInputs: createGetInputs(_provider),
        getTransfers: createGetTransfers(_provider),
        isPromotable: createIsPromotable(_provider),
        isReattachable: createIsReattachable(_provider),
        prepareTransfers: createPrepareTransfers(_provider),
        promoteTransaction: createPromoteTransaction(_provider, _attachFn),
        replayBundle: createReplayBundle(_provider, _attachFn),
        sendTransfer: createSendTransfer(_provider, _attachFn),
        sendTrytes: createSendTrytes(_provider, _attachFn),
        storeAndBroadcast: createStoreAndBroadcast(_provider),
        traverseBundle: createTraverseBundle(_provider),

        // settings
        setSettings: (newSettings: Partial<Settings> = {}) => {
            Object.assign(_settings, validateSettings(newSettings))
        },

        overrideAttachToTangle: (attachFn: AttachToTangle) => {
            _attachFn = attachFn
        },
    }

    return api
}

export const apiType = returnType(composeApi)

export type Api = typeof apiType

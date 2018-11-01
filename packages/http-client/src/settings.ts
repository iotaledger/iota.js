import { getOptionsWithDefaults } from '../../types'
export interface Settings {
    readonly provider: string
    readonly host?: string // deprecated
    readonly port?: number | string // deprecated
    readonly sandbox?: string // removed
    readonly token?: string // removed
    readonly requestBatchSize: number
    readonly apiVersion: number | string
}

export const DEFAULT_PORT = 14265
export const DEFAULT_HOST = 'http://localhost'
export const DEFAULT_URI = `${DEFAULT_HOST}:${DEFAULT_PORT}`
export const MAX_REQUEST_BATCH_SIZE = 1000
export const API_VERSION = 1

const defaults: Settings = {
    provider: DEFAULT_URI,
    requestBatchSize: MAX_REQUEST_BATCH_SIZE,
    apiVersion: API_VERSION,
}

/* tslint:disable no-console */
export const getSettingsWithDefaults = (settings: Partial<Settings> = {}): Settings => {
    const { provider, host, port, sandbox, token, requestBatchSize, apiVersion } = getOptionsWithDefaults(defaults)(
        settings
    )

    let providerUri: string = provider

    if (sandbox || token) {
        throw new Error(
            'Sandbox has been removed in favor of a more generic remote curl machine, a.k.a. powbox. See NPM package @iota/curl-remote for details.'
        )
    }

    // Check for deprecated settings
    if (host || port) {
        console.warn(
            'Setting `host` and `port` is deprecated and will be removed in next version. Please use the `provider` option instead.'
        )

        providerUri = [host || DEFAULT_HOST, port || DEFAULT_PORT].join('/').replace('//', '/')
    }

    if (settings.hasOwnProperty('requestBatchSize')) {
        if (!Number.isInteger(requestBatchSize) || requestBatchSize <= 0) {
            throw new Error('Invalid `requestBatchSize` option')
        }
        if (requestBatchSize > MAX_REQUEST_BATCH_SIZE) {
            throw new Error('`requestBatchSize` should not exceed max value of' + MAX_REQUEST_BATCH_SIZE)
        }
    }

    return { provider: providerUri, requestBatchSize, apiVersion }
}

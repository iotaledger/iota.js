import errors from '../errors'
import { isUri } from '../utils'

import * as core from './core'
import * as extended from './extended'

import { API, BaseCommand, Callback, Settings } from './types'

/**
 * Default network configuration
 */
export const defaultSettings: Settings = {
    host: 'http://localhost', // deprecate
    port: 14265, // deprecate
    provider: 'http://localhost:14265',
    sandbox: false, // deprecate
    token: undefined, // r/ w/ sandboxToken ?
}

/**
 * Composes API object from it's components
 * 
 * @method composeApi
 * @param {object} [settings] - connection settings
 * @param {object} [...extensions] - components extending base API
 **/
export function composeApi (this: API, settings: Settings = defaultSettings, ...extensions: object[]): API {
    const props: {[key: string]: any} = {
        settings: defaultSettings,
    }
    
    const invalidArgs = extensions.filter(ext => typeof ext !== 'object')
    
    if (invalidArgs.length) {
        throw new Error(
            `Illegal composition arguments: ${invalidArgs.map(a => typeof a).join(', ')}. \n
            Expected object(s).`
        )
    }

    return Object.assign(this, {
        ...core,
        ...extended,
        ...extensions,

        getSettings(): Settings {
            return props.settings
        },

        setSettings(this: API, { provider, host, port, sandbox, token }: Settings) {
            if (host) {
                host = host.replace(/\/$/, '')
            }

            provider = provider || `${host || defaultSettings.host}:${port || defaultSettings.port}`

            if (!isUri(provider)) {
                throw errors.INVALID_URI
            }

            props.settings.provider = provider

            if (settings.sandbox && settings.token) {
                props.settings.sandbox = true
                props.settings.token = settings.token
            }

            return this
        },
    }).setSettings(settings)
}

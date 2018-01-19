import errors from '../errors/inputErrors'
import inputValidator from '../utils/inputValidator'
import * as core from './core'
import * as extended from './extended'

export interface API extends BaseAPI {}

export interface BaseAPI {
  getSettings: () => Settings,
  setSettings: (settings: Settings) => API
  /// ...
}

export interface Settings {
    host?: string // deprecate
    port?: number // deprecate
    provider?: string
    sandbox?: boolean
    token?: string
}

interface Properties {
  settings: Settings
}

export const defaultSettings = {
    host: 'http://localhost', // deprecate
    port: 14265, // deprecate
    provider: 'http://localhost:14265',
    sandbox: false, // deprecate
    token: undefined // r/ w/ sandboxToken ?
}

/**
 * Composes API object from it's components
 **/
export function composeApi (this: API, settings: Settings = defaultSettings, extensions: object[]): API {
    const props: Properties = {
        settings: defaultSettings 
    }
    
    const invalidArgs = extensions.filter(ext => typeof ext !== 'object')
    if (invalidArgs.length) {
        throw new Error(`
          Illegal composition arguments: ${ invalidArgs.map(a => typeof a).join(', ') }. \n
          Expected object(s).
        `)
    }

    return Object.assign(this, {
        ...core,
        ...extended,
        ...extensions,

        getSettings (): Settings {
            return props.settings
        },

        setSettings ({ provider, host, port, sandbox, token }: Settings): API {
            if (host) {
                host = host.replace(/\/$/, '')
            }
            
            provider = provider || (`${ host || defaultSettings.host }:${ port || defaultSettings.port }`)

            if (!inputValidator.isUri(provider)) {
                throw errors.INVALID_URI
            }

            props.settings.provider = provider

            if (settings.sandbox && settings.token) {
                props.settings.sandbox = true
                props.settings.token = settings.token
            }

            return this
        }
    }).setSettings(settings)
}

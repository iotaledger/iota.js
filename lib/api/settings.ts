/* tslint:disable no-console */
import { defaultAttachFn } from './core'
import { AttachToTangle, Settings } from './types'

const defaultProvider = 'http://localhost:14265'

export const validateSettings = (settings: Partial<Settings> = {}): Settings => {
    let provider: string = defaultProvider

    if (settings.sandbox || settings.token) {
        console.warn(
            'Sandbox has been removed in favor of a more generic remote curl machine, a.k.a. powbox. See NPM package @iota/curl-remote for details.'
        )
    }

    // Check for deprecated settings
    if (settings.host) {
        console.warn(
            'Setting `host` and `port` is deprecated, please use the `provider` option instead. This option will be removed in the next version.'
        )

        const host = settings.host || 'http://localhost'
        const port = settings.port || '14265'

        provider = [host, port].join('/').replace('//', '/')
    }

    if (settings.provider) {
        provider = settings.provider
    }

    const curl = settings.attachToTangle || defaultAttachFn(provider)

    return { attachToTangle, provider }
}

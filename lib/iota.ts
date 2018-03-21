import { composeApi } from './api'
import { Settings } from './api/types'
import * as errors from './errors'
import multisig from './multisig/multisig'

//  * Depreactions are aimed for v1.0.0

interface IOTA {
    api: object // deprecate api namespace
    utils: object // deprecate
    valid: object // deprecate
    multisig: object // deprecate & grab it with composition
    version: string // deprecate
}

const IOTA = (settings: Settings, ...extensions: object[]): IOTA => {
    const api = composeApi.call(composeApi, settings, ...extensions)

    return {
        ...api,
        api, // deprecate
        multisig: multisig.bind(api), // deprecate
        version: '0.5.0', // deprecate
    }
}

export default IOTA

export { errors }

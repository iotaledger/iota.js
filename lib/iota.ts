import { API, composeApi, Settings } from './api'
import errors from './errors/inputErrors'
import multisig from './multisig/multisig'
import { default as valid } from './utils/inputValidator'
import utils from './utils/utils'

//
//  *Depreactions are aimed for v1.0.0

interface IOTA extends API {
    api: object // deprecate api namespace
    utils: object
    valid: object
    multisig: object // deprecate & grab it with composition
    version: string // deprecate
    // TODO: add rest of methods
}

function IOTA (settings: Settings, ...extensions: object[]):IOTA {
    const api = composeApi(settings, extensions)

    return {
        ...api,
        api, // deprecate
        utils,
        valid,
        multisig: multisig.bind(api), // deprecate
        version: '0.5.0', // deprecate
    }
}

export { IOTA as default, utils, valid, errors }


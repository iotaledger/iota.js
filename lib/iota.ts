import API from './api/API'
import Multisig from './multisig/multisig'
import { default as valid } from './utils/inputValidator'
import Request from './utils/makeRequest'
import utils from './utils/utils'

export interface Settings {
    host: string
    port: number
    provider: string
    sandbox: boolean
    token: string | null
}

const defaultSettings = {
    host: 'http://localhost',
    port: 14265,
    provider: 'http://localhost:14265',
    sandbox: false,
    token: null,
}

export default class IOTA {
    public API?: API
    public multisig?: Multisig
    public utils = utils
    public valid = valid

    private version: string = '0.4.6'
    private host: string = 'http://localhost'
    private port: number = 14265
    private provider: string = 'http://localhost:14265'
    private sandbox: boolean | string = false
    private token: string | null = null

    private makeRequest?: Request

    constructor(settings: Partial<Settings>) {
        this.setSettings(settings)
    }

    /**
     *   Reset the libraries settings and internal objects
     *
     *   @method setSettings
     *   @param {Object} settings
     **/
    public setSettings(settings: Partial<Settings>) {
        this.host = settings.host || 'http://localhost'
        this.port = settings.port || 14265
        this.provider = settings.provider || this.host.replace(/\/$/, '') + ':' + this.port
        this.sandbox = settings.sandbox || false
        this.token = settings.token || null

        if (this.sandbox) {
            // remove backslash character
            this.sandbox = this.provider.replace(/\/$/, '')
            this.provider = this.sandbox + '/commands'
        }

        this.makeRequest = new Request(this.provider, this.token)
        this.API = new API(this.makeRequest!, this.sandbox)
        // this.mam
        // this.flash
        this.multisig = new Multisig(this.makeRequest!)
    }

    /**
     *   Change the Node the user connects to
     *
     *   @method changeNode
     *   @param {Object} settings
     **/
    public changeNode(settings: Settings) {
        this.setSettings(settings)
    }
}

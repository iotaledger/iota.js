import * as async from 'async'
import { Bundle, Converter, HMAC, Signing } from '../crypto'
import errors from '../errors/inputErrors'
import inputValidator from '../utils/inputValidator'
import Request from '../utils/makeRequest'
import Utils from '../utils/utils'

import * as apiCommands from './apiCommands'
import { BaseCommand, BatchableCommand, Callback, FindTransactionsSearchValues, IRICommand } from './types'

/**
 *  Making API requests, including generalized wrapper functions
 **/
export default class BaseAPI {
    public sandbox: boolean
    protected provider: Request

    constructor(provider: Request, isSandbox: boolean) {
        this.provider = provider
        this.sandbox = isSandbox
    }
}

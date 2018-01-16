import * as async from 'async'
import { Bundle, Converter, HMAC, Signing } from '../crypto'
import { TritArray } from '../crypto/types'
import errors from '../errors/inputErrors'
import inputValidator from '../utils/inputValidator'
import Request from '../utils/makeRequest'
import { Input, Transaction, Transfer } from '../utils/types'
import Utils from '../utils/utils'

import * as apiCommands from './apiCommands'
import BaseAPI from './BaseAPI'
import { BaseCommand, BatchableCommand, Callback, FindTransactionsSearchValues, IRICommand } from './types'

interface PrepareTransferOptions {
    inputs?: Input[]
    address?: string
    security?: number
    hmacKey?: string
}

interface PromoteTransactionOptions {
    delay?: number
    interrupt?: boolean | (() => void)
}

interface GetAccountDataOptions {
    start?: number
    security?: number
    end?: number
}

interface GetTransfersOptions extends GetAccountDataOptions {
    inclusionStates?: boolean
}

interface GetNewAddressOptions {
    index?: number
    checksum?: boolean
    total?: number | null
    security?: number
    returnAll?: boolean
}

interface GetInputsOptions {
    start?: number
    end?: number
    threshold?: number
    security?: number
}

const nullHashTrytes = new Array(244).join('9')

/*************************************

     WRAPPER AND CUSTOM  FUNCTIONS

**************************************/
export default class API extends BaseAPI {
    /**
     *   Wrapper function for getTrytes and transactionObjects
     *   gets the trytes and transaction object from a list of transaction hashes
     *
     *   @method getTransactionsObjects
     *   @param {array} hashes
     *   @returns {function} callback
     *   @returns {object} success
     **/
    public getTransactionsObjects(hashes: string[], callback: Callback) {
        // If not array of hashes, return error
        if (!inputValidator.isArrayOfHashes(hashes)) {
            return callback(errors.invalidInputs())
        }

        // get the trytes of the transaction hashes
        this.getTrytes(hashes, (error, trytes) => {
            if (error) {
                return callback(error)
            }

            const transactionObjects: Array<Transaction | null> = []

            // call transactionObjects for each trytes
            trytes!.forEach(thisTrytes => {
                // If no trytes returned, simply push null as placeholder
                if (!thisTrytes) {
                    transactionObjects.push(null)
                } else {
                    transactionObjects.push(Utils.transactionObject(thisTrytes))
                }
            })

            return callback(null, transactionObjects)
        })
    }

    /**
     *   Wrapper function for findTransactions, getTrytes and transactionObjects
     *   Returns the transactionObject of a transaction hash. The input can be a valid
     *   findTransactions input
     *
     *   @method getTransactionsObjects
     *   @param {object} input
     *   @returns {function} callback
     *   @returns {object} success
     **/
    public findTransactionObjects(input: FindTransactionsSearchValues, callback: Callback<Transaction[]>) {
        this.findTransactions(input, (error, transactions) => {
            if (error) {
                return callback(error)
            }

            // get the transaction objects of the transactions
            this.getTransactionsObjects(transactions, callback)
        })
    }

    /**
     *   Wrapper function for getNodeInfo and getInclusionStates
     *
     *   @method getLatestInclusion
     *   @param {array} hashes
     *   @returns {function} callback
     *   @returns {object} success
     **/
    public getLatestInclusion(hashes: string[], callback: Callback) {
        this.getNodeInfo((e, nodeInfo) => {
            if (e) {
                return callback(e)
            }

            const latestMilestone = nodeInfo.latestSolidSubtangleMilestone

            return this.getInclusionStates(hashes, Array(latestMilestone), callback)
        })
    }

    /**
     *   Broadcasts and stores transaction trytes
     *
     *   @method storeAndBroadcast
     *   @param {array} trytes
     *   @returns {function} callback
     *   @returns {object} success
     **/
    public storeAndBroadcast(trytes: string[], callback: Callback) {
        this.storeTransactions(trytes, (error, success) => {
            if (error) {
                return callback(error)
            }

            // If no error
            return this.broadcastTransactions(trytes, callback)
        })
    }

    /**
     *   Gets transactions to approve, attaches to Tangle, broadcasts and stores
     *
     *   @method sendTrytes
     *   @param {array} trytes
     *   @param {int} depth
     *   @param {int} minWeightMagnitude
     *   @param {object} options
     *   @param {function} callback
     *   @returns {object} analyzed Transaction objects
     **/
    public sendTrytes(trytes: string[], depth: number, minWeightMagnitude: number, options: any, callback: Callback) {
        // If no options provided, switch arguments
        if (arguments.length === 4 && Object.prototype.toString.call(options) === '[object Function]') {
            callback = options
            options = {}
        }

        // Check if correct depth and minWeightMagnitude
        if (!inputValidator.isValue(depth) || !inputValidator.isValue(minWeightMagnitude)) {
            return callback(errors.invalidInputs())
        }

        // Get branch and trunk
        this.getTransactionsToApprove(depth, options.reference, (error, toApprove) => {
            if (error) {
                return callback(error)
            }

            // attach to tangle - do pow
            this.attachToTangle(
                toApprove.trunkTransaction,
                toApprove.branchTransaction,
                minWeightMagnitude,
                trytes,
                (attachErr, attached) => {
                    if (attachErr) {
                        return callback(attachErr)
                    }

                    // If the user is connected to the sandbox, we have to monitor the POW queue
                    // to check if the POW job was completed
                    if (this.sandbox) {
                        const job = this.sandbox + '/jobs/' + (attached as any).id

                        // Do the Sandbox send function
                        this.provider.sandboxSend(job, 15000, (sendErr, attachedTrytes) => {
                            if (sendErr) {
                                return callback(sendErr)
                            }

                            this.storeAndBroadcast(attachedTrytes!, (storeErr, success) => {
                                if (storeErr) {
                                    return callback(storeErr)
                                }

                                const finalTxs = attachedTrytes!.map(ea => Utils.transactionObject(ea))

                                return callback(null, finalTxs)
                            })
                        })
                    } else {
                        // Broadcast and store tx
                        this.storeAndBroadcast(attached!, (storeErr, success) => {
                            if (storeErr) {
                                return callback(storeErr)
                            }

                            const finalTxs = attached!.map(ea => Utils.transactionObject(ea))

                            return callback(null, finalTxs)
                        })
                    }
                }
            )
        })
    }

    /**
     *   Prepares Transfer, gets transactions to approve
     *   attaches to Tangle, broadcasts and stores
     *
     *   @method sendTransfer
     *   @param {string} seed
     *   @param {int} depth
     *   @param {int} minWeightMagnitude
     *   @param {array} transfers
     *   @param {object} options
     *       @property {array} inputs List of inputs used for funding the transfer
     *       @property {string} address if defined, this address wil be used for sending the remainder value to
     *   @param {function} callback
     *   @returns {object} analyzed Transaction objects
     **/
    public sendTransfer(
        seed: string,
        depth: number,
        minWeightMagnitude: number,
        transfers: Transfer[],
        options: any,
        callback: Callback
    ) {
        // Validity check for number of arguments
        if (arguments.length < 5) {
            return callback(new Error('Invalid number of arguments'))
        }

        // If no options provided, switch arguments
        if (arguments.length === 5 && Object.prototype.toString.call(options) === '[object Function]') {
            callback = options
            options = {}
        }

        // Check if correct depth and minWeightMagnitude
        if (!inputValidator.isValue(depth) || !inputValidator.isValue(minWeightMagnitude)) {
            return callback(errors.invalidInputs())
        }

        this.prepareTransfers(seed, transfers, options, (error, trytes) => {
            if (error) {
                return callback(error)
            }

            this.sendTrytes(trytes, depth, minWeightMagnitude, options, callback)
        })
    }

    /**
     * Promotes a transaction by adding spam on top of it.
     * Will promote {maximum} transfers on top of the current one with {delay} interval.
     *
     * @param {string} tail
     * @param {int} depth
     * @param {int} minWeightMagnitude
     * @param {array} transfer
     * @param {object} params
     * @param callback
     *
     * @returns {array} transaction objects
     */
    public promoteTransaction(
        tail: string,
        depth: number,
        minWeightMagnitude: number,
        transfer: Transfer[],
        params: PromoteTransactionOptions,
        callback: Callback
    ) {
        if (!inputValidator.isHash(tail)) {
            return callback(errors.invalidTrytes())
        }

        this.isPromotable(tail)
            .then(isPromotable => {
                if (!isPromotable) {
                    return callback(errors.inconsistentSubtangle(tail))
                }

                if (params.interrupt === true || (typeof params.interrupt === 'function' && params.interrupt())) {
                    return callback(null, tail)
                }

                this.sendTransfer(
                    transfer[0].address,
                    depth,
                    minWeightMagnitude,
                    transfer,
                    { reference: tail },
                    (err, res) => {
                        if (err == null && params.delay && params.delay > 0) {
                            setTimeout(() => {
                                this.promoteTransaction(tail, depth, minWeightMagnitude, transfer, params, callback)
                            }, params.delay)
                        } else {
                            return callback(err, res)
                        }
                    }
                )
            })
            .catch(err => {
                callback(err)
            })
    }

    /**
     *   Replays a transfer by doing Proof of Work again
     *
     *   @method replayBundle
     *   @param {string} tail
     *   @param {int} depth
     *   @param {int} minWeightMagnitude
     *   @param {function} callback
     *   @returns {object} analyzed Transaction objects
     **/
    public replayBundle(tail: string, depth: number, minWeightMagnitude: number, callback: Callback) {
        // Check if correct tail hash
        if (!inputValidator.isHash(tail)) {
            return callback(errors.invalidTrytes())
        }

        // Check if correct depth and minWeightMagnitude
        if (!inputValidator.isValue(depth) || !inputValidator.isValue(minWeightMagnitude)) {
            return callback(errors.invalidInputs())
        }

        this.getBundle(tail, (error, bundle) => {
            if (error) {
                return callback(error)
            }

            // Get the trytes of all the bundle objects
            const bundleTrytes: string[] = []

            bundle!.forEach(bundleTx => {
                bundleTrytes.push(Utils.transactionTrytes(bundleTx))
            })

            return this.sendTrytes(bundleTrytes.reverse(), depth, minWeightMagnitude, {}, callback)
        })
    }

    /**
     *   Re-Broadcasts a transfer
     *
     *   @method broadcastBundle
     *   @param {string} tail
     *   @param {function} callback
     *   @returns {object} analyzed Transaction objects
     **/
    public broadcastBundle(tail: string, callback: Callback) {
        // Check if correct tail hash
        if (!inputValidator.isHash(tail)) {
            return callback(errors.invalidTrytes())
        }

        this.getBundle(tail, (error, bundle) => {
            if (error) {
                return callback(error)
            }

            // Get the trytes of all the bundle objects
            const bundleTrytes: string[] = []
            bundle!.forEach(bundleTx => {
                bundleTrytes.push(Utils.transactionTrytes(bundleTx))
            })

            return this.broadcastTransactions(bundleTrytes.reverse(), callback)
        })
    }

    /**
     *   Generates a new address either deterministically or index-based
     *
     *   @method getNewAddress
     *   @param {string} seed
     *   @param {object} options
     *       @property   {int} index         Key index to start search from
     *       @property   {bool} checksum     add 9-tryte checksum
     *       @property   {int} total         Total number of addresses to return
     *       @property   {int} security      Security level to be used for the private key / address. Can be 1, 2 or 3
     *       @property   {bool} returnAll    return all searched addresses
     *   @param {function} callback
     *   @returns {string | array} address List of addresses
     **/
    public getNewAddress(seed: string, options: GetNewAddressOptions, callback: Callback) {
        // validate the seed
        if (!inputValidator.isTrytes(seed)) {
            return callback(errors.invalidSeed())
        }

        // default index value
        let index = 0

        if ('index' in options) {
            index = options.index as number

            // validate the index option
            if (!inputValidator.isValue(index) || index < 0) {
                return callback(errors.invalidIndex())
            }
        }

        const checksum = options.checksum || false
        const total = options.total || null

        // If no user defined security, use the standard value of 2
        let security = 2

        if ('security' in options) {
            security = options.security as number

            // validate the security option
            if (!inputValidator.isValue(security) || security < 1 || security > 3) {
                return callback(errors.invalidSecurity())
            }
        }

        const allAddresses: string[] = []

        // Case 1: total
        //
        // If total number of addresses to generate is supplied, simply generate
        // and return the list of all addresses
        if (total) {
            // Increase index with each iteration
            for (let i = 0; i < total; i++, index++) {
                const address = this._newAddress(seed, index, security, checksum)
                allAddresses.push(address)
            }

            return callback(null, allAddresses)
        } else {
            //  Case 2: no total provided
            //
            //  Continue calling findTransactions to see if address was already created
            //  if null, return list of addresses
            //
            async.doWhilst(
                cb => {
                    // Iteratee function

                    const newAddress = this._newAddress(seed, index, security, checksum)

                    this.findTransactions({ addresses: Array(newAddress) }, (error, transactions) => {
                        if (error) {
                            return cb(error)
                        }
                        cb(void 0, newAddress, transactions)
                    })
                },
                (address, transactions) => {
                    // Test function with validity check

                    if (options.returnAll) {
                        allAddresses.push(address as string)
                    }

                    // Increase the index
                    index += 1

                    // Validity check
                    return (transactions as any).length > 0
                },
                (err: any, address: any) => {
                    // Final callback

                    if (err) {
                        return callback(err)
                    } else {
                        // If returnAll, return list of allAddresses
                        // else return the last address that was generated
                        const addressToReturn = options.returnAll ? allAddresses : address

                        return callback(null, addressToReturn)
                    }
                }
            )
        }
    }

    /**
     *   Gets the inputs of a seed
     *
     *   @method getInputs
     *   @param {string} seed
     *   @param {object} options
     *       @property {int} start Starting key index
     *       @property {int} end Ending key index
     *       @property {int} threshold Min balance required
     *       @property {int} security secuirty level of private key / seed
     *   @param {function} callback
     **/
    public getInputs(seed: string, options: GetInputsOptions, callback: Callback) {
        // validate the seed
        if (!inputValidator.isTrytes(seed)) {
            return callback(errors.invalidSeed())
        }

        const start = options.start || 0
        const end = options.end || null
        const threshold = options.threshold || null
        // If no user defined security, use the standard value of 2
        const security = options.security || 2

        // If start value bigger than end, return error
        // or if difference between end and start is bigger than 500 keys
        if (options.end && (start > end! || end! > start + 500)) {
            return callback(new Error('Invalid inputs provided'))
        }

        //  Calls getBalances and formats the output
        //  returns the final inputsObject then
        const getBalanceAndFormat = (addresses: string[]) => {
            this.getBalances(addresses, 100, (error, balances) => {
                if (error) {
                    return callback(error)
                } else {
                    const inputsObject: { inputs: Input[]; totalBalance: number } = {
                        inputs: [],
                        totalBalance: 0,
                    }

                    // If threshold defined, keep track of whether reached or not
                    // else set default to true
                    let thresholdReached = threshold ? false : true

                    for (let i = 0; i < addresses.length; i++) {
                        const balance = parseInt(balances.balances[i], 10)

                        if (balance > 0) {
                            const newEntry: Input = {
                                address: addresses[i],
                                balance,
                                keyIndex: start + i,
                                security,
                            }

                            // Add entry to inputs
                            inputsObject.inputs.push(newEntry)
                            // Increase totalBalance of all aggregated inputs
                            inputsObject.totalBalance += balance

                            if (threshold && inputsObject.totalBalance >= threshold) {
                                thresholdReached = true
                                break
                            }
                        }
                    }

                    if (thresholdReached) {
                        return callback(null, inputsObject)
                    } else {
                        return callback(new Error('Not enough balance'))
                    }
                }
            })
        }

        //  Case 1: start and end
        //
        //  If start and end is defined by the user, simply iterate through the keys
        //  and call getBalances
        if (end) {
            const allAddresses = []

            for (let i = start; i < end; i++) {
                const address = this._newAddress(seed, i, security, false)
                allAddresses.push(address)
            }

            getBalanceAndFormat(allAddresses)
        } else {
            //  Case 2: iterate till threshold || end
            //
            //  Either start from index: 0 or start (if defined) until threshold is reached.
            //  Calls getNewAddress and deterministically generates and returns all addresses
            //  We then do getBalance, format the output and return it
            this.getNewAddress(seed, { index: start, returnAll: true, security }, (error, addresses) => {
                if (error) {
                    return callback(error)
                } else {
                    getBalanceAndFormat(addresses)
                }
            })
        }
    }

    /**
     *   Prepares transfer by generating bundle, finding and signing inputs
     *
     *   @method prepareTransfers
     *   @param {string} seed
     *   @param {object} transfers
     *   @param {object} options
     *       @property {array} inputs Inputs used for signing. Needs to have correct security, keyIndex and address value
     *       @property {string} address Remainder address
     *       @property {int} security security level to be used for getting inputs and addresses
     *       @property {string} hmacKey HMAC key used for attaching an HMAC
     *   @param {function} callback
     *   @returns {array} trytes Returns bundle trytes
     **/
    public prepareTransfers(seed: string, transfers: Transfer[], options: PrepareTransferOptions, callback: Callback) {
        let addHMAC = false
        let addedHMAC = false

        // validate the seed
        if (!inputValidator.isTrytes(seed)) {
            return callback(errors.invalidSeed())
        }

        if (options.hasOwnProperty('hmacKey') && options.hmacKey) {
            if (!inputValidator.isTrytes(options.hmacKey)) {
                return callback(errors.invalidTrytes())
            }

            addHMAC = true
        }

        // If message or tag is not supplied, provide it
        // Also remove the checksum of the address if it's there after validating it
        transfers.forEach(thisTransfer => {
            thisTransfer.message = thisTransfer.message ? thisTransfer.message : ''
            thisTransfer.obsoleteTag = thisTransfer.tag
                ? thisTransfer.tag
                : thisTransfer.obsoleteTag ? thisTransfer.obsoleteTag : ''

            if (addHMAC && thisTransfer.value > 0) {
                thisTransfer.message = nullHashTrytes + thisTransfer.message
                addedHMAC = true
            }

            // If address with checksum, validate it
            if (thisTransfer.address.length === 90) {
                if (!Utils.isValidChecksum(thisTransfer.address)) {
                    return callback(errors.invalidChecksum(thisTransfer.address))
                }
            }

            thisTransfer.address = Utils.noChecksum(thisTransfer.address)
        })

        // Input validation of transfers object
        if (!inputValidator.isTransfersArray(transfers)) {
            return callback(errors.invalidTransfers())
        }

        // If inputs provided, validate the format
        if (options.inputs && !inputValidator.isInputs(options.inputs)) {
            return callback(errors.invalidInputs())
        }

        const remainderAddress = options.address || null
        const chosenInputs = options.inputs || []
        const security = options.security || 2

        // Create a new bundle
        const bundle = new Bundle()

        let totalValue = 0
        const signatureFragments: string[] = []
        let tag: string

        //
        //  Iterate over all transfers, get totalValue
        //  and prepare the signatureFragments, message and tag
        //
        for (let i = 0; i < transfers.length; i++) {
            let signatureMessageLength = 1

            // If message longer than 2187 trytes, increase signatureMessageLength (add 2nd transaction)
            if (transfers[i].message.length > 2187) {
                // Get total length, message / maxLength (2187 trytes)
                signatureMessageLength += Math.floor(transfers[i].message.length / 2187)

                let msgCopy = transfers[i].message

                // While there is still a message, copy it
                while (msgCopy) {
                    let fragment = msgCopy.slice(0, 2187)
                    msgCopy = msgCopy.slice(2187, msgCopy.length)

                    // Pad remainder of fragment
                    for (let j = 0; fragment.length < 2187; j++) {
                        fragment += '9'
                    }

                    signatureFragments.push(fragment)
                }
            } else {
                // Else, get single fragment with 2187 of 9's trytes
                let fragment = ''

                if (transfers[i].message) {
                    fragment = transfers[i].message.slice(0, 2187)
                }

                for (let j = 0; fragment.length < 2187; j++) {
                    fragment += '9'
                }

                signatureFragments.push(fragment)
            }

            // get current timestamp in seconds
            const timestamp = Math.floor(Date.now() / 1000)

            // If no tag defined, get 27 tryte tag.
            tag = transfers[i].obsoleteTag ? transfers[i].obsoleteTag : '999999999999999999999999999'

            // Pad for required 27 tryte length
            for (let j = 0; tag.length < 27; j++) {
                tag += '9'
            }

            // Add first entries to the bundle
            // Slice the address in case the user provided a checksummed one
            bundle.addEntry(signatureMessageLength, transfers[i].address, transfers[i].value, tag, timestamp)
            // Sum up total value
            totalValue += parseInt(transfers[i].value, 10)
        }

        // Get inputs if we are sending tokens
        if (totalValue) {
            //  Case 1: user provided inputs
            //
            //  Validate the inputs by calling getBalances
            if (options.inputs) {
                // Get list if addresses of the provided inputs
                const inputsAddresses: string[] = []
                options.inputs.forEach(inputEl => {
                    inputsAddresses.push(inputEl.address)
                })

                this.getBalances(inputsAddresses, 100, (error, balances) => {
                    if (error) {
                        return callback(error)
                    }

                    const confirmedInputs = []
                    let totalBalance = 0

                    for (let i = 0; i < balances.balances.length; i++) {
                        const thisBalance = parseInt(balances.balances[i], 10)

                        // If input has balance, add it to confirmedInputs
                        if (thisBalance > 0) {
                            totalBalance += thisBalance

                            const inputEl = options.inputs![i]
                            inputEl.balance = thisBalance

                            confirmedInputs.push(inputEl)

                            // if we've already reached the intended input value, break out of loop
                            if (totalBalance >= totalValue) {
                                break
                            }
                        }
                    }

                    // Return not enough balance error
                    if (totalValue > totalBalance) {
                        return callback(new Error('Not enough balance'))
                    }

                    addRemainder(confirmedInputs)
                })
            } else {
                //  Case 2: Get inputs deterministically
                //
                //  If no inputs provided, derive the addresses from the seed and
                //  confirm that the inputs exceed the threshold
                this.getInputs(seed, { threshold: totalValue, security }, (error, inputs) => {
                    // If inputs with enough balance
                    if (!error) {
                        addRemainder(inputs.inputs)
                    } else {
                        return callback(error)
                    }
                })
            }
        } else {
            // If no input required, don't sign and simply finalize the bundle
            bundle.finalize()
            bundle.addTrytes(signatureFragments)

            const bundleTrytes: string[] = []
            bundle.bundle.forEach(tx => {
                bundleTrytes.push(Utils.transactionTrytes(tx as Transaction))
            })

            return callback(null, bundleTrytes.reverse())
        }

        const addRemainder = (inputs: Input[]) => {
            let totalTransferValue = totalValue

            for (let i = 0; i < inputs.length; i++) {
                const thisBalance = inputs[i].balance
                const toSubtract = 0 - thisBalance
                const timestamp = Math.floor(Date.now() / 1000)

                // Add input as bundle entry
                bundle.addEntry(inputs[i].security, inputs[i].address, toSubtract, tag, timestamp)

                // If there is a remainder value
                // Add extra output to send remaining funds to
                if (thisBalance >= totalTransferValue) {
                    const remainder = thisBalance - totalTransferValue

                    // If user has provided remainder address
                    // Use it to send remaining funds to
                    if (remainder > 0 && remainderAddress) {
                        // Remainder bundle entry
                        bundle.addEntry(1, remainderAddress, remainder, tag, timestamp)

                        // Final function for signing inputs
                        signInputsAndReturn(inputs)
                    } else if (remainder > 0) {
                        let startIndex = 0

                        for (let k = 0; k < inputs.length; k++) {
                            startIndex = Math.max(inputs[k].keyIndex, startIndex)
                        }

                        startIndex++

                        // Generate a new Address by calling getNewAddress
                        this.getNewAddress(seed, { index: startIndex, security }, (error, address) => {
                            if (error) {
                                return callback(error)
                            }

                            const timeNow = Math.floor(Date.now() / 1000)

                            // Remainder bundle entry
                            bundle.addEntry(1, address, remainder, tag, timeNow)

                            // Final function for signing inputs
                            signInputsAndReturn(inputs)
                        })
                    } else {
                        // If there is no remainder, do not add transaction to bundle
                        // simply sign and return
                        signInputsAndReturn(inputs)
                    }

                    // If multiple inputs provided, subtract the totalTransferValue by
                    // the inputs balance
                } else {
                    totalTransferValue -= thisBalance
                }
            }
        }

        const signInputsAndReturn = (inputs: Input[]) => {
            bundle.finalize()
            bundle.addTrytes(signatureFragments)

            //  SIGNING OF INPUTS
            //
            //  Here we do the actual signing of the inputs
            //  Iterate over all bundle transactions, find the inputs
            //  Get the corresponding private key and calculate the signatureFragment
            for (let i = 0; i < bundle.bundle.length; i++) {
                if (bundle.bundle[i].value! < 0) {
                    const thisAddress = bundle.bundle[i].address

                    // Get the corresponding keyIndex and security of the address
                    let keyIndex
                    let keySecurity

                    for (let k = 0; k < inputs.length; k++) {
                        if (inputs[k].address === thisAddress) {
                            keyIndex = inputs[k].keyIndex
                            keySecurity = inputs[k].security ? inputs[k].security : security
                            break
                        }
                    }

                    const bundleHash = bundle.bundle[i].bundle

                    // Get corresponding private key of address
                    const key = Signing.key(Converter.trits(seed), keyIndex, keySecurity)

                    //  Get the normalized bundle hash
                    const normalizedBundleHash = bundle.normalizedBundle(bundleHash!)
                    const normalizedBundleFragments = []

                    // Split hash into 3 fragments
                    for (let l = 0; l < 3; l++) {
                        normalizedBundleFragments[l] = normalizedBundleHash.slice(l * 27, (l + 1) * 27)
                    }

                    //  First 6561 trits for the firstFragment
                    const firstFragment = key.slice(0, 6561)

                    //  First bundle fragment uses the first 27 trytes
                    const firstBundleFragment = normalizedBundleFragments[0]

                    //  Calculate the new signatureFragment with the first bundle fragment
                    const firstSignedFragment = Signing.signatureFragment(firstBundleFragment, firstFragment)

                    //  Convert signature to trytes and assign the new signatureFragment
                    bundle.bundle[i].signatureMessageFragment = Converter.trytes(firstSignedFragment)

                    // if user chooses higher than 27-tryte security
                    // for each security level, add an additional signature
                    for (let j = 1; j < keySecurity; j++) {
                        //  Because the signature is > 2187 trytes, we need to
                        //  find the subsequent transaction to add the remainder of the signature
                        //  Same address as well as value = 0 (as we already spent the input)
                        if (bundle.bundle[i + j].address === thisAddress && bundle.bundle[i + j].value === 0) {
                            // Use the next 6561 trits
                            const nextFragment = key.slice(6561 * j, (j + 1) * 6561)

                            const nextBundleFragment = normalizedBundleFragments[j]

                            //  Calculate the new signature
                            const nextSignedFragment = Signing.signatureFragment(nextBundleFragment, nextFragment)

                            //  Convert signature to trytes and assign it again to this bundle entry
                            bundle.bundle[i + j].signatureMessageFragment = Converter.trytes(nextSignedFragment)
                        }
                    }
                }
            }

            if (addedHMAC) {
                const hmac = new HMAC(Converter.trits(options.hmacKey!))
                hmac.addHMAC(bundle)
            }

            const bundleTrytes: string[] = []

            // Convert all bundle entries into trytes
            bundle.bundle.forEach(tx => {
                bundleTrytes.push(Utils.transactionTrytes(tx as Transaction))
            })

            return callback(null, bundleTrytes.reverse())
        }
    }

    /**
     *   Basically traverse the Bundle by going down the trunkTransactions until
     *   the bundle hash of the transaction is no longer the same. In case the input
     *   transaction hash is not a tail, we return an error.
     *
     *   @method traverseBundle
     *   @param {string} trunkTx Hash of a trunk or a tail transaction  of a bundle
     *   @param {string} bundleHash
     *   @param {array} bundle List of bundles to be populated
     *   @returns {array} bundle Transaction objects
     **/
    public traverseBundle(trunkTx: string, bundleHash: string | null, bundle: Transaction[], callback: Callback) {
        // Get trytes of transaction hash
        this.getTrytes(Array(trunkTx), (error, trytesList) => {
            if (error) {
                return callback(error)
            }

            const trytes = trytesList![0]

            if (!trytes) {
                return callback(new Error('Bundle transactions not visible'))
            }

            // get the transaction object
            const txObject = Utils.transactionObject(trytes)

            if (!txObject) {
                return callback(new Error('Invalid trytes, could not create object'))
            }

            // If first transaction to search is not a tail, return error
            if (!bundleHash && txObject.currentIndex !== 0) {
                return callback(new Error('Invalid tail transaction supplied.'))
            }

            // If no bundle hash, define it
            if (!bundleHash) {
                bundleHash = txObject.bundle
            }

            // If different bundle hash, return with bundle
            if (bundleHash !== txObject.bundle) {
                return callback(null, bundle)
            }

            // If only one bundle element, return
            if (txObject.lastIndex === 0 && txObject.currentIndex === 0) {
                return callback(null, Array(txObject))
            }

            // Define new trunkTransaction for search
            const newTrunkTx = txObject.trunkTransaction

            // Add transaction object to bundle
            bundle.push(txObject)

            // Continue traversing with new trunkTx
            return this.traverseBundle(newTrunkTx, bundleHash, bundle, callback)
        })
    }

    /**
     *   Gets the associated bundle transactions of a single transaction
     *   Does validation of signatures, total sum as well as bundle order
     *
     *   @method getBundle
     *   @param {string} transaction Hash of a tail transaction
     *   @returns {list} bundle Transaction objects
     **/
    public getBundle(transaction: string, callback: Callback<Transaction[]>) {
        // inputValidator: Check if correct hash
        if (!inputValidator.isHash(transaction)) {
            return callback(errors.invalidInputs(transaction))
        }

        // Initiate traverseBundle
        this.traverseBundle(transaction, null, Array(), (error, bundle) => {
            if (error) {
                return callback(error)
            }

            if (!Utils.isBundle(bundle)) {
                return callback(new Error('Invalid Bundle provided'))
            } else {
                // Return bundle element
                return callback(null, bundle)
            }
        })
    }

    /**
     *   @method getTransfers
     *   @param {string} seed
     *   @param {object} options
     *       @property {int} start Starting key index
     *       @property {int} end Ending key index
     *       @property {int} security security level to be used for getting inputs and addresses
     *       @property {bool} inclusionStates returns confirmation status of all transactions
     *   @param {function} callback
     *   @returns {object} success
     **/
    public getTransfers(seed: string, options: GetTransfersOptions, callback: Callback) {
        // inputValidator: Check if correct seed
        if (!inputValidator.isTrytes(seed)) {
            return callback(errors.invalidSeed())
        }

        const start = options.start || 0
        const end = options.end || null
        const inclusionStates = options.inclusionStates || false
        const security = options.security || 2

        // If start value bigger than end, return error
        // or if difference between end and start is bigger than 500 keys
        if (start > end! || end! > start + 500) {
            return callback(new Error('Invalid inputs provided'))
        }

        // first call findTransactions
        // If a transaction is non tail, get the tail transactions associated with it
        // add it to the list of tail transactions

        const addressOptions: GetNewAddressOptions = {
            index: start,
            total: end ? end - start : null,
            returnAll: true,
            security,
        }

        //  Get a list of all addresses associated with the users seed
        this.getNewAddress(seed, addressOptions, (error, addresses) => {
            if (error) {
                return callback(error)
            }

            return this._bundlesFromAddresses(addresses, inclusionStates, callback)
        })
    }

    /**
     *   Similar to getTransfers, just that it returns additional account data
     *
     *   @method getAccountData
     *   @param {string} seed
     *   @param {object} options
     *       @property {int} start Starting key index
     *       @property {int} security security level to be used for getting inputs and addresses
     *       @property {int} end Ending key index
     *   @param {function} callback
     *   @returns {object} success
     **/
    public getAccountData(seed: string, options: GetAccountDataOptions, callback: Callback) {
        // inputValidator: Check if correct seed
        if (!inputValidator.isTrytes(seed)) {
            return callback(errors.invalidSeed())
        }

        const start = options.start || 0
        const end = options.end || null
        const security = options.security || 2

        // If start value bigger than end, return error
        // or if difference between end and start is bigger than 1000 keys
        if (end && (start > end || end > start + 1000)) {
            return callback(new Error('Invalid inputs provided'))
        }

        //  These are the values that will be returned to the original caller
        //  @latestAddress: latest unused address
        //  @addresses:     all addresses associated with this seed that have been used
        //  @transfers:     all sent / received transfers
        //  @inputs:        all inputs of the account
        //  @balance:       the confirmed balance
        const valuesToReturn = {
            latestAddress: '',
            addresses: [],
            transfers: [],
            inputs: [],
            balance: 0,
        }

        // first call findTransactions
        // If a transaction is non tail, get the tail transactions associated with it
        // add it to the list of tail transactions
        const addressOptions: GetNewAddressOptions = {
            index: start,
            total: end && end - start,
            returnAll: true,
            security,
        }

        //  Get a list of all addresses associated with the users seed
        this.getNewAddress(seed, addressOptions, (error, addresses) => {
            if (error) {
                return callback(error)
            }

            // assign the last address as the latest address
            // since it has no transactions associated with it
            valuesToReturn.latestAddress = addresses[addresses.length - 1]

            // Add all returned addresses to the lsit of addresses
            // remove the last element as that is the most recent address
            valuesToReturn.addresses = addresses.slice(0, -1)

            // get all bundles from a list of addresses
            this._bundlesFromAddresses(addresses, true, (bundlesError, bundles) => {
                if (bundlesError) {
                    return callback(bundlesError)
                }

                // add all transfers
                valuesToReturn.transfers = bundles

                // Get the correct balance count of all addresses
                this.getBalances(valuesToReturn.addresses, 100, (balancesError, balances) => {
                    if (balancesError) {
                        return callback(balancesError)
                    }

                    balances.balances.forEach((balance: number, index: number) => {
                        valuesToReturn.balance += balance

                        if (balance > 0) {
                            const newInput = {
                                address: valuesToReturn.addresses[index],
                                keyIndex: index,
                                security,
                                balance,
                            }

                            valuesToReturn.inputs.push(newInput)
                        }
                    })

                    return callback(null, valuesToReturn)
                })
            })
        })
    }

    /**
     *   Determines whether you should replay a transaction
     *   or make a new one (either with the same input, or a different one)
     *
     *   @method isReattachable
     *   @param {String || Array} inputAddresses Input address you want to have tested
     *   @returns {Bool}
     **/
    public isReattachable(inputAddresses: string | string[], callback: Callback<boolean | boolean[]>) {
        // if string provided, make array
        if (typeof inputAddresses === 'string') {
            inputAddresses = new Array(inputAddresses)
        }

        // Categorized value transactions
        // hash -> txarray map
        const addressTxsMap: any = {}
        const addresses: string[] = []

        for (let i = 0; i < inputAddresses.length; i++) {
            let address = inputAddresses[i]

            if (!inputValidator.isAddress(address)) {
                return callback(errors.invalidInputs())
            }

            address = Utils.noChecksum(address)

            addressTxsMap[address] = new Array()
            addresses.push(address)
        }

        this.findTransactionObjects({ addresses }, (e, transactions) => {
            if (e) {
                return callback(e)
            }

            const valueTransactions: string[] = []

            transactions!.forEach(thisTransaction => {
                if (thisTransaction.value < 0) {
                    const txAddress = thisTransaction.address
                    const txHash = thisTransaction.hash

                    // push hash to map
                    addressTxsMap[txAddress].push(txHash)

                    valueTransactions.push(txHash)
                }
            })

            if (valueTransactions.length > 0) {
                // get the includion states of all the transactions
                this.getLatestInclusion(valueTransactions, (latestInclError, inclusionStates) => {
                    // bool array
                    let results: boolean | boolean[] = addresses.map(address => {
                        const txs = addressTxsMap[address]
                        const numTxs = txs.length

                        if (numTxs === 0) {
                            return true
                        }

                        let shouldReattach = true

                        for (let i = 0; i < numTxs; i++) {
                            const tx = txs[i]

                            const txIndex = valueTransactions.indexOf(tx)
                            const isConfirmed = inclusionStates[txIndex]
                            shouldReattach = isConfirmed ? false : true

                            // if tx confirmed, break
                            if (isConfirmed) {
                                break
                            }
                        }

                        return shouldReattach
                    })

                    // If only one entry, return first
                    if (results.length === 1) {
                        results = results[0]
                    }

                    return callback(null, results)
                })
            } else {
                let results: boolean | boolean[] = []
                const numAddresses = addresses.length

                // prepare results array if multiple addresses
                if (numAddresses > 1) {
                    for (let i = 0; i < numAddresses; i++) {
                        results.push(true)
                    }
                } else {
                    results = true
                }

                return callback(null, results)
            }
        })
    }

    /**
     * Wraps {checkConsistency} in a promise so that its value is returned
     */
    public isPromotable(tail: string) {
        // Check if is hash
        if (!inputValidator.isHash(tail)) {
            return Promise.resolve(false)
        }

        const command = apiCommands.checkConsistency([tail])

        return new Promise((res, rej) => {
            this.sendCommand(command, (err, isConsistent) => {
                if (err) {
                    rej(err)
                }

                res(isConsistent.state)
            })
        })
    }

    /**
     *   Generates a new address
     *
     *   @method newAddress
     *   @param      {string} seed
     *   @param      {int} index
     *   @param      {int} security      Security level of the private key
     *   @param      {bool} checksum
     *   @returns    {string} address     Transaction objects
     **/
    private _newAddress(seed: string, index: number, security: number, checksum: boolean) {
        const key = Signing.key(Converter.trits(seed), index, security)
        const digests = Signing.digests(key)
        const addressTrits = Signing.address(digests)
        let address = Converter.trytes(addressTrits)

        if (checksum) {
            address = Utils.addChecksum(address)
        }

        return address
    }

    /**
     *   Internal function to get the formatted bundles of a list of addresses
     *
     *   @method _bundlesFromAddresses
     *   @param {list} addresses List of addresses
     *   @param {bool} inclusionStates
     *   @returns {list} bundles Transaction objects
     **/
    private _bundlesFromAddresses(addresses: string[], inclusionStates: boolean, callback: Callback) {
        // call wrapper function to get txs associated with addresses
        this.findTransactionObjects({ addresses }, (error, transactionObjects) => {
            if (error) {
                return callback(error)
            }

            // set of tail transactions
            const tailTransactions = new Set()
            const nonTailBundleHashes = new Set()

            transactionObjects!.forEach(thisTransaction => {
                // Sort tail and nonTails
                if (thisTransaction.currentIndex === 0) {
                    tailTransactions.add(thisTransaction.hash)
                } else {
                    nonTailBundleHashes.add(thisTransaction.bundle)
                }
            })

            // Get tail transactions for each nonTail via the bundle hash
            this.findTransactionObjects({ bundles: Array.from(nonTailBundleHashes) }, (findTxError, bundleObjects) => {
                if (findTxError) {
                    return callback(findTxError)
                }

                bundleObjects!.forEach(thisTransaction => {
                    if (thisTransaction.currentIndex === 0) {
                        tailTransactions.add(thisTransaction.hash)
                    }
                })

                const finalBundles: Transaction[][] = []
                const tailTxArray = Array.from(tailTransactions)

                // If inclusionStates, get the confirmation status
                // of the tail transactions, and thus the bundles
                async.waterfall([
                    //
                    // 1. Function
                    //
                    (cb: any) => {
                        if (inclusionStates) {
                            this.getLatestInclusion(tailTxArray, (getInclError, states) => {
                                // If error, return it to original caller
                                if (getInclError) {
                                    return callback(getInclError)
                                }

                                cb(null, states)
                            })
                        } else {
                            cb(null, [])
                        }
                    },

                    //
                    // 2. Function
                    //
                    (tailTxStates: string[], cb: any) => {
                        // Map each tail transaction to the getBundle function
                        // format the returned bundles and add inclusion states if necessary
                        async.mapSeries(
                            tailTxArray,
                            (tailTx, cb2) => {
                                this.getBundle(tailTx, (getBundleError, bundle) => {
                                    // If error returned from getBundle, simply ignore it
                                    // because the bundle was most likely incorrect
                                    if (!getBundleError) {
                                        // If inclusion states, add to each bundle entry
                                        if (inclusionStates) {
                                            const thisInclusion = tailTxStates[tailTxArray.indexOf(tailTx)]

                                            bundle!.forEach(bundleTx => {
                                                ;(bundleTx as any).persistence = thisInclusion
                                            })
                                        }

                                        finalBundles.push(bundle!)
                                    }
                                    cb2(void 0, true)
                                })
                            },
                            (mapError, results) => {
                                // credit: http://stackoverflow.com/a/8837505
                                // Sort bundles by timestamp
                                finalBundles.sort((a, b) => {
                                    const x = a[0].attachmentTimestamp
                                    const y = b[0].attachmentTimestamp
                                    return x < y ? -1 : x > y ? 1 : 0
                                })

                                return callback(mapError as any, finalBundles)
                            }
                        )
                    },
                ])
            })
        })
    }
}

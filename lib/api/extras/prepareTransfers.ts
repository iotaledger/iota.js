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
function prepareTransfers(seed: string, transfers: Transfer[], options: PrepareTransferOptions, callback: Callback) {
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

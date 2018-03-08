import { Transaction, Trytes } from '../api/types'
import { Converter, Kerl, Signing } from '../crypto'
import { asTransactionTrytes, isEmpty, isTransactionArray } from './'

interface SignatureFragments { [key: string]: Trytes[] } 

/**
 *   Validates the signatures
 *
 *   @method validateSignatures
 *   @param {array} signedBundle
 *   @param {string} inputAddress
 *   @returns {bool}
 **/
export function validateSignatures(bundle: Transaction[]) {
    const signatures: SignatureFragments = bundle
        .reduce((acc: SignatureFragments, tx) => {
            if (tx.value < 0) {
                if (!acc.hasOwnProperty(tx.address)) {
                    acc[tx.address] = []
                }
                acc[tx.address].push(tx.signatureMessageFragment)
            }

            return acc
        }, {})
    
    return Object.keys(signatures).every((address) =>
        Signing.validateSignatures(address, signatures[address], bundle[0].bundle)
    )
}

/**
 *   Checks is a Bundle is valid. Validates signatures and overall structure. Has to be tail tx first.
 *
 *   @method isValidBundle
 *   @param {array} bundle
 *   @returns {bool} valid
 **/
export function isBundle(bundle: Transaction[]) {
    // If not correct bundle
    if (!isTransactionArray(bundle)) {
        return false
    }

    let totalSum = 0
    const bundleHash = bundle[0].bundle

    // Prepare to absorb txs and get bundleHash
    const bundleFromTxs: Int8Array = new Int8Array(Kerl.HASH_LENGTH)

    const kerl = new Kerl()
    kerl.initialize()

    // Prepare for signature validation
    const signaturesToValidate: Array<{
        address: string
        signatureFragments: string[]
    }> = []

    bundle.forEach((bundleTx, index) => {
        totalSum += bundleTx.value

        // currentIndex has to be equal to the index in the array
        if (bundleTx.currentIndex !== index) {
            return false
        }

        // Get the transaction trytes
        const thisTxTrytes = asTransactionTrytes(bundleTx)

        const thisTxTrits = Converter.trits(thisTxTrytes.slice(2187, 2187 + 162))
        kerl.absorb(thisTxTrits, 0, thisTxTrits.length)

        // Check if input transaction
        if (bundleTx.value < 0) {
            const thisAddress = bundleTx.address

            const newSignatureToValidate = {
                address: thisAddress,
                signatureFragments: Array(bundleTx.signatureMessageFragment),
            }

            // Find the subsequent txs with the remaining signature fragment
            for (let i = index; i < bundle.length - 1; i++) {
                const newBundleTx = bundle[i + 1]

                // Check if new tx is part of the signature fragment
                if (newBundleTx.address === thisAddress && newBundleTx.value === 0) {
                    newSignatureToValidate.signatureFragments.push(newBundleTx.signatureMessageFragment)
                }
            }

            signaturesToValidate.push(newSignatureToValidate)
        }
    })

    // Check for total sum, if not equal 0 return error
    if (totalSum !== 0) {
        return false
    }

    // get the bundle hash from the bundle transactions
    kerl.squeeze(bundleFromTxs, 0, Kerl.HASH_LENGTH)

    const bundleHashFromTxs = Converter.trytes(bundleFromTxs)

    // Check if bundle hash is the same as returned by tx object
    if (bundleHashFromTxs !== bundleHash) {
        return false
    }

    // Last tx in the bundle should have currentIndex === lastIndex
    if (bundle[bundle.length - 1].currentIndex !== bundle[bundle.length - 1].lastIndex) {
        return false
    }

    return validateSignatures(bundle)
}


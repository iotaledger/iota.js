import { Hash, Transaction, Trytes } from '../api/types'
import { Kerl, trits, trytes } from '../crypto'
import { asTransactionTrytes, isEmpty, isTransactionArray, validateSignatures } from './'

/**
 *   Checks is a Bundle is valid. Validates signatures and overall structure.
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

    const kerl = new Kerl()
    kerl.initialize()

    // Prepare for signature validation
    const signaturesToValidate: Array<{
        address: Hash 
        signatureFragments: Trytes[]
    }> = []

    bundle.forEach((bundleTx, index) => {
        totalSum += bundleTx.value

        // currentIndex has to be equal to the index in the array
        if (bundleTx.currentIndex !== index) {
            return false
        }

        // Get the transaction trytes
        const thisTxTrytes = asTransactionTrytes(bundleTx)

        const thisTxTrits = trits(thisTxTrytes.slice(2187, 2187 + 162))
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
    // Prepare to absorb txs and get bundleHash
    const bundleFromTxs: Int8Array = new Int8Array(Kerl.HASH_LENGTH)

    // get the bundle hash from the bundle transactions
    kerl.squeeze(bundleFromTxs, 0, Kerl.HASH_LENGTH)

    const bundleHashFromTxs = trytes(bundleFromTxs)

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


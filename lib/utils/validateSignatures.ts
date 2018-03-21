import { Transaction, Trytes } from '../api/types'
import { validateSignatures as isValidSignature } from '../crypto'

interface SignatureFragments {
    [key: string]: Trytes[]
}

/**
 *   Validates all signatures of a bundle
 *
 *   @method validateSignatures
 *   @param {array} signedBundle
 *   @param {string} inputAddress
 *   @returns {bool}
 **/
export function validateSignatures(bundle: Transaction[]): boolean {
    const signatures: SignatureFragments = [...bundle]
        .sort((a, b) => a.currentIndex - b.currentIndex)
        .reduce((acc: SignatureFragments, tx) => {
            if (tx.value < 0 || (tx.value === 0 && acc[tx.address])) {
                if (!acc[tx.address]) {
                    acc[tx.address] = []
                }
                acc[tx.address].push(tx.signatureMessageFragment)
            }

            return acc
        }, {})

    return Object.keys(signatures).every((address) =>
        isValidSignature(address, signatures[address], bundle[0].bundle)
    )
}

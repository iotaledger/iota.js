const { Address, Multisig } = require('@iota/multisig')
const { removeChecksum } = require('@iota/checksum')
const { TRANSACTION_LENGTH } = require('@iota/transaction')
const { trytesToTrits } = require('@iota/converter')
const { validateBundleSignatures } = require('@iota/bundle-validator')

// Reference example: https://github.com/iotaledger/iota.js/blob/develop/examples/multisig.js

const multisig = new Multisig('http://localhost:14265')

// First co-signer uses index 0 and security level 3
const digestOne = multisig.getDigest('ABCDFG', 0, 3)

// Second co-signer uses index 0 and security level 3
const digestTwo = multisig.getDigest('FDSAG', 0, 3)

// Generate multisig address
const address = new Address().absorb(digestOne).absorb(digestTwo).finalize()

console.log('Multisig address: ', address)

// Validate if the multisig address was generated correctly.
const isValid = multisig.validateAddress(address, [digestOne, digestTwo])

console.log('Is valid multisig address: ', isValid)

// Transfers object
const multisigTransfer = [
    {
        address: removeChecksum('ZGHXPZYDKXPEOSQTAQOIXEEI9K9YKFKCWKYYTYAUWXK9QZAVMJXWAIZABOXHHNNBJIEBEUQRTBWGLYMTX'),
        value: 999,
        message: '',
        tag: '9'.repeat(27),
    },
]

// Multisig address object, used as an input
const input = {
    address,
    securitySum: 6,
    balance: 1000,
}

// Define remainder address
const remainderAddress = removeChecksum(
    'NZRALDYNVGJWUVLKDWFKJVNYLWQGCWYCURJIIZRLJIKSAIVZSGEYKTZRDBGJLOA9AWYJQB9IPWRAKUC9FBDRZJZXZG'
)

// Initiate transfer
multisig.initiateTransfer(input, multisigTransfer, remainderAddress).then((initiatedBundle) => {
    // Add signatures for first co-signer
    multisig.addSignature(initiatedBundle, address, multisig.getKey('ABCDFG', 0, 3), (error, firstSignedBundle) => {
        if (error) {
            console.error(error)
        } else {
            // Convert bundle trytes to trits
            const firstBundleTrits = new Int8Array(firstSignedBundle.length * TRANSACTION_LENGTH)

            for (let i = 0; i < firstSignedBundle.length; i++) {
                firstBundleTrits.set(trytesToTrits(firstSignedBundle[i]), i * TRANSACTION_LENGTH)
            }

            // Add signatures for second co-signer
            multisig.addSignature(
                firstBundleTrits,
                address,
                multisig.getKey('FDSAG', 0, 3),
                (error, secondSignedBundle) => {
                    if (error) {
                        console.error(error)
                    } else {
                        // Validate bundle
                        console.log('Is valid bundle: ', validateBundleSignatures(secondSignedBundle))
                    }
                }
            )
        }
    })
})

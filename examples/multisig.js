var IOTA = require('../lib/iota');

var iota = new IOTA({
    'host': 'http://localhost',
    'port': 14265
});

// First co-signer uses index 0 and security level 3
// We initiate the multisig address generation by absorbing the key address digest
var digestOne = iota.multisig.getDigest('ABCDFG', 0, 3);
var initiatedMultisigAddress = iota.multisig.addAddressDigest(digestOne);

// Second cosigner also uses index 0 and security level 3 for the private key
var digestTwo = iota.multisig.getDigest('FDSAG', 0, 3);

// Add the multisig by absorbing the second cosigners key digest
var finalMultisig = iota.multisig.addAddressDigest(digestTwo, initiatedMultisigAddress);

// and finally we generate the address itself
var address = iota.multisig.finalizeAddress(finalMultisig);

console.log("MULTISIG ADDRESS: ", address);

// Simple validation if the multisig was created correctly
// Can be called by each cosigner independently
var isValid = iota.multisig.validateAddress(address, [digestOne, digestTwo]);
console.log("IS VALID MULTISIG ADDRESS:", isValid);

//  SIGNING EXAMPLE
//
//  Even though these functions are c alled subsequently, the addSignature functions have to be called by each
//  cosigner independently. With the previous signer sharing the output (bundle with the transaction objects)
//
//  When it comes to defining the remainder address, you have to generate that address before making a transfer
//  Important to know here is the total sum of the security levels used by the cosigners.
iota.multisig.initiateTransfer(6, address, "NZRALDYNVGJWUVLKDWFKJVNYLWQGCWYCURJIIZRLJIKSAIVZSGEYKTZRDBGJLOA9AWYJQB9IPWRAKUC9FBDRZJZXZG", [{'address': 'ZGHXPZYDKXPEOSQTAQOIXEEI9K9YKFKCWKYYTYAUWXK9QZAVMJXWAIZABOXHHNNBJIEBEUQRTBWGLYMTX', 'value': 999}], function(e, initiatedBundle) {

    if (e) {
        console.log(e);
    }

    iota.multisig.addSignature(initiatedBundle, address, iota.multisig.getKey('ABCDFG', 0, 3), function(e,firstSignedBundle) {

        if (e) {
            console.log(e);
        }

        iota.multisig.addSignature(firstSignedBundle, address, iota.multisig.getKey('FDSAG', 0, 3), function(e,finalBundle) {

            if (!e) {
                console.log("IS VALID SIGNATURE: ", iota.utils.validateSignatures(finalBundle, address));
            }
        });
    });

})

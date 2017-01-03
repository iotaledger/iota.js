var IOTA = require('../lib/iota');

var iota = new IOTA({
    'host': 'http://localhost',
    'port': 14265
});

var digestOne = iota.multisig.getDigest('ABCDFG', 0);

var initiatedMultisigAddress = iota.multisig.addAddressDigest(digestOne);

var digestTwo = iota.multisig.getDigest('FDSAG', 0);

var finalMultisig = iota.multisig.addAddressDigest(digestTwo, initiatedMultisigAddress);

var address = iota.multisig.finalizeAddress(finalMultisig);

console.log("MULTISIG ADDRESS: ", address);

console.log("VALIDATED MULTISIG: ", iota.multisig.validateAddress(address, [digestOne, digestTwo]));

iota.multisig.initiateTransfer(address, 'ABCFYSUQFVBFGNHOJMLWBHMGASFGBPAUMRZRRCJFCCOJHJKZVUOCEYSCLXAGDABCEWSUXCILJCGQWI9SF', 2, [{'address': 'GWXMZADCDEWEAVRKTAIWOGE9RDX9QPKJHPPQ9IDDOINY9TUWJGKCWF9GSOW9QBPNRVSVFLBMLPAHWDNSB', 'value': 15}], function(e, unsignedBundle) {

    var firstKey = iota.multisig.getKey('ABCDFG', 0);

    iota.multisig.addSignature(unsignedBundle, 0, 'JUIFYSUQFVBFGNHOJMLWBHMGASFGBPAUMRZRRCJFCCOJHJKZVUOCEYSCLXAGDABCEWSUXCILJCGQWI9SF', firstKey, function(e, bundleWithOneSig) {

        var secondKey = iota.multisig.getKey('FDSAG', 0);

        iota.multisig.addSignature(bundleWithOneSig, 1, 'JUIFYSUQFVBFGNHOJMLWBHMGASFGBPAUMRZRRCJFCCOJHJKZVUOCEYSCLXAGDABCEWSUXCILJCGQWI9SF', secondKey, function(e, finalBundle) {

            console.log("FINAL BUNDLE", finalBundle);

            console.log(iota.multisig.validateSignatures(finalBundle, address, 2))
        })
    })
})

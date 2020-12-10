"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519 = void 0;
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
var sha512_1 = require("../crypto/sha512");
var arrayHelper_1 = require("../utils/arrayHelper");
var extendedGroupElement_1 = require("./edwards25519/extendedGroupElement");
var projectiveGroupElement_1 = require("./edwards25519/projectiveGroupElement");
var scalar_1 = require("./edwards25519/scalar");
var Ed25519 = /** @class */ (function () {
    function Ed25519() {
    }
    /**
     * Public returns the PublicKey corresponding to priv.
     * @param privateKey The private key to get the corresponding public key.
     * @returns The public key.
     */
    Ed25519.publicKeyFromPrivateKey = function (privateKey) {
        return privateKey.subarray(32).slice();
    };
    /**
     * Generate the key pair from the seed.
     * @param seed The seed to generate the key pair for.
     * @returns The key pair.
     */
    Ed25519.keyPairFromSeed = function (seed) {
        var privateKey = Ed25519.privateKeyFromSeed(seed);
        return {
            privateKey: privateKey,
            publicKey: Ed25519.publicKeyFromPrivateKey(privateKey)
        };
    };
    /**
     * NewKeyFromSeed calculates a private key from a seed. It will panic if
     * len(seed) is not SeedSize. This function is provided for interoperability
     * with RFC 8032. RFC 8032's private keys correspond to seeds in this
     * package.
     * @param seed The seed to generate the private key from.
     * @returns The private key.
     */
    Ed25519.privateKeyFromSeed = function (seed) {
        if (!seed || seed.length !== Ed25519.SEED_SIZE) {
            throw new Error("Bad seed length");
        }
        var sha512 = new sha512_1.Sha512();
        sha512.update(seed);
        var digest = sha512.digest();
        digest[0] &= 248;
        digest[31] &= 127;
        digest[31] |= 64;
        var A = new extendedGroupElement_1.ExtendedGroupElement();
        A.scalarMultBase(digest);
        var publicKeyBytes = new Uint8Array(32);
        A.toBytes(publicKeyBytes);
        var privateKey = new Uint8Array(Ed25519.PRIVATE_KEY_SIZE);
        privateKey.set(seed);
        privateKey.set(publicKeyBytes, 32);
        return privateKey;
    };
    /**
     * Sign the message with privateKey and returns a signature.
     * @param privateKey The private key.
     * @param message The message to sign.
     * @returns The signature.
     */
    Ed25519.sign = function (privateKey, message) {
        if (!privateKey || privateKey.length !== Ed25519.PRIVATE_KEY_SIZE) {
            throw new Error("Bad private key length");
        }
        var sha512 = new sha512_1.Sha512();
        sha512.update(privateKey.subarray(0, 32));
        var digest1 = sha512.digest();
        var expandedSecretKey = digest1.slice();
        expandedSecretKey[0] &= 248;
        expandedSecretKey[31] &= 63;
        expandedSecretKey[31] |= 64;
        sha512 = new sha512_1.Sha512();
        sha512.update(digest1.subarray(32));
        sha512.update(message);
        var messageDigest = sha512.digest();
        var messageDigestReduced = new Uint8Array(32);
        scalar_1.scalarReduce(messageDigestReduced, messageDigest);
        var R = new extendedGroupElement_1.ExtendedGroupElement();
        R.scalarMultBase(messageDigestReduced);
        var encodedR = new Uint8Array(32);
        R.toBytes(encodedR);
        sha512 = new sha512_1.Sha512();
        sha512.update(encodedR);
        sha512.update(privateKey.subarray(32));
        sha512.update(message);
        var hramDigest = sha512.digest();
        var hramDigestReduced = new Uint8Array(32);
        scalar_1.scalarReduce(hramDigestReduced, hramDigest);
        var s = new Uint8Array(32);
        scalar_1.scalarMulAdd(s, hramDigestReduced, expandedSecretKey, messageDigestReduced);
        var signature = new Uint8Array(Ed25519.SIGNATURE_SIZE);
        signature.set(encodedR);
        signature.set(s, 32);
        return signature;
    };
    /**
     * Verify reports whether sig is a valid signature of message by publicKey
     * @param publicKey The public key to verify the signature.
     * @param message The message for the signature.
     * @param sig The signature.
     * @returns True if the signature matches.
     */
    Ed25519.verify = function (publicKey, message, sig) {
        if (!publicKey || publicKey.length !== Ed25519.PUBLIC_KEY_SIZE) {
            return false;
        }
        if (!sig || sig.length !== Ed25519.SIGNATURE_SIZE || ((sig[63] & 224) !== 0)) {
            return false;
        }
        var A = new extendedGroupElement_1.ExtendedGroupElement();
        if (!A.fromBytes(publicKey)) {
            return false;
        }
        A.X.neg();
        A.T.neg();
        var h = new sha512_1.Sha512();
        h.update(sig.subarray(0, 32));
        h.update(publicKey);
        h.update(message);
        var digest = h.digest();
        var hReduced = new Uint8Array(32);
        scalar_1.scalarReduce(hReduced, digest);
        var R = new projectiveGroupElement_1.ProjectiveGroupElement();
        var s = sig.subarray(32).slice();
        // https://tools.ietf.org/html/rfc8032#section-5.1.7 requires that s be in
        // the range [0, order) in order to prevent signature malleability.
        if (!scalar_1.scalarMinimal(s)) {
            return false;
        }
        R.doubleScalarMultVartime(hReduced, A, s);
        var checkR = new Uint8Array(32);
        R.toBytes(checkR);
        return arrayHelper_1.ArrayHelper.equal(sig.subarray(0, 32), checkR);
    };
    /**
     * PublicKeySize is the size, in bytes, of public keys as used in this package.
     */
    Ed25519.PUBLIC_KEY_SIZE = 32;
    /**
     * PrivateKeySize is the size, in bytes, of private keys as used in this package.
     */
    Ed25519.PRIVATE_KEY_SIZE = 64;
    /**
     * SignatureSize is the size, in bytes, of signatures generated and verified by this package.
     */
    Ed25519.SIGNATURE_SIZE = 64;
    /**
     * SeedSize is the size, in bytes, of private key seeds. These are the private key representations used by RFC 8032.
     */
    Ed25519.SEED_SIZE = 32;
    return Ed25519;
}());
exports.Ed25519 = Ed25519;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vZWQyNTUxOS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywrQkFBK0I7OztBQUUvQjs7OztHQUlHO0FBQ0gsMkNBQTBDO0FBQzFDLG9EQUFtRDtBQUNuRCw0RUFBMkU7QUFDM0UsZ0ZBQStFO0FBQy9FLGdEQUFrRjtBQUVsRjtJQUFBO0lBMExBLENBQUM7SUFyS0c7Ozs7T0FJRztJQUNXLCtCQUF1QixHQUFyQyxVQUFzQyxVQUFzQjtRQUN4RCxPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyx1QkFBZSxHQUE3QixVQUE4QixJQUFnQjtRQUkxQyxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsT0FBTztZQUNILFVBQVUsWUFBQTtZQUNWLFNBQVMsRUFBRSxPQUFPLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDO1NBQ3pELENBQUM7SUFDTixDQUFDO0lBR0Q7Ozs7Ozs7T0FPRztJQUNXLDBCQUFrQixHQUFoQyxVQUFpQyxJQUFnQjtRQUM3QyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUM1QyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDdEM7UUFFRCxJQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEIsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDakIs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
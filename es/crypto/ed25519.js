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
const sha512_1 = require("../crypto/sha512");
const arrayHelper_1 = require("../utils/arrayHelper");
const extendedGroupElement_1 = require("./edwards25519/extendedGroupElement");
const projectiveGroupElement_1 = require("./edwards25519/projectiveGroupElement");
const scalar_1 = require("./edwards25519/scalar");
class Ed25519 {
    /**
     * Public returns the PublicKey corresponding to priv.
     * @param privateKey The private key to get the corresponding public key.
     * @returns The public key.
     */
    static publicKeyFromPrivateKey(privateKey) {
        return privateKey.subarray(32).slice();
    }
    /**
     * Generate the key pair from the seed.
     * @param seed The seed to generate the key pair for.
     * @returns The key pair.
     */
    static keyPairFromSeed(seed) {
        const privateKey = Ed25519.privateKeyFromSeed(seed.slice(0, Ed25519.SEED_SIZE));
        return {
            privateKey,
            publicKey: Ed25519.publicKeyFromPrivateKey(privateKey)
        };
    }
    /**
     * Calculates a private key from a seed.
     * @param seed The seed to generate the private key from.
     * @returns The private key.
     */
    static privateKeyFromSeed(seed) {
        if (!seed || seed.length !== Ed25519.SEED_SIZE) {
            throw new Error(`The seed length is incorrect, it should be ${Ed25519.SEED_SIZE} but is ${seed ? seed.length : 0}`);
        }
        const sha512 = new sha512_1.Sha512();
        sha512.update(seed);
        const digest = sha512.digest();
        digest[0] &= 248;
        digest[31] &= 127;
        digest[31] |= 64;
        const A = new extendedGroupElement_1.ExtendedGroupElement();
        A.scalarMultBase(digest);
        const publicKeyBytes = new Uint8Array(32);
        A.toBytes(publicKeyBytes);
        const privateKey = new Uint8Array(Ed25519.PRIVATE_KEY_SIZE);
        privateKey.set(seed);
        privateKey.set(publicKeyBytes, 32);
        return privateKey;
    }
    /**
     * Sign the message with privateKey and returns a signature.
     * @param privateKey The private key.
     * @param message The message to sign.
     * @returns The signature.
     */
    static sign(privateKey, message) {
        if (!privateKey || privateKey.length !== Ed25519.PRIVATE_KEY_SIZE) {
            throw new Error("Bad private key length");
        }
        let sha512 = new sha512_1.Sha512();
        sha512.update(privateKey.subarray(0, 32));
        const digest1 = sha512.digest();
        const expandedSecretKey = digest1.slice();
        expandedSecretKey[0] &= 248;
        expandedSecretKey[31] &= 63;
        expandedSecretKey[31] |= 64;
        sha512 = new sha512_1.Sha512();
        sha512.update(digest1.subarray(32));
        sha512.update(message);
        const messageDigest = sha512.digest();
        const messageDigestReduced = new Uint8Array(32);
        scalar_1.scalarReduce(messageDigestReduced, messageDigest);
        const R = new extendedGroupElement_1.ExtendedGroupElement();
        R.scalarMultBase(messageDigestReduced);
        const encodedR = new Uint8Array(32);
        R.toBytes(encodedR);
        sha512 = new sha512_1.Sha512();
        sha512.update(encodedR);
        sha512.update(privateKey.subarray(32));
        sha512.update(message);
        const hramDigest = sha512.digest();
        const hramDigestReduced = new Uint8Array(32);
        scalar_1.scalarReduce(hramDigestReduced, hramDigest);
        const s = new Uint8Array(32);
        scalar_1.scalarMulAdd(s, hramDigestReduced, expandedSecretKey, messageDigestReduced);
        const signature = new Uint8Array(Ed25519.SIGNATURE_SIZE);
        signature.set(encodedR);
        signature.set(s, 32);
        return signature;
    }
    /**
     * Verify reports whether sig is a valid signature of message by publicKey
     * @param publicKey The public key to verify the signature.
     * @param message The message for the signature.
     * @param sig The signature.
     * @returns True if the signature matches.
     */
    static verify(publicKey, message, sig) {
        if (!publicKey || publicKey.length !== Ed25519.PUBLIC_KEY_SIZE) {
            return false;
        }
        if (!sig || sig.length !== Ed25519.SIGNATURE_SIZE || ((sig[63] & 224) !== 0)) {
            return false;
        }
        const A = new extendedGroupElement_1.ExtendedGroupElement();
        if (!A.fromBytes(publicKey)) {
            return false;
        }
        A.X.neg();
        A.T.neg();
        const h = new sha512_1.Sha512();
        h.update(sig.subarray(0, 32));
        h.update(publicKey);
        h.update(message);
        const digest = h.digest();
        const hReduced = new Uint8Array(32);
        scalar_1.scalarReduce(hReduced, digest);
        const R = new projectiveGroupElement_1.ProjectiveGroupElement();
        const s = sig.subarray(32).slice();
        // https://tools.ietf.org/html/rfc8032#section-5.1.7 requires that s be in
        // the range [0, order) in order to prevent signature malleability.
        if (!scalar_1.scalarMinimal(s)) {
            return false;
        }
        R.doubleScalarMultVartime(hReduced, A, s);
        const checkR = new Uint8Array(32);
        R.toBytes(checkR);
        return arrayHelper_1.ArrayHelper.equal(sig.subarray(0, 32), checkR);
    }
}
exports.Ed25519 = Ed25519;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vZWQyNTUxOS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywrQkFBK0I7OztBQUUvQjs7OztHQUlHO0FBQ0gsNkNBQTBDO0FBQzFDLHNEQUFtRDtBQUNuRCw4RUFBMkU7QUFDM0Usa0ZBQStFO0FBQy9FLGtEQUFrRjtBQUVsRixNQUFhLE9BQU87SUFxQmhCOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsdUJBQXVCLENBQUMsVUFBc0I7UUFDeEQsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFnQjtRQUkxQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDaEYsT0FBTztZQUNILFVBQVU7WUFDVixTQUFTLEVBQUUsT0FBTyxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQztTQUN6RCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBZ0I7UUFDN0MsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDNUMsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsT0FBTyxDQUFDLFNBQ2xFLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztRQUM1QixNQUFNLENB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
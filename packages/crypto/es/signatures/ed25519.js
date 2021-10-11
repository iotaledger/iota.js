// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus.
 * Which is an extension of https://github.com/golang/crypto/tree/master/ed25519.
 * Which in a port of the “ref10” implementation of ed25519 from SUPERCOP.
 */
import { Sha512 } from "../hashes/sha512";
import { ArrayHelper } from "../utils/arrayHelper";
import { ExtendedGroupElement } from "./edwards25519/extendedGroupElement";
import { ProjectiveGroupElement } from "./edwards25519/projectiveGroupElement";
import { scalarMinimal, scalarMulAdd, scalarReduce } from "./edwards25519/scalar";
/**
 * Implementation of Ed25519.
 */
export class Ed25519 {
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
        const sha512 = new Sha512();
        sha512.update(seed);
        const digest = sha512.digest();
        digest[0] &= 248;
        digest[31] &= 127;
        digest[31] |= 64;
        const A = new ExtendedGroupElement();
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
        let sha512 = new Sha512();
        sha512.update(privateKey.subarray(0, 32));
        const digest1 = sha512.digest();
        const expandedSecretKey = digest1.slice();
        expandedSecretKey[0] &= 248;
        expandedSecretKey[31] &= 63;
        expandedSecretKey[31] |= 64;
        sha512 = new Sha512();
        sha512.update(digest1.subarray(32));
        sha512.update(message);
        const messageDigest = sha512.digest();
        const messageDigestReduced = new Uint8Array(32);
        scalarReduce(messageDigestReduced, messageDigest);
        const R = new ExtendedGroupElement();
        R.scalarMultBase(messageDigestReduced);
        const encodedR = new Uint8Array(32);
        R.toBytes(encodedR);
        sha512 = new Sha512();
        sha512.update(encodedR);
        sha512.update(privateKey.subarray(32));
        sha512.update(message);
        const hramDigest = sha512.digest();
        const hramDigestReduced = new Uint8Array(32);
        scalarReduce(hramDigestReduced, hramDigest);
        const s = new Uint8Array(32);
        scalarMulAdd(s, hramDigestReduced, expandedSecretKey, messageDigestReduced);
        const signature = new Uint8Array(Ed25519.SIGNATURE_SIZE);
        signature.set(encodedR);
        signature.set(s, 32);
        return signature;
    }
    /**
     * Verify reports whether sig is a valid signature of message by publicKey.
     * @param publicKey The public key to verify the signature.
     * @param message The message for the signature.
     * @param sig The signature.
     * @returns True if the signature matches.
     */
    static verify(publicKey, message, sig) {
        if (!publicKey || publicKey.length !== Ed25519.PUBLIC_KEY_SIZE) {
            return false;
        }
        if (!sig || sig.length !== Ed25519.SIGNATURE_SIZE || (sig[63] & 224) !== 0) {
            return false;
        }
        const A = new ExtendedGroupElement();
        if (!A.fromBytes(publicKey)) {
            return false;
        }
        A.X.neg();
        A.T.neg();
        const h = new Sha512();
        h.update(sig.subarray(0, 32));
        h.update(publicKey);
        h.update(message);
        const digest = h.digest();
        const hReduced = new Uint8Array(32);
        scalarReduce(hReduced, digest);
        const R = new ProjectiveGroupElement();
        const s = sig.subarray(32).slice();
        // https://tools.ietf.org/html/rfc8032#section-5.1.7 requires that s be in
        // the range [0, order) in order to prevent signature malleability.
        if (!scalarMinimal(s)) {
            return false;
        }
        R.doubleScalarMultVartime(hReduced, A, s);
        const checkR = new Uint8Array(32);
        R.toBytes(checkR);
        return ArrayHelper.equal(sig.subarray(0, 32), checkR);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaWduYXR1cmVzL2VkMjU1MTkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywrQkFBK0I7QUFFL0I7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbEY7O0dBRUc7QUFDSCxNQUFNLE9BQU8sT0FBTztJQXFCaEI7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxVQUFzQjtRQUN4RCxPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQWdCO1FBVTFDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNoRixPQUFPO1lBQ0gsVUFBVTtZQUNWLFNBQVMsRUFBRSxPQUFPLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDO1NBQ3pELENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFnQjtRQUM3QyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLFNB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
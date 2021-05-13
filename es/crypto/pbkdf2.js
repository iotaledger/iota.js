"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/* eslint-disable unicorn/prefer-math-trunc */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pbkdf2 = void 0;
const hmacSha256_1 = require("./hmacSha256");
const hmacSha512_1 = require("./hmacSha512");
/**
 * Implementation of the password based key derivation function 2.
 */
class Pbkdf2 {
    /**
     * Derive a key from the parameters using Sha256.
     * @param password The password to derive the key from.
     * @param salt The salt for the derivation.
     * @param iterations Numer of iterations to perform.
     * @param keyLength The length of the key to derive.
     * @returns The derived key.
     */
    static sha256(password, salt, iterations, keyLength) {
        return Pbkdf2.deriveKey(password, salt, iterations, keyLength, 32, (pass, block) => hmacSha256_1.HmacSha256.sum256(pass, block));
    }
    /**
     * Derive a key from the parameters using Sha512.
     * @param password The password to derive the key from.
     * @param salt The salt for the derivation.
     * @param iterations Numer of iterations to perform.
     * @param keyLength The length of the key to derive.
     * @returns The derived key.
     */
    static sha512(password, salt, iterations, keyLength) {
        return Pbkdf2.deriveKey(password, salt, iterations, keyLength, 64, (pass, block) => hmacSha512_1.HmacSha512.sum512(pass, block));
    }
    /**
     * Derive a key from the parameters.
     * @param password The password to derive the key from.
     * @param salt The salt for the derivation.
     * @param iterations Numer of iterations to perform.
     * @param keyLength The length of the key to derive.
     * @param macLength The length of the mac key.
     * @param sumFunc The mac function.
     * @returns The derived key.
     * @internal
     */
    static deriveKey(password, salt, iterations, keyLength, macLength, sumFunc) {
        if (iterations < 1) {
            throw new Error("Iterations must be > 0");
        }
        if (keyLength > (Math.pow(2, 32) - 1) * macLength) {
            throw new Error("Requested key length is too long");
        }
        const DK = new Uint8Array(keyLength);
        let T = new Uint8Array(macLength);
        const block1 = new Uint8Array(salt.length + 4);
        const l = Math.ceil(keyLength / macLength);
        const r = (keyLength - (l - 1)) * macLength;
        block1.set(salt, 0);
        for (let i = 1; i <= l; i++) {
            block1[salt.length + 0] = (i >> 24) & 0xFF;
            block1[salt.length + 1] = (i >> 16) & 0xFF;
            block1[salt.length + 2] = (i >> 8) & 0xFF;
            block1[salt.length + 3] = (i >> 0) & 0xFF;
            let U = sumFunc(password, block1);
            T = U.slice(0, macLength);
            for (let j = 1; j < iterations; j++) {
                U = sumFunc(password, U);
                for (let k = 0; k < macLength; k++) {
                    T[k] ^= U[k];
                }
            }
            const destPos = (i - 1) * macLength;
            const len = (i === l ? r : macLength);
            for (let j = 0; j < len; j++) {
                DK[destPos + j] = T[j];
            }
        }
        return DK;
    }
}
exports.Pbkdf2 = Pbkdf2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGJrZGYyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by9wYmtkZjIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLDhDQUE4Qzs7O0FBRTlDLDZDQUEwQztBQUMxQyw2Q0FBMEM7QUFFMUM7O0dBRUc7QUFDSCxNQUFhLE1BQU07SUFDZjs7Ozs7OztPQU9HO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FDaEIsUUFBb0IsRUFBRSxJQUFnQixFQUFFLFVBQWtCLEVBQUUsU0FBaUI7UUFDN0UsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUNuQixRQUFRLEVBQ1IsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsRUFBRSxFQUNGLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsdUJBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUNsRCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUNoQixRQUFvQixFQUFFLElBQWdCLEVBQUUsVUFBa0IsRUFBRSxTQUFpQjtRQUM3RSxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQ25CLFFBQVEsRUFDUixJQUFJLEVBQ0osVUFBVSxFQUNWLFNBQVMsRUFDVCxFQUFFLEVBQ0YsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQ2xELENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNLLE1BQU0sQ0FBQyxTQUFTLENBQ3BCLFFBQW9CLEVBQ3BCLElBQWdCLEVBQ2hCLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLFNBQWlCLEVBQ2pCLE9BQTREO1FBQzVELElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUNoQixNQUFNLElBQUksS0FB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
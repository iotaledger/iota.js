// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/* eslint-disable unicorn/prefer-math-trunc */
import { HmacSha256 } from "../macs/hmacSha256";
import { HmacSha512 } from "../macs/hmacSha512";
/**
 * Implementation of the password based key derivation function 2.
 */
export class Pbkdf2 {
    /**
     * Derive a key from the parameters using Sha256.
     * @param password The password to derive the key from.
     * @param salt The salt for the derivation.
     * @param iterations Numer of iterations to perform.
     * @param keyLength The length of the key to derive.
     * @returns The derived key.
     */
    static sha256(password, salt, iterations, keyLength) {
        return Pbkdf2.deriveKey(password, salt, iterations, keyLength, 32, (pass, block) => HmacSha256.sum256(pass, block));
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
        return Pbkdf2.deriveKey(password, salt, iterations, keyLength, 64, (pass, block) => HmacSha512.sum512(pass, block));
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
            block1[salt.length + 0] = (i >> 24) & 0xff;
            block1[salt.length + 1] = (i >> 16) & 0xff;
            block1[salt.length + 2] = (i >> 8) & 0xff;
            block1[salt.length + 3] = (i >> 0) & 0xff;
            let U = sumFunc(password, block1);
            T = U.slice(0, macLength);
            for (let j = 1; j < iterations; j++) {
                U = sumFunc(password, U);
                for (let k = 0; k < macLength; k++) {
                    T[k] ^= U[k];
                }
            }
            const destPos = (i - 1) * macLength;
            const len = i === l ? r : macLength;
            for (let j = 0; j < len; j++) {
                DK[destPos + j] = T[j];
            }
        }
        return DK;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGJrZGYyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2tleXMvcGJrZGYyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLDhDQUE4QztBQUU5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWhEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLE1BQU07SUFDZjs7Ozs7OztPQU9HO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFvQixFQUFFLElBQWdCLEVBQUUsVUFBa0IsRUFBRSxTQUFpQjtRQUM5RixPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUMvRSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FDakMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFvQixFQUFFLElBQWdCLEVBQUUsVUFBa0IsRUFBRSxTQUFpQjtRQUM5RixPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUMvRSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FDakMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0ssTUFBTSxDQUFDLFNBQVMsQ0FDcEIsUUFBb0IsRUFDcEIsSUFBZ0IsRUFDaEIsVUFBa0IsRUFDbEIsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIs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
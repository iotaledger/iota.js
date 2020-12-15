"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/* eslint-disable unicorn/prefer-math-trunc */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pbkdf2 = void 0;
var hmacSha256_1 = require("./hmacSha256");
var hmacSha512_1 = require("./hmacSha512");
/**
 * Implementation of the password based key derivation function 2.
 */
var Pbkdf2 = /** @class */ (function () {
    function Pbkdf2() {
    }
    /**
     * Derive a key from the parameters using Sha256.
     * @param password The password to derive the key from.
     * @param salt The salt for the derivation.
     * @param iterations Numer of iterations to perform.
     * @param keyLength The length of the key to derive.
     * @returns The derived key.
     */
    Pbkdf2.sha256 = function (password, salt, iterations, keyLength) {
        return Pbkdf2.deriveKey(password, salt, iterations, keyLength, 32, function (pass, block) { return hmacSha256_1.HmacSha256.sum256(pass, block); });
    };
    /**
     * Derive a key from the parameters using Sha512.
     * @param password The password to derive the key from.
     * @param salt The salt for the derivation.
     * @param iterations Numer of iterations to perform.
     * @param keyLength The length of the key to derive.
     * @returns The derived key.
     */
    Pbkdf2.sha512 = function (password, salt, iterations, keyLength) {
        return Pbkdf2.deriveKey(password, salt, iterations, keyLength, 64, function (pass, block) { return hmacSha512_1.HmacSha512.sum512(pass, block); });
    };
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
    Pbkdf2.deriveKey = function (password, salt, iterations, keyLength, macLength, sumFunc) {
        if (iterations < 1) {
            throw new Error("Iterations must be > 0");
        }
        if (keyLength > (Math.pow(2, 32) - 1) * macLength) {
            throw new Error("Requested key length is too long");
        }
        var DK = new Uint8Array(keyLength);
        var T = new Uint8Array(macLength);
        var block1 = new Uint8Array(salt.length + 4);
        var l = Math.ceil(keyLength / macLength);
        var r = (keyLength - (l - 1)) * macLength;
        block1.set(salt, 0);
        for (var i = 1; i <= l; i++) {
            block1[salt.length + 0] = (i >> 24) & 0xFF;
            block1[salt.length + 1] = (i >> 16) & 0xFF;
            block1[salt.length + 2] = (i >> 8) & 0xFF;
            block1[salt.length + 3] = (i >> 0) & 0xFF;
            var U = sumFunc(password, block1);
            T = U.slice(0, macLength);
            for (var j = 1; j < iterations; j++) {
                U = sumFunc(password, U);
                for (var k = 0; k < macLength; k++) {
                    T[k] ^= U[k];
                }
            }
            var destPos = (i - 1) * macLength;
            var len = (i === l ? r : macLength);
            for (var j = 0; j < len; j++) {
                DK[destPos + j] = T[j];
            }
        }
        return DK;
    };
    return Pbkdf2;
}());
exports.Pbkdf2 = Pbkdf2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGJrZGYyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by9wYmtkZjIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLDhDQUE4Qzs7O0FBRTlDLDJDQUEwQztBQUMxQywyQ0FBMEM7QUFFMUM7O0dBRUc7QUFDSDtJQUFBO0lBeUdBLENBQUM7SUF4R0c7Ozs7Ozs7T0FPRztJQUNXLGFBQU0sR0FBcEIsVUFDSSxRQUFvQixFQUFFLElBQWdCLEVBQUUsVUFBa0IsRUFBRSxTQUFpQjtRQUM3RSxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQ25CLFFBQVEsRUFDUixJQUFJLEVBQ0osVUFBVSxFQUNWLFNBQVMsRUFDVCxFQUFFLEVBQ0YsVUFBQyxJQUFJLEVBQUUsS0FBSyxJQUFLLE9BQUEsdUJBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUE5QixDQUE4QixDQUNsRCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDVyxhQUFNLEdBQXBCLFVBQ0ksUUFBb0IsRUFBRSxJQUFnQixFQUFFLFVBQWtCLEVBQUUsU0FBaUI7UUFDN0UsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUNuQixRQUFRLEVBQ1IsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsRUFBRSxFQUNGLFVBQUMsSUFBSSxFQUFFLEtBQUssSUFBSyxPQUFBLHVCQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBOUIsQ0FBOEIsQ0FDbEQsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ1ksZ0JBQVMsR0FBeEIsVUFDSSxRQUFvQixFQUNwQixJQUFnQixFQUNoQixVQUFrQixFQUNsQixTQUFpQixFQUNqQixTQUFpQixFQUNqQixPQUE0RDtRQUM1RCxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDaEIsTUFBTSxJ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
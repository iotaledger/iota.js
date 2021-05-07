"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChaCha20Poly1305 = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
// https://www.ietf.org/rfc/rfc8439.html
var bitHelper_1 = require("../utils/bitHelper");
var chaCha20_1 = require("./chaCha20");
var poly1305_1 = require("./poly1305");
var ChaCha20Poly1305 = /** @class */ (function () {
    /**
     * Create a new instance of ChaCha20Poly1305.
     * @param key The key.
     * @param nonce The nonce.
     * @param decrypt Are we decrypting.
     * @internal
     */
    function ChaCha20Poly1305(key, nonce, decrypt) {
        this._chacha = new chaCha20_1.ChaCha20(key, nonce);
        this._poly = new poly1305_1.Poly1305(this._chacha.keyStream(64));
        this._aadLength = 0;
        this._cipherLength = 0;
        this._decrypt = decrypt;
        this._hasData = false;
    }
    /**
     * Create a ChaCha20Poly1305 encryptor.
     * @param key The key.
     * @param nonce The nonce.
     * @returns Encryptor instance of ChaCha20Poly1305.
     */
    ChaCha20Poly1305.encryptor = function (key, nonce) {
        return new ChaCha20Poly1305(key, nonce, false);
    };
    /**
     * Create a ChaCha20Poly1305 decryptor.
     * @param key The key.
     * @param nonce The nonce.
     * @returns Decryptor instance of ChaCha20Poly1305.
     */
    ChaCha20Poly1305.decryptor = function (key, nonce) {
        return new ChaCha20Poly1305(key, nonce, true);
    };
    /**
     * Set the AAD
     * @param aad The aad to set.
     */
    ChaCha20Poly1305.prototype.setAAD = function (aad) {
        if (this._hasData) {
            throw new Error("You can not set the aad when there is already data");
        }
        this._aadLength = aad.length;
        this._poly.update(aad);
        var padLength = this.padLength(this._aadLength);
        if (padLength) {
            this._poly.update(new Uint8Array(padLength).fill(0));
        }
    };
    /**
     * Update the cipher with more data.
     * @param input The input data to include.
     * @returns The updated data.
     */
    ChaCha20Poly1305.prototype.update = function (input) {
        this._hasData = true;
        var len = input.length;
        this._cipherLength += len;
        var pad = this._chacha.keyStream(len);
        for (var i = 0; i < len; i++) {
            pad[i] ^= input[i];
        }
        if (this._decrypt) {
            this._poly.update(input);
        }
        else {
            this._poly.update(pad);
        }
        return pad;
    };
    /**
     * Finalise the data.
     */
    ChaCha20Poly1305.prototype.final = function () {
        if (this._decrypt && !this._authTag) {
            throw new Error("Can not finalise when the auth tag is not set");
        }
        var padLength = this.padLength(this._cipherLength);
        if (padLength) {
            this._poly.update(new Uint8Array(padLength).fill(0));
        }
        var lens = new Uint8Array(16);
        lens.fill(0);
        bitHelper_1.BitHelper.u32To8LittleEndian(lens, 0, this._aadLength);
        bitHelper_1.BitHelper.u32To8LittleEndian(lens, 8, this._cipherLength);
        this._poly.update(lens).finish();
        var tag = this._poly.digest();
        if (this._decrypt) {
            if (this._authTag && this.xorTest(tag, this._authTag)) {
                throw new Error("The data could not be authenticated");
            }
        }
        else {
            this._authTag = tag;
        }
    };
    /**
     * Get the auth tag.
     * @returns The auth tag.
     */
    ChaCha20Poly1305.prototype.getAuthTag = function () {
        if (this._decrypt) {
            throw new Error("Can not get the auth tag when decrypting");
        }
        if (!this._authTag) {
            throw new Error("The auth tag has not been set");
        }
        return this._authTag;
    };
    /**
     * Set the auth tag.
     * @param authTag Set the auth tag.
     */
    ChaCha20Poly1305.prototype.setAuthTag = function (authTag) {
        if (this._decrypt) {
            this._authTag = authTag;
        }
        else {
            throw new Error("Can not set the auth tag when encrypting");
        }
    };
    /**
     * Calculate the padding amount.
     * @param len The length to calculate the padding for.
     * @returns The padding amount.
     * @internal
     */
    ChaCha20Poly1305.prototype.padLength = function (len) {
        var rem = len % 16;
        if (!rem) {
            return 0;
        }
        return 16 - rem;
    };
    /**
     * Perform a xor test on the two arrays.
     * @param a The first array.
     * @param b The second array.
     * @returns The xor count.
     * @internal
     */
    ChaCha20Poly1305.prototype.xorTest = function (a, b) {
        if (a.length !== b.length) {
            return 1;
        }
        var out = 0;
        for (var i = 0; i < a.length; i++) {
            out += a[i] ^ b[i];
        }
        return out;
    };
    return ChaCha20Poly1305;
}());
exports.ChaCha20Poly1305 = ChaCha20Poly1305;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhQ2hhMjBQb2x5MTMwNS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vY2hhQ2hhMjBQb2x5MTMwNS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQix3Q0FBd0M7QUFDeEMsZ0RBQStDO0FBQy9DLHVDQUFzQztBQUN0Qyx1Q0FBc0M7QUFFdEM7SUEyQ0k7Ozs7OztPQU1HO0lBQ0gsMEJBQW9CLEdBQWUsRUFBRSxLQUFpQixFQUFFLE9BQWdCO1FBQ3BFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxtQkFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksbUJBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLDBCQUFTLEdBQXZCLFVBQXdCLEdBQWUsRUFBRSxLQUFpQjtRQUN0RCxPQUFPLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVywwQkFBUyxHQUF2QixVQUF3QixHQUFlLEVBQUUsS0FBaUI7UUFDdEQsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGlDQUFNLEdBQWIsVUFBYyxHQUFlO1FBQ3pCLElB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
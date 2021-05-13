"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChaCha20Poly1305 = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
// https://www.ietf.org/rfc/rfc8439.html
const bitHelper_1 = require("../utils/bitHelper");
const chaCha20_1 = require("./chaCha20");
const poly1305_1 = require("./poly1305");
class ChaCha20Poly1305 {
    /**
     * Create a new instance of ChaCha20Poly1305.
     * @param key The key.
     * @param nonce The nonce.
     * @param decrypt Are we decrypting.
     * @internal
     */
    constructor(key, nonce, decrypt) {
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
    static encryptor(key, nonce) {
        return new ChaCha20Poly1305(key, nonce, false);
    }
    /**
     * Create a ChaCha20Poly1305 decryptor.
     * @param key The key.
     * @param nonce The nonce.
     * @returns Decryptor instance of ChaCha20Poly1305.
     */
    static decryptor(key, nonce) {
        return new ChaCha20Poly1305(key, nonce, true);
    }
    /**
     * Set the AAD
     * @param aad The aad to set.
     */
    setAAD(aad) {
        if (this._hasData) {
            throw new Error("You can not set the aad when there is already data");
        }
        this._aadLength = aad.length;
        this._poly.update(aad);
        const padLength = this.padLength(this._aadLength);
        if (padLength) {
            this._poly.update(new Uint8Array(padLength).fill(0));
        }
    }
    /**
     * Update the cipher with more data.
     * @param input The input data to include.
     * @returns The updated data.
     */
    update(input) {
        this._hasData = true;
        const len = input.length;
        this._cipherLength += len;
        const pad = this._chacha.keyStream(len);
        for (let i = 0; i < len; i++) {
            pad[i] ^= input[i];
        }
        if (this._decrypt) {
            this._poly.update(input);
        }
        else {
            this._poly.update(pad);
        }
        return pad;
    }
    /**
     * Finalise the data.
     */
    final() {
        if (this._decrypt && !this._authTag) {
            throw new Error("Can not finalise when the auth tag is not set");
        }
        const padLength = this.padLength(this._cipherLength);
        if (padLength) {
            this._poly.update(new Uint8Array(padLength).fill(0));
        }
        const lens = new Uint8Array(16);
        lens.fill(0);
        bitHelper_1.BitHelper.u32To8LittleEndian(lens, 0, this._aadLength);
        bitHelper_1.BitHelper.u32To8LittleEndian(lens, 8, this._cipherLength);
        this._poly.update(lens).finish();
        const tag = this._poly.digest();
        if (this._decrypt) {
            if (this._authTag && this.xorTest(tag, this._authTag)) {
                throw new Error("The data could not be authenticated");
            }
        }
        else {
            this._authTag = tag;
        }
    }
    /**
     * Get the auth tag.
     * @returns The auth tag.
     */
    getAuthTag() {
        if (this._decrypt) {
            throw new Error("Can not get the auth tag when decrypting");
        }
        if (!this._authTag) {
            throw new Error("The auth tag has not been set");
        }
        return this._authTag;
    }
    /**
     * Set the auth tag.
     * @param authTag Set the auth tag.
     */
    setAuthTag(authTag) {
        if (this._decrypt) {
            this._authTag = authTag;
        }
        else {
            throw new Error("Can not set the auth tag when encrypting");
        }
    }
    /**
     * Calculate the padding amount.
     * @param len The length to calculate the padding for.
     * @returns The padding amount.
     * @internal
     */
    padLength(len) {
        const rem = len % 16;
        if (!rem) {
            return 0;
        }
        return 16 - rem;
    }
    /**
     * Perform a xor test on the two arrays.
     * @param a The first array.
     * @param b The second array.
     * @returns The xor count.
     * @internal
     */
    xorTest(a, b) {
        if (a.length !== b.length) {
            return 1;
        }
        let out = 0;
        for (let i = 0; i < a.length; i++) {
            out += a[i] ^ b[i];
        }
        return out;
    }
}
exports.ChaCha20Poly1305 = ChaCha20Poly1305;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhQ2hhMjBQb2x5MTMwNS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vY2hhQ2hhMjBQb2x5MTMwNS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQix3Q0FBd0M7QUFDeEMsa0RBQStDO0FBQy9DLHlDQUFzQztBQUN0Qyx5Q0FBc0M7QUFFdEMsTUFBYSxnQkFBZ0I7SUEyQ3pCOzs7Ozs7T0FNRztJQUNILFlBQW9CLEdBQWUsRUFBRSxLQUFpQixFQUFFLE9BQWdCO1FBQ3BFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxtQkFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksbUJBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBZSxFQUFFLEtBQWlCO1FBQ3RELE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBZSxFQUFFLEtBQWlCO1FBQ3RELE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsR0FB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
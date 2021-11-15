// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
import { Sha1 } from "../hashes/sha1.mjs";
/**
 * Class to help with HmacSha1 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha1.
 */
export class HmacSha1 {
    /**
     * Create a new instance of HmacSha1.
     * @param key The key for the hmac.
     */
    constructor(key) {
        this._sha1 = new Sha1();
        if (key.length > 64) {
            // eslint-disable-next-line newline-per-chained-call
            key = new Sha1().update(key).digest();
        }
        this._oKeyPad = new Uint8Array(64);
        const iKeyPad = new Uint8Array(64);
        for (let i = 0; i < 64; ++i) {
            const b = key[i] || 0;
            this._oKeyPad[i] = 0x5c ^ b;
            iKeyPad[i] = 0x36 ^ b;
        }
        this._sha1.update(iKeyPad);
    }
    /**
     * Perform Sum on the data.
     * @param key The key for the hmac.
     * @param data The data to operate on.
     * @returns The sum of the data.
     */
    static sum(key, data) {
        const b2b = new HmacSha1(key);
        b2b.update(data);
        return b2b.digest();
    }
    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    update(message) {
        this._sha1.update(message);
        return this;
    }
    /**
     * Get the digest.
     * @returns The digest.
     */
    digest() {
        const innerHash = this._sha1.digest();
        const finalSha256 = new Sha1();
        finalSha256.update(this._oKeyPad);
        finalSha256.update(innerHash);
        return finalSha256.digest();
    }
}

// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
// https://www.ietf.org/rfc/rfc8439.html
import { BitHelper } from "../utils/bitHelper";
import { ChaCha20 } from "./chaCha20";
import { Poly1305 } from "./poly1305";

/**
 * Implementation of the ChaCha20Poly1305 cipher.
 */
export class ChaCha20Poly1305 {
    /**
     * Instance of chacha20.
     * @internal
     */
    private readonly _chacha: ChaCha20;

    /**
     * Instance of poly1305
     * @internal
     */
    private readonly _poly: Poly1305;

    /**
     * The aad length.
     * @internal
     */
    private _aadLength: number;

    /**
     * The cipher length.
     * @internal
     */
    private _cipherLength: number;

    /**
     * The auth tag.
     * @internal
     */
    private _authTag?: Uint8Array;

    /**
     * Are we decrypting.
     * @internal
     */
    private readonly _decrypt: boolean;

    /**
     * Do we have data.
     * @internal
     */
    private _hasData: boolean;

    /**
     * Create a new instance of ChaCha20Poly1305.
     * @param key The key.
     * @param nonce The nonce.
     * @param decrypt Are we decrypting.
     * @internal
     */
    private constructor(key: Uint8Array, nonce: Uint8Array, decrypt: boolean) {
        this._chacha = new ChaCha20(key, nonce);
        this._poly = new Poly1305(this._chacha.keyStream(64));
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
    public static encryptor(key: Uint8Array, nonce: Uint8Array): ChaCha20Poly1305 {
        return new ChaCha20Poly1305(key, nonce, false);
    }

    /**
     * Create a ChaCha20Poly1305 decryptor.
     * @param key The key.
     * @param nonce The nonce.
     * @returns Decryptor instance of ChaCha20Poly1305.
     */
    public static decryptor(key: Uint8Array, nonce: Uint8Array): ChaCha20Poly1305 {
        return new ChaCha20Poly1305(key, nonce, true);
    }

    /**
     * Set the AAD.
     * @param aad The aad to set.
     */
    public setAAD(aad: Uint8Array): void {
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
    public update(input: Uint8Array): Uint8Array {
        this._hasData = true;

        const len = input.length;
        this._cipherLength += len;
        const pad = this._chacha.keyStream(len);
        for (let i = 0; i < len; i++) {
            pad[i] ^= input[i];
        }
        if (this._decrypt) {
            this._poly.update(input);
        } else {
            this._poly.update(pad);
        }
        return pad;
    }

    /**
     * Finalise the data.
     */
    public final(): void {
        if (this._decrypt && !this._authTag) {
            throw new Error("Can not finalise when the auth tag is not set");
        }

        const padLength = this.padLength(this._cipherLength);
        if (padLength) {
            this._poly.update(new Uint8Array(padLength).fill(0));
        }
        const lens = new Uint8Array(16);
        lens.fill(0);
        BitHelper.u32To8LittleEndian(lens, 0, this._aadLength);
        BitHelper.u32To8LittleEndian(lens, 8, this._cipherLength);
        this._poly.update(lens).finish();
        const tag = this._poly.digest();
        if (this._decrypt) {
            if (this._authTag && this.xorTest(tag, this._authTag)) {
                throw new Error("The data could not be authenticated");
            }
        } else {
            this._authTag = tag;
        }
    }

    /**
     * Get the auth tag.
     * @returns The auth tag.
     */
    public getAuthTag(): Uint8Array {
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
    public setAuthTag(authTag: Uint8Array): void {
        if (this._decrypt) {
            this._authTag = authTag;
        } else {
            throw new Error("Can not set the auth tag when encrypting");
        }
    }

    /**
     * Calculate the padding amount.
     * @param len The length to calculate the padding for.
     * @returns The padding amount.
     * @internal
     */
    private padLength(len: number): number {
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
    private xorTest(a: Uint8Array, b: Uint8Array): number {
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

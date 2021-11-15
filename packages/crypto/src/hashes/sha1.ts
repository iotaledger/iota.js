// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/**
 * Class to help with Sha1 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha1.
 * Although this algorithm should not be use in most cases, it is the
 * default and most widely support for generating TOTP/HOTP codes.
 */
export class Sha1 {
    /**
     * Extra constants.
     * @internal
     */
    private static readonly _EXTRA: number[] = [-2147483648, 8388608, 32768, 128];

    /**
     * Shift constants.
     * @internal
     */
    private static readonly _SHIFT: number[] = [24, 16, 8, 0];

    /**
     * Blocks.
     * @internal
     */
    private readonly blocks: number[] = [];

    /**
     * H0.
     * @internal
     */
    private h0: number;

    /**
     * H1.
     * @internal
     */
    private h1: number;

    /**
     * H2.
     * @internal
     */
    private h2: number;

    /**
     * H3.
     * @internal
     */
    private h3: number;

    /**
     * H4.
     * @internal
     */
    private h4: number;

    /**
     * Block.
     * @internal
     */
    private block: number;

    /**
     * Start.
     * @internal
     */
    private start: number;

    /**
     * Bytes.
     * @internal
     */
    private bytes: number;

    /**
     * h Bytes.
     * @internal
     */
    private hBytes: number;

    /**
     * Last byte index.
     * @internal
     */
    private lastByteIndex: number;

    /**
     * Is it finalized.
     * @internal
     */
    private finalized: boolean;

    /**
     * Is it hashed.
     * @internal
     */
    private hashed: boolean;

    /**
     * Is this the first pass.
     * @internal
     */
    private readonly first: boolean;

    /**
     * Create a new instance of Sha1.
     */
    constructor() {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.h0 = 0x67452301;
        this.h1 = 0xefcdab89;
        this.h2 = 0x98badcfe;
        this.h3 = 0x10325476;
        this.h4 = 0xc3d2e1f0;

        this.block = 0;
        this.start = 0;
        this.bytes = 0;
        this.hBytes = 0;
        this.lastByteIndex = 0;
        this.finalized = false;
        this.hashed = false;
        this.first = true;
    }

    /**
     * Perform Sum on the data.
     * @param data The data to operate on.
     * @returns The sum of the data.
     */
    public static sum(data: Uint8Array): Uint8Array {
        const b2b = new Sha1();
        b2b.update(data);
        return b2b.digest();
    }

    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     * @throws Error if the hash has already been finalized.
     */
    public update(message: Uint8Array): Sha1 {
        if (this.finalized) {
            throw new Error("The hash has already been finalized.");
        }
        let index = 0;
        let i;
        const length = message.length;
        const blocks = this.blocks;

        while (index < length) {
            if (this.hashed) {
                this.hashed = false;
                blocks[0] = this.block;
                blocks[1] = 0;
                blocks[2] = 0;
                blocks[3] = 0;
                blocks[4] = 0;
                blocks[5] = 0;
                blocks[6] = 0;
                blocks[7] = 0;
                blocks[8] = 0;
                blocks[9] = 0;
                blocks[10] = 0;
                blocks[11] = 0;
                blocks[12] = 0;
                blocks[13] = 0;
                blocks[14] = 0;
                blocks[15] = 0;
                blocks[16] = 0;
            }

            for (i = this.start; index < length && i < 64; ++index) {
                blocks[i >> 2] |= message[index] << Sha1._SHIFT[i++ & 3];
            }

            this.lastByteIndex = i;
            this.bytes += i - this.start;
            if (i >= 64) {
                this.block = blocks[16];
                this.start = i - 64;
                this.hash();
                this.hashed = true;
            } else {
                this.start = i;
            }
        }
        if (this.bytes > 4294967295) {
            this.hBytes += Math.trunc(this.bytes / 4294967296);
            this.bytes %= 4294967296;
        }
        return this;
    }

    /**
     * Get the digest.
     * @returns The digest.
     */
    public digest(): Uint8Array {
        this.finalize();

        const h0 = this.h0;
        const h1 = this.h1;
        const h2 = this.h2;
        const h3 = this.h3;
        const h4 = this.h4;

        return Uint8Array.from([
            (h0 >> 24) & 0xff,
            (h0 >> 16) & 0xff,
            (h0 >> 8) & 0xff,
            h0 & 0xff,
            (h1 >> 24) & 0xff,
            (h1 >> 16) & 0xff,
            (h1 >> 8) & 0xff,
            h1 & 0xff,
            (h2 >> 24) & 0xff,
            (h2 >> 16) & 0xff,
            (h2 >> 8) & 0xff,
            h2 & 0xff,
            (h3 >> 24) & 0xff,
            (h3 >> 16) & 0xff,
            (h3 >> 8) & 0xff,
            h3 & 0xff,
            (h4 >> 24) & 0xff,
            (h4 >> 16) & 0xff,
            (h4 >> 8) & 0xff,
            h4 & 0xff
        ]);
    }

    /**
     * Finalize the hash.
     * @internal
     */
    private finalize(): void {
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        const blocks = this.blocks;
        const i = this.lastByteIndex;
        blocks[16] = this.block;
        blocks[i >> 2] |= Sha1._EXTRA[i & 3];
        this.block = blocks[16];
        if (i >= 56) {
            if (!this.hashed) {
                this.hash();
            }
            blocks[0] = this.block;
            blocks[1] = 0;
            blocks[2] = 0;
            blocks[3] = 0;
            blocks[4] = 0;
            blocks[5] = 0;
            blocks[6] = 0;
            blocks[7] = 0;
            blocks[8] = 0;
            blocks[9] = 0;
            blocks[10] = 0;
            blocks[11] = 0;
            blocks[12] = 0;
            blocks[13] = 0;
            blocks[14] = 0;
            blocks[15] = 0;
            blocks[16] = 0;
        }
        blocks[14] = (this.hBytes << 3) | (this.bytes >>> 29);
        blocks[15] = this.bytes << 3;
        this.hash();
    }

    /**
     * Perform the hash.
     * @internal
     */
    private hash(): void {
        let a = this.h0;
        let b = this.h1;
        let c = this.h2;
        let d = this.h3;
        let e = this.h4;
        let f;
        let j;
        let t;
        const blocks = this.blocks;

        for (j = 16; j < 80; ++j) {
            t = blocks[j - 3] ^ blocks[j - 8] ^ blocks[j - 14] ^ blocks[j - 16];
            blocks[j] = (t << 1) | (t >>> 31);
        }

        for (j = 0; j < 20; j += 5) {
            f = (b & c) | (~b & d);
            t = (a << 5) | (a >>> 27);
            e = Math.trunc(t + f + e + 1518500249 + blocks[j]);
            b = (b << 30) | (b >>> 2);

            f = (a & b) | (~a & c);
            t = (e << 5) | (e >>> 27);
            d = Math.trunc(t + f + d + 1518500249 + blocks[j + 1]);
            a = (a << 30) | (a >>> 2);

            f = (e & a) | (~e & b);
            t = (d << 5) | (d >>> 27);
            c = Math.trunc(t + f + c + 1518500249 + blocks[j + 2]);
            e = (e << 30) | (e >>> 2);

            f = (d & e) | (~d & a);
            t = (c << 5) | (c >>> 27);
            b = Math.trunc(t + f + b + 1518500249 + blocks[j + 3]);
            d = (d << 30) | (d >>> 2);

            f = (c & d) | (~c & e);
            t = (b << 5) | (b >>> 27);
            a = Math.trunc(t + f + a + 1518500249 + blocks[j + 4]);
            c = (c << 30) | (c >>> 2);
        }

        for (; j < 40; j += 5) {
            f = b ^ c ^ d;
            t = (a << 5) | (a >>> 27);
            e = Math.trunc(t + f + e + 1859775393 + blocks[j]);
            b = (b << 30) | (b >>> 2);

            f = a ^ b ^ c;
            t = (e << 5) | (e >>> 27);
            d = Math.trunc(t + f + d + 1859775393 + blocks[j + 1]);
            a = (a << 30) | (a >>> 2);

            f = e ^ a ^ b;
            t = (d << 5) | (d >>> 27);
            c = Math.trunc(t + f + c + 1859775393 + blocks[j + 2]);
            e = (e << 30) | (e >>> 2);

            f = d ^ e ^ a;
            t = (c << 5) | (c >>> 27);
            b = Math.trunc(t + f + b + 1859775393 + blocks[j + 3]);
            d = (d << 30) | (d >>> 2);

            f = c ^ d ^ e;
            t = (b << 5) | (b >>> 27);
            a = Math.trunc(t + f + a + 1859775393 + blocks[j + 4]);
            c = (c << 30) | (c >>> 2);
        }

        for (; j < 60; j += 5) {
            f = (b & c) | (b & d) | (c & d);
            t = (a << 5) | (a >>> 27);
            e = Math.trunc(t + f + e - 1894007588 + blocks[j]);
            b = (b << 30) | (b >>> 2);

            f = (a & b) | (a & c) | (b & c);
            t = (e << 5) | (e >>> 27);
            d = Math.trunc(t + f + d - 1894007588 + blocks[j + 1]);
            a = (a << 30) | (a >>> 2);

            f = (e & a) | (e & b) | (a & b);
            t = (d << 5) | (d >>> 27);
            c = Math.trunc(t + f + c - 1894007588 + blocks[j + 2]);
            e = (e << 30) | (e >>> 2);

            f = (d & e) | (d & a) | (e & a);
            t = (c << 5) | (c >>> 27);
            b = Math.trunc(t + f + b - 1894007588 + blocks[j + 3]);
            d = (d << 30) | (d >>> 2);

            f = (c & d) | (c & e) | (d & e);
            t = (b << 5) | (b >>> 27);
            a = Math.trunc(t + f + a - 1894007588 + blocks[j + 4]);
            c = (c << 30) | (c >>> 2);
        }

        for (; j < 80; j += 5) {
            f = b ^ c ^ d;
            t = (a << 5) | (a >>> 27);
            e = Math.trunc(t + f + e - 899497514 + blocks[j]);
            b = (b << 30) | (b >>> 2);

            f = a ^ b ^ c;
            t = (e << 5) | (e >>> 27);
            d = Math.trunc(t + f + d - 899497514 + blocks[j + 1]);
            a = (a << 30) | (a >>> 2);

            f = e ^ a ^ b;
            t = (d << 5) | (d >>> 27);
            c = Math.trunc(t + f + c - 899497514 + blocks[j + 2]);
            e = (e << 30) | (e >>> 2);

            f = d ^ e ^ a;
            t = (c << 5) | (c >>> 27);
            b = Math.trunc(t + f + b - 899497514 + blocks[j + 3]);
            d = (d << 30) | (d >>> 2);

            f = c ^ d ^ e;
            t = (b << 5) | (b >>> 27);
            a = Math.trunc(t + f + a - 899497514 + blocks[j + 4]);
            c = (c << 30) | (c >>> 2);
        }

        this.h0 = Math.trunc(this.h0 + a);
        this.h1 = Math.trunc(this.h1 + b);
        this.h2 = Math.trunc(this.h2 + c);
        this.h3 = Math.trunc(this.h3 + d);
        this.h4 = Math.trunc(this.h4 + e);
    }
}

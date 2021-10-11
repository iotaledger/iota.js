// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/* eslint-disable unicorn/prefer-math-trunc */
/**
 * Class to help with Sha256 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha256.
 */
export class Sha256 {
    /**
     * Sha256 256.
     */
    public static readonly SIZE_256: number = 256;

    /**
     * Sha256 224.
     */
    public static readonly SIZE_224: number = 224;

    /**
     * Extra constants.
     * @internal
     */
    private static readonly EXTRA: number[] = [-2147483648, 8388608, 32768, 128];

    /**
     * Shift constants.
     * @internal
     */
    private static readonly SHIFT: number[] = [24, 16, 8, 0];

    /**
     * K.
     * @internal
     */
    private static readonly K: Uint32Array = Uint32Array.from([
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98,
        0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
        0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8,
        0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
        0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
        0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
        0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7,
        0xc67178f2
    ]);

    /**
     * Blocks.
     * @internal
     */
    private readonly _blocks: number[] = [];

    /**
     * Bits.
     * @internal
     */
    private readonly _bits: number;

    /**
     * H0.
     * @internal
     */
    private _h0: number;

    /**
     * H1.
     * @internal
     */
    private _h1: number;

    /**
     * H2.
     * @internal
     */
    private _h2: number;

    /**
     * H3.
     * @internal
     */
    private _h3: number;

    /**
     * H4.
     * @internal
     */
    private _h4: number;

    /**
     * H5.
     * @internal
     */
    private _h5: number;

    /**
     * H6.
     * @internal
     */
    private _h6: number;

    /**
     * H7.
     * @internal
     */
    private _h7: number;

    /**
     * Block.
     * @internal
     */
    private _block: number;

    /**
     * Start.
     * @internal
     */
    private _start: number;

    /**
     * Bytes.
     * @internal
     */
    private _bytes: number;

    /**
     * h Bytes.
     * @internal
     */
    private _hBytes: number;

    /**
     * Last byte index.
     * @internal
     */
    private _lastByteIndex: number;

    /**
     * Is it finalized.
     * @internal
     */
    private _finalized: boolean;

    /**
     * Is it hashed.
     * @internal
     */
    private _hashed: boolean;

    /**
     * Is this the first pass.
     * @internal
     */
    private _first: boolean;

    /**
     * Create a new instance of Sha256.
     * @param bits The number of bits.
     */
    constructor(bits: number = Sha256.SIZE_256) {
        if (bits !== Sha256.SIZE_224 && bits !== Sha256.SIZE_256) {
            throw new Error("Only 224 or 256 bits are supported");
        }
        this._blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        if (bits === Sha256.SIZE_224) {
            this._h0 = 0xc1059ed8;
            this._h1 = 0x367cd507;
            this._h2 = 0x3070dd17;
            this._h3 = 0xf70e5939;
            this._h4 = 0xffc00b31;
            this._h5 = 0x68581511;
            this._h6 = 0x64f98fa7;
            this._h7 = 0xbefa4fa4;
        } else {
            this._h0 = 0x6a09e667;
            this._h1 = 0xbb67ae85;
            this._h2 = 0x3c6ef372;
            this._h3 = 0xa54ff53a;
            this._h4 = 0x510e527f;
            this._h5 = 0x9b05688c;
            this._h6 = 0x1f83d9ab;
            this._h7 = 0x5be0cd19;
        }
        this._bits = bits;

        this._block = 0;
        this._start = 0;
        this._bytes = 0;
        this._hBytes = 0;
        this._lastByteIndex = 0;
        this._finalized = false;
        this._hashed = false;
        this._first = true;
    }

    /**
     * Perform Sum 256 on the data.
     * @param data The data to operate on.
     * @returns The sum 256 of the data.
     */
    public static sum256(data: Uint8Array): Uint8Array {
        const b2b = new Sha256(Sha256.SIZE_256);
        b2b.update(data);
        return b2b.digest();
    }

    /**
     * Perform Sum 224 on the data.
     * @param data The data to operate on.
     * @returns The sum 224 of the data.
     */
    public static sum224(data: Uint8Array): Uint8Array {
        const b2b = new Sha256(Sha256.SIZE_224);
        b2b.update(data);
        return b2b.digest();
    }

    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    public update(message: Uint8Array): Sha256 {
        if (this._finalized) {
            throw new Error("The hash has already been finalized.");
        }
        let index = 0;
        let i;
        const length = message.length;
        const blocks = this._blocks;

        while (index < length) {
            if (this._hashed) {
                this._hashed = false;
                blocks[0] = this._block;
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

            for (i = this._start; index < length && i < 64; ++index) {
                blocks[i >> 2] |= message[index] << Sha256.SHIFT[i++ & 3];
            }

            this._lastByteIndex = i;
            this._bytes += i - this._start;
            if (i >= 64) {
                this._block = blocks[16];
                this._start = i - 64;
                this.hash();
                this._hashed = true;
            } else {
                this._start = i;
            }
        }
        if (this._bytes > 4294967295) {
            this._hBytes += Math.trunc(this._bytes / 4294967296);
            this._bytes %= 4294967296;
        }

        return this;
    }

    /**
     * Get the digest.
     * @returns The digest.
     */
    public digest(): Uint8Array {
        this.finalize();

        const h0 = this._h0;
        const h1 = this._h1;
        const h2 = this._h2;
        const h3 = this._h3;
        const h4 = this._h4;
        const h5 = this._h5;
        const h6 = this._h6;
        const h7 = this._h7;

        const arr = [
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
            h4 & 0xff,
            (h5 >> 24) & 0xff,
            (h5 >> 16) & 0xff,
            (h5 >> 8) & 0xff,
            h5 & 0xff,
            (h6 >> 24) & 0xff,
            (h6 >> 16) & 0xff,
            (h6 >> 8) & 0xff,
            h6 & 0xff
        ];
        if (this._bits === Sha256.SIZE_256) {
            arr.push((h7 >> 24) & 0xff, (h7 >> 16) & 0xff, (h7 >> 8) & 0xff, h7 & 0xff);
        }
        return Uint8Array.from(arr);
    }

    /**
     * Finalize the hash.
     * @internal
     */
    private finalize(): void {
        if (this._finalized) {
            return;
        }
        this._finalized = true;
        const blocks = this._blocks;
        const i = this._lastByteIndex;
        blocks[16] = this._block;
        blocks[i >> 2] |= Sha256.EXTRA[i & 3];
        this._block = blocks[16];

        if (i >= 56) {
            if (!this._hashed) {
                this.hash();
            }
            blocks[0] = this._block;
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

        blocks[14] = (this._hBytes << 3) | (this._bytes >>> 29);
        blocks[15] = this._bytes << 3;

        this.hash();
    }

    /**
     * Perform the hash.
     * @internal
     */
    private hash(): void {
        let a = this._h0;
        let b = this._h1;
        let c = this._h2;
        let d = this._h3;
        let e = this._h4;
        let f = this._h5;
        let g = this._h6;
        let h = this._h7;
        const blocks = this._blocks;
        let j;
        let s0;
        let s1;
        let maj;
        let t1;
        let t2;
        let ch;
        let ab;
        let da;
        let cd;
        let bc;

        for (j = 16; j < 64; ++j) {
            // rightrotate
            t1 = blocks[j - 15];
            s0 = ((t1 >>> 7) | (t1 << 25)) ^ ((t1 >>> 18) | (t1 << 14)) ^ (t1 >>> 3);
            t1 = blocks[j - 2];
            s1 = ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
            blocks[j] = (blocks[j - 16] + s0 + blocks[j - 7] + s1) << 0;
        }

        bc = b & c;
        for (j = 0; j < 64; j += 4) {
            if (this._first) {
                if (this._bits === Sha256.SIZE_224) {
                    ab = 300032;
                    t1 = blocks[0] - 1413257819;
                    h = (t1 - 150054599) << 0;
                    d = (t1 + 24177077) << 0;
                } else {
                    ab = 704751109;
                    t1 = blocks[0] - 210244248;
                    h = (t1 - 1521486534) << 0;
                    d = (t1 + 143694565) << 0;
                }
                this._first = false;
            } else {
                s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
                s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
                ab = a & b;
                maj = ab ^ (a & c) ^ bc;
                ch = (e & f) ^ (~e & g);
                t1 = h + s1 + ch + Sha256.K[j] + blocks[j];
                t2 = s0 + maj;
                h = (d + t1) << 0;
                d = (t1 + t2) << 0;
            }
            s0 = ((d >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10));
            s1 = ((h >>> 6) | (h << 26)) ^ ((h >>> 11) | (h << 21)) ^ ((h >>> 25) | (h << 7));
            da = d & a;
            maj = da ^ (d & b) ^ ab;
            ch = (h & e) ^ (~h & f);
            t1 = g + s1 + ch + Sha256.K[j + 1] + blocks[j + 1];
            t2 = s0 + maj;
            g = (c + t1) << 0;
            c = (t1 + t2) << 0;
            s0 = ((c >>> 2) | (c << 30)) ^ ((c >>> 13) | (c << 19)) ^ ((c >>> 22) | (c << 10));
            s1 = ((g >>> 6) | (g << 26)) ^ ((g >>> 11) | (g << 21)) ^ ((g >>> 25) | (g << 7));
            cd = c & d;
            maj = cd ^ (c & a) ^ da;
            ch = (g & h) ^ (~g & e);
            t1 = f + s1 + ch + Sha256.K[j + 2] + blocks[j + 2];
            t2 = s0 + maj;
            f = (b + t1) << 0;
            b = (t1 + t2) << 0;
            s0 = ((b >>> 2) | (b << 30)) ^ ((b >>> 13) | (b << 19)) ^ ((b >>> 22) | (b << 10));
            s1 = ((f >>> 6) | (f << 26)) ^ ((f >>> 11) | (f << 21)) ^ ((f >>> 25) | (f << 7));
            bc = b & c;
            maj = bc ^ (b & d) ^ cd;
            ch = (f & g) ^ (~f & h);
            t1 = e + s1 + ch + Sha256.K[j + 3] + blocks[j + 3];
            t2 = s0 + maj;
            e = (a + t1) << 0;
            a = (t1 + t2) << 0;
        }

        this._h0 += Math.trunc(a);
        this._h1 += Math.trunc(b);
        this._h2 += Math.trunc(c);
        this._h3 += Math.trunc(d);
        this._h4 += Math.trunc(e);
        this._h5 += Math.trunc(f);
        this._h6 += Math.trunc(g);
        this._h7 += Math.trunc(h);
    }
}

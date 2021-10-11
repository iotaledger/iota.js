// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/* eslint-disable array-bracket-newline */
/**
 * Class to help with Sha512 scheme
 * TypeScript conversion from https://github.com/emn178/js-sha512.
 */
export class Sha512 {
    /**
     * Sha512 224.
     */
    public static SIZE_224: number = 224;

    /**
     * Sha512 256.
     */
    public static SIZE_256: number = 256;

    /**
     * Sha512 384.
     */
    public static SIZE_384: number = 384;

    /**
     * Sha512 512.
     */
    public static SIZE_512: number = 512;

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
        0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b,
        0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118, 0xd807aa98, 0xa3030242,
        0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74, 0xf27b896f, 0x80deb1fe,
        0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
        0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65, 0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc,
        0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f,
        0xbf597fc7, 0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967,
        0x0a0e6e70, 0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
        0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b, 0xa2bfe8a1,
        0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30, 0xd192e819, 0xd6ef5218,
        0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08,
        0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
        0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814,
        0xa1f0ab72, 0x8cc70208, 0x1a6439ec, 0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915,
        0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f,
        0xee6ed178, 0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
        0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c, 0x4cc5d4be,
        0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
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
     * H0 High.
     * @internal
     */
    private _h0h: number;

    /**
     * H0 Low.
     * @internal
     */
    private _h0l: number;

    /**
     * H1 High.
     * @internal
     */
    private _h1h: number;

    /**
     * H1 Low.
     * @internal
     */
    private _h1l: number;

    /**
     * H2 High.
     * @internal
     */
    private _h2h: number;

    /**
     * H2 Low.
     * @internal
     */
    private _h2l: number;

    /**
     * H3 High.
     * @internal
     */
    private _h3h: number;

    /**
     * H3 Low.
     * @internal
     */
    private _h3l: number;

    /**
     * H4 High.
     * @internal
     */
    private _h4h: number;

    /**
     * H4 Low.
     * @internal
     */
    private _h4l: number;

    /**
     * H5 High.
     * @internal
     */
    private _h5h: number;

    /**
     * H5 Low.
     * @internal
     */
    private _h5l: number;

    /**
     * H6 High.
     * @internal
     */
    private _h6h: number;

    /**
     * H6 Low.
     * @internal
     */
    private _h6l: number;

    /**
     * H7 High.
     * @internal
     */
    private _h7h: number;

    /**
     * H7 Low.
     * @internal
     */
    private _h7l: number;

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
     * Create a new instance of Sha512.
     * @param bits The number of bits.
     */
    constructor(bits: number = Sha512.SIZE_512) {
        if (
            bits !== Sha512.SIZE_224 &&
            bits !== Sha512.SIZE_256 &&
            bits !== Sha512.SIZE_384 &&
            bits !== Sha512.SIZE_512
        ) {
            throw new Error("Only 224, 256, 384 or 512 bits are supported");
        }

        this._blocks = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];

        if (bits === Sha512.SIZE_384) {
            this._h0h = 0xcbbb9d5d;
            this._h0l = 0xc1059ed8;
            this._h1h = 0x629a292a;
            this._h1l = 0x367cd507;
            this._h2h = 0x9159015a;
            this._h2l = 0x3070dd17;
            this._h3h = 0x152fecd8;
            this._h3l = 0xf70e5939;
            this._h4h = 0x67332667;
            this._h4l = 0xffc00b31;
            this._h5h = 0x8eb44a87;
            this._h5l = 0x68581511;
            this._h6h = 0xdb0c2e0d;
            this._h6l = 0x64f98fa7;
            this._h7h = 0x47b5481d;
            this._h7l = 0xbefa4fa4;
        } else if (bits === Sha512.SIZE_256) {
            this._h0h = 0x22312194;
            this._h0l = 0xfc2bf72c;
            this._h1h = 0x9f555fa3;
            this._h1l = 0xc84c64c2;
            this._h2h = 0x2393b86b;
            this._h2l = 0x6f53b151;
            this._h3h = 0x96387719;
            this._h3l = 0x5940eabd;
            this._h4h = 0x96283ee2;
            this._h4l = 0xa88effe3;
            this._h5h = 0xbe5e1e25;
            this._h5l = 0x53863992;
            this._h6h = 0x2b0199fc;
            this._h6l = 0x2c85b8aa;
            this._h7h = 0x0eb72ddc;
            this._h7l = 0x81c52ca2;
        } else if (bits === Sha512.SIZE_224) {
            this._h0h = 0x8c3d37c8;
            this._h0l = 0x19544da2;
            this._h1h = 0x73e19966;
            this._h1l = 0x89dcd4d6;
            this._h2h = 0x1dfab7ae;
            this._h2l = 0x32ff9c82;
            this._h3h = 0x679dd514;
            this._h3l = 0x582f9fcf;
            this._h4h = 0x0f6d2b69;
            this._h4l = 0x7bd44da8;
            this._h5h = 0x77e36f73;
            this._h5l = 0x04c48942;
            this._h6h = 0x3f9d85a8;
            this._h6l = 0x6a1d36c8;
            this._h7h = 0x1112e6ad;
            this._h7l = 0x91d692a1;
        } else {
            // 512
            this._h0h = 0x6a09e667;
            this._h0l = 0xf3bcc908;
            this._h1h = 0xbb67ae85;
            this._h1l = 0x84caa73b;
            this._h2h = 0x3c6ef372;
            this._h2l = 0xfe94f82b;
            this._h3h = 0xa54ff53a;
            this._h3l = 0x5f1d36f1;
            this._h4h = 0x510e527f;
            this._h4l = 0xade682d1;
            this._h5h = 0x9b05688c;
            this._h5l = 0x2b3e6c1f;
            this._h6h = 0x1f83d9ab;
            this._h6l = 0xfb41bd6b;
            this._h7h = 0x5be0cd19;
            this._h7l = 0x137e2179;
        }
        this._bits = bits;

        this._block = 0;
        this._start = 0;
        this._bytes = 0;
        this._hBytes = 0;
        this._lastByteIndex = 0;
        this._finalized = false;
        this._hashed = false;
    }

    /**
     * Perform Sum 512 on the data.
     * @param data The data to operate on.
     * @returns The sum 512 of the data.
     */
    public static sum512(data: Uint8Array): Uint8Array {
        const b2b = new Sha512(Sha512.SIZE_512);
        b2b.update(data);
        return b2b.digest();
    }

    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    public update(message: Uint8Array): Sha512 {
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
                blocks[17] = 0;
                blocks[18] = 0;
                blocks[19] = 0;
                blocks[20] = 0;
                blocks[21] = 0;
                blocks[22] = 0;
                blocks[23] = 0;
                blocks[24] = 0;
                blocks[25] = 0;
                blocks[26] = 0;
                blocks[27] = 0;
                blocks[28] = 0;
                blocks[29] = 0;
                blocks[30] = 0;
                blocks[31] = 0;
                blocks[32] = 0;
            }

            for (i = this._start; index < length && i < 128; ++index) {
                blocks[i >> 2] |= message[index] << Sha512.SHIFT[i++ & 3];
            }

            this._lastByteIndex = i;
            this._bytes += i - this._start;
            if (i >= 128) {
                this._block = blocks[32];
                this._start = i - 128;
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

        const h0h = this._h0h;
        const h0l = this._h0l;
        const h1h = this._h1h;
        const h1l = this._h1l;
        const h2h = this._h2h;
        const h2l = this._h2l;
        const h3h = this._h3h;
        const h3l = this._h3l;
        const h4h = this._h4h;
        const h4l = this._h4l;
        const h5h = this._h5h;
        const h5l = this._h5l;
        const h6h = this._h6h;
        const h6l = this._h6l;
        const h7h = this._h7h;
        const h7l = this._h7l;
        const bits = this._bits;

        const arr = [
            (h0h >> 24) & 0xff,
            (h0h >> 16) & 0xff,
            (h0h >> 8) & 0xff,
            h0h & 0xff,
            (h0l >> 24) & 0xff,
            (h0l >> 16) & 0xff,
            (h0l >> 8) & 0xff,
            h0l & 0xff,
            (h1h >> 24) & 0xff,
            (h1h >> 16) & 0xff,
            (h1h >> 8) & 0xff,
            h1h & 0xff,
            (h1l >> 24) & 0xff,
            (h1l >> 16) & 0xff,
            (h1l >> 8) & 0xff,
            h1l & 0xff,
            (h2h >> 24) & 0xff,
            (h2h >> 16) & 0xff,
            (h2h >> 8) & 0xff,
            h2h & 0xff,
            (h2l >> 24) & 0xff,
            (h2l >> 16) & 0xff,
            (h2l >> 8) & 0xff,
            h2l & 0xff,
            (h3h >> 24) & 0xff,
            (h3h >> 16) & 0xff,
            (h3h >> 8) & 0xff,
            h3h & 0xff
        ];

        if (bits >= Sha512.SIZE_256) {
            arr.push((h3l >> 24) & 0xff, (h3l >> 16) & 0xff, (h3l >> 8) & 0xff, h3l & 0xff);
        }
        if (bits >= Sha512.SIZE_384) {
            arr.push(
                (h4h >> 24) & 0xff,
                (h4h >> 16) & 0xff,
                (h4h >> 8) & 0xff,
                h4h & 0xff,
                (h4l >> 24) & 0xff,
                (h4l >> 16) & 0xff,
                (h4l >> 8) & 0xff,
                h4l & 0xff,
                (h5h >> 24) & 0xff,
                (h5h >> 16) & 0xff,
                (h5h >> 8) & 0xff,
                h5h & 0xff,
                (h5l >> 24) & 0xff,
                (h5l >> 16) & 0xff,
                (h5l >> 8) & 0xff,
                h5l & 0xff
            );
        }
        if (bits === Sha512.SIZE_512) {
            arr.push(
                (h6h >> 24) & 0xff,
                (h6h >> 16) & 0xff,
                (h6h >> 8) & 0xff,
                h6h & 0xff,
                (h6l >> 24) & 0xff,
                (h6l >> 16) & 0xff,
                (h6l >> 8) & 0xff,
                h6l & 0xff,
                (h7h >> 24) & 0xff,
                (h7h >> 16) & 0xff,
                (h7h >> 8) & 0xff,
                h7h & 0xff,
                (h7l >> 24) & 0xff,
                (h7l >> 16) & 0xff,
                (h7l >> 8) & 0xff,
                h7l & 0xff
            );
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
        blocks[32] = this._block;
        blocks[i >> 2] |= Sha512.EXTRA[i & 3];
        this._block = blocks[32];
        if (i >= 112) {
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
            blocks[17] = 0;
            blocks[18] = 0;
            blocks[19] = 0;
            blocks[20] = 0;
            blocks[21] = 0;
            blocks[22] = 0;
            blocks[23] = 0;
            blocks[24] = 0;
            blocks[25] = 0;
            blocks[26] = 0;
            blocks[27] = 0;
            blocks[28] = 0;
            blocks[29] = 0;
            blocks[30] = 0;
            blocks[31] = 0;
            blocks[32] = 0;
        }
        blocks[30] = (this._hBytes << 3) | (this._bytes >>> 29);
        blocks[31] = this._bytes << 3;
        this.hash();
    }

    /**
     * Perform the hash.
     * @internal
     */
    private hash(): void {
        const h0h = this._h0h;
        const h0l = this._h0l;
        const h1h = this._h1h;
        const h1l = this._h1l;
        const h2h = this._h2h;
        const h2l = this._h2l;
        const h3h = this._h3h;
        const h3l = this._h3l;
        const h4h = this._h4h;
        const h4l = this._h4l;
        const h5h = this._h5h;
        const h5l = this._h5l;
        const h6h = this._h6h;
        const h6l = this._h6l;
        const h7h = this._h7h;
        const h7l = this._h7l;
        const blocks = this._blocks;
        let j;
        let s0h;
        let s0l;
        let s1h;
        let s1l;
        let c1;
        let c2;
        let c3;
        let c4;
        let abh;
        let abl;
        let dah;
        let dal;
        let cdh;
        let cdl;
        let bch;
        let bcl;
        let majh;
        let majl;
        let t1h;
        let t1l;
        let t2h;
        let t2l;
        let chh;
        let chl;

        for (j = 32; j < 160; j += 2) {
            t1h = blocks[j - 30];
            t1l = blocks[j - 29];
            s0h = ((t1h >>> 1) | (t1l << 31)) ^ ((t1h >>> 8) | (t1l << 24)) ^ (t1h >>> 7);
            s0l = ((t1l >>> 1) | (t1h << 31)) ^ ((t1l >>> 8) | (t1h << 24)) ^ ((t1l >>> 7) | (t1h << 25));

            t1h = blocks[j - 4];
            t1l = blocks[j - 3];
            s1h = ((t1h >>> 19) | (t1l << 13)) ^ ((t1l >>> 29) | (t1h << 3)) ^ (t1h >>> 6);
            s1l = ((t1l >>> 19) | (t1h << 13)) ^ ((t1h >>> 29) | (t1l << 3)) ^ ((t1l >>> 6) | (t1h << 26));

            t1h = blocks[j - 32];
            t1l = blocks[j - 31];
            t2h = blocks[j - 14];
            t2l = blocks[j - 13];

            c1 = (t2l & 0xffff) + (t1l & 0xffff) + (s0l & 0xffff) + (s1l & 0xffff);
            c2 = (t2l >>> 16) + (t1l >>> 16) + (s0l >>> 16) + (s1l >>> 16) + (c1 >>> 16);
            c3 = (t2h & 0xffff) + (t1h & 0xffff) + (s0h & 0xffff) + (s1h & 0xffff) + (c2 >>> 16);
            c4 = (t2h >>> 16) + (t1h >>> 16) + (s0h >>> 16) + (s1h >>> 16) + (c3 >>> 16);

            blocks[j] = (c4 << 16) | (c3 & 0xffff);
            blocks[j + 1] = (c2 << 16) | (c1 & 0xffff);
        }

        let ah = h0h;
        let al = h0l;
        let bh = h1h;
        let bl = h1l;
        let ch = h2h;
        let cl = h2l;
        let dh = h3h;
        let dl = h3l;
        let eh = h4h;
        let el = h4l;
        let fh = h5h;
        let fl = h5l;
        let gh = h6h;
        let gl = h6l;
        let hh = h7h;
        let hl = h7l;
        bch = bh & ch;
        bcl = bl & cl;
        for (j = 0; j < 160; j += 8) {
            s0h = ((ah >>> 28) | (al << 4)) ^ ((al >>> 2) | (ah << 30)) ^ ((al >>> 7) | (ah << 25));
            s0l = ((al >>> 28) | (ah << 4)) ^ ((ah >>> 2) | (al << 30)) ^ ((ah >>> 7) | (al << 25));

            s1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((el >>> 9) | (eh << 23));
            s1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((eh >>> 9) | (el << 23));

            abh = ah & bh;
            abl = al & bl;
            majh = abh ^ (ah & ch) ^ bch;
            majl = abl ^ (al & cl) ^ bcl;

            chh = (eh & fh) ^ (~eh & gh);
            chl = (el & fl) ^ (~el & gl);

            t1h = blocks[j];
            t1l = blocks[j + 1];
            t2h = Sha512.K[j];
            t2l = Sha512.K[j + 1];

            c1 = (t2l & 0xffff) + (t1l & 0xffff) + (chl & 0xffff) + (s1l & 0xffff) + (hl & 0xffff);
            c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (hl >>> 16) + (c1 >>> 16);
            c3 = (t2h & 0xffff) + (t1h & 0xffff) + (chh & 0xffff) + (s1h & 0xffff) + (hh & 0xffff) + (c2 >>> 16);
            c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (hh >>> 16) + (c3 >>> 16);

            t1h = (c4 << 16) | (c3 & 0xffff);
            t1l = (c2 << 16) | (c1 & 0xffff);

            c1 = (majl & 0xffff) + (s0l & 0xffff);
            c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
            c3 = (majh & 0xffff) + (s0h & 0xffff) + (c2 >>> 16);
            c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

            t2h = (c4 << 16) | (c3 & 0xffff);
            t2l = (c2 << 16) | (c1 & 0xffff);

            c1 = (dl & 0xffff) + (t1l & 0xffff);
            c2 = (dl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
            c3 = (dh & 0xffff) + (t1h & 0xffff) + (c2 >>> 16);
            c4 = (dh >>> 16) + (t1h >>> 16) + (c3 >>> 16);

            hh = (c4 << 16) | (c3 & 0xffff);
            hl = (c2 << 16) | (c1 & 0xffff);

            c1 = (t2l & 0xffff) + (t1l & 0xffff);
            c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
            c3 = (t2h & 0xffff) + (t1h & 0xffff) + (c2 >>> 16);
            c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

            dh = (c4 << 16) | (c3 & 0xffff);
            dl = (c2 << 16) | (c1 & 0xffff);

            s0h = ((dh >>> 28) | (dl << 4)) ^ ((dl >>> 2) | (dh << 30)) ^ ((dl >>> 7) | (dh << 25));
            s0l = ((dl >>> 28) | (dh << 4)) ^ ((dh >>> 2) | (dl << 30)) ^ ((dh >>> 7) | (dl << 25));

            s1h = ((hh >>> 14) | (hl << 18)) ^ ((hh >>> 18) | (hl << 14)) ^ ((hl >>> 9) | (hh << 23));
            s1l = ((hl >>> 14) | (hh << 18)) ^ ((hl >>> 18) | (hh << 14)) ^ ((hh >>> 9) | (hl << 23));

            dah = dh & ah;
            dal = dl & al;
            majh = dah ^ (dh & bh) ^ abh;
            majl = dal ^ (dl & bl) ^ abl;

            chh = (hh & eh) ^ (~hh & fh);
            chl = (hl & el) ^ (~hl & fl);

            t1h = blocks[j + 2];
            t1l = blocks[j + 3];
            t2h = Sha512.K[j + 2];
            t2l = Sha512.K[j + 3];

            c1 = (t2l & 0xffff) + (t1l & 0xffff) + (chl & 0xffff) + (s1l & 0xffff) + (gl & 0xffff);
            c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (gl >>> 16) + (c1 >>> 16);
            c3 = (t2h & 0xffff) + (t1h & 0xffff) + (chh & 0xffff) + (s1h & 0xffff) + (gh & 0xffff) + (c2 >>> 16);
            c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (gh >>> 16) + (c3 >>> 16);

            t1h = (c4 << 16) | (c3 & 0xffff);
            t1l = (c2 << 16) | (c1 & 0xffff);

            c1 = (majl & 0xffff) + (s0l & 0xffff);
            c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
            c3 = (majh & 0xffff) + (s0h & 0xffff) + (c2 >>> 16);
            c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

            t2h = (c4 << 16) | (c3 & 0xffff);
            t2l = (c2 << 16) | (c1 & 0xffff);

            c1 = (cl & 0xffff) + (t1l & 0xffff);
            c2 = (cl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
            c3 = (ch & 0xffff) + (t1h & 0xffff) + (c2 >>> 16);
            c4 = (ch >>> 16) + (t1h >>> 16) + (c3 >>> 16);

            gh = (c4 << 16) | (c3 & 0xffff);
            gl = (c2 << 16) | (c1 & 0xffff);

            c1 = (t2l & 0xffff) + (t1l & 0xffff);
            c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
            c3 = (t2h & 0xffff) + (t1h & 0xffff) + (c2 >>> 16);
            c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

            ch = (c4 << 16) | (c3 & 0xffff);
            cl = (c2 << 16) | (c1 & 0xffff);

            s0h = ((ch >>> 28) | (cl << 4)) ^ ((cl >>> 2) | (ch << 30)) ^ ((cl >>> 7) | (ch << 25));
            s0l = ((cl >>> 28) | (ch << 4)) ^ ((ch >>> 2) | (cl << 30)) ^ ((ch >>> 7) | (cl << 25));

            s1h = ((gh >>> 14) | (gl << 18)) ^ ((gh >>> 18) | (gl << 14)) ^ ((gl >>> 9) | (gh << 23));
            s1l = ((gl >>> 14) | (gh << 18)) ^ ((gl >>> 18) | (gh << 14)) ^ ((gh >>> 9) | (gl << 23));

            cdh = ch & dh;
            cdl = cl & dl;
            majh = cdh ^ (ch & ah) ^ dah;
            majl = cdl ^ (cl & al) ^ dal;

            chh = (gh & hh) ^ (~gh & eh);
            chl = (gl & hl) ^ (~gl & el);

            t1h = blocks[j + 4];
            t1l = blocks[j + 5];
            t2h = Sha512.K[j + 4];
            t2l = Sha512.K[j + 5];

            c1 = (t2l & 0xffff) + (t1l & 0xffff) + (chl & 0xffff) + (s1l & 0xffff) + (fl & 0xffff);
            c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (fl >>> 16) + (c1 >>> 16);
            c3 = (t2h & 0xffff) + (t1h & 0xffff) + (chh & 0xffff) + (s1h & 0xffff) + (fh & 0xffff) + (c2 >>> 16);
            c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (fh >>> 16) + (c3 >>> 16);

            t1h = (c4 << 16) | (c3 & 0xffff);
            t1l = (c2 << 16) | (c1 & 0xffff);

            c1 = (majl & 0xffff) + (s0l & 0xffff);
            c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
            c3 = (majh & 0xffff) + (s0h & 0xffff) + (c2 >>> 16);
            c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

            t2h = (c4 << 16) | (c3 & 0xffff);
            t2l = (c2 << 16) | (c1 & 0xffff);

            c1 = (bl & 0xffff) + (t1l & 0xffff);
            c2 = (bl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
            c3 = (bh & 0xffff) + (t1h & 0xffff) + (c2 >>> 16);
            c4 = (bh >>> 16) + (t1h >>> 16) + (c3 >>> 16);

            fh = (c4 << 16) | (c3 & 0xffff);
            fl = (c2 << 16) | (c1 & 0xffff);

            c1 = (t2l & 0xffff) + (t1l & 0xffff);
            c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
            c3 = (t2h & 0xffff) + (t1h & 0xffff) + (c2 >>> 16);
            c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

            bh = (c4 << 16) | (c3 & 0xffff);
            bl = (c2 << 16) | (c1 & 0xffff);

            s0h = ((bh >>> 28) | (bl << 4)) ^ ((bl >>> 2) | (bh << 30)) ^ ((bl >>> 7) | (bh << 25));
            s0l = ((bl >>> 28) | (bh << 4)) ^ ((bh >>> 2) | (bl << 30)) ^ ((bh >>> 7) | (bl << 25));

            s1h = ((fh >>> 14) | (fl << 18)) ^ ((fh >>> 18) | (fl << 14)) ^ ((fl >>> 9) | (fh << 23));
            s1l = ((fl >>> 14) | (fh << 18)) ^ ((fl >>> 18) | (fh << 14)) ^ ((fh >>> 9) | (fl << 23));

            bch = bh & ch;
            bcl = bl & cl;
            majh = bch ^ (bh & dh) ^ cdh;
            majl = bcl ^ (bl & dl) ^ cdl;

            chh = (fh & gh) ^ (~fh & hh);
            chl = (fl & gl) ^ (~fl & hl);

            t1h = blocks[j + 6];
            t1l = blocks[j + 7];
            t2h = Sha512.K[j + 6];
            t2l = Sha512.K[j + 7];

            c1 = (t2l & 0xffff) + (t1l & 0xffff) + (chl & 0xffff) + (s1l & 0xffff) + (el & 0xffff);
            c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (el >>> 16) + (c1 >>> 16);
            c3 = (t2h & 0xffff) + (t1h & 0xffff) + (chh & 0xffff) + (s1h & 0xffff) + (eh & 0xffff) + (c2 >>> 16);
            c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (eh >>> 16) + (c3 >>> 16);

            t1h = (c4 << 16) | (c3 & 0xffff);
            t1l = (c2 << 16) | (c1 & 0xffff);

            c1 = (majl & 0xffff) + (s0l & 0xffff);
            c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
            c3 = (majh & 0xffff) + (s0h & 0xffff) + (c2 >>> 16);
            c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);

            t2h = (c4 << 16) | (c3 & 0xffff);
            t2l = (c2 << 16) | (c1 & 0xffff);

            c1 = (al & 0xffff) + (t1l & 0xffff);
            c2 = (al >>> 16) + (t1l >>> 16) + (c1 >>> 16);
            c3 = (ah & 0xffff) + (t1h & 0xffff) + (c2 >>> 16);
            c4 = (ah >>> 16) + (t1h >>> 16) + (c3 >>> 16);

            eh = (c4 << 16) | (c3 & 0xffff);
            el = (c2 << 16) | (c1 & 0xffff);

            c1 = (t2l & 0xffff) + (t1l & 0xffff);
            c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
            c3 = (t2h & 0xffff) + (t1h & 0xffff) + (c2 >>> 16);
            c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);

            ah = (c4 << 16) | (c3 & 0xffff);
            al = (c2 << 16) | (c1 & 0xffff);
        }

        c1 = (h0l & 0xffff) + (al & 0xffff);
        c2 = (h0l >>> 16) + (al >>> 16) + (c1 >>> 16);
        c3 = (h0h & 0xffff) + (ah & 0xffff) + (c2 >>> 16);
        c4 = (h0h >>> 16) + (ah >>> 16) + (c3 >>> 16);

        this._h0h = (c4 << 16) | (c3 & 0xffff);
        this._h0l = (c2 << 16) | (c1 & 0xffff);

        c1 = (h1l & 0xffff) + (bl & 0xffff);
        c2 = (h1l >>> 16) + (bl >>> 16) + (c1 >>> 16);
        c3 = (h1h & 0xffff) + (bh & 0xffff) + (c2 >>> 16);
        c4 = (h1h >>> 16) + (bh >>> 16) + (c3 >>> 16);

        this._h1h = (c4 << 16) | (c3 & 0xffff);
        this._h1l = (c2 << 16) | (c1 & 0xffff);

        c1 = (h2l & 0xffff) + (cl & 0xffff);
        c2 = (h2l >>> 16) + (cl >>> 16) + (c1 >>> 16);
        c3 = (h2h & 0xffff) + (ch & 0xffff) + (c2 >>> 16);
        c4 = (h2h >>> 16) + (ch >>> 16) + (c3 >>> 16);

        this._h2h = (c4 << 16) | (c3 & 0xffff);
        this._h2l = (c2 << 16) | (c1 & 0xffff);

        c1 = (h3l & 0xffff) + (dl & 0xffff);
        c2 = (h3l >>> 16) + (dl >>> 16) + (c1 >>> 16);
        c3 = (h3h & 0xffff) + (dh & 0xffff) + (c2 >>> 16);
        c4 = (h3h >>> 16) + (dh >>> 16) + (c3 >>> 16);

        this._h3h = (c4 << 16) | (c3 & 0xffff);
        this._h3l = (c2 << 16) | (c1 & 0xffff);

        c1 = (h4l & 0xffff) + (el & 0xffff);
        c2 = (h4l >>> 16) + (el >>> 16) + (c1 >>> 16);
        c3 = (h4h & 0xffff) + (eh & 0xffff) + (c2 >>> 16);
        c4 = (h4h >>> 16) + (eh >>> 16) + (c3 >>> 16);

        this._h4h = (c4 << 16) | (c3 & 0xffff);
        this._h4l = (c2 << 16) | (c1 & 0xffff);

        c1 = (h5l & 0xffff) + (fl & 0xffff);
        c2 = (h5l >>> 16) + (fl >>> 16) + (c1 >>> 16);
        c3 = (h5h & 0xffff) + (fh & 0xffff) + (c2 >>> 16);
        c4 = (h5h >>> 16) + (fh >>> 16) + (c3 >>> 16);

        this._h5h = (c4 << 16) | (c3 & 0xffff);
        this._h5l = (c2 << 16) | (c1 & 0xffff);

        c1 = (h6l & 0xffff) + (gl & 0xffff);
        c2 = (h6l >>> 16) + (gl >>> 16) + (c1 >>> 16);
        c3 = (h6h & 0xffff) + (gh & 0xffff) + (c2 >>> 16);
        c4 = (h6h >>> 16) + (gh >>> 16) + (c3 >>> 16);

        this._h6h = (c4 << 16) | (c3 & 0xffff);
        this._h6l = (c2 << 16) | (c1 & 0xffff);

        c1 = (h7l & 0xffff) + (hl & 0xffff);
        c2 = (h7l >>> 16) + (hl >>> 16) + (c1 >>> 16);
        c3 = (h7h & 0xffff) + (hh & 0xffff) + (c2 >>> 16);
        c4 = (h7h >>> 16) + (hh >>> 16) + (c3 >>> 16);

        this._h7h = (c4 << 16) | (c3 & 0xffff);
        this._h7l = (c2 << 16) | (c1 & 0xffff);
    }
}

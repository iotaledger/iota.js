// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
/* eslint-disable newline-per-chained-call */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which is in turn a port of the “ref10” implementation of ed25519 from SUPERCOP.
 */
import { BigIntHelper } from "@iota/util.js";
import bigInt, { BigInteger } from "big-integer";
import { BIG_1_SHIFTL_24, BIG_1_SHIFTL_25, BIG_38, BIG_8388607, BIG_ARR } from "./bigIntCommon";

/**
 * Class for field element operations.
 * FieldElement represents an element of the field GF(2^255 - 19).  An element
 * t, entries t[0]...t[9], represents the integer t[0]+2^26 t[1]+2^51 t[2]+2^77
 * t[3]+2^102 t[4]+...+2^230 t[9].  Bounds on each t[i] vary depending on
 * context.
 */
export class FieldElement {
    /**
     * Field element size.
     */
    private static readonly FIELD_ELEMENT_SIZE: number = 10;

    /**
     * The data for the element.
     */
    public data: Int32Array;

    /**
     * Create a new instance of FieldElement.
     * @param values A set of values to initialize the array.
     */
    constructor(values?: Int32Array | number[]) {
        this.data = new Int32Array(FieldElement.FIELD_ELEMENT_SIZE);
        if (values) {
            this.data.set(values);
        }
    }

    /**
     * Calculates h = f * g
     * Can overlap h with f or g.
     *
     * Preconditions:
     * |f| bounded by 1.1*2^26,1.1*2^25,1.1*2^26,1.1*2^25,etc.
     * |g| bounded by 1.1*2^26,1.1*2^25,1.1*2^26,1.1*2^25,etc.
     *
     * Postconditions:
     * |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     *
     * Notes on implementation strategy:
     *
     * Using schoolbook multiplication.
     * Karatsuba would save a little in some cost models.
     *
     * Most multiplications by 2 and 19 are 32-bit precomputations;
     * cheaper than 64-bit postcomputations.
     *
     * There is one remaining multiplication by 19 in the carry chain;
     * one *19 precomputation can be merged into this,
     * but the resulting data flow is considerably less clean.
     *
     * There are 12 carries below.
     * 10 of them are 2-way parallelizable and vectorizable.
     * Can get away with 11 carries, but then data flow is much deeper.
     *
     * With tighter constraints on inputs, can squeeze carries into: number.
     * @param f The f element.
     * @param g The g element.
     */
    public mul(f: FieldElement, g: FieldElement): void {
        const f0 = bigInt(f.data[0]);
        const f1 = bigInt(f.data[1]);
        const f2 = bigInt(f.data[2]);
        const f3 = bigInt(f.data[3]);
        const f4 = bigInt(f.data[4]);
        const f5 = bigInt(f.data[5]);
        const f6 = bigInt(f.data[6]);
        const f7 = bigInt(f.data[7]);
        const f8 = bigInt(f.data[8]);
        const f9 = bigInt(f.data[9]);

        const f12 = bigInt(2 * f.data[1]);
        const f32 = bigInt(2 * f.data[3]);
        const f52 = bigInt(2 * f.data[5]);
        const f72 = bigInt(2 * f.data[7]);
        const f92 = bigInt(2 * f.data[9]);

        const g0 = bigInt(g.data[0]);
        const g1 = bigInt(g.data[1]);
        const g2 = bigInt(g.data[2]);
        const g3 = bigInt(g.data[3]);
        const g4 = bigInt(g.data[4]);
        const g5 = bigInt(g.data[5]);
        const g6 = bigInt(g.data[6]);
        const g7 = bigInt(g.data[7]);
        const g8 = bigInt(g.data[8]);
        const g9 = bigInt(g.data[9]);

        const g119 = bigInt(19 * g.data[1]); /* 1.4*2^29 */
        const g219 = bigInt(19 * g.data[2]); /* 1.4*2^30; still ok */
        const g319 = bigInt(19 * g.data[3]);
        const g419 = bigInt(19 * g.data[4]);
        const g519 = bigInt(19 * g.data[5]);
        const g619 = bigInt(19 * g.data[6]);
        const g719 = bigInt(19 * g.data[7]);
        const g819 = bigInt(19 * g.data[8]);
        const g919 = bigInt(19 * g.data[9]);

        const h0 = f0
            .times(g0)
            .plus(f12.times(g919))
            .plus(f2.times(g819))
            .plus(f32.times(g719))
            .plus(f4.times(g619))
            .plus(f52.times(g519))
            .plus(f6.times(g419))
            .plus(f72.times(g319))
            .plus(f8.times(g219))
            .plus(f92.times(g119));
        const h1 = f0
            .times(g1)
            .plus(f1.times(g0))
            .plus(f2.times(g919))
            .plus(f3.times(g819))
            .plus(f4.times(g719))
            .plus(f5.times(g619))
            .plus(f6.times(g519))
            .plus(f7.times(g419))
            .plus(f8.times(g319))
            .plus(f9.times(g219));
        const h2 = f0
            .times(g2)
            .plus(f12.times(g1))
            .plus(f2.times(g0))
            .plus(f32.times(g919))
            .plus(f4.times(g819))
            .plus(f52.times(g719))
            .plus(f6.times(g619))
            .plus(f72.times(g519))
            .plus(f8.times(g419))
            .plus(f92.times(g319));
        const h3 = f0
            .times(g3)
            .plus(f1.times(g2))
            .plus(f2.times(g1))
            .plus(f3.times(g0))
            .plus(f4.times(g919))
            .plus(f5.times(g819))
            .plus(f6.times(g719))
            .plus(f7.times(g619))
            .plus(f8.times(g519))
            .plus(f9.times(g419));
        const h4 = f0
            .times(g4)
            .plus(f12.times(g3))
            .plus(f2.times(g2))
            .plus(f32.times(g1))
            .plus(f4.times(g0))
            .plus(f52.times(g919))
            .plus(f6.times(g819))
            .plus(f72.times(g719))
            .plus(f8.times(g619))
            .plus(f92.times(g519));
        const h5 = f0
            .times(g5)
            .plus(f1.times(g4))
            .plus(f2.times(g3))
            .plus(f3.times(g2))
            .plus(f4.times(g1))
            .plus(f5.times(g0))
            .plus(f6.times(g919))
            .plus(f7.times(g819))
            .plus(f8.times(g719))
            .plus(f9.times(g619));
        const h6 = f0
            .times(g6)
            .plus(f12.times(g5))
            .plus(f2.times(g4))
            .plus(f32.times(g3))
            .plus(f4.times(g2))
            .plus(f52.times(g1))
            .plus(f6.times(g0))
            .plus(f72.times(g919))
            .plus(f8.times(g819))
            .plus(f92.times(g719));
        const h7 = f0
            .times(g7)
            .plus(f1.times(g6))
            .plus(f2.times(g5))
            .plus(f3.times(g4))
            .plus(f4.times(g3))
            .plus(f5.times(g2))
            .plus(f6.times(g1))
            .plus(f7.times(g0))
            .plus(f8.times(g919))
            .plus(f9.times(g819));
        const h8 = f0
            .times(g8)
            .plus(f12.times(g7))
            .plus(f2.times(g6))
            .plus(f32.times(g5))
            .plus(f4.times(g4))
            .plus(f52.times(g3))
            .plus(f6.times(g2))
            .plus(f72.times(g1))
            .plus(f8.times(g0))
            .plus(f92.times(g919));
        const h9 = f0
            .times(g9)
            .plus(f1.times(g8))
            .plus(f2.times(g7))
            .plus(f3.times(g6))
            .plus(f4.times(g5))
            .plus(f5.times(g4))
            .plus(f6.times(g3))
            .plus(f7.times(g2))
            .plus(f8.times(g1))
            .plus(f9.times(g0));

        this.combine(h0, h1, h2, h3, h4, h5, h6, h7, h8, h9);
    }

    /**
     * Combine the element.
     * @param h0 The h0 component.
     * @param h1 The h1 component.
     * @param h2 The h2 component.
     * @param h3 The h3 component.
     * @param h4 The h4 component.
     * @param h5 The h5 component.
     * @param h6 The h6 component.
     * @param h7 The h7 component.
     * @param h8 The h8 component.
     * @param h9 The h9 component.
     */
    public combine(
        h0: BigInteger,
        h1: BigInteger,
        h2: BigInteger,
        h3: BigInteger,
        h4: BigInteger,
        h5: BigInteger,
        h6: BigInteger,
        h7: BigInteger,
        h8: BigInteger,
        h9: BigInteger
    ): void {
        let c0: BigInteger;
        let c4: BigInteger;

        /*
          |h0| <= (1.1*1.1*2^52*(1+19+19+19+19)+1.1*1.1*2^50*(38+38+38+38+38))
            i.e. |h0| <= 1.2*2^59; narrower ranges for h2, h4, h6, h8
          |h1| <= (1.1*1.1*2^51*(1+1+19+19+19+19+19+19+19+19))
            i.e. |h1| <= 1.5*2^58; narrower ranges for h3, h5, h7, h9
        */

        c0 = h0.plus(BIG_1_SHIFTL_25).shiftRight(BIG_ARR[26]);
        h1 = h1.plus(c0);
        h0 = h0.minus(c0.shiftLeft(BIG_ARR[26]));
        c4 = h4.plus(BIG_1_SHIFTL_25).shiftRight(BIG_ARR[26]);
        h5 = h5.plus(c4);
        h4 = h4.minus(c4.shiftLeft(BIG_ARR[26]));
        /* |h0| <= 2^25 */
        /* |h4| <= 2^25 */
        /* |h1| <= 1.51*2^58 */
        /* |h5| <= 1.51*2^58 */

        const c1 = h1.plus(BIG_1_SHIFTL_24).shiftRight(BIG_ARR[25]);
        h2 = h2.plus(c1);
        h1 = h1.minus(c1.shiftLeft(BIG_ARR[25]));
        const c5 = h5.plus(BIG_1_SHIFTL_24).shiftRight(BIG_ARR[25]);
        h6 = h6.plus(c5);
        h5 = h5.minus(c5.shiftLeft(BIG_ARR[25]));
        /* |h1| <= 2^24; from now on fits into: number */
        /* |h5| <= 2^24; from now on fits into: number */
        /* |h2| <= 1.21*2^59 */
        /* |h6| <= 1.21*2^59 */

        const c2 = h2.plus(BIG_1_SHIFTL_25).shiftRight(BIG_ARR[26]);
        h3 = h3.plus(c2);
        h2 = h2.minus(c2.shiftLeft(BIG_ARR[26]));
        const c6 = h6.plus(BIG_1_SHIFTL_25).shiftRight(BIG_ARR[26]);
        h7 = h7.plus(c6);
        h6 = h6.minus(c6.shiftLeft(BIG_ARR[26]));
        /* |h2| <= 2^25; from now on fits into: number unchanged */
        /* |h6| <= 2^25; from now on fits into: number unchanged */
        /* |h3| <= 1.51*2^58 */
        /* |h7| <= 1.51*2^58 */

        const c3 = h3.plus(BIG_1_SHIFTL_24).shiftRight(BIG_ARR[25]);
        h4 = h4.plus(c3);
        h3 = h3.minus(c3.shiftLeft(BIG_ARR[25]));
        const c7 = h7.plus(BIG_1_SHIFTL_24).shiftRight(BIG_ARR[25]);
        h8 = h8.plus(c7);
        h7 = h7.minus(c7.shiftLeft(BIG_ARR[25]));
        /* |h3| <= 2^24; from now on fits into: number unchanged */
        /* |h7| <= 2^24; from now on fits into: number unchanged */
        /* |h4| <= 1.52*2^33 */
        /* |h8| <= 1.52*2^33 */

        c4 = h4.plus(BIG_1_SHIFTL_25).shiftRight(BIG_ARR[26]);
        h5 = h5.plus(c4);
        h4 = h4.minus(c4.shiftLeft(BIG_ARR[26]));
        const c8 = h8.plus(BIG_1_SHIFTL_25).shiftRight(BIG_ARR[26]);
        h9 = h9.plus(c8);
        h8 = h8.minus(c8.shiftLeft(BIG_ARR[26]));
        /* |h4| <= 2^25; from now on fits into: number unchanged */
        /* |h8| <= 2^25; from now on fits into: number unchanged */
        /* |h5| <= 1.01*2^24 */
        /* |h9| <= 1.51*2^58 */

        const c9 = h9.plus(BIG_1_SHIFTL_24).shiftRight(BIG_ARR[25]);
        h0 = h0.plus(c9.times(BIG_ARR[19]));
        h9 = h9.minus(c9.shiftLeft(BIG_ARR[25]));
        /* |h9| <= 2^24; from now on fits into: number unchanged */
        /* |h0| <= 1.8*2^37 */

        c0 = h0.plus(BIG_1_SHIFTL_25).shiftRight(BIG_ARR[26]);
        h1 = h1.plus(c0);
        h0 = h0.minus(c0.shiftLeft(BIG_ARR[26]));
        /* |h0| <= 2^25; from now on fits into: number unchanged */
        /* |h1| <= 1.01*2^24 */

        this.data[0] = Number(h0);
        this.data[1] = Number(h1);
        this.data[2] = Number(h2);
        this.data[3] = Number(h3);
        this.data[4] = Number(h4);
        this.data[5] = Number(h5);
        this.data[6] = Number(h6);
        this.data[7] = Number(h7);
        this.data[8] = Number(h8);
        this.data[9] = Number(h9);
    }

    /**
     * FieldElement.square calculates h = f*f. Can overlap h with f.
     *
     * Preconditions:
     * |f| bounded by 1.1*2^26,1.1*2^25,1.1*2^26,1.1*2^25,etc.
     *
     * Postconditions:
     * |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     * @param f The f element.
     */
    public square(f: FieldElement): void {
        const { h0, h1, h2, h3, h4, h5, h6, h7, h8, h9 } = this.internalSquare(f);
        this.combine(h0, h1, h2, h3, h4, h5, h6, h7, h8, h9);
    }

    /**
     * FieldElement.square calculates h = f*f. Can overlap h with f.
     *
     * Preconditions:
     * |f| bounded by 1.1*2^26,1.1*2^25,1.1*2^26,1.1*2^25,etc.
     *
     * Postconditions:
     * |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     * @param f The f element.
     * @returns The components.
     */
    public internalSquare(f: FieldElement): {
        h0: BigInteger;
        h1: BigInteger;
        h2: BigInteger;
        h3: BigInteger;
        h4: BigInteger;
        h5: BigInteger;
        h6: BigInteger;
        h7: BigInteger;
        h8: BigInteger;
        h9: BigInteger;
    } {
        const f0 = bigInt(f.data[0]);
        const f1 = bigInt(f.data[1]);
        const f2 = bigInt(f.data[2]);
        const f3 = bigInt(f.data[3]);
        const f4 = bigInt(f.data[4]);
        const f5 = bigInt(f.data[5]);
        const f6 = bigInt(f.data[6]);
        const f7 = bigInt(f.data[7]);
        const f8 = bigInt(f.data[8]);
        const f9 = bigInt(f.data[9]);
        const f02 = bigInt(2 * f.data[0]);
        const f12 = bigInt(2 * f.data[1]);
        const f22 = bigInt(2 * f.data[2]);
        const f32 = bigInt(2 * f.data[3]);
        const f42 = bigInt(2 * f.data[4]);
        const f52 = bigInt(2 * f.data[5]);
        const f62 = bigInt(2 * f.data[6]);
        const f72 = bigInt(2 * f.data[7]);
        const f538 = BIG_38.times(f5); // 1.31*2^30
        const f619 = BIG_ARR[19].times(f6); // 1.31*2^30
        const f738 = BIG_38.times(f7); // 1.31*2^30
        const f819 = BIG_ARR[19].times(f8); // 1.31*2^30
        const f938 = BIG_38.times(f9); // 1.31*2^30

        return {
            h0: f0
                .times(f0)
                .plus(f12.times(f938))
                .plus(f22.times(f819))
                .plus(f32.times(f738))
                .plus(f42.times(f619))
                .plus(f5.times(f538)),
            h1: f02.times(f1).plus(f2.times(f938)).plus(f32.times(f819)).plus(f4.times(f738)).plus(f52.times(f619)),
            h2: f02
                .times(f2)
                .plus(f12.times(f1))
                .plus(f32.times(f938))
                .plus(f42.times(f819))
                .plus(f52.times(f738))
                .plus(f6.times(f619)),
            h3: f02.times(f3).plus(f12.times(f2)).plus(f4.times(f938)).plus(f52.times(f819)).plus(f6.times(f738)),
            h4: f02
                .times(f4)
                .plus(f12.times(f32))
                .plus(f2.times(f2))
                .plus(f52.times(f938))
                .plus(f62.times(f819))
                .plus(f7.times(f738)),
            h5: f02.times(f5).plus(f12.times(f4)).plus(f22.times(f3)).plus(f6.times(f938)).plus(f72.times(f819)),
            h6: f02
                .times(f6)
                .plus(f12.times(f52))
                .plus(f22.times(f4))
                .plus(f32.times(f3))
                .plus(f72.times(f938))
                .plus(f8.times(f819)),
            h7: f02.times(f7).plus(f12.times(f6)).plus(f22.times(f5)).plus(f32.times(f4)).plus(f8.times(f938)),
            h8: f02
                .times(f8)
                .plus(f12.times(f72))
                .plus(f22.times(f6))
                .plus(f32.times(f52))
                .plus(f4.times(f4))
                .plus(f9.times(f938)),
            h9: f02.times(f9).plus(f12.times(f8)).plus(f22.times(f7)).plus(f32.times(f6)).plus(f42.times(f5))
        };
    }

    /**
     * Square2 sets h = 2 * f * f.
     *
     * Can overlap h with f.
     *
     * Preconditions:
     * |f| bounded by 1.65*2^26,1.65*2^25,1.65*2^26,1.65*2^25,etc.
     *
     * Postconditions:
     * |h| bounded by 1.01*2^25,1.01*2^24,1.01*2^25,1.01*2^24,etc.
     * See fe_mul.c for discussion of implementation strategy.
     * @param f The f element.
     */
    public square2(f: FieldElement): void {
        let { h0, h1, h2, h3, h4, h5, h6, h7, h8, h9 } = this.internalSquare(f);

        h0 = h0.plus(h0);
        h1 = h1.plus(h1);
        h2 = h2.plus(h2);
        h3 = h3.plus(h3);
        h4 = h4.plus(h4);
        h5 = h5.plus(h5);
        h6 = h6.plus(h6);
        h7 = h7.plus(h7);
        h8 = h8.plus(h8);
        h9 = h9.plus(h9);

        this.combine(h0, h1, h2, h3, h4, h5, h6, h7, h8, h9);
    }

    /**
     * Add the elements and store in this.
     * @param a The a element.
     * @param b The b element.
     */
    public add(a: FieldElement, b: FieldElement): void {
        this.data[0] = a.data[0] + b.data[0];
        this.data[1] = a.data[1] + b.data[1];
        this.data[2] = a.data[2] + b.data[2];
        this.data[3] = a.data[3] + b.data[3];
        this.data[4] = a.data[4] + b.data[4];
        this.data[5] = a.data[5] + b.data[5];
        this.data[6] = a.data[6] + b.data[6];
        this.data[7] = a.data[7] + b.data[7];
        this.data[8] = a.data[8] + b.data[8];
        this.data[9] = a.data[9] + b.data[9];
    }

    /**
     * Subtract the elements and store in this.
     * @param a The a element.
     * @param b The b element.
     */
    public sub(a: FieldElement, b: FieldElement): void {
        this.data[0] = a.data[0] - b.data[0];
        this.data[1] = a.data[1] - b.data[1];
        this.data[2] = a.data[2] - b.data[2];
        this.data[3] = a.data[3] - b.data[3];
        this.data[4] = a.data[4] - b.data[4];
        this.data[5] = a.data[5] - b.data[5];
        this.data[6] = a.data[6] - b.data[6];
        this.data[7] = a.data[7] - b.data[7];
        this.data[8] = a.data[8] - b.data[8];
        this.data[9] = a.data[9] - b.data[9];
    }

    /**
     * Populate from bytes.
     * @param bytes The bytes to populate from.
     */
    public fromBytes(bytes: Uint8Array): void {
        const h0 = BigIntHelper.read4(bytes, 0);
        const h1 = BigIntHelper.read3(bytes, 4).shiftLeft(BIG_ARR[6]);
        const h2 = BigIntHelper.read3(bytes, 7).shiftLeft(BIG_ARR[5]);
        const h3 = BigIntHelper.read3(bytes, 10).shiftLeft(BIG_ARR[3]);
        const h4 = BigIntHelper.read3(bytes, 13).shiftLeft(BIG_ARR[2]);
        const h5 = BigIntHelper.read4(bytes, 16);
        const h6 = BigIntHelper.read3(bytes, 20).shiftLeft(BIG_ARR[7]);
        const h7 = BigIntHelper.read3(bytes, 23).shiftLeft(BIG_ARR[5]);
        const h8 = BigIntHelper.read3(bytes, 26).shiftLeft(BIG_ARR[4]);
        const h9 = BigIntHelper.read3(bytes, 29).and(BIG_8388607).shiftLeft(BIG_ARR[2]);

        this.combine(h0, h1, h2, h3, h4, h5, h6, h7, h8, h9);
    }

    /**
     * FieldElement.toBytes marshals h to s.
     * Preconditions:
     * |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     *
     * Write p=2^255-19; q=floor(h/p).
     * Basic claim: q = floor(2^(-255)(h + 19 2^(-25)h9 + 2^(-1))).
     *
     * Proof:
     * Have |h|<=p so |q|<=1 so |19^2 2^(-255) q|<1/4.
     * Also have |h-2^230 h9|<2^230 so |19 2^(-255)(h-2^230 h9)|<1/4.
     *
     * Write y=2^(-1)-19^2 2^(-255)q-19 2^(-255)(h-2^230 h9).
     * Then 0<y<1.
     *
     * Write r=h-pq.
     * Have 0<=r<=p-1=2^255-20.
     * Thus 0<=r+19(2^-255)r<r+19(2^-255)2^255<=2^255-1.
     *
     * Write x=r+19(2^-255)r+y.
     * Then 0<x<2^255 so floor(2^(-255)x) = 0 so floor(q+2^(-255)x) = q.
     *
     * Have q+2^(-255)x = 2^(-255)(h + 19 2^(-25) h9 + 2^(-1))
     * so floor(2^(-255)(h + 19 2^(-25) h9 + 2^(-1))) = q.
     * @param bytes The bytes to populate.
     */
    public toBytes(bytes: Uint8Array): void {
        const carry = new Int32Array(FieldElement.FIELD_ELEMENT_SIZE);

        let q = (19 * this.data[9] + (1 << 24)) >> 25;
        q = (this.data[0] + q) >> 26;
        q = (this.data[1] + q) >> 25;
        q = (this.data[2] + q) >> 26;
        q = (this.data[3] + q) >> 25;
        q = (this.data[4] + q) >> 26;
        q = (this.data[5] + q) >> 25;
        q = (this.data[6] + q) >> 26;
        q = (this.data[7] + q) >> 25;
        q = (this.data[8] + q) >> 26;
        q = (this.data[9] + q) >> 25;

        // Goal: Output h-(2^255-19)q, which is between 0 and 2^255-20.
        this.data[0] += 19 * q;
        // Goal: Output h-2^255 q, which is between 0 and 2^255-20.

        carry[0] = this.data[0] >> 26;
        this.data[1] += carry[0];
        this.data[0] -= carry[0] << 26;
        carry[1] = this.data[1] >> 25;
        this.data[2] += carry[1];
        this.data[1] -= carry[1] << 25;
        carry[2] = this.data[2] >> 26;
        this.data[3] += carry[2];
        this.data[2] -= carry[2] << 26;
        carry[3] = this.data[3] >> 25;
        this.data[4] += carry[3];
        this.data[3] -= carry[3] << 25;
        carry[4] = this.data[4] >> 26;
        this.data[5] += carry[4];
        this.data[4] -= carry[4] << 26;
        carry[5] = this.data[5] >> 25;
        this.data[6] += carry[5];
        this.data[5] -= carry[5] << 25;
        carry[6] = this.data[6] >> 26;
        this.data[7] += carry[6];
        this.data[6] -= carry[6] << 26;
        carry[7] = this.data[7] >> 25;
        this.data[8] += carry[7];
        this.data[7] -= carry[7] << 25;
        carry[8] = this.data[8] >> 26;
        this.data[9] += carry[8];
        this.data[8] -= carry[8] << 26;
        carry[9] = this.data[9] >> 25;
        this.data[9] -= carry[9] << 25;
        // h10 = carry9

        // Goal: Output h[0]+...+2^255 h10-2^255 q, which is between 0 and 2^255-20.
        // Have h[0]+...+2^230 h[9] between 0 and 2^255-1;
        // evidently 2^255 h10-2^255 q = 0.
        // Goal: Output h[0]+...+2^230 h[9].

        bytes[0] = Math.trunc(this.data[0]);
        bytes[1] = this.data[0] >> 8;
        bytes[2] = this.data[0] >> 16;
        bytes[3] = (this.data[0] >> 24) | (this.data[1] << 2);
        bytes[4] = this.data[1] >> 6;
        bytes[5] = this.data[1] >> 14;
        bytes[6] = (this.data[1] >> 22) | (this.data[2] << 3);
        bytes[7] = this.data[2] >> 5;
        bytes[8] = this.data[2] >> 13;
        bytes[9] = (this.data[2] >> 21) | (this.data[3] << 5);
        bytes[10] = this.data[3] >> 3;
        bytes[11] = this.data[3] >> 11;
        bytes[12] = (this.data[3] >> 19) | (this.data[4] << 6);
        bytes[13] = this.data[4] >> 2;
        bytes[14] = this.data[4] >> 10;
        bytes[15] = this.data[4] >> 18;
        bytes[16] = Math.trunc(this.data[5]);
        bytes[17] = this.data[5] >> 8;
        bytes[18] = this.data[5] >> 16;
        bytes[19] = (this.data[5] >> 24) | (this.data[6] << 1);
        bytes[20] = this.data[6] >> 7;
        bytes[21] = this.data[6] >> 15;
        bytes[22] = (this.data[6] >> 23) | (this.data[7] << 3);
        bytes[23] = this.data[7] >> 5;
        bytes[24] = this.data[7] >> 13;
        bytes[25] = (this.data[7] >> 21) | (this.data[8] << 4);
        bytes[26] = this.data[8] >> 4;
        bytes[27] = this.data[8] >> 12;
        bytes[28] = (this.data[8] >> 20) | (this.data[9] << 6);
        bytes[29] = this.data[9] >> 2;
        bytes[30] = this.data[9] >> 10;
        bytes[31] = this.data[9] >> 18;
    }

    /**
     * Is the element negative.
     * @returns 1 if its negative.
     */
    public isNegative(): number {
        const s = new Uint8Array(32);
        this.toBytes(s);
        return s[0] & 1;
    }

    /**
     * Is the value non zero.
     * @returns 1 if non zero.
     */
    public isNonZero(): number {
        const s = new Uint8Array(32);
        this.toBytes(s);
        let x: number = 0;
        for (let i = 0; i < s.length; i++) {
            x |= s[i];
        }
        x |= x >> 4;
        x |= x >> 2;
        x |= x >> 1;
        return x & 1;
    }

    /**
     * Neg sets h = -f.
     *
     * Preconditions:
     * |f| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     *
     * Postconditions:
     * |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     */
    public neg(): void {
        for (let i = 0; i < FieldElement.FIELD_ELEMENT_SIZE; i++) {
            this.data[i] = -this.data[i];
        }
    }

    /**
     * Invert.
     * @param z The elemnt to invert.
     */
    public invert(z: FieldElement): void {
        const t0 = new FieldElement();
        const t1 = new FieldElement();
        const t2 = new FieldElement();
        const t3 = new FieldElement();
        let i;

        t0.square(z); // 2^1
        t1.square(t0); // 2^2
        for (i = 1; i < 2; i++) {
            // 2^3
            t1.square(t1);
        }
        t1.mul(z, t1); // 2^3 + 2^0
        t0.mul(t0, t1); // 2^3 + 2^1 + 2^0
        t2.square(t0); // 2^4 + 2^2 + 2^1
        t1.mul(t1, t2); // 2^4 + 2^3 + 2^2 + 2^1 + 2^0
        t2.square(t1); // 5,4,3,2,1
        for (i = 1; i < 5; i++) {
            // 9,8,7,6,5
            t2.square(t2);
        }
        t1.mul(t2, t1); // 9,8,7,6,5,4,3,2,1,0
        t2.square(t1); // 10..1
        for (i = 1; i < 10; i++) {
            // 19..10
            t2.square(t2);
        }
        t2.mul(t2, t1); // 19..0
        t3.square(t2); // 20..1
        for (i = 1; i < 20; i++) {
            // 39..20
            t3.square(t3);
        }
        t2.mul(t3, t2); // 39..0
        t2.square(t2); // 40..1
        for (i = 1; i < 10; i++) {
            // 49..10
            t2.square(t2);
        }
        t1.mul(t2, t1); // 49..0
        t2.square(t1); // 50..1
        for (i = 1; i < 50; i++) {
            // 99..50
            t2.square(t2);
        }
        t2.mul(t2, t1); // 99..0
        t3.square(t2); // 100..1
        for (i = 1; i < 100; i++) {
            // 199..100
            t3.square(t3);
        }
        t2.mul(t3, t2); // 199..0
        t2.square(t2); // 200..1
        for (i = 1; i < 50; i++) {
            // 249..50
            t2.square(t2);
        }
        t1.mul(t2, t1); // 249..0
        t1.square(t1); // 250..1
        for (i = 1; i < 5; i++) {
            // 254..5
            t1.square(t1);
        }
        this.mul(t1, t0); // 254..5,3,1,0
    }

    /**
     * Perform the pow 22523 calculate.
     * @param z The element to operate on.
     */
    public pow22523(z: FieldElement): void {
        const t0 = new FieldElement();
        const t1 = new FieldElement();
        const t2 = new FieldElement();
        let i;

        t0.square(z);
        // for (i = 1; i < 1; i++) {
        //     t0.square(t0);
        // }
        t1.square(t0);
        for (i = 1; i < 2; i++) {
            t1.square(t1);
        }
        t1.mul(z, t1);
        t0.mul(t0, t1);
        t0.square(t0);
        // for (i = 1; i < 1; i++) {
        //     t0.square(t0);
        // }
        t0.mul(t1, t0);
        t1.square(t0);
        for (i = 1; i < 5; i++) {
            t1.square(t1);
        }
        t0.mul(t1, t0);
        t1.square(t0);
        for (i = 1; i < 10; i++) {
            t1.square(t1);
        }
        t1.mul(t1, t0);
        t2.square(t1);
        for (i = 1; i < 20; i++) {
            t2.square(t2);
        }
        t1.mul(t2, t1);
        t1.square(t1);
        for (i = 1; i < 10; i++) {
            t1.square(t1);
        }
        t0.mul(t1, t0);
        t1.square(t0);
        for (i = 1; i < 50; i++) {
            t1.square(t1);
        }
        t1.mul(t1, t0);
        t2.square(t1);
        for (i = 1; i < 100; i++) {
            t2.square(t2);
        }
        t1.mul(t2, t1);
        t1.square(t1);
        for (i = 1; i < 50; i++) {
            t1.square(t1);
        }
        t0.mul(t1, t0);
        t0.square(t0);
        for (i = 1; i < 2; i++) {
            t0.square(t0);
        }
        this.mul(t0, z);
    }

    /**
     * Replace (f,g) with (g,g) if b == 1;
     * replace (f,g) with (f,g) if b == 0.
     *
     * Preconditions: b in {0,1}.
     * @param g The g element.
     * @param b The b value.
     */
    public cMove(g: FieldElement, b: number): void {
        b = -b;
        this.data[0] ^= b & (this.data[0] ^ g.data[0]);
        this.data[1] ^= b & (this.data[1] ^ g.data[1]);
        this.data[2] ^= b & (this.data[2] ^ g.data[2]);
        this.data[3] ^= b & (this.data[3] ^ g.data[3]);
        this.data[4] ^= b & (this.data[4] ^ g.data[4]);
        this.data[5] ^= b & (this.data[5] ^ g.data[5]);
        this.data[6] ^= b & (this.data[6] ^ g.data[6]);
        this.data[7] ^= b & (this.data[7] ^ g.data[7]);
        this.data[8] ^= b & (this.data[8] ^ g.data[8]);
        this.data[9] ^= b & (this.data[9] ^ g.data[9]);
    }

    /**
     * Zero the values.
     */
    public zero(): void {
        this.data.fill(0);
    }

    /**
     * Zero all the values and set the first byte to 1.
     */
    public one(): void {
        this.data.fill(0);
        this.data[0] = 1;
    }

    /**
     * Clone the field element.
     * @returns The clones element.
     */
    public clone(): FieldElement {
        return new FieldElement(this.data);
    }
}

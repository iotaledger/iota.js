// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/* eslint-disable newline-per-chained-call */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP.
 */
import { BigIntHelper } from "@iota/util.js";
import bigInt, { BigInteger } from "big-integer";
import {
    BIG_136657,
    BIG_1_SHIFTL_20,
    BIG_2097151,
    BIG_470296,
    BIG_654183,
    BIG_666643,
    BIG_683901,
    BIG_997805,
    BIG_ARR
} from "./bigIntCommon";
import { CONST_ORDER } from "./const";

/**
 * The scalars are GF(2^252 + 27742317777372353535851937790883648493).
 *
 * Input
 * a[0]+256*a[1]+...+256^31*a[31] = a
 * b[0]+256*b[1]+...+256^31*b[31] = b
 * c[0]+256*c[1]+...+256^31*c[31] = c.
 *
 * Output
 * s[0]+256*s[1]+...+256^31*s[31] = (ab+c) mod l
 * where l = 2^252 + 27742317777372353535851937790883648493.
 * @param s The scalar.
 * @param a The a.
 * @param b The b.
 * @param c The c.
 */
export function scalarMulAdd(s: Uint8Array, a: Uint8Array, b: Uint8Array, c: Uint8Array): void {
    const a0 = BIG_2097151.and(BigIntHelper.read3(a, 0));
    const a1 = BIG_2097151.and(BigIntHelper.read4(a, 2).shiftRight(BIG_ARR[5]));
    const a2 = BIG_2097151.and(BigIntHelper.read3(a, 5).shiftRight(BIG_ARR[2]));
    const a3 = BIG_2097151.and(BigIntHelper.read4(a, 7).shiftRight(BIG_ARR[7]));
    const a4 = BIG_2097151.and(BigIntHelper.read4(a, 10).shiftRight(BIG_ARR[4]));
    const a5 = BIG_2097151.and(BigIntHelper.read3(a, 13).shiftRight(BIG_ARR[1]));
    const a6 = BIG_2097151.and(BigIntHelper.read4(a, 15).shiftRight(BIG_ARR[6]));
    const a7 = BIG_2097151.and(BigIntHelper.read3(a, 18).shiftRight(BIG_ARR[3]));
    const a8 = BIG_2097151.and(BigIntHelper.read3(a, 21));
    const a9 = BIG_2097151.and(BigIntHelper.read4(a, 23).shiftRight(BIG_ARR[5]));
    const a10 = BIG_2097151.and(BigIntHelper.read3(a, 26).shiftRight(BIG_ARR[2]));
    const a11 = BigIntHelper.read4(a, 28).shiftRight(BIG_ARR[7]);
    const b0 = BIG_2097151.and(BigIntHelper.read3(b, 0));
    const b1 = BIG_2097151.and(BigIntHelper.read4(b, 2).shiftRight(BIG_ARR[5]));
    const b2 = BIG_2097151.and(BigIntHelper.read3(b, 5).shiftRight(BIG_ARR[2]));
    const b3 = BIG_2097151.and(BigIntHelper.read4(b, 7).shiftRight(BIG_ARR[7]));
    const b4 = BIG_2097151.and(BigIntHelper.read4(b, 10).shiftRight(BIG_ARR[4]));
    const b5 = BIG_2097151.and(BigIntHelper.read3(b, 13).shiftRight(BIG_ARR[1]));
    const b6 = BIG_2097151.and(BigIntHelper.read4(b, 15).shiftRight(BIG_ARR[6]));
    const b7 = BIG_2097151.and(BigIntHelper.read3(b, 18).shiftRight(BIG_ARR[3]));
    const b8 = BIG_2097151.and(BigIntHelper.read3(b, 21));
    const b9 = BIG_2097151.and(BigIntHelper.read4(b, 23).shiftRight(BIG_ARR[5]));
    const b10 = BIG_2097151.and(BigIntHelper.read3(b, 26).shiftRight(BIG_ARR[2]));
    const b11 = BigIntHelper.read4(b, 28).shiftRight(BIG_ARR[7]);
    const c0 = BIG_2097151.and(BigIntHelper.read3(c, 0));
    const c1 = BIG_2097151.and(BigIntHelper.read4(c, 2).shiftRight(BIG_ARR[5]));
    const c2 = BIG_2097151.and(BigIntHelper.read3(c, 5).shiftRight(BIG_ARR[2]));
    const c3 = BIG_2097151.and(BigIntHelper.read4(c, 7).shiftRight(BIG_ARR[7]));
    const c4 = BIG_2097151.and(BigIntHelper.read4(c, 10).shiftRight(BIG_ARR[4]));
    const c5 = BIG_2097151.and(BigIntHelper.read3(c, 13).shiftRight(BIG_ARR[1]));
    const c6 = BIG_2097151.and(BigIntHelper.read4(c, 15).shiftRight(BIG_ARR[6]));
    const c7 = BIG_2097151.and(BigIntHelper.read3(c, 18).shiftRight(BIG_ARR[3]));
    const c8 = BIG_2097151.and(BigIntHelper.read3(c, 21));
    const c9 = BIG_2097151.and(BigIntHelper.read4(c, 23).shiftRight(BIG_ARR[5]));
    const c10 = BIG_2097151.and(BigIntHelper.read3(c, 26).shiftRight(BIG_ARR[2]));
    const c11 = BigIntHelper.read4(c, 28).shiftRight(BIG_ARR[7]);

    const carry: BigInteger[] = [];
    for (let i = 0; i < 32; i++) {
        carry[i] = bigInt(0);
    }

    let s0 = c0.add(a0.times(b0));
    let s1 = c1.add(a0.times(b1).add(a1.times(b0)));
    let s2 = c2.add(a0.times(b2).add(a1.times(b1)).add(a2.times(b0)));
    let s3 = c3.add(a0.times(b3).add(a1.times(b2)).add(a2.times(b1)).add(a3.times(b0)));
    let s4 = c4.add(a0.times(b4).add(a1.times(b3)).add(a2.times(b2)).add(a3.times(b1)).add(a4.times(b0)));
    let s5 = c5.add(
        a0.times(b5).add(a1.times(b4)).add(a2.times(b3)).add(a3.times(b2)).add(a4.times(b1)).add(a5.times(b0))
    );
    let s6 = c6.add(
        a0
            .times(b6)
            .add(a1.times(b5))
            .add(a2.times(b4))
            .add(a3.times(b3))
            .add(a4.times(b2))
            .add(a5.times(b1))
            .add(a6.times(b0))
    );
    let s7 = c7
        .add(
            a0
                .times(b7)
                .add(a1.times(b6))
                .add(a2.times(b5))
                .add(a3.times(b4))
                .add(a4.times(b3))
                .add(a5.times(b2))
                .add(a6.times(b1))
        )
        .add(a7.times(b0));
    let s8 = c8.add(
        a0
            .times(b8)
            .add(a1.times(b7))
            .add(a2.times(b6))
            .add(a3.times(b5))
            .add(a4.times(b4))
            .add(a5.times(b3))
            .add(a6.times(b2))
            .add(a7.times(b1))
            .add(a8.times(b0))
    );
    let s9 = c9
        .add(a0.times(b9))
        .add(a1.times(b8))
        .add(a2.times(b7))
        .add(a3.times(b6))
        .add(a4.times(b5))
        .add(a5.times(b4))
        .add(a6.times(b3))
        .add(a7.times(b2))
        .add(a8.times(b1))
        .add(a9.times(b0));
    let s10 = c10
        .add(a0.times(b10))
        .add(a1.times(b9))
        .add(a2.times(b8))
        .add(a3.times(b7))
        .add(a4.times(b6))
        .add(a5.times(b5))
        .add(a6.times(b4))
        .add(a7.times(b3))
        .add(a8.times(b2))
        .add(a9.times(b1))
        .add(a10.times(b0));
    let s11 = c11
        .add(a0.times(b11))
        .add(a1.times(b10))
        .add(a2.times(b9))
        .add(a3.times(b8))
        .add(a4.times(b7))
        .add(a5.times(b6))
        .add(a6.times(b5))
        .add(a7.times(b4))
        .add(a8.times(b3))
        .add(a9.times(b2))
        .add(a10.times(b1))
        .add(a11.times(b0));
    let s12 = a1
        .times(b11)
        .add(a2.times(b10))
        .add(a3.times(b9))
        .add(a4.times(b8))
        .add(a5.times(b7))
        .add(a6.times(b6))
        .add(a7.times(b5))
        .add(a8.times(b4))
        .add(a9.times(b3))
        .add(a10.times(b2))
        .add(a11.times(b1));
    let s13 = a2
        .times(b11)
        .add(a3.times(b10))
        .add(a4.times(b9))
        .add(a5.times(b8))
        .add(a6.times(b7))
        .add(a7.times(b6))
        .add(a8.times(b5))
        .add(a9.times(b4))
        .add(a10.times(b3))
        .add(a11.times(b2));
    let s14 = a3
        .times(b11)
        .add(a4.times(b10))
        .add(a5.times(b9))
        .add(a6.times(b8))
        .add(a7.times(b7))
        .add(a8.times(b6))
        .add(a9.times(b5))
        .add(a10.times(b4))
        .add(a11.times(b3));
    let s15 = a4
        .times(b11)
        .add(a5.times(b10))
        .add(a6.times(b9))
        .add(a7.times(b8))
        .add(a8.times(b7))
        .add(a9.times(b6))
        .add(a10.times(b5))
        .add(a11.times(b4));
    let s16 = a5
        .times(b11)
        .add(a6.times(b10))
        .add(a7.times(b9))
        .add(a8.times(b8))
        .add(a9.times(b7))
        .add(a10.times(b6))
        .add(a11.times(b5));
    let s17 = a6
        .times(b11)
        .add(a7.times(b10))
        .add(a8.times(b9))
        .add(a9.times(b8))
        .add(a10.times(b7))
        .add(a11.times(b6));
    let s18 = a7.times(b11).add(a8.times(b10)).add(a9.times(b9)).add(a10.times(b8)).add(a11.times(b7));
    let s19 = a8.times(b11).add(a9.times(b10)).add(a10.times(b9)).add(a11.times(b8));
    let s20 = a9.times(b11).add(a10.times(b10)).add(a11.times(b9));
    let s21 = a10.times(b11).add(a11.times(b10));
    let s22 = a11.times(b11);
    let s23 = BIG_ARR[0];

    carry[0] = s0.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s1 = s1.add(carry[0]);
    s0 = s0.minus(carry[0].shiftLeft(BIG_ARR[21]));
    carry[2] = s2.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s3 = s3.add(carry[2]);
    s2 = s2.minus(carry[2].shiftLeft(BIG_ARR[21]));
    carry[4] = s4.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s5 = s5.add(carry[4]);
    s4 = s4.minus(carry[4].shiftLeft(BIG_ARR[21]));
    carry[6] = s6.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s7 = s7.add(carry[6]);
    s6 = s6.minus(carry[6].shiftLeft(BIG_ARR[21]));
    carry[8] = s8.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s9 = s9.add(carry[8]);
    s8 = s8.minus(carry[8].shiftLeft(BIG_ARR[21]));
    carry[10] = s10.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s11 = s11.add(carry[10]);
    s10 = s10.minus(carry[10].shiftLeft(BIG_ARR[21]));
    carry[12] = s12.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s13 = s13.add(carry[12]);
    s12 = s12.minus(carry[12].shiftLeft(BIG_ARR[21]));
    carry[14] = s14.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s15 = s15.add(carry[14]);
    s14 = s14.minus(carry[14].shiftLeft(BIG_ARR[21]));
    carry[16] = s16.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s17 = s17.add(carry[16]);
    s16 = s16.minus(carry[16].shiftLeft(BIG_ARR[21]));
    carry[18] = s18.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s19 = s19.add(carry[18]);
    s18 = s18.minus(carry[18].shiftLeft(BIG_ARR[21]));
    carry[20] = s20.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s21 = s21.add(carry[20]);
    s20 = s20.minus(carry[20].shiftLeft(BIG_ARR[21]));
    carry[22] = s22.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s23 = s23.add(carry[22]);
    s22 = s22.minus(carry[22].shiftLeft(BIG_ARR[21]));

    carry[1] = s1.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s2 = s2.add(carry[1]);
    s1 = s1.minus(carry[1].shiftLeft(BIG_ARR[21]));
    carry[3] = s3.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s4 = s4.add(carry[3]);
    s3 = s3.minus(carry[3].shiftLeft(BIG_ARR[21]));
    carry[5] = s5.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s6 = s6.add(carry[5]);
    s5 = s5.minus(carry[5].shiftLeft(BIG_ARR[21]));
    carry[7] = s7.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s8 = s8.add(carry[7]);
    s7 = s7.minus(carry[7].shiftLeft(BIG_ARR[21]));
    carry[9] = s9.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s10 = s10.add(carry[9]);
    s9 = s9.minus(carry[9].shiftLeft(BIG_ARR[21]));
    carry[11] = s11.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s12 = s12.add(carry[11]);
    s11 = s11.minus(carry[11].shiftLeft(BIG_ARR[21]));
    carry[13] = s13.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s14 = s14.add(carry[13]);
    s13 = s13.minus(carry[13].shiftLeft(BIG_ARR[21]));
    carry[15] = s15.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s16 = s16.add(carry[15]);
    s15 = s15.minus(carry[15].shiftLeft(BIG_ARR[21]));
    carry[17] = s17.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s18 = s18.add(carry[17]);
    s17 = s17.minus(carry[17].shiftLeft(BIG_ARR[21]));
    carry[19] = s19.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s20 = s20.add(carry[19]);
    s19 = s19.minus(carry[19].shiftLeft(BIG_ARR[21]));
    carry[21] = s21.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s22 = s22.add(carry[21]);
    s21 = s21.minus(carry[21].shiftLeft(BIG_ARR[21]));

    s11 = s11.add(s23.times(BIG_666643));
    s12 = s12.add(s23.times(BIG_470296));
    s13 = s13.add(s23.times(BIG_654183));
    s14 = s14.minus(s23.times(BIG_997805));
    s15 = s15.add(s23.times(BIG_136657));
    s16 = s16.minus(s23.times(BIG_683901));
    s23 = BIG_ARR[0];

    s10 = s10.add(s22.times(BIG_666643));
    s11 = s11.add(s22.times(BIG_470296));
    s12 = s12.add(s22.times(BIG_654183));
    s13 = s13.minus(s22.times(BIG_997805));
    s14 = s14.add(s22.times(BIG_136657));
    s15 = s15.minus(s22.times(BIG_683901));
    s22 = BIG_ARR[0];

    s9 = s9.add(s21.times(BIG_666643));
    s10 = s10.add(s21.times(BIG_470296));
    s11 = s11.add(s21.times(BIG_654183));
    s12 = s12.minus(s21.times(BIG_997805));
    s13 = s13.add(s21.times(BIG_136657));
    s14 = s14.minus(s21.times(BIG_683901));
    s21 = BIG_ARR[0];

    s8 = s8.add(s20.times(BIG_666643));
    s9 = s9.add(s20.times(BIG_470296));
    s10 = s10.add(s20.times(BIG_654183));
    s11 = s11.minus(s20.times(BIG_997805));
    s12 = s12.add(s20.times(BIG_136657));
    s13 = s13.minus(s20.times(BIG_683901));
    s20 = BIG_ARR[0];

    s7 = s7.add(s19.times(BIG_666643));
    s8 = s8.add(s19.times(BIG_470296));
    s9 = s9.add(s19.times(BIG_654183));
    s10 = s10.minus(s19.times(BIG_997805));
    s11 = s11.add(s19.times(BIG_136657));
    s12 = s12.minus(s19.times(BIG_683901));
    s19 = BIG_ARR[0];

    s6 = s6.add(s18.times(BIG_666643));
    s7 = s7.add(s18.times(BIG_470296));
    s8 = s8.add(s18.times(BIG_654183));
    s9 = s9.minus(s18.times(BIG_997805));
    s10 = s10.add(s18.times(BIG_136657));
    s11 = s11.minus(s18.times(BIG_683901));
    s18 = BIG_ARR[0];

    carry[6] = s6.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s7 = s7.add(carry[6]);
    s6 = s6.minus(carry[6].shiftLeft(BIG_ARR[21]));
    carry[8] = s8.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s9 = s9.add(carry[8]);
    s8 = s8.minus(carry[8].shiftLeft(BIG_ARR[21]));
    carry[10] = s10.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s11 = s11.add(carry[10]);
    s10 = s10.minus(carry[10].shiftLeft(BIG_ARR[21]));
    carry[12] = s12.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s13 = s13.add(carry[12]);
    s12 = s12.minus(carry[12].shiftLeft(BIG_ARR[21]));
    carry[14] = s14.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s15 = s15.add(carry[14]);
    s14 = s14.minus(carry[14].shiftLeft(BIG_ARR[21]));
    carry[16] = s16.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s17 = s17.add(carry[16]);
    s16 = s16.minus(carry[16].shiftLeft(BIG_ARR[21]));

    carry[7] = s7.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s8 = s8.add(carry[7]);
    s7 = s7.minus(carry[7].shiftLeft(BIG_ARR[21]));
    carry[9] = s9.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s10 = s10.add(carry[9]);
    s9 = s9.minus(carry[9].shiftLeft(BIG_ARR[21]));
    carry[11] = s11.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s12 = s12.add(carry[11]);
    s11 = s11.minus(carry[11].shiftLeft(BIG_ARR[21]));
    carry[13] = s13.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s14 = s14.add(carry[13]);
    s13 = s13.minus(carry[13].shiftLeft(BIG_ARR[21]));
    carry[15] = s15.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s16 = s16.add(carry[15]);
    s15 = s15.minus(carry[15].shiftLeft(BIG_ARR[21]));

    s5 = s5.add(s17.times(BIG_666643));
    s6 = s6.add(s17.times(BIG_470296));
    s7 = s7.add(s17.times(BIG_654183));
    s8 = s8.minus(s17.times(BIG_997805));
    s9 = s9.add(s17.times(BIG_136657));
    s10 = s10.minus(s17.times(BIG_683901));
    s17 = BIG_ARR[0];

    s4 = s4.add(s16.times(BIG_666643));
    s5 = s5.add(s16.times(BIG_470296));
    s6 = s6.add(s16.times(BIG_654183));
    s7 = s7.minus(s16.times(BIG_997805));
    s8 = s8.add(s16.times(BIG_136657));
    s9 = s9.minus(s16.times(BIG_683901));
    s16 = BIG_ARR[0];

    s3 = s3.add(s15.times(BIG_666643));
    s4 = s4.add(s15.times(BIG_470296));
    s5 = s5.add(s15.times(BIG_654183));
    s6 = s6.minus(s15.times(BIG_997805));
    s7 = s7.add(s15.times(BIG_136657));
    s8 = s8.minus(s15.times(BIG_683901));
    s15 = BIG_ARR[0];

    s2 = s2.add(s14.times(BIG_666643));
    s3 = s3.add(s14.times(BIG_470296));
    s4 = s4.add(s14.times(BIG_654183));
    s5 = s5.minus(s14.times(BIG_997805));
    s6 = s6.add(s14.times(BIG_136657));
    s7 = s7.minus(s14.times(BIG_683901));
    s14 = BIG_ARR[0];

    s1 = s1.add(s13.times(BIG_666643));
    s2 = s2.add(s13.times(BIG_470296));
    s3 = s3.add(s13.times(BIG_654183));
    s4 = s4.minus(s13.times(BIG_997805));
    s5 = s5.add(s13.times(BIG_136657));
    s6 = s6.minus(s13.times(BIG_683901));
    s13 = BIG_ARR[0];

    s0 = s0.add(s12.times(BIG_666643));
    s1 = s1.add(s12.times(BIG_470296));
    s2 = s2.add(s12.times(BIG_654183));
    s3 = s3.minus(s12.times(BIG_997805));
    s4 = s4.add(s12.times(BIG_136657));
    s5 = s5.minus(s12.times(BIG_683901));
    s12 = BIG_ARR[0];

    carry[0] = s0.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s1 = s1.add(carry[0]);
    s0 = s0.minus(carry[0].shiftLeft(BIG_ARR[21]));
    carry[2] = s2.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s3 = s3.add(carry[2]);
    s2 = s2.minus(carry[2].shiftLeft(BIG_ARR[21]));
    carry[4] = s4.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s5 = s5.add(carry[4]);
    s4 = s4.minus(carry[4].shiftLeft(BIG_ARR[21]));
    carry[6] = s6.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s7 = s7.add(carry[6]);
    s6 = s6.minus(carry[6].shiftLeft(BIG_ARR[21]));
    carry[8] = s8.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s9 = s9.add(carry[8]);
    s8 = s8.minus(carry[8].shiftLeft(BIG_ARR[21]));
    carry[10] = s10.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s11 = s11.add(carry[10]);
    s10 = s10.minus(carry[10].shiftLeft(BIG_ARR[21]));

    carry[1] = s1.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s2 = s2.add(carry[1]);
    s1 = s1.minus(carry[1].shiftLeft(BIG_ARR[21]));
    carry[3] = s3.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s4 = s4.add(carry[3]);
    s3 = s3.minus(carry[3].shiftLeft(BIG_ARR[21]));
    carry[5] = s5.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s6 = s6.add(carry[5]);
    s5 = s5.minus(carry[5].shiftLeft(BIG_ARR[21]));
    carry[7] = s7.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s8 = s8.add(carry[7]);
    s7 = s7.minus(carry[7].shiftLeft(BIG_ARR[21]));
    carry[9] = s9.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s10 = s10.add(carry[9]);
    s9 = s9.minus(carry[9].shiftLeft(BIG_ARR[21]));
    carry[11] = s11.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s12 = s12.add(carry[11]);
    s11 = s11.minus(carry[11].shiftLeft(BIG_ARR[21]));

    s0 = s0.add(s12.times(BIG_666643));
    s1 = s1.add(s12.times(BIG_470296));
    s2 = s2.add(s12.times(BIG_654183));
    s3 = s3.minus(s12.times(BIG_997805));
    s4 = s4.add(s12.times(BIG_136657));
    s5 = s5.minus(s12.times(BIG_683901));
    s12 = BIG_ARR[0];

    carry[0] = s0.shiftRight(BIG_ARR[21]);
    s1 = s1.add(carry[0]);
    s0 = s0.minus(carry[0].shiftLeft(BIG_ARR[21]));
    carry[1] = s1.shiftRight(BIG_ARR[21]);
    s2 = s2.add(carry[1]);
    s1 = s1.minus(carry[1].shiftLeft(BIG_ARR[21]));
    carry[2] = s2.shiftRight(BIG_ARR[21]);
    s3 = s3.add(carry[2]);
    s2 = s2.minus(carry[2].shiftLeft(BIG_ARR[21]));
    carry[3] = s3.shiftRight(BIG_ARR[21]);
    s4 = s4.add(carry[3]);
    s3 = s3.minus(carry[3].shiftLeft(BIG_ARR[21]));
    carry[4] = s4.shiftRight(BIG_ARR[21]);
    s5 = s5.add(carry[4]);
    s4 = s4.minus(carry[4].shiftLeft(BIG_ARR[21]));
    carry[5] = s5.shiftRight(BIG_ARR[21]);
    s6 = s6.add(carry[5]);
    s5 = s5.minus(carry[5].shiftLeft(BIG_ARR[21]));
    carry[6] = s6.shiftRight(BIG_ARR[21]);
    s7 = s7.add(carry[6]);
    s6 = s6.minus(carry[6].shiftLeft(BIG_ARR[21]));
    carry[7] = s7.shiftRight(BIG_ARR[21]);
    s8 = s8.add(carry[7]);
    s7 = s7.minus(carry[7].shiftLeft(BIG_ARR[21]));
    carry[8] = s8.shiftRight(BIG_ARR[21]);
    s9 = s9.add(carry[8]);
    s8 = s8.minus(carry[8].shiftLeft(BIG_ARR[21]));
    carry[9] = s9.shiftRight(BIG_ARR[21]);
    s10 = s10.add(carry[9]);
    s9 = s9.minus(carry[9].shiftLeft(BIG_ARR[21]));
    carry[10] = s10.shiftRight(BIG_ARR[21]);
    s11 = s11.add(carry[10]);
    s10 = s10.minus(carry[10].shiftLeft(BIG_ARR[21]));
    carry[11] = s11.shiftRight(BIG_ARR[21]);
    s12 = s12.add(carry[11]);
    s11 = s11.minus(carry[11].shiftLeft(BIG_ARR[21]));

    s0 = s0.add(s12.times(BIG_666643));
    s1 = s1.add(s12.times(BIG_470296));
    s2 = s2.add(s12.times(BIG_654183));
    s3 = s3.minus(s12.times(BIG_997805));
    s4 = s4.add(s12.times(BIG_136657));
    s5 = s5.minus(s12.times(BIG_683901));
    s12 = BIG_ARR[0];

    carry[0] = s0.shiftRight(BIG_ARR[21]);
    s1 = s1.add(carry[0]);
    s0 = s0.minus(carry[0].shiftLeft(BIG_ARR[21]));
    carry[1] = s1.shiftRight(BIG_ARR[21]);
    s2 = s2.add(carry[1]);
    s1 = s1.minus(carry[1].shiftLeft(BIG_ARR[21]));
    carry[2] = s2.shiftRight(BIG_ARR[21]);
    s3 = s3.add(carry[2]);
    s2 = s2.minus(carry[2].shiftLeft(BIG_ARR[21]));
    carry[3] = s3.shiftRight(BIG_ARR[21]);
    s4 = s4.add(carry[3]);
    s3 = s3.minus(carry[3].shiftLeft(BIG_ARR[21]));
    carry[4] = s4.shiftRight(BIG_ARR[21]);
    s5 = s5.add(carry[4]);
    s4 = s4.minus(carry[4].shiftLeft(BIG_ARR[21]));
    carry[5] = s5.shiftRight(BIG_ARR[21]);
    s6 = s6.add(carry[5]);
    s5 = s5.minus(carry[5].shiftLeft(BIG_ARR[21]));
    carry[6] = s6.shiftRight(BIG_ARR[21]);
    s7 = s7.add(carry[6]);
    s6 = s6.minus(carry[6].shiftLeft(BIG_ARR[21]));
    carry[7] = s7.shiftRight(BIG_ARR[21]);
    s8 = s8.add(carry[7]);
    s7 = s7.minus(carry[7].shiftLeft(BIG_ARR[21]));
    carry[8] = s8.shiftRight(BIG_ARR[21]);
    s9 = s9.add(carry[8]);
    s8 = s8.minus(carry[8].shiftLeft(BIG_ARR[21]));
    carry[9] = s9.shiftRight(BIG_ARR[21]);
    s10 = s10.add(carry[9]);
    s9 = s9.minus(carry[9].shiftLeft(BIG_ARR[21]));
    carry[10] = s10.shiftRight(BIG_ARR[21]);
    s11 = s11.add(carry[10]);
    s10 = s10.minus(carry[10].shiftLeft(BIG_ARR[21]));

    s[0] = s0.shiftRight(BIG_ARR[0]).toJSNumber();
    s[1] = s0.shiftRight(BIG_ARR[8]).toJSNumber();
    s[2] = s0.shiftRight(BIG_ARR[16]).or(s1.shiftLeft(BIG_ARR[5])).toJSNumber();
    s[3] = s1.shiftRight(BIG_ARR[3]).toJSNumber();
    s[4] = s1.shiftRight(BIG_ARR[11]).toJSNumber();
    s[5] = s1.shiftRight(BIG_ARR[19]).or(s2.shiftLeft(BIG_ARR[2])).toJSNumber();
    s[6] = s2.shiftRight(BIG_ARR[6]).toJSNumber();
    s[7] = s2.shiftRight(BIG_ARR[14]).or(s3.shiftLeft(BIG_ARR[7])).toJSNumber();
    s[8] = s3.shiftRight(BIG_ARR[1]).toJSNumber();
    s[9] = s3.shiftRight(BIG_ARR[9]).toJSNumber();
    s[10] = s3.shiftRight(BIG_ARR[17]).or(s4.shiftLeft(BIG_ARR[4])).toJSNumber();
    s[11] = s4.shiftRight(BIG_ARR[4]).toJSNumber();
    s[12] = s4.shiftRight(BIG_ARR[12]).toJSNumber();
    s[13] = s4.shiftRight(BIG_ARR[20]).or(s5.shiftLeft(BIG_ARR[1])).toJSNumber();
    s[14] = s5.shiftRight(BIG_ARR[7]).toJSNumber();
    s[15] = s5.shiftRight(BIG_ARR[15]).or(s6.shiftLeft(BIG_ARR[6])).toJSNumber();
    s[16] = s6.shiftRight(BIG_ARR[2]).toJSNumber();
    s[17] = s6.shiftRight(BIG_ARR[10]).toJSNumber();
    s[18] = s6.shiftRight(BIG_ARR[18]).or(s7.shiftLeft(BIG_ARR[3])).toJSNumber();
    s[19] = s7.shiftRight(BIG_ARR[5]).toJSNumber();
    s[20] = s7.shiftRight(BIG_ARR[13]).toJSNumber();
    s[21] = s8.shiftRight(BIG_ARR[0]).toJSNumber();
    s[22] = s8.shiftRight(BIG_ARR[8]).toJSNumber();
    s[23] = s8.shiftRight(BIG_ARR[16]).or(s9.shiftLeft(BIG_ARR[5])).toJSNumber();
    s[24] = s9.shiftRight(BIG_ARR[3]).toJSNumber();
    s[25] = s9.shiftRight(BIG_ARR[11]).toJSNumber();
    s[26] = s9.shiftRight(BIG_ARR[19]).or(s10.shiftLeft(BIG_ARR[2])).toJSNumber();
    s[27] = s10.shiftRight(BIG_ARR[6]).toJSNumber();
    s[28] = s10.shiftRight(BIG_ARR[14]).or(s11.shiftLeft(BIG_ARR[7])).toJSNumber();
    s[29] = s11.shiftRight(BIG_ARR[1]).toJSNumber();
    s[30] = s11.shiftRight(BIG_ARR[9]).toJSNumber();
    s[31] = s11.shiftRight(BIG_ARR[17]).toJSNumber();
}

/**
 * Scalar reduce
 * where l = 2^252 + 27742317777372353535851937790883648493.
 * @param out Where s[0]+256*s[1]+...+256^31*s[31] = s mod l.
 * @param s Where s[0]+256*s[1]+...+256^63*s[63] = s.
 */
export function scalarReduce(out: Uint8Array, s: Uint8Array): void {
    let s0 = BIG_2097151.and(BigIntHelper.read3(s, 0));
    let s1 = BIG_2097151.and(BigIntHelper.read4(s, 2).shiftRight(BIG_ARR[5]));
    let s2 = BIG_2097151.and(BigIntHelper.read3(s, 5).shiftRight(BIG_ARR[2]));
    let s3 = BIG_2097151.and(BigIntHelper.read4(s, 7).shiftRight(BIG_ARR[7]));
    let s4 = BIG_2097151.and(BigIntHelper.read4(s, 10).shiftRight(BIG_ARR[4]));
    let s5 = BIG_2097151.and(BigIntHelper.read3(s, 13).shiftRight(BIG_ARR[1]));
    let s6 = BIG_2097151.and(BigIntHelper.read4(s, 15).shiftRight(BIG_ARR[6]));
    let s7 = BIG_2097151.and(BigIntHelper.read3(s, 18).shiftRight(BIG_ARR[3]));
    let s8 = BIG_2097151.and(BigIntHelper.read3(s, 21));
    let s9 = BIG_2097151.and(BigIntHelper.read4(s, 23).shiftRight(BIG_ARR[5]));
    let s10 = BIG_2097151.and(BigIntHelper.read3(s, 26).shiftRight(BIG_ARR[2]));
    let s11 = BIG_2097151.and(BigIntHelper.read4(s, 28).shiftRight(BIG_ARR[7]));
    let s12 = BIG_2097151.and(BigIntHelper.read4(s, 31).shiftRight(BIG_ARR[4]));
    let s13 = BIG_2097151.and(BigIntHelper.read3(s, 34).shiftRight(BIG_ARR[1]));
    let s14 = BIG_2097151.and(BigIntHelper.read4(s, 36).shiftRight(BIG_ARR[6]));
    let s15 = BIG_2097151.and(BigIntHelper.read3(s, 39).shiftRight(BIG_ARR[3]));
    let s16 = BIG_2097151.and(BigIntHelper.read3(s, 42));
    let s17 = BIG_2097151.and(BigIntHelper.read4(s, 44).shiftRight(BIG_ARR[5]));
    let s18 = BIG_2097151.and(BigIntHelper.read3(s, 47).shiftRight(BIG_ARR[2]));
    let s19 = BIG_2097151.and(BigIntHelper.read4(s, 49).shiftRight(BIG_ARR[7]));
    let s20 = BIG_2097151.and(BigIntHelper.read4(s, 52).shiftRight(BIG_ARR[4]));
    let s21 = BIG_2097151.and(BigIntHelper.read3(s, 55).shiftRight(BIG_ARR[1]));
    let s22 = BIG_2097151.and(BigIntHelper.read4(s, 57).shiftRight(BIG_ARR[6]));
    let s23 = BigIntHelper.read4(s, 60).shiftRight(BIG_ARR[3]);

    s11 = s11.add(s23.times(BIG_666643));
    s12 = s12.add(s23.times(BIG_470296));
    s13 = s13.add(s23.times(BIG_654183));
    s14 = s14.minus(s23.times(BIG_997805));
    s15 = s15.add(s23.times(BIG_136657));
    s16 = s16.minus(s23.times(BIG_683901));
    s23 = BIG_ARR[0];

    s10 = s10.add(s22.times(BIG_666643));
    s11 = s11.add(s22.times(BIG_470296));
    s12 = s12.add(s22.times(BIG_654183));
    s13 = s13.minus(s22.times(BIG_997805));
    s14 = s14.add(s22.times(BIG_136657));
    s15 = s15.minus(s22.times(BIG_683901));
    s22 = BIG_ARR[0];

    s9 = s9.add(s21.times(BIG_666643));
    s10 = s10.add(s21.times(BIG_470296));
    s11 = s11.add(s21.times(BIG_654183));
    s12 = s12.minus(s21.times(BIG_997805));
    s13 = s13.add(s21.times(BIG_136657));
    s14 = s14.minus(s21.times(BIG_683901));
    s21 = BIG_ARR[0];

    s8 = s8.add(s20.times(BIG_666643));
    s9 = s9.add(s20.times(BIG_470296));
    s10 = s10.add(s20.times(BIG_654183));
    s11 = s11.minus(s20.times(BIG_997805));
    s12 = s12.add(s20.times(BIG_136657));
    s13 = s13.minus(s20.times(BIG_683901));
    s20 = BIG_ARR[0];

    s7 = s7.add(s19.times(BIG_666643));
    s8 = s8.add(s19.times(BIG_470296));
    s9 = s9.add(s19.times(BIG_654183));
    s10 = s10.minus(s19.times(BIG_997805));
    s11 = s11.add(s19.times(BIG_136657));
    s12 = s12.minus(s19.times(BIG_683901));
    s19 = BIG_ARR[0];

    s6 = s6.add(s18.times(BIG_666643));
    s7 = s7.add(s18.times(BIG_470296));
    s8 = s8.add(s18.times(BIG_654183));
    s9 = s9.minus(s18.times(BIG_997805));
    s10 = s10.add(s18.times(BIG_136657));
    s11 = s11.minus(s18.times(BIG_683901));
    s18 = BIG_ARR[0];

    const carry: BigInteger[] = [];
    for (let i = 0; i < 17; i++) {
        carry[i] = bigInt(0);
    }

    carry[6] = s6.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s7 = s7.add(carry[6]);
    s6 = s6.minus(carry[6].shiftLeft(BIG_ARR[21]));
    carry[8] = s8.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s9 = s9.add(carry[8]);
    s8 = s8.minus(carry[8].shiftLeft(BIG_ARR[21]));
    carry[10] = s10.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s11 = s11.add(carry[10]);
    s10 = s10.minus(carry[10].shiftLeft(BIG_ARR[21]));
    carry[12] = s12.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s13 = s13.add(carry[12]);
    s12 = s12.minus(carry[12].shiftLeft(BIG_ARR[21]));
    carry[14] = s14.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s15 = s15.add(carry[14]);
    s14 = s14.minus(carry[14].shiftLeft(BIG_ARR[21]));
    carry[16] = s16.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s17 = s17.add(carry[16]);
    s16 = s16.minus(carry[16].shiftLeft(BIG_ARR[21]));

    carry[7] = s7.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s8 = s8.add(carry[7]);
    s7 = s7.minus(carry[7].shiftLeft(BIG_ARR[21]));
    carry[9] = s9.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s10 = s10.add(carry[9]);
    s9 = s9.minus(carry[9].shiftLeft(BIG_ARR[21]));
    carry[11] = s11.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s12 = s12.add(carry[11]);
    s11 = s11.minus(carry[11].shiftLeft(BIG_ARR[21]));
    carry[13] = s13.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s14 = s14.add(carry[13]);
    s13 = s13.minus(carry[13].shiftLeft(BIG_ARR[21]));
    carry[15] = s15.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s16 = s16.add(carry[15]);
    s15 = s15.minus(carry[15].shiftLeft(BIG_ARR[21]));

    s5 = s5.add(s17.times(BIG_666643));
    s6 = s6.add(s17.times(BIG_470296));
    s7 = s7.add(s17.times(BIG_654183));
    s8 = s8.minus(s17.times(BIG_997805));
    s9 = s9.add(s17.times(BIG_136657));
    s10 = s10.minus(s17.times(BIG_683901));
    s17 = BIG_ARR[0];

    s4 = s4.add(s16.times(BIG_666643));
    s5 = s5.add(s16.times(BIG_470296));
    s6 = s6.add(s16.times(BIG_654183));
    s7 = s7.minus(s16.times(BIG_997805));
    s8 = s8.add(s16.times(BIG_136657));
    s9 = s9.minus(s16.times(BIG_683901));
    s16 = BIG_ARR[0];

    s3 = s3.add(s15.times(BIG_666643));
    s4 = s4.add(s15.times(BIG_470296));
    s5 = s5.add(s15.times(BIG_654183));
    s6 = s6.minus(s15.times(BIG_997805));
    s7 = s7.add(s15.times(BIG_136657));
    s8 = s8.minus(s15.times(BIG_683901));
    s15 = BIG_ARR[0];

    s2 = s2.add(s14.times(BIG_666643));
    s3 = s3.add(s14.times(BIG_470296));
    s4 = s4.add(s14.times(BIG_654183));
    s5 = s5.minus(s14.times(BIG_997805));
    s6 = s6.add(s14.times(BIG_136657));
    s7 = s7.minus(s14.times(BIG_683901));
    s14 = BIG_ARR[0];

    s1 = s1.add(s13.times(BIG_666643));
    s2 = s2.add(s13.times(BIG_470296));
    s3 = s3.add(s13.times(BIG_654183));
    s4 = s4.minus(s13.times(BIG_997805));
    s5 = s5.add(s13.times(BIG_136657));
    s6 = s6.minus(s13.times(BIG_683901));
    s13 = BIG_ARR[0];

    s0 = s0.add(s12.times(BIG_666643));
    s1 = s1.add(s12.times(BIG_470296));
    s2 = s2.add(s12.times(BIG_654183));
    s3 = s3.minus(s12.times(BIG_997805));
    s4 = s4.add(s12.times(BIG_136657));
    s5 = s5.minus(s12.times(BIG_683901));
    s12 = BIG_ARR[0];

    carry[0] = s0.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s1 = s1.add(carry[0]);
    s0 = s0.minus(carry[0].shiftLeft(BIG_ARR[21]));
    carry[2] = s2.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s3 = s3.add(carry[2]);
    s2 = s2.minus(carry[2].shiftLeft(BIG_ARR[21]));
    carry[4] = s4.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s5 = s5.add(carry[4]);
    s4 = s4.minus(carry[4].shiftLeft(BIG_ARR[21]));
    carry[6] = s6.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s7 = s7.add(carry[6]);
    s6 = s6.minus(carry[6].shiftLeft(BIG_ARR[21]));
    carry[8] = s8.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s9 = s9.add(carry[8]);
    s8 = s8.minus(carry[8].shiftLeft(BIG_ARR[21]));
    carry[10] = s10.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s11 = s11.add(carry[10]);
    s10 = s10.minus(carry[10].shiftLeft(BIG_ARR[21]));

    carry[1] = s1.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s2 = s2.add(carry[1]);
    s1 = s1.minus(carry[1].shiftLeft(BIG_ARR[21]));
    carry[3] = s3.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s4 = s4.add(carry[3]);
    s3 = s3.minus(carry[3].shiftLeft(BIG_ARR[21]));
    carry[5] = s5.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s6 = s6.add(carry[5]);
    s5 = s5.minus(carry[5].shiftLeft(BIG_ARR[21]));
    carry[7] = s7.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s8 = s8.add(carry[7]);
    s7 = s7.minus(carry[7].shiftLeft(BIG_ARR[21]));
    carry[9] = s9.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s10 = s10.add(carry[9]);
    s9 = s9.minus(carry[9].shiftLeft(BIG_ARR[21]));
    carry[11] = s11.add(BIG_1_SHIFTL_20).shiftRight(BIG_ARR[21]);
    s12 = s12.add(carry[11]);
    s11 = s11.minus(carry[11].shiftLeft(BIG_ARR[21]));

    s0 = s0.add(s12.times(BIG_666643));
    s1 = s1.add(s12.times(BIG_470296));
    s2 = s2.add(s12.times(BIG_654183));
    s3 = s3.minus(s12.times(BIG_997805));
    s4 = s4.add(s12.times(BIG_136657));
    s5 = s5.minus(s12.times(BIG_683901));
    s12 = BIG_ARR[0];

    carry[0] = s0.shiftRight(BIG_ARR[21]);
    s1 = s1.add(carry[0]);
    s0 = s0.minus(carry[0].shiftLeft(BIG_ARR[21]));
    carry[1] = s1.shiftRight(BIG_ARR[21]);
    s2 = s2.add(carry[1]);
    s1 = s1.minus(carry[1].shiftLeft(BIG_ARR[21]));
    carry[2] = s2.shiftRight(BIG_ARR[21]);
    s3 = s3.add(carry[2]);
    s2 = s2.minus(carry[2].shiftLeft(BIG_ARR[21]));
    carry[3] = s3.shiftRight(BIG_ARR[21]);
    s4 = s4.add(carry[3]);
    s3 = s3.minus(carry[3].shiftLeft(BIG_ARR[21]));
    carry[4] = s4.shiftRight(BIG_ARR[21]);
    s5 = s5.add(carry[4]);
    s4 = s4.minus(carry[4].shiftLeft(BIG_ARR[21]));
    carry[5] = s5.shiftRight(BIG_ARR[21]);
    s6 = s6.add(carry[5]);
    s5 = s5.minus(carry[5].shiftLeft(BIG_ARR[21]));
    carry[6] = s6.shiftRight(BIG_ARR[21]);
    s7 = s7.add(carry[6]);
    s6 = s6.minus(carry[6].shiftLeft(BIG_ARR[21]));
    carry[7] = s7.shiftRight(BIG_ARR[21]);
    s8 = s8.add(carry[7]);
    s7 = s7.minus(carry[7].shiftLeft(BIG_ARR[21]));
    carry[8] = s8.shiftRight(BIG_ARR[21]);
    s9 = s9.add(carry[8]);
    s8 = s8.minus(carry[8].shiftLeft(BIG_ARR[21]));
    carry[9] = s9.shiftRight(BIG_ARR[21]);
    s10 = s10.add(carry[9]);
    s9 = s9.minus(carry[9].shiftLeft(BIG_ARR[21]));
    carry[10] = s10.shiftRight(BIG_ARR[21]);
    s11 = s11.add(carry[10]);
    s10 = s10.minus(carry[10].shiftLeft(BIG_ARR[21]));
    carry[11] = s11.shiftRight(BIG_ARR[21]);
    s12 = s12.add(carry[11]);
    s11 = s11.minus(carry[11].shiftLeft(BIG_ARR[21]));

    s0 = s0.add(s12.times(BIG_666643));
    s1 = s1.add(s12.times(BIG_470296));
    s2 = s2.add(s12.times(BIG_654183));
    s3 = s3.minus(s12.times(BIG_997805));
    s4 = s4.add(s12.times(BIG_136657));
    s5 = s5.minus(s12.times(BIG_683901));
    s12 = BIG_ARR[0];

    carry[0] = s0.shiftRight(BIG_ARR[21]);
    s1 = s1.add(carry[0]);
    s0 = s0.minus(carry[0].shiftLeft(BIG_ARR[21]));
    carry[1] = s1.shiftRight(BIG_ARR[21]);
    s2 = s2.add(carry[1]);
    s1 = s1.minus(carry[1].shiftLeft(BIG_ARR[21]));
    carry[2] = s2.shiftRight(BIG_ARR[21]);
    s3 = s3.add(carry[2]);
    s2 = s2.minus(carry[2].shiftLeft(BIG_ARR[21]));
    carry[3] = s3.shiftRight(BIG_ARR[21]);
    s4 = s4.add(carry[3]);
    s3 = s3.minus(carry[3].shiftLeft(BIG_ARR[21]));
    carry[4] = s4.shiftRight(BIG_ARR[21]);
    s5 = s5.add(carry[4]);
    s4 = s4.minus(carry[4].shiftLeft(BIG_ARR[21]));
    carry[5] = s5.shiftRight(BIG_ARR[21]);
    s6 = s6.add(carry[5]);
    s5 = s5.minus(carry[5].shiftLeft(BIG_ARR[21]));
    carry[6] = s6.shiftRight(BIG_ARR[21]);
    s7 = s7.add(carry[6]);
    s6 = s6.minus(carry[6].shiftLeft(BIG_ARR[21]));
    carry[7] = s7.shiftRight(BIG_ARR[21]);
    s8 = s8.add(carry[7]);
    s7 = s7.minus(carry[7].shiftLeft(BIG_ARR[21]));
    carry[8] = s8.shiftRight(BIG_ARR[21]);
    s9 = s9.add(carry[8]);
    s8 = s8.minus(carry[8].shiftLeft(BIG_ARR[21]));
    carry[9] = s9.shiftRight(BIG_ARR[21]);
    s10 = s10.add(carry[9]);
    s9 = s9.minus(carry[9].shiftLeft(BIG_ARR[21]));
    carry[10] = s10.shiftRight(BIG_ARR[21]);
    s11 = s11.add(carry[10]);
    s10 = s10.minus(carry[10].shiftLeft(BIG_ARR[21]));

    out[0] = s0.shiftRight(BIG_ARR[0]).toJSNumber();
    out[1] = s0.shiftRight(BIG_ARR[8]).toJSNumber();
    out[2] = s0.shiftRight(BIG_ARR[16]).or(s1.shiftLeft(BIG_ARR[5])).toJSNumber();
    out[3] = s1.shiftRight(BIG_ARR[3]).toJSNumber();
    out[4] = s1.shiftRight(BIG_ARR[11]).toJSNumber();
    out[5] = s1.shiftRight(BIG_ARR[19]).or(s2.shiftLeft(BIG_ARR[2])).toJSNumber();
    out[6] = s2.shiftRight(BIG_ARR[6]).toJSNumber();
    out[7] = s2.shiftRight(BIG_ARR[14]).or(s3.shiftLeft(BIG_ARR[7])).toJSNumber();
    out[8] = s3.shiftRight(BIG_ARR[1]).toJSNumber();
    out[9] = s3.shiftRight(BIG_ARR[9]).toJSNumber();
    out[10] = s3.shiftRight(BIG_ARR[17]).or(s4.shiftLeft(BIG_ARR[4])).toJSNumber();
    out[11] = s4.shiftRight(BIG_ARR[4]).toJSNumber();
    out[12] = s4.shiftRight(BIG_ARR[12]).toJSNumber();
    out[13] = s4.shiftRight(BIG_ARR[20]).or(s5.shiftLeft(BIG_ARR[1])).toJSNumber();
    out[14] = s5.shiftRight(BIG_ARR[7]).toJSNumber();
    out[15] = s5.shiftRight(BIG_ARR[15]).or(s6.shiftLeft(BIG_ARR[6])).toJSNumber();
    out[16] = s6.shiftRight(BIG_ARR[2]).toJSNumber();
    out[17] = s6.shiftRight(BIG_ARR[10]).toJSNumber();
    out[18] = s6.shiftRight(BIG_ARR[18]).or(s7.shiftLeft(BIG_ARR[3])).toJSNumber();
    out[19] = s7.shiftRight(BIG_ARR[5]).toJSNumber();
    out[20] = s7.shiftRight(BIG_ARR[13]).toJSNumber();
    out[21] = s8.shiftRight(BIG_ARR[0]).toJSNumber();
    out[22] = s8.shiftRight(BIG_ARR[8]).toJSNumber();
    out[23] = s8.shiftRight(BIG_ARR[16]).or(s9.shiftLeft(BIG_ARR[5])).toJSNumber();
    out[24] = s9.shiftRight(BIG_ARR[3]).toJSNumber();
    out[25] = s9.shiftRight(BIG_ARR[11]).toJSNumber();
    out[26] = s9.shiftRight(BIG_ARR[19]).or(s10.shiftLeft(BIG_ARR[2])).toJSNumber();
    out[27] = s10.shiftRight(BIG_ARR[6]).toJSNumber();
    out[28] = s10.shiftRight(BIG_ARR[14]).or(s11.shiftLeft(BIG_ARR[7])).toJSNumber();
    out[29] = s11.shiftRight(BIG_ARR[1]).toJSNumber();
    out[30] = s11.shiftRight(BIG_ARR[9]).toJSNumber();
    out[31] = s11.shiftRight(BIG_ARR[17]).toJSNumber();
}

/**
 * Scalar Minimal returns true if the given scalar is less than the order of the Curve.
 * @param scalar The scalar.
 * @returns True if the given scalar is less than the order of the Curve.
 */
export function scalarMinimal(scalar: Uint8Array): boolean {
    for (let i = 3; i >= 0; i--) {
        const v = BigIntHelper.read8(scalar, i * 8);

        if (v > CONST_ORDER[i]) {
            return false;
        } else if (v < CONST_ORDER[i]) {
            break;
        } else if (i === 0) {
            return false;
        }
    }

    return true;
}

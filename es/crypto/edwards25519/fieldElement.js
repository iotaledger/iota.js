"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldElement = void 0;
/* eslint-disable no-bitwise */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
var bigIntHelper_1 = require("../../utils/bigIntHelper");
var bigIntCommon_1 = require("./bigIntCommon");
/**
 * Class for field element operations.
 * FieldElement represents an element of the field GF(2^255 - 19).  An element
 * t, entries t[0]...t[9], represents the integer t[0]+2^26 t[1]+2^51 t[2]+2^77
 * t[3]+2^102 t[4]+...+2^230 t[9].  Bounds on each t[i] vary depending on
 * context.
 */
var FieldElement = /** @class */ (function () {
    /**
     * Create a new instance of FieldElement.
     * @param values A set of values to initialize the array.
     */
    function FieldElement(values) {
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
     *    |f| bounded by 1.1*2^26,1.1*2^25,1.1*2^26,1.1*2^25,etc.
     *    |g| bounded by 1.1*2^26,1.1*2^25,1.1*2^26,1.1*2^25,etc.
     *
     * Postconditions:
     *    |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
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
    FieldElement.prototype.mul = function (f, g) {
        var f0 = BigInt(f.data[0]);
        var f1 = BigInt(f.data[1]);
        var f2 = BigInt(f.data[2]);
        var f3 = BigInt(f.data[3]);
        var f4 = BigInt(f.data[4]);
        var f5 = BigInt(f.data[5]);
        var f6 = BigInt(f.data[6]);
        var f7 = BigInt(f.data[7]);
        var f8 = BigInt(f.data[8]);
        var f9 = BigInt(f.data[9]);
        var f12 = BigInt(2 * f.data[1]);
        var f32 = BigInt(2 * f.data[3]);
        var f52 = BigInt(2 * f.data[5]);
        var f72 = BigInt(2 * f.data[7]);
        var f92 = BigInt(2 * f.data[9]);
        var g0 = BigInt(g.data[0]);
        var g1 = BigInt(g.data[1]);
        var g2 = BigInt(g.data[2]);
        var g3 = BigInt(g.data[3]);
        var g4 = BigInt(g.data[4]);
        var g5 = BigInt(g.data[5]);
        var g6 = BigInt(g.data[6]);
        var g7 = BigInt(g.data[7]);
        var g8 = BigInt(g.data[8]);
        var g9 = BigInt(g.data[9]);
        var g119 = BigInt(19 * g.data[1]); /* 1.4*2^29 */
        var g219 = BigInt(19 * g.data[2]); /* 1.4*2^30; still ok */
        var g319 = BigInt(19 * g.data[3]);
        var g419 = BigInt(19 * g.data[4]);
        var g519 = BigInt(19 * g.data[5]);
        var g619 = BigInt(19 * g.data[6]);
        var g719 = BigInt(19 * g.data[7]);
        var g819 = BigInt(19 * g.data[8]);
        var g919 = BigInt(19 * g.data[9]);
        var h0 = (f0 * g0) + (f12 * g919) + (f2 * g819) + (f32 * g719) +
            (f4 * g619) + (f52 * g519) + (f6 * g419) + (f72 * g319) + (f8 * g219) + (f92 * g119);
        var h1 = (f0 * g1) + (f1 * g0) + (f2 * g919) + (f3 * g819) + (f4 * g719) +
            (f5 * g619) + (f6 * g519) + (f7 * g419) + (f8 * g319) + (f9 * g219);
        var h2 = (f0 * g2) + (f12 * g1) + (f2 * g0) + (f32 * g919) + (f4 * g819) +
            (f52 * g719) + (f6 * g619) + (f72 * g519) + (f8 * g419) + (f92 * g319);
        var h3 = (f0 * g3) + (f1 * g2) + (f2 * g1) + (f3 * g0) + (f4 * g919) +
            (f5 * g819) + (f6 * g719) + (f7 * g619) + (f8 * g519) + (f9 * g419);
        var h4 = (f0 * g4) + (f12 * g3) + (f2 * g2) + (f32 * g1) + (f4 * g0) +
            (f52 * g919) + (f6 * g819) + (f72 * g719) + (f8 * g619) + (f92 * g519);
        var h5 = (f0 * g5) + (f1 * g4) + (f2 * g3) + (f3 * g2) + (f4 * g1) +
            (f5 * g0) + (f6 * g919) + (f7 * g819) + (f8 * g719) + (f9 * g619);
        var h6 = (f0 * g6) + (f12 * g5) + (f2 * g4) + (f32 * g3) + (f4 * g2) +
            (f52 * g1) + (f6 * g0) + (f72 * g919) + (f8 * g819) + (f92 * g719);
        var h7 = (f0 * g7) + (f1 * g6) + (f2 * g5) + (f3 * g4) + (f4 * g3) +
            (f5 * g2) + (f6 * g1) + (f7 * g0) + (f8 * g919) + (f9 * g819);
        var h8 = (f0 * g8) + (f12 * g7) + (f2 * g6) + (f32 * g5) + (f4 * g4) +
            (f52 * g3) + (f6 * g2) + (f72 * g1) + (f8 * g0) + (f92 * g919);
        var h9 = (f0 * g9) + (f1 * g8) + (f2 * g7) + (f3 * g6) + (f4 * g5) +
            (f5 * g4) + (f6 * g3) + (f7 * g2) + (f8 * g1) + (f9 * g0);
        this.combine(h0, h1, h2, h3, h4, h5, h6, h7, h8, h9);
    };
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
    FieldElement.prototype.combine = function (h0, h1, h2, h3, h4, h5, h6, h7, h8, h9) {
        var c0;
        var c4;
        /*
          |h0| <= (1.1*1.1*2^52*(1+19+19+19+19)+1.1*1.1*2^50*(38+38+38+38+38))
            i.e. |h0| <= 1.2*2^59; narrower ranges for h2, h4, h6, h8
          |h1| <= (1.1*1.1*2^51*(1+1+19+19+19+19+19+19+19+19))
            i.e. |h1| <= 1.5*2^58; narrower ranges for h3, h5, h7, h9
        */
        c0 = (h0 + bigIntCommon_1.BIG_1_SHIFTL_25) >> bigIntCommon_1.BIG_ARR[26];
        h1 += c0;
        h0 -= c0 << bigIntCommon_1.BIG_ARR[26];
        c4 = (h4 + bigIntCommon_1.BIG_1_SHIFTL_25) >> bigIntCommon_1.BIG_ARR[26];
        h5 += c4;
        h4 -= c4 << bigIntCommon_1.BIG_ARR[26];
        /* |h0| <= 2^25 */
        /* |h4| <= 2^25 */
        /* |h1| <= 1.51*2^58 */
        /* |h5| <= 1.51*2^58 */
        var c1 = (h1 + bigIntCommon_1.BIG_1_SHIFTL_24) >> bigIntCommon_1.BIG_ARR[25];
        h2 += c1;
        h1 -= c1 << bigIntCommon_1.BIG_ARR[25];
        var c5 = (h5 + bigIntCommon_1.BIG_1_SHIFTL_24) >> bigIntCommon_1.BIG_ARR[25];
        h6 += c5;
        h5 -= c5 << bigIntCommon_1.BIG_ARR[25];
        /* |h1| <= 2^24; from now on fits into: number */
        /* |h5| <= 2^24; from now on fits into: number */
        /* |h2| <= 1.21*2^59 */
        /* |h6| <= 1.21*2^59 */
        var c2 = (h2 + bigIntCommon_1.BIG_1_SHIFTL_25) >> bigIntCommon_1.BIG_ARR[26];
        h3 += c2;
        h2 -= c2 << bigIntCommon_1.BIG_ARR[26];
        var c6 = (h6 + bigIntCommon_1.BIG_1_SHIFTL_25) >> bigIntCommon_1.BIG_ARR[26];
        h7 += c6;
        h6 -= c6 << bigIntCommon_1.BIG_ARR[26];
        /* |h2| <= 2^25; from now on fits into: number unchanged */
        /* |h6| <= 2^25; from now on fits into: number unchanged */
        /* |h3| <= 1.51*2^58 */
        /* |h7| <= 1.51*2^58 */
        var c3 = (h3 + bigIntCommon_1.BIG_1_SHIFTL_24) >> bigIntCommon_1.BIG_ARR[25];
        h4 += c3;
        h3 -= c3 << bigIntCommon_1.BIG_ARR[25];
        var c7 = (h7 + bigIntCommon_1.BIG_1_SHIFTL_24) >> bigIntCommon_1.BIG_ARR[25];
        h8 += c7;
        h7 -= c7 << bigIntCommon_1.BIG_ARR[25];
        /* |h3| <= 2^24; from now on fits into: number unchanged */
        /* |h7| <= 2^24; from now on fits into: number unchanged */
        /* |h4| <= 1.52*2^33 */
        /* |h8| <= 1.52*2^33 */
        c4 = (h4 + bigIntCommon_1.BIG_1_SHIFTL_25) >> bigIntCommon_1.BIG_ARR[26];
        h5 += c4;
        h4 -= c4 << bigIntCommon_1.BIG_ARR[26];
        var c8 = (h8 + bigIntCommon_1.BIG_1_SHIFTL_25) >> bigIntCommon_1.BIG_ARR[26];
        h9 += c8;
        h8 -= c8 << bigIntCommon_1.BIG_ARR[26];
        /* |h4| <= 2^25; from now on fits into: number unchanged */
        /* |h8| <= 2^25; from now on fits into: number unchanged */
        /* |h5| <= 1.01*2^24 */
        /* |h9| <= 1.51*2^58 */
        var c9 = (h9 + bigIntCommon_1.BIG_1_SHIFTL_24) >> bigIntCommon_1.BIG_ARR[25];
        h0 += c9 * bigIntCommon_1.BIG_ARR[19];
        h9 -= c9 << bigIntCommon_1.BIG_ARR[25];
        /* |h9| <= 2^24; from now on fits into: number unchanged */
        /* |h0| <= 1.8*2^37 */
        c0 = (h0 + bigIntCommon_1.BIG_1_SHIFTL_25) >> bigIntCommon_1.BIG_ARR[26];
        h1 += c0;
        h0 -= c0 << bigIntCommon_1.BIG_ARR[26];
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
    };
    /**
     * FieldElement.square calculates h = f*f. Can overlap h with f.
     *
     * Preconditions:
     *    |f| bounded by 1.1*2^26,1.1*2^25,1.1*2^26,1.1*2^25,etc.
     *
     * Postconditions:
     *    |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     * @param f The f element.
     */
    FieldElement.prototype.square = function (f) {
        var _a = this.internalSquare(f), h0 = _a.h0, h1 = _a.h1, h2 = _a.h2, h3 = _a.h3, h4 = _a.h4, h5 = _a.h5, h6 = _a.h6, h7 = _a.h7, h8 = _a.h8, h9 = _a.h9;
        this.combine(h0, h1, h2, h3, h4, h5, h6, h7, h8, h9);
    };
    /**
     * FieldElement.square calculates h = f*f. Can overlap h with f.
     *
     * Preconditions:
     *    |f| bounded by 1.1*2^26,1.1*2^25,1.1*2^26,1.1*2^25,etc.
     *
     * Postconditions:
     *    |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     * @param f The f element.
     * @returns The components.
     */
    FieldElement.prototype.internalSquare = function (f) {
        var f0 = BigInt(f.data[0]);
        var f1 = BigInt(f.data[1]);
        var f2 = BigInt(f.data[2]);
        var f3 = BigInt(f.data[3]);
        var f4 = BigInt(f.data[4]);
        var f5 = BigInt(f.data[5]);
        var f6 = BigInt(f.data[6]);
        var f7 = BigInt(f.data[7]);
        var f8 = BigInt(f.data[8]);
        var f9 = BigInt(f.data[9]);
        var f02 = BigInt(2 * f.data[0]);
        var f12 = BigInt(2 * f.data[1]);
        var f22 = BigInt(2 * f.data[2]);
        var f32 = BigInt(2 * f.data[3]);
        var f42 = BigInt(2 * f.data[4]);
        var f52 = BigInt(2 * f.data[5]);
        var f62 = BigInt(2 * f.data[6]);
        var f72 = BigInt(2 * f.data[7]);
        var f538 = bigIntCommon_1.BIG_38 * f5; // 1.31*2^30
        var f619 = bigIntCommon_1.BIG_ARR[19] * f6; // 1.31*2^30
        var f738 = bigIntCommon_1.BIG_38 * f7; // 1.31*2^30
        var f819 = bigIntCommon_1.BIG_ARR[19] * f8; // 1.31*2^30
        var f938 = bigIntCommon_1.BIG_38 * f9; // 1.31*2^30
        return {
            h0: (f0 * f0) + (f12 * f938) + (f22 * f819) + (f32 * f738) + (f42 * f619) + (f5 * f538),
            h1: (f02 * f1) + (f2 * f938) + (f32 * f819) + (f4 * f738) + (f52 * f619),
            h2: (f02 * f2) + (f12 * f1) + (f32 * f938) + (f42 * f819) + (f52 * f738) + (f6 * f619),
            h3: (f02 * f3) + (f12 * f2) + (f4 * f938) + (f52 * f819) + (f6 * f738),
            h4: (f02 * f4) + (f12 * f32) + (f2 * f2) + (f52 * f938) + (f62 * f819) + (f7 * f738),
            h5: (f02 * f5) + (f12 * f4) + (f22 * f3) + (f6 * f938) + (f72 * f819),
            h6: (f02 * f6) + (f12 * f52) + (f22 * f4) + (f32 * f3) + (f72 * f938) + (f8 * f819),
            h7: (f02 * f7) + (f12 * f6) + (f22 * f5) + (f32 * f4) + (f8 * f938),
            h8: (f02 * f8) + (f12 * f72) + (f22 * f6) + (f32 * f52) + (f4 * f4) + (f9 * f938),
            h9: (f02 * f9) + (f12 * f8) + (f22 * f7) + (f32 * f6) + (f42 * f5)
        };
    };
    /**
     * Square2 sets h = 2 * f * f
     *
     * Can overlap h with f.
     *
     * Preconditions:
     *    |f| bounded by 1.65*2^26,1.65*2^25,1.65*2^26,1.65*2^25,etc.
     *
     * Postconditions:
     *    |h| bounded by 1.01*2^25,1.01*2^24,1.01*2^25,1.01*2^24,etc.
     * See fe_mul.c for discussion of implementation strategy.
     * @param f The f element.
     */
    FieldElement.prototype.square2 = function (f) {
        var _a = this.internalSquare(f), h0 = _a.h0, h1 = _a.h1, h2 = _a.h2, h3 = _a.h3, h4 = _a.h4, h5 = _a.h5, h6 = _a.h6, h7 = _a.h7, h8 = _a.h8, h9 = _a.h9;
        h0 += h0;
        h1 += h1;
        h2 += h2;
        h3 += h3;
        h4 += h4;
        h5 += h5;
        h6 += h6;
        h7 += h7;
        h8 += h8;
        h9 += h9;
        this.combine(h0, h1, h2, h3, h4, h5, h6, h7, h8, h9);
    };
    /**
     * Add the elements and store in this.
     * @param a The a element.
     * @param b The b element.
     */
    FieldElement.prototype.add = function (a, b) {
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
    };
    /**
     * Subtract the elements and store in this.
     * @param a The a element.
     * @param b The b element.
     */
    FieldElement.prototype.sub = function (a, b) {
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
    };
    /**
     * Populate from bytes.
     * @param bytes The bytes to populate from.
     */
    FieldElement.prototype.fromBytes = function (bytes) {
        var h0 = bigIntHelper_1.BigIntHelper.read4(bytes, 0);
        var h1 = bigIntHelper_1.BigIntHelper.read3(bytes, 4) << bigIntCommon_1.BIG_ARR[6];
        var h2 = bigIntHelper_1.BigIntHelper.read3(bytes, 7) << bigIntCommon_1.BIG_ARR[5];
        var h3 = bigIntHelper_1.BigIntHelper.read3(bytes, 10) << bigIntCommon_1.BIG_ARR[3];
        var h4 = bigIntHelper_1.BigIntHelper.read3(bytes, 13) << bigIntCommon_1.BIG_ARR[2];
        var h5 = bigIntHelper_1.BigIntHelper.read4(bytes, 16);
        var h6 = bigIntHelper_1.BigIntHelper.read3(bytes, 20) << bigIntCommon_1.BIG_ARR[7];
        var h7 = bigIntHelper_1.BigIntHelper.read3(bytes, 23) << bigIntCommon_1.BIG_ARR[5];
        var h8 = bigIntHelper_1.BigIntHelper.read3(bytes, 26) << bigIntCommon_1.BIG_ARR[4];
        var h9 = (bigIntHelper_1.BigIntHelper.read3(bytes, 29) & bigIntCommon_1.BIG_8388607) << bigIntCommon_1.BIG_ARR[2];
        this.combine(h0, h1, h2, h3, h4, h5, h6, h7, h8, h9);
    };
    /**
     * FieldElement.toBytes marshals h to s.
     * Preconditions:
     *   |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     *
     * Write p=2^255-19; q=floor(h/p).
     * Basic claim: q = floor(2^(-255)(h + 19 2^(-25)h9 + 2^(-1))).
     *
     * Proof:
     *   Have |h|<=p so |q|<=1 so |19^2 2^(-255) q|<1/4.
     *   Also have |h-2^230 h9|<2^230 so |19 2^(-255)(h-2^230 h9)|<1/4.
     *
     *   Write y=2^(-1)-19^2 2^(-255)q-19 2^(-255)(h-2^230 h9).
     *   Then 0<y<1.
     *
     *   Write r=h-pq.
     *   Have 0<=r<=p-1=2^255-20.
     *   Thus 0<=r+19(2^-255)r<r+19(2^-255)2^255<=2^255-1.
     *
     *   Write x=r+19(2^-255)r+y.
     *   Then 0<x<2^255 so floor(2^(-255)x) = 0 so floor(q+2^(-255)x) = q.
     *
     *   Have q+2^(-255)x = 2^(-255)(h + 19 2^(-25) h9 + 2^(-1))
     *   so floor(2^(-255)(h + 19 2^(-25) h9 + 2^(-1))) = q.
     * @param bytes The bytes to populate.
     */
    FieldElement.prototype.toBytes = function (bytes) {
        var carry = new Int32Array(FieldElement.FIELD_ELEMENT_SIZE);
        var q = ((19 * this.data[9]) + (1 << 24)) >> 25;
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
        bytes[0] = (Math.trunc(this.data[0]));
        bytes[1] = (this.data[0] >> 8);
        bytes[2] = (this.data[0] >> 16);
        bytes[3] = ((this.data[0] >> 24) | (this.data[1] << 2));
        bytes[4] = (this.data[1] >> 6);
        bytes[5] = (this.data[1] >> 14);
        bytes[6] = ((this.data[1] >> 22) | (this.data[2] << 3));
        bytes[7] = (this.data[2] >> 5);
        bytes[8] = (this.data[2] >> 13);
        bytes[9] = ((this.data[2] >> 21) | (this.data[3] << 5));
        bytes[10] = (this.data[3] >> 3);
        bytes[11] = (this.data[3] >> 11);
        bytes[12] = ((this.data[3] >> 19) | (this.data[4] << 6));
        bytes[13] = (this.data[4] >> 2);
        bytes[14] = (this.data[4] >> 10);
        bytes[15] = (this.data[4] >> 18);
        bytes[16] = (Math.trunc(this.data[5]));
        bytes[17] = (this.data[5] >> 8);
        bytes[18] = (this.data[5] >> 16);
        bytes[19] = ((this.data[5] >> 24) | (this.data[6] << 1));
        bytes[20] = (this.data[6] >> 7);
        bytes[21] = (this.data[6] >> 15);
        bytes[22] = ((this.data[6] >> 23) | (this.data[7] << 3));
        bytes[23] = (this.data[7] >> 5);
        bytes[24] = (this.data[7] >> 13);
        bytes[25] = ((this.data[7] >> 21) | (this.data[8] << 4));
        bytes[26] = (this.data[8] >> 4);
        bytes[27] = (this.data[8] >> 12);
        bytes[28] = ((this.data[8] >> 20) | (this.data[9] << 6));
        bytes[29] = (this.data[9] >> 2);
        bytes[30] = (this.data[9] >> 10);
        bytes[31] = (this.data[9] >> 18);
    };
    /**
     * Is the element negative.
     * @returns 1 if its negative.
     */
    FieldElement.prototype.isNegative = function () {
        var s = new Uint8Array(32);
        this.toBytes(s);
        return s[0] & 1;
    };
    /**
     * Is the value non zero.
     * @returns 1 if non zero.
     */
    FieldElement.prototype.isNonZero = function () {
        var s = new Uint8Array(32);
        this.toBytes(s);
        var x = 0;
        for (var i = 0; i < s.length; i++) {
            x |= s[i];
        }
        x |= x >> 4;
        x |= x >> 2;
        x |= x >> 1;
        return (x & 1);
    };
    /**
     * Neg sets h = -f
     *
     * Preconditions:
     *    |f| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     *
     * Postconditions:
     *    |h| bounded by 1.1*2^25,1.1*2^24,1.1*2^25,1.1*2^24,etc.
     */
    FieldElement.prototype.neg = function () {
        for (var i = 0; i < FieldElement.FIELD_ELEMENT_SIZE; i++) {
            this.data[i] = -this.data[i];
        }
    };
    /**
     * Invert
     * @param z The elemnt to invert.
     */
    FieldElement.prototype.invert = function (z) {
        var t0 = new FieldElement();
        var t1 = new FieldElement();
        var t2 = new FieldElement();
        var t3 = new FieldElement();
        var i;
        t0.square(z); // 2^1
        t1.square(t0); // 2^2
        for (i = 1; i < 2; i++) { // 2^3
            t1.square(t1);
        }
        t1.mul(z, t1); // 2^3 + 2^0
        t0.mul(t0, t1); // 2^3 + 2^1 + 2^0
        t2.square(t0); // 2^4 + 2^2 + 2^1
        t1.mul(t1, t2); // 2^4 + 2^3 + 2^2 + 2^1 + 2^0
        t2.square(t1); // 5,4,3,2,1
        for (i = 1; i < 5; i++) { // 9,8,7,6,5
            t2.square(t2);
        }
        t1.mul(t2, t1); // 9,8,7,6,5,4,3,2,1,0
        t2.square(t1); // 10..1
        for (i = 1; i < 10; i++) { // 19..10
            t2.square(t2);
        }
        t2.mul(t2, t1); // 19..0
        t3.square(t2); // 20..1
        for (i = 1; i < 20; i++) { // 39..20
            t3.square(t3);
        }
        t2.mul(t3, t2); // 39..0
        t2.square(t2); // 40..1
        for (i = 1; i < 10; i++) { // 49..10
            t2.square(t2);
        }
        t1.mul(t2, t1); // 49..0
        t2.square(t1); // 50..1
        for (i = 1; i < 50; i++) { // 99..50
            t2.square(t2);
        }
        t2.mul(t2, t1); // 99..0
        t3.square(t2); // 100..1
        for (i = 1; i < 100; i++) { // 199..100
            t3.square(t3);
        }
        t2.mul(t3, t2); // 199..0
        t2.square(t2); // 200..1
        for (i = 1; i < 50; i++) { // 249..50
            t2.square(t2);
        }
        t1.mul(t2, t1); // 249..0
        t1.square(t1); // 250..1
        for (i = 1; i < 5; i++) { // 254..5
            t1.square(t1);
        }
        this.mul(t1, t0); // 254..5,3,1,0
    };
    /**
     * Perform the pow 22523 calculate.
     * @param z The element to operate on.
     */
    FieldElement.prototype.pow22523 = function (z) {
        var t0 = new FieldElement();
        var t1 = new FieldElement();
        var t2 = new FieldElement();
        var i;
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
    };
    /**
     * Replace (f,g) with (g,g) if b == 1;
     * replace (f,g) with (f,g) if b == 0.
     *
     * Preconditions: b in {0,1}.
     * @param g The g element.
     * @param b The b value.
     */
    FieldElement.prototype.cMove = function (g, b) {
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
    };
    /**
     * Zero the values.
     */
    FieldElement.prototype.zero = function () {
        this.data.fill(0);
    };
    /**
     * Zero all the values and set the first byte to 1.
     */
    FieldElement.prototype.one = function () {
        this.data.fill(0);
        this.data[0] = 1;
    };
    /**
     * Clone the field element.
     * @returns The clones element.
     */
    FieldElement.prototype.clone = function () {
        return new FieldElement(this.data);
    };
    /**
     * Field element size.
     */
    FieldElement.FIELD_ELEMENT_SIZE = 10;
    return FieldElement;
}());
exports.FieldElement = FieldElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NyeXB0by9lZHdhcmRzMjU1MTkvZmllbGRFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDOzs7QUFFdEMsK0JBQStCO0FBQy9COzs7O0dBSUc7QUFDSCx5REFBd0Q7QUFDeEQsK0NBQWdHO0FBRWhHOzs7Ozs7R0FNRztBQUNIO0lBV0k7OztPQUdHO0lBQ0gsc0JBQVksTUFBOEI7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM1RCxJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4Qkc7SUFDSSwwQkFBRyxHQUFWLFVBQVcsQ0FBZSxFQUFFLENBQWU7UUFDdkMsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QixJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYztRQUNuRCxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtRQUM3RCxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQyxJQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDNUQsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDekYsSUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3RFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztZQUN0RSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMzRSxJQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDbEUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDeEUsSUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ2xFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzNFLElBQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNoRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN0RSxJQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDbEUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ2hFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2xFLElBQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNsRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNuRSxJQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDaEUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFF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LEdBQXJCLFVBQXNCLENBQWU7UUFZakMsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFNLElBQUksR0FBRyxxQkFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFlBQVk7UUFDdEMsSUFBTSxJQUFJLEdBQUcsc0JBQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxZQUFZO1FBQzNDLElBQU0sSUFBSSxHQUFHLHFCQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsWUFBWTtRQUN0QyxJQUFNLElBQUksR0FBRyxzQkFBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFlBQVk7UUFDM0MsSUFBTSxJQUFJLEdBQUcscUJBQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxZQUFZO1FBRXRDLE9BQU87WUFDSCxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3ZGLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDeEUsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztZQUN0RixFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3RFLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDcEYsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztZQUNyRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ25GLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDbkUsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztZQUNqRixFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ3JFLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0ksOEJBQU8sR0FBZCxVQUFlLENBQWU7UUFDdEIsSUFBQSxLQUE2QyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFqRSxFQUFFLFFBQUEsRUFBRSxFQUFFLFFBQUEsRUFBRSxFQUFFLFFBQUEsRUFBRSxFQUFFLFFBQUEsRUFBRSxFQUFFLFFBQUEsRUFBRSxFQUFFLFFBQUEsRUFBRSxFQUFFLFFBQUEsRUFBRSxFQUFFLFFBQUEsRUFBRSxFQUFFLFFBQUEsRUFBRSxFQUFFLFFBQTJCLENBQUM7UUFFeEUsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNULEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDVCxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ1QsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNULEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDVCxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ1QsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNULEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDVCxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ1QsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUVULElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSwwQkFBRyxHQUFWLFVBQVcsQ0FBZSxFQUFFLENBQWU7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSwwQkFBRyxHQUFWLFVBQVcsQ0FBZSxFQUFFLENBQWU7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGdDQUFTLEdBQWhCLFVBQWlCLEtBQWlCO1FBQzlCLElBQU0sRUFBRSxHQUFHLDJCQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUFNLEVBQUUsR0FBRywyQkFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksc0JBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFNLEVBQUUsR0FBRywyQkFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksc0JBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFNLEVBQUUsR0FBRywyQkFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksc0JBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFNLEVBQUUsR0FBRywyQkFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksc0JBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFNLEVBQUUsR0FBRywyQkFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBTSxFQUFFLEdBQUcsMkJBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLHNCQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBTSxFQUFFLEdBQUcsMkJBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLHNCQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBTSxFQUFFLEdBQUcsMkJBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLHNCQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBTSxFQUFFLEdBQUcsQ0FBQywyQkFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsMEJBQVcsQ0FBQyxJQUFJLHNCQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSSw4QkFBTyxHQUFkLFVBQWUsS0FBaUI7UUFDNUIsSUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFOUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEQsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFN0IsK0RBQStEO1FBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2QiwyREFBMkQ7UUFFM0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixlQUFlO1FBRWYsNEVBQTRFO1FBQzVFLGtEQUFrRDtRQUNsRCxtQ0FBbUM7UUFDbkMsb0NBQW9DO1FBRXBDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9CLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FB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Q0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUztZQUNoQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQ3hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQ3ZCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUztZQUNoQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQ3hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQ3ZCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUztZQUNoQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQ3hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ3hCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsV0FBVztZQUNuQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ3pCLEVBQUUsQ0FBQyxNQUFNLENBQUMs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LENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSw0QkFBSyxHQUFaLFVBQWEsQ0FBZSxFQUFFLENBQVM7UUFDbkMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwyQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMEJBQUcsR0FBVjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7O09BR0c7SUFDSSw0QkFBSyxHQUFaO1FBQ0ksT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQXJzQkQ7O09BRUc7SUFDcUIsK0JBQWtCLEdBQVcsRUFBRSxDQUFDO0lBbXNCNUQsbUJBQUM7Q0FBQSxBQXZzQkQsSUF1c0JDO0FBdnNCWSxvQ0FBWSJ9
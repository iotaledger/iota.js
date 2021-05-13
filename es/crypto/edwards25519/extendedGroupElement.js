"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedGroupElement = void 0;
/* eslint-disable no-bitwise */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
const arrayHelper_1 = require("../../utils/arrayHelper");
const cachedGroupElement_1 = require("./cachedGroupElement");
const completedGroupElement_1 = require("./completedGroupElement");
const const_1 = require("./const");
const fieldElement_1 = require("./fieldElement");
const preComputedGroupElement_1 = require("./preComputedGroupElement");
const projectiveGroupElement_1 = require("./projectiveGroupElement");
/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
 * y^2 where d = -121665/121666.
 * ExtendedGroupElement: (X:Y:Z:T) satisfying x=X/Z, y=Y/Z, XY=ZT
 */
class ExtendedGroupElement {
    /**
     * Create a new instance of ExtendedGroupElement.
     * @param X The X element.
     * @param Y The Y Element.
     * @param Z The Z Element.
     * @param T The T Element.
     */
    constructor(X, Y, Z, T) {
        this.X = X !== null && X !== void 0 ? X : new fieldElement_1.FieldElement();
        this.Y = Y !== null && Y !== void 0 ? Y : new fieldElement_1.FieldElement();
        this.Z = Z !== null && Z !== void 0 ? Z : new fieldElement_1.FieldElement();
        this.T = T !== null && T !== void 0 ? T : new fieldElement_1.FieldElement();
    }
    /**
     * Zero the elements.
     */
    zero() {
        this.X.zero();
        this.Y.one();
        this.Z.one();
        this.T.zero();
    }
    /**
     * Double the element.
     * @param cachedGroupElement The element to populate.
     */
    double(cachedGroupElement) {
        const q = new projectiveGroupElement_1.ProjectiveGroupElement();
        this.toProjective(q);
        q.double(cachedGroupElement);
    }
    /**
     * Convert to a cached group element.
     * @param cacheGroupElement The element to populate.
     */
    toCached(cacheGroupElement) {
        cacheGroupElement.yPlusX.add(this.Y, this.X);
        cacheGroupElement.yMinusX.sub(this.Y, this.X);
        cacheGroupElement.Z = this.Z.clone();
        cacheGroupElement.T2d.mul(this.T, const_1.CONST_D2);
    }
    /**
     * Convert to a projective group element.
     * @param projectiveGroupElement The element to populate.
     */
    toProjective(projectiveGroupElement) {
        projectiveGroupElement.X = this.X.clone();
        projectiveGroupElement.Y = this.Y.clone();
        projectiveGroupElement.Z = this.Z.clone();
    }
    /**
     * Convert the element to bytes.
     * @param bytes The array to store the bytes in.
     */
    toBytes(bytes) {
        const recip = new fieldElement_1.FieldElement();
        const x = new fieldElement_1.FieldElement();
        const y = new fieldElement_1.FieldElement();
        recip.invert(this.Z);
        x.mul(this.X, recip);
        y.mul(this.Y, recip);
        y.toBytes(bytes);
        bytes[31] ^= x.isNegative() << 7;
    }
    /**
     * Populate the element from bytes.
     * @param bytes The butes to populate from.
     * @returns False is non-zero check.
     */
    fromBytes(bytes) {
        const u = new fieldElement_1.FieldElement();
        const v = new fieldElement_1.FieldElement();
        const v3 = new fieldElement_1.FieldElement();
        const vxx = new fieldElement_1.FieldElement();
        const check = new fieldElement_1.FieldElement();
        let i;
        this.Y.fromBytes(bytes);
        this.Z.one();
        u.square(this.Y);
        v.mul(u, const_1.CONST_D);
        u.sub(u, this.Z); // y = y^2-1
        v.add(v, this.Z); // v = dy^2+1
        v3.square(v);
        v3.mul(v3, v); // v3 = v^3
        this.X.square(v3);
        this.X.mul(this.X, v);
        this.X.mul(this.X, u); // x = uv^7
        this.X.pow22523(this.X); // x = (uv^7)^((q-5)/8)
        this.X.mul(this.X, v3);
        this.X.mul(this.X, u); // x = uv^3(uv^7)^((q-5)/8)
        const tmpX = new Uint8Array(32);
        const tmp2 = new Uint8Array(32);
        vxx.square(this.X);
        vxx.mul(vxx, v);
        check.sub(vxx, u); // vx^2-u
        if (check.isNonZero() === 1) {
            check.add(vxx, u); // vx^2+u
            if (check.isNonZero() === 1) {
                return false;
            }
            this.X.mul(this.X, const_1.CONST_SQRT_M1);
            this.X.toBytes(tmpX);
            for (i = 0; i < tmpX.length; i++) {
                tmp2[31 - i] = tmpX[i];
            }
        }
        if (this.X.isNegative() !== (bytes[31] >> 7)) {
            this.X.neg();
        }
        this.T.mul(this.X, this.Y);
        return true;
    }
    /**
     * GeScalarMultBase computes h = a*B, where
     *  a = a[0]+256*a[1]+...+256^31 a[31]
     *  B is the Ed25519 base point (x,4/5) with x positive.
     * Preconditions:
     *  a[31] <= 127
     * @param a The a.
     */
    scalarMultBase(a) {
        const e = new Int8Array(64);
        for (let i = 0; i < a.length; i++) {
            e[2 * i] = a[i] & 15;
            e[(2 * i) + 1] = (a[i] >> 4) & 15;
        }
        // each e[i] is between 0 and 15 and e[63] is between 0 and 7.
        let carry = 0;
        for (let i = 0; i < 63; i++) {
            e[i] += carry;
            carry = (e[i] + 8) >> 4;
            e[i] -= carry << 4;
        }
        e[63] += carry;
        // each e[i] is between -8 and 8.
        this.zero();
        const t = new preComputedGroupElement_1.PreComputedGroupElement();
        const r = new completedGroupElement_1.CompletedGroupElement();
        for (let i = 1; i < 64; i += 2) {
            t.selectPoint(Math.floor(i / 2), e[i]);
            r.mixedAdd(this, t);
            r.toExtended(this);
        }
        const s = new projectiveGroupElement_1.ProjectiveGroupElement();
        this.double(r);
        r.toProjective(s);
        s.double(r);
        r.toProjective(s);
        s.double(r);
        r.toProjective(s);
        s.double(r);
        r.toExtended(this);
        for (let i = 0; i < 64; i += 2) {
            t.selectPoint(i / 2, e[i]);
            r.mixedAdd(this, t);
            r.toExtended(this);
        }
    }
    /**
     * CofactorEqual checks whether p, q are equal up to cofactor multiplication
     * (ie. if their difference is of small order).
     * @param q The extended group element.
     * @returns True if they are equal.
     */
    cofactorEqual(q) {
        const t1 = new cachedGroupElement_1.CachedGroupElement();
        const t2 = new completedGroupElement_1.CompletedGroupElement();
        const t3 = new projectiveGroupElement_1.ProjectiveGroupElement();
        q.toCached(t1);
        t2.sub(this, t1); // t2 =    (P - Q)
        t2.toProjective(t3); // t3 =    (P - Q)
        t3.double(t2); // t2 = [2](P - Q)
        t2.toProjective(t3); // t3 = [2](P - Q)
        t3.double(t2); // t2 = [4](P - Q)
        t2.toProjective(t3); // t3 = [4](P - Q)
        t3.double(t2); // t2 = [8](P - Q)
        t2.toProjective(t3); // t3 = [8](P - Q)
        // Now we want to check whether the point t3 is the identity.
        // In projective coordinates this is (X:Y:Z) ~ (0:1:0)
        // ie. X/Z = 0, Y/Z = 1
        // <=> X = 0, Y = Z
        const zero = new Uint8Array(32);
        const xBytes = new Uint8Array(32);
        const yBytes = new Uint8Array(32);
        const zBytes = new Uint8Array(32);
        t3.X.toBytes(xBytes);
        t3.Y.toBytes(yBytes);
        t3.Z.toBytes(zBytes);
        return arrayHelper_1.ArrayHelper.equal(zero, xBytes) && arrayHelper_1.ArrayHelper.equal(yBytes, zBytes);
    }
}
exports.ExtendedGroupElement = ExtendedGroupElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZWRHcm91cEVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL2Vkd2FyZHMyNTUxOS9leHRlbmRlZEdyb3VwRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQzs7O0FBRXRDLCtCQUErQjtBQUMvQjs7OztHQUlHO0FBQ0gseURBQXNEO0FBQ3RELDZEQUEwRDtBQUMxRCxtRUFBZ0U7QUFDaEUsbUNBQTJEO0FBQzNELGlEQUE4QztBQUM5Qyx1RUFBb0U7QUFDcEUscUVBQWtFO0FBRWxFOzs7O0dBSUc7QUFDSCxNQUFhLG9CQUFvQjtJQXFCN0I7Ozs7OztPQU1HO0lBQ0gsWUFBWSxDQUFnQixFQUFFLENBQWdCLEVBQUUsQ0FBZ0IsRUFBRSxDQUFnQjtRQUM5RSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBRCxDQUFDLGNBQUQsQ0FBQyxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFELENBQUMsY0FBRCxDQUFDLEdBQUksSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQUQsQ0FBQyxjQUFELENBQUMsR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBRCxDQUFDLGNBQUQsQ0FBQyxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNJLElBQUk7UUFDUCxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lB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
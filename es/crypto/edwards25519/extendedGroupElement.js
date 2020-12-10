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
var arrayHelper_1 = require("../../utils/arrayHelper");
var cachedGroupElement_1 = require("./cachedGroupElement");
var completedGroupElement_1 = require("./completedGroupElement");
var const_1 = require("./const");
var fieldElement_1 = require("./fieldElement");
var preComputedGroupElement_1 = require("./preComputedGroupElement");
var projectiveGroupElement_1 = require("./projectiveGroupElement");
/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
 * y^2 where d = -121665/121666.
 * ExtendedGroupElement: (X:Y:Z:T) satisfying x=X/Z, y=Y/Z, XY=ZT
 */
var ExtendedGroupElement = /** @class */ (function () {
    /**
     * Create a new instance of ExtendedGroupElement.
     * @param X The X element.
     * @param Y The Y Element.
     * @param Z The Z Element.
     * @param T The T Element.
     */
    function ExtendedGroupElement(X, Y, Z, T) {
        this.X = X !== null && X !== void 0 ? X : new fieldElement_1.FieldElement();
        this.Y = Y !== null && Y !== void 0 ? Y : new fieldElement_1.FieldElement();
        this.Z = Z !== null && Z !== void 0 ? Z : new fieldElement_1.FieldElement();
        this.T = T !== null && T !== void 0 ? T : new fieldElement_1.FieldElement();
    }
    /**
     * Zero the elements.
     */
    ExtendedGroupElement.prototype.zero = function () {
        this.X.zero();
        this.Y.one();
        this.Z.one();
        this.T.zero();
    };
    /**
     * Double the element.
     * @param cachedGroupElement The element to populate.
     */
    ExtendedGroupElement.prototype.double = function (cachedGroupElement) {
        var q = new projectiveGroupElement_1.ProjectiveGroupElement();
        this.toProjective(q);
        q.double(cachedGroupElement);
    };
    /**
     * Convert to a cached group element.
     * @param cacheGroupElement The element to populate.
     */
    ExtendedGroupElement.prototype.toCached = function (cacheGroupElement) {
        cacheGroupElement.yPlusX.add(this.Y, this.X);
        cacheGroupElement.yMinusX.sub(this.Y, this.X);
        cacheGroupElement.Z = this.Z.clone();
        cacheGroupElement.T2d.mul(this.T, const_1.CONST_D2);
    };
    /**
     * Convert to a projective group element.
     * @param projectiveGroupElement The element to populate.
     */
    ExtendedGroupElement.prototype.toProjective = function (projectiveGroupElement) {
        projectiveGroupElement.X = this.X.clone();
        projectiveGroupElement.Y = this.Y.clone();
        projectiveGroupElement.Z = this.Z.clone();
    };
    /**
     * Convert the element to bytes.
     * @param bytes The array to store the bytes in.
     */
    ExtendedGroupElement.prototype.toBytes = function (bytes) {
        var recip = new fieldElement_1.FieldElement();
        var x = new fieldElement_1.FieldElement();
        var y = new fieldElement_1.FieldElement();
        recip.invert(this.Z);
        x.mul(this.X, recip);
        y.mul(this.Y, recip);
        y.toBytes(bytes);
        bytes[31] ^= x.isNegative() << 7;
    };
    /**
     * Populate the element from bytes.
     * @param bytes The butes to populate from.
     * @returns False is non-zero check.
     */
    ExtendedGroupElement.prototype.fromBytes = function (bytes) {
        var u = new fieldElement_1.FieldElement();
        var v = new fieldElement_1.FieldElement();
        var v3 = new fieldElement_1.FieldElement();
        var vxx = new fieldElement_1.FieldElement();
        var check = new fieldElement_1.FieldElement();
        var i;
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
        var tmpX = new Uint8Array(32);
        var tmp2 = new Uint8Array(32);
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
    };
    /**
     * GeScalarMultBase computes h = a*B, where
     *  a = a[0]+256*a[1]+...+256^31 a[31]
     *  B is the Ed25519 base point (x,4/5) with x positive.
     * Preconditions:
     *  a[31] <= 127
     * @param a The a.
     */
    ExtendedGroupElement.prototype.scalarMultBase = function (a) {
        var e = new Int8Array(64);
        for (var i = 0; i < a.length; i++) {
            e[2 * i] = a[i] & 15;
            e[(2 * i) + 1] = (a[i] >> 4) & 15;
        }
        // each e[i] is between 0 and 15 and e[63] is between 0 and 7.
        var carry = 0;
        for (var i = 0; i < 63; i++) {
            e[i] += carry;
            carry = (e[i] + 8) >> 4;
            e[i] -= carry << 4;
        }
        e[63] += carry;
        // each e[i] is between -8 and 8.
        this.zero();
        var t = new preComputedGroupElement_1.PreComputedGroupElement();
        var r = new completedGroupElement_1.CompletedGroupElement();
        for (var i = 1; i < 64; i += 2) {
            t.selectPoint(Math.floor(i / 2), e[i]);
            r.mixedAdd(this, t);
            r.toExtended(this);
        }
        var s = new projectiveGroupElement_1.ProjectiveGroupElement();
        this.double(r);
        r.toProjective(s);
        s.double(r);
        r.toProjective(s);
        s.double(r);
        r.toProjective(s);
        s.double(r);
        r.toExtended(this);
        for (var i = 0; i < 64; i += 2) {
            t.selectPoint(i / 2, e[i]);
            r.mixedAdd(this, t);
            r.toExtended(this);
        }
    };
    /**
     * CofactorEqual checks whether p, q are equal up to cofactor multiplication
     * (ie. if their difference is of small order).
     * @param q The extended group element.
     * @returns True if they are equal.
     */
    ExtendedGroupElement.prototype.cofactorEqual = function (q) {
        var t1 = new cachedGroupElement_1.CachedGroupElement();
        var t2 = new completedGroupElement_1.CompletedGroupElement();
        var t3 = new projectiveGroupElement_1.ProjectiveGroupElement();
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
        var zero = new Uint8Array(32);
        var xBytes = new Uint8Array(32);
        var yBytes = new Uint8Array(32);
        var zBytes = new Uint8Array(32);
        t3.X.toBytes(xBytes);
        t3.Y.toBytes(yBytes);
        t3.Z.toBytes(zBytes);
        return arrayHelper_1.ArrayHelper.equal(zero, xBytes) && arrayHelper_1.ArrayHelper.equal(yBytes, zBytes);
    };
    return ExtendedGroupElement;
}());
exports.ExtendedGroupElement = ExtendedGroupElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZWRHcm91cEVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL2Vkd2FyZHMyNTUxOS9leHRlbmRlZEdyb3VwRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQzs7O0FBRXRDLCtCQUErQjtBQUMvQjs7OztHQUlHO0FBQ0gsdURBQXNEO0FBQ3RELDJEQUEwRDtBQUMxRCxpRUFBZ0U7QUFDaEUsaUNBQTJEO0FBQzNELCtDQUE4QztBQUM5QyxxRUFBb0U7QUFDcEUsbUVBQWtFO0FBRWxFOzs7O0dBSUc7QUFDSDtJQXFCSTs7Ozs7O09BTUc7SUFDSCw4QkFBWSxDQUFnQixFQUFFLENBQWdCLEVBQUUsQ0FBZ0IsRUFBRSxDQUFnQjtRQUM5RSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBRCxDQUFDLGNBQUQsQ0FBQyxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFELENBQUMsY0FBRCxDQUFDLEdBQUksSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQUQsQ0FBQyxjQUFELENBQUMsR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBRCxDQUFDLGNBQUQsQ0FBQyxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNJLG1DQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxxQ0FBTSxHQUFiLFVBQWMsa0JBQXlDO1FBQ25ELElBQU0sQ0FBQyxHQUFHLElBQUksK0NBQXNCLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksdUNBQVEsR0FBZixVQUFnQixpQkFBcUM7UUFDakQsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxnQkFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDJDQUFZLEdBQW5CLFVBQW9CLHNCQUE4QztRQUM5RCxzQkFBc0IsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQyxzQkFBc0IsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQyxzQkFBc0IsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksc0NBQU8sR0FBZCxVQUFlLEtBQWlCO1FBQzVCLElBQU0sS0FBSyxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQ2pDLElBQU0sQ0FBQyxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQzdCLElBQU0sQ0FBQyxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBRTdCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQixLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLHdDQUFTLEdBQWhCLFVBQWlCLEtBQWlCO1FBQzlCLElBQU0sQ0FBQyxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQzdCLElBQU0sQ0FBQyxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQzdCLElBQU0sRUFBRSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQzlCLElBQU0sR0FBRyxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQy9CLElBQU0sS0FBSyxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFDO1FBRU4sSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLGVBQU8sQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVk7UUFDOUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTtRQUUvQixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXO1FBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7UUFFbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO1FBQ2hELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLDJCQUEyQjtRQUVsRCxJQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxJQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDNUIsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUM1QixJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pCLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxxQkFBYSxDQUFDLENBQUM7WUFFbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5QixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtTQUNKO1FBRUQsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQzFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLDZDQUFjLEdBQXJCLFVBQXNCLENBQWE7UUFDL0IsSUFBTSxDQUFDLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDckM7UUFFRCw4REFBOEQ7UUFFOUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDO1lBQ2QsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztTQUN0QjtRQUNELENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDZixpQ0FBaUM7UUFFakMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBTSxDQUFDLEdBQUcsSUFBSSxpREFBdUIsRUFBRSxDQUFDO1FBQ3hDLElBQU0sQ0FBQyxHQUFHLElBQUksNkNBQXFCLEVBQUUsQ0FBQztRQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO1FBRUQsSUFBTSxDQUFDLEdBQUcsSUFBSSwrQ0FBc0IsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFZixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDRDQUFhLEdBQXBCLFVBQXFCLENBQXVCO1FBQ3hDLElBQU0sRUFBRSxHQUFHLElBQUksdUNBQWtCLEVBQUUsQ0FBQztRQUNwQyxJQUFNLEVBQUUsR0FBRyxJQUFJLDZDQUFxQixFQUFFLENBQUM7UUFDdkMsSUFBTSxFQUFFLEdBQUcsSUFBSSwrQ0FBc0IsRUFBRSxDQUFDO1FBRXhDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDZixFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtRQUNwQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCO1FBQ3ZDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0I7UUFDakMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtRQUN2QyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCO1FBQ2pDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0I7UUFDdkMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtRQUNqQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCO1FBRXZDLDZEQUE2RDtRQUM3RCxzREFBc0Q7UUFDdEQsdUJBQXVCO1FBQ3ZCLG1CQUFtQjtRQUVuQixJQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxJQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQyxJQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQyxJQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVyQixPQUFPLHlCQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSx5QkFBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQWpQRCxJQWlQQztBQWpQWSxvREFBb0IifQ==
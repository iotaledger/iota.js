"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZWRHcm91cEVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL2Vkd2FyZHMyNTUxOS9leHRlbmRlZEdyb3VwRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0I7Ozs7R0FJRztBQUNILHVEQUFzRDtBQUN0RCwyREFBMEQ7QUFDMUQsaUVBQWdFO0FBQ2hFLGlDQUEyRDtBQUMzRCwrQ0FBOEM7QUFDOUMscUVBQW9FO0FBQ3BFLG1FQUFrRTtBQUVsRTs7OztHQUlHO0FBQ0g7SUFxQkk7Ozs7OztPQU1HO0lBQ0gsOEJBQVksQ0FBZ0IsRUFBRSxDQUFnQixFQUFFLENBQWdCLEVBQUUsQ0FBZ0I7UUFDOUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQUQsQ0FBQyxjQUFELENBQUMsR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBRCxDQUFDLGNBQUQsQ0FBQyxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFELENBQUMsY0FBRCxDQUFDLEdBQUksSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQUQsQ0FBQyxjQUFELENBQUMsR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxtQ0FBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0kscUNBQU0s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
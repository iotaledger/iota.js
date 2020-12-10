"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectiveGroupElement = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
var cachedGroupElement_1 = require("./cachedGroupElement");
var completedGroupElement_1 = require("./completedGroupElement");
var const_1 = require("./const");
var extendedGroupElement_1 = require("./extendedGroupElement");
var fieldElement_1 = require("./fieldElement");
/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
 * y^2 where d = -121665/121666.
 * ProjectiveGroupElement: (X:Y:Z) satisfying x=X/Z, y=Y/Z
 */
var ProjectiveGroupElement = /** @class */ (function () {
    /**
     * Create a new instance of CompletedGroupElement.
     * @param X The X element.
     * @param Y The Y Element.
     * @param Z The Z Element.
     */
    function ProjectiveGroupElement(X, Y, Z) {
        this.X = X !== null && X !== void 0 ? X : new fieldElement_1.FieldElement();
        this.Y = Y !== null && Y !== void 0 ? Y : new fieldElement_1.FieldElement();
        this.Z = Z !== null && Z !== void 0 ? Z : new fieldElement_1.FieldElement();
    }
    ProjectiveGroupElement.prototype.zero = function () {
        this.X.zero();
        this.Y.one();
        this.Z.one();
    };
    ProjectiveGroupElement.prototype.double = function (r) {
        var t0 = new fieldElement_1.FieldElement();
        r.X.square(this.X);
        r.Z.square(this.Y);
        r.T.square2(this.Z);
        r.Y.add(this.X, this.Y);
        t0.square(r.Y);
        r.Y.add(r.Z, r.X);
        r.Z.sub(r.Z, r.X);
        r.X.sub(t0, r.Y);
        r.T.sub(r.T, r.Z);
    };
    ProjectiveGroupElement.prototype.toExtended = function (r) {
        r.X.mul(this.X, this.Z);
        r.Y.mul(this.Y, this.Z);
        r.Z.square(this.Z);
        r.T.mul(this.X, this.Y);
    };
    ProjectiveGroupElement.prototype.toBytes = function (s) {
        var recip = new fieldElement_1.FieldElement();
        var x = new fieldElement_1.FieldElement();
        var y = new fieldElement_1.FieldElement();
        recip.invert(this.Z);
        x.mul(this.X, recip);
        y.mul(this.Y, recip);
        y.toBytes(s);
        s[31] ^= x.isNegative() << 7;
    };
    /**
     * GeDoubleScalarMultVartime sets r = a*A + b*B
     * where a = a[0]+256*a[1]+...+256^31 a[31].
     * and b = b[0]+256*b[1]+...+256^31 b[31].
     * B is the Ed25519 base point (x,4/5) with x positive.
     * @param a The a
     * @param A The A
     * @param b The b
     */
    ProjectiveGroupElement.prototype.doubleScalarMultVartime = function (a, A, b) {
        var aSlide = new Int8Array(256);
        var bSlide = new Int8Array(256);
        var ai = [
            new cachedGroupElement_1.CachedGroupElement(),
            new cachedGroupElement_1.CachedGroupElement(),
            new cachedGroupElement_1.CachedGroupElement(),
            new cachedGroupElement_1.CachedGroupElement(),
            new cachedGroupElement_1.CachedGroupElement(),
            new cachedGroupElement_1.CachedGroupElement(),
            new cachedGroupElement_1.CachedGroupElement(),
            new cachedGroupElement_1.CachedGroupElement()
        ]; // A,3A,5A,7A,9A,11A,13A,15A
        var t = new completedGroupElement_1.CompletedGroupElement();
        var u = new extendedGroupElement_1.ExtendedGroupElement();
        var A2 = new extendedGroupElement_1.ExtendedGroupElement();
        var i;
        this.slide(aSlide, a);
        this.slide(bSlide, b);
        A.toCached(ai[0]);
        A.double(t);
        t.toExtended(A2);
        for (i = 0; i < 7; i++) {
            t.add(A2, ai[i]);
            t.toExtended(u);
            u.toCached(ai[i + 1]);
        }
        this.zero();
        for (i = 255; i >= 0; i--) {
            if (aSlide[i] !== 0 || bSlide[i] !== 0) {
                break;
            }
        }
        for (; i >= 0; i--) {
            this.double(t);
            if (aSlide[i] > 0) {
                t.toExtended(u);
                t.add(u, ai[Math.floor(aSlide[i] / 2)]);
            }
            else if (aSlide[i] < 0) {
                t.toExtended(u);
                t.sub(u, ai[Math.floor(-aSlide[i] / 2)]);
            }
            if (bSlide[i] > 0) {
                t.toExtended(u);
                t.mixedAdd(u, const_1.CONST_BI[Math.floor(bSlide[i] / 2)]);
            }
            else if (bSlide[i] < 0) {
                t.toExtended(u);
                t.mixedSub(u, const_1.CONST_BI[Math.floor(-bSlide[i] / 2)]);
            }
            t.toProjective(this);
        }
    };
    /**
     * Perform the slide.
     * @param r The r.
     * @param a The a.
     */
    ProjectiveGroupElement.prototype.slide = function (r, a) {
        var i;
        for (i = 0; i < r.length; i++) {
            r[i] = 1 & (a[i >> 3] >> (i & 7));
        }
        for (i = 0; i < r.length; i++) {
            if (r[i] !== 0) {
                for (var b = 1; b <= 6 && i + b < 256; b++) {
                    if (r[i + b] !== 0) {
                        if (r[i] + (r[i + b] << b) <= 15) {
                            r[i] += r[i + b] << b;
                            r[i + b] = 0;
                        }
                        else if (r[i] - (r[i + b] << b) >= -15) {
                            r[i] -= r[i + b] << b;
                            for (var k = i + b; k < 256; k++) {
                                if (r[k] === 0) {
                                    r[k] = 1;
                                    break;
                                }
                                r[k] = 0;
                            }
                        }
                        else {
                            break;
                        }
                    }
                }
            }
        }
    };
    return ProjectiveGroupElement;
}());
exports.ProjectiveGroupElement = ProjectiveGroupElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGl2ZUdyb3VwRWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jcnlwdG8vZWR3YXJkczI1NTE5L3Byb2plY3RpdmVHcm91cEVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywrQkFBK0I7QUFDL0I7Ozs7R0FJRztBQUNILDJEQUEwRDtBQUMxRCxpRUFBZ0U7QUFDaEUsaUNBQW1DO0FBQ25DLCtEQUE4RDtBQUM5RCwrQ0FBOEM7QUFFOUM7Ozs7R0FJRztBQUNIO0lBZ0JJOzs7OztPQUtHO0lBQ0gsZ0NBQVksQ0FBZ0IsRUFBRSxDQUFnQixFQUFFLENBQWdCO1FBQzVELElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFELENBQUMsY0FBRCxDQUFDLEdBQUksSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQUQsQ0FBQyxjQUFELENBQUMsR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBRCxDQUFDLGNBQUQsQ0FBQyxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFHTSxxQ0FBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSx1Q0FBTSxHQUFiLFVBQWMsQ0FBd0I7UUFDbEMsSUFBTSxFQUFFLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFB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
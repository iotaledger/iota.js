"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectiveGroupElement = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGl2ZUdyb3VwRWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jcnlwdG8vZWR3YXJkczI1NTE5L3Byb2plY3RpdmVHcm91cEVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9COzs7O0dBSUc7QUFDSCwyREFBMEQ7QUFDMUQsaUVBQWdFO0FBQ2hFLGlDQUFtQztBQUNuQywrREFBOEQ7QUFDOUQsK0NBQThDO0FBRTlDOzs7O0dBSUc7QUFDSDtJQWdCSTs7Ozs7T0FLRztJQUNILGdDQUFZLENBQWdCLEVBQUUsQ0FBZ0IsRUFBRSxDQUFnQjtRQUM1RCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBRCxDQUFDLGNBQUQsQ0FBQyxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFELENBQUMsY0FBRCxDQUFDLEdBQUksSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQUQsQ0FBQyxjQUFELENBQUMsR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBR00scUNBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU0sdUNBQU0sR0FBYixVQUFjLENBQXdCO1FBQ2xDLElBQU0sRUFBRSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFD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
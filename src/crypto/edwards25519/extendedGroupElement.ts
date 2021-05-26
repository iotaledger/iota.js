// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-bitwise */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which is in turn a port of the “ref10” implementation of ed25519 from SUPERCOP.
 */
import { ArrayHelper } from "../../utils/arrayHelper";
import { CachedGroupElement } from "./cachedGroupElement";
import { CompletedGroupElement } from "./completedGroupElement";
import { CONST_D, CONST_D2, CONST_SQRT_M1 } from "./const";
import { FieldElement } from "./fieldElement";
import { PreComputedGroupElement } from "./preComputedGroupElement";
import { ProjectiveGroupElement } from "./projectiveGroupElement";

/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 * y^2 where d = -121665/121666.
 * ExtendedGroupElement: (X:Y:Z:T) satisfying x=X/Z, y=Y/Z, XY=ZT.
 */
export class ExtendedGroupElement {
    /**
     * The X element.
     */
    public X: FieldElement;

    /**
     * The Y Element.
     */
    public Y: FieldElement;

    /**
     * The Z Element.
     */
    public Z: FieldElement;

    /**
     * The T Element.
     */
    public T: FieldElement;

    /**
     * Create a new instance of ExtendedGroupElement.
     * @param X The X element.
     * @param Y The Y Element.
     * @param Z The Z Element.
     * @param T The T Element.
     */
    constructor(X?: FieldElement, Y?: FieldElement, Z?: FieldElement, T?: FieldElement) {
        this.X = X ?? new FieldElement();
        this.Y = Y ?? new FieldElement();
        this.Z = Z ?? new FieldElement();
        this.T = T ?? new FieldElement();
    }

    /**
     * Zero the elements.
     */
    public zero(): void {
        this.X.zero();
        this.Y.one();
        this.Z.one();
        this.T.zero();
    }

    /**
     * Double the element.
     * @param cachedGroupElement The element to populate.
     */
    public double(cachedGroupElement: CompletedGroupElement): void {
        const q = new ProjectiveGroupElement();
        this.toProjective(q);
        q.double(cachedGroupElement);
    }

    /**
     * Convert to a cached group element.
     * @param cacheGroupElement The element to populate.
     */
    public toCached(cacheGroupElement: CachedGroupElement): void {
        cacheGroupElement.yPlusX.add(this.Y, this.X);
        cacheGroupElement.yMinusX.sub(this.Y, this.X);
        cacheGroupElement.Z = this.Z.clone();
        cacheGroupElement.T2d.mul(this.T, CONST_D2);
    }

    /**
     * Convert to a projective group element.
     * @param projectiveGroupElement The element to populate.
     */
    public toProjective(projectiveGroupElement: ProjectiveGroupElement): void {
        projectiveGroupElement.X = this.X.clone();
        projectiveGroupElement.Y = this.Y.clone();
        projectiveGroupElement.Z = this.Z.clone();
    }

    /**
     * Convert the element to bytes.
     * @param bytes The array to store the bytes in.
     */
    public toBytes(bytes: Uint8Array): void {
        const recip = new FieldElement();
        const x = new FieldElement();
        const y = new FieldElement();

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
    public fromBytes(bytes: Uint8Array): boolean {
        const u = new FieldElement();
        const v = new FieldElement();
        const v3 = new FieldElement();
        const vxx = new FieldElement();
        const check = new FieldElement();
        let i;

        this.Y.fromBytes(bytes);
        this.Z.one();
        u.square(this.Y);
        v.mul(u, CONST_D);
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
            this.X.mul(this.X, CONST_SQRT_M1);

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
     * a = a[0]+256*a[1]+...+256^31 a[31]
     * b is the Ed25519 base point (x,4/5) with x positive.
     *
     * Preconditions:
     * A[31] <= 127.
     * @param a The a.
     */
    public scalarMultBase(a: Uint8Array): void {
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
        const t = new PreComputedGroupElement();
        const r = new CompletedGroupElement();
        for (let i = 1; i < 64; i += 2) {
            t.selectPoint(Math.floor(i / 2), e[i]);
            r.mixedAdd(this, t);
            r.toExtended(this);
        }

        const s = new ProjectiveGroupElement();
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
     * ie if their difference is of small order.
     * @param q The extended group element.
     * @returns True if they are equal.
     */
    public cofactorEqual(q: ExtendedGroupElement): boolean {
        const t1 = new CachedGroupElement();
        const t2 = new CompletedGroupElement();
        const t3 = new ProjectiveGroupElement();

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

        return ArrayHelper.equal(zero, xBytes) && ArrayHelper.equal(yBytes, zBytes);
    }
}

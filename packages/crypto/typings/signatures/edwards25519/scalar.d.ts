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
export declare function scalarMulAdd(s: Uint8Array, a: Uint8Array, b: Uint8Array, c: Uint8Array): void;
/**
 * Scalar reduce
 * where l = 2^252 + 27742317777372353535851937790883648493.
 * @param out Where s[0]+256*s[1]+...+256^31*s[31] = s mod l.
 * @param s Where s[0]+256*s[1]+...+256^63*s[63] = s.
 */
export declare function scalarReduce(out: Uint8Array, s: Uint8Array): void;
/**
 * Scalar Minimal returns true if the given scalar is less than the order of the Curve.
 * @param scalar The scalar.
 * @returns True if the given scalar is less than the order of the Curve.
 */
export declare function scalarMinimal(scalar: Uint8Array): boolean;

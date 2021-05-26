import { CachedGroupElement } from "./cachedGroupElement";
import { CompletedGroupElement } from "./completedGroupElement";
import { FieldElement } from "./fieldElement";
import { ProjectiveGroupElement } from "./projectiveGroupElement";
/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 * y^2 where d = -121665/121666.
 * ExtendedGroupElement: (X:Y:Z:T) satisfying x=X/Z, y=Y/Z, XY=ZT.
 */
export declare class ExtendedGroupElement {
    /**
     * The X element.
     */
    X: FieldElement;
    /**
     * The Y Element.
     */
    Y: FieldElement;
    /**
     * The Z Element.
     */
    Z: FieldElement;
    /**
     * The T Element.
     */
    T: FieldElement;
    /**
     * Create a new instance of ExtendedGroupElement.
     * @param X The X element.
     * @param Y The Y Element.
     * @param Z The Z Element.
     * @param T The T Element.
     */
    constructor(X?: FieldElement, Y?: FieldElement, Z?: FieldElement, T?: FieldElement);
    /**
     * Zero the elements.
     */
    zero(): void;
    /**
     * Double the element.
     * @param cachedGroupElement The element to populate.
     */
    double(cachedGroupElement: CompletedGroupElement): void;
    /**
     * Convert to a cached group element.
     * @param cacheGroupElement The element to populate.
     */
    toCached(cacheGroupElement: CachedGroupElement): void;
    /**
     * Convert to a projective group element.
     * @param projectiveGroupElement The element to populate.
     */
    toProjective(projectiveGroupElement: ProjectiveGroupElement): void;
    /**
     * Convert the element to bytes.
     * @param bytes The array to store the bytes in.
     */
    toBytes(bytes: Uint8Array): void;
    /**
     * Populate the element from bytes.
     * @param bytes The butes to populate from.
     * @returns False is non-zero check.
     */
    fromBytes(bytes: Uint8Array): boolean;
    /**
     * GeScalarMultBase computes h = a*B, where
     * a = a[0]+256*a[1]+...+256^31 a[31]
     * b is the Ed25519 base point (x,4/5) with x positive.
     *
     * Preconditions:
     * A[31] <= 127.
     * @param a The a.
     */
    scalarMultBase(a: Uint8Array): void;
    /**
     * CofactorEqual checks whether p, q are equal up to cofactor multiplication
     * ie if their difference is of small order.
     * @param q The extended group element.
     * @returns True if they are equal.
     */
    cofactorEqual(q: ExtendedGroupElement): boolean;
}

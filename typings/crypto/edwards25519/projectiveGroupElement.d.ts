import { CompletedGroupElement } from "./completedGroupElement";
import { ExtendedGroupElement } from "./extendedGroupElement";
import { FieldElement } from "./fieldElement";
/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
 * y^2 where d = -121665/121666
 * ProjectiveGroupElement: (X:Y:Z) satisfying x=X/Z, y=Y/Z.
 */
export declare class ProjectiveGroupElement {
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
     * Create a new instance of CompletedGroupElement.
     * @param X The X element.
     * @param Y The Y Element.
     * @param Z The Z Element.
     */
    constructor(X?: FieldElement, Y?: FieldElement, Z?: FieldElement);
    /**
     * Zero the elements.
     */
    zero(): void;
    /**
     * Double the elements.
     * @param r The elements.
     */
    double(r: CompletedGroupElement): void;
    /**
     * Convert to extended form.
     * @param r The extended element.
     */
    toExtended(r: ExtendedGroupElement): void;
    /**
     * Convert the element to bytes.
     * @param s The bytes.
     */
    toBytes(s: Uint8Array): void;
    /**
     * GeDoubleScalarMultVartime sets r = a*A + b*B
     * where a = a[0]+256*a[1]+...+256^31 a[31]
     * and b = b[0]+256*b[1]+...+256^31 b[31]
     * B is the Ed25519 base point (x,4/5) with x positive.
     * @param a The a.
     * @param A The A.
     * @param b The b.
     */
    doubleScalarMultVartime(a: Uint8Array, A: ExtendedGroupElement, b: Uint8Array): void;
    /**
     * Perform the slide.
     * @param r The r.
     * @param a The a.
     */
    private slide;
}

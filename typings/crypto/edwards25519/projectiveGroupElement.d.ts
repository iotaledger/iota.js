import { CompletedGroupElement } from "./completedGroupElement";
import { ExtendedGroupElement } from "./extendedGroupElement";
import { FieldElement } from "./fieldElement";
/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
 * y^2 where d = -121665/121666.
 * ProjectiveGroupElement: (X:Y:Z) satisfying x=X/Z, y=Y/Z
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
    zero(): void;
    double(r: CompletedGroupElement): void;
    toExtended(r: ExtendedGroupElement): void;
    toBytes(s: Uint8Array): void;
    /**
     * GeDoubleScalarMultVartime sets r = a*A + b*B
     * where a = a[0]+256*a[1]+...+256^31 a[31].
     * and b = b[0]+256*b[1]+...+256^31 b[31].
     * B is the Ed25519 base point (x,4/5) with x positive.
     * @param a The a
     * @param A The A
     * @param b The b
     */
    doubleScalarMultVartime(a: Uint8Array, A: ExtendedGroupElement, b: Uint8Array): void;
    /**
     * Perform the slide.
     * @param r The r.
     * @param a The a.
     */
    private slide;
}

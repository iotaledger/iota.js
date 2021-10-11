import type { CachedGroupElement } from "./cachedGroupElement";
import type { ExtendedGroupElement } from "./extendedGroupElement";
import { FieldElement } from "./fieldElement";
import type { PreComputedGroupElement } from "./preComputedGroupElement";
import type { ProjectiveGroupElement } from "./projectiveGroupElement";
/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
 * y^2 where d = -121665/121666.
 * CompletedGroupElement: ((X:Z),(Y:T)) satisfying x=X/Z, y=Y/T.
 */
export declare class CompletedGroupElement {
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
     * Create a new instance of CompletedGroupElement.
     * @param X The X element.
     * @param Y The Y Element.
     * @param Z The Z Element.
     * @param T The T Element.
     */
    constructor(X?: FieldElement, Y?: FieldElement, Z?: FieldElement, T?: FieldElement);
    /**
     * Group Element add.
     * @param p The extended group element.
     * @param q The cached group element.
     */
    add(p: ExtendedGroupElement, q: CachedGroupElement): void;
    /**
     * Group Element substract.
     * @param p The p.
     * @param q The q.
     */
    sub(p: ExtendedGroupElement, q: CachedGroupElement): void;
    /**
     * Mixed add.
     * @param p The p.
     * @param q The q.
     */
    mixedAdd(p: ExtendedGroupElement, q: PreComputedGroupElement): void;
    /**
     * Mixed subtract.
     * @param p The p.
     * @param q The q.
     */
    mixedSub(p: ExtendedGroupElement, q: PreComputedGroupElement): void;
    /**
     * Convert to projective element.
     * @param p The projective element to fill.
     */
    toProjective(p: ProjectiveGroupElement): void;
    /**
     * Convert to extended element.
     * @param e The extended element to fill.
     */
    toExtended(e: ExtendedGroupElement): void;
}

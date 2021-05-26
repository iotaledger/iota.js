import { FieldElement } from "./fieldElement";
/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
 * y^2 where d = -121665/121666.
 * PreComputedGroupElement: (y+x,y-x,2dxy).
 */
export declare class PreComputedGroupElement {
    /**
     * Y + X Element.
     */
    yPlusX: FieldElement;
    /**
     * Y - X Element.
     */
    yMinusX: FieldElement;
    /**
     * X Y 2 d Element.
     */
    xy2d: FieldElement;
    /**
     * Create a new instance of PreComputedGroupElement.
     * @param yPlusX Y + X Element.
     * @param yMinusX Y - X Element.
     * @param xy2d XY2d Element.
     */
    constructor(yPlusX?: FieldElement, yMinusX?: FieldElement, xy2d?: FieldElement);
    /**
     * Set the elements to zero.
     */
    zero(): void;
    /**
     * CMove the pre computed element.
     * @param u The u.
     * @param b The b.
     */
    cMove(u: PreComputedGroupElement, b: number): void;
    /**
     * Select point.
     * @param pos The position.
     * @param b The index.
     */
    selectPoint(pos: number, b: number): void;
    /**
     * Negative returns 1 if b < 0 and 0 otherwise.
     * @param b The b.
     * @returns 1 if b < 0 and 0.
     */
    private negative;
    /**
     * Equal returns 1 if b == c and 0 otherwise, assuming that b and c are
     * non-negative.
     * @param b The b.
     * @param c The c.
     * @returns 1 if b == c and 0.
     */
    private equal;
}

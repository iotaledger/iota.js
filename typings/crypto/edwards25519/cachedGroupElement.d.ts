import { FieldElement } from "./fieldElement";
/**
 * Cached group element.
 */
export declare class CachedGroupElement {
    /**
     * Y + X Element.
     */
    yPlusX: FieldElement;
    /**
     * Y - X Element.
     */
    yMinusX: FieldElement;
    /**
     * Z Element.
     */
    Z: FieldElement;
    /**
     * T2d Element.
     */
    T2d: FieldElement;
    /**
     * Create a new instance of CachedGroupElement.
     * @param yPlusX Y + X Element.
     * @param yMinusX Y - X Element.
     * @param Z Z Element.
     * @param T2d T2d Element.
     */
    constructor(yPlusX?: FieldElement, yMinusX?: FieldElement, Z?: FieldElement, T2d?: FieldElement);
}

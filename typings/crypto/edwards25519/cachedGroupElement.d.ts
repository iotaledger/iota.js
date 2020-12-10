/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
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
     * Y - X Element
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
     * @param yMinusX Y - X Element
     * @param Z Z Element.
     * @param T2d T2d Element.
     */
    constructor(yPlusX?: FieldElement, yMinusX?: FieldElement, Z?: FieldElement, T2d?: FieldElement);
}

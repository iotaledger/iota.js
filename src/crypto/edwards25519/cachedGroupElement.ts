/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
import { FieldElement } from "./fieldElement";

/**
 * Cached group element.
 */
export class CachedGroupElement {
    /**
     * Y + X Element.
     */
    public yPlusX: FieldElement;

    /**
     * Y - X Element
     */
    public yMinusX: FieldElement;

    /**
     * Z Element.
     */
    public Z: FieldElement;

    /**
     * T2d Element.
     */
    public T2d: FieldElement;

    /**
     * Create a new instance of CachedGroupElement.
     * @param yPlusX Y + X Element.
     * @param yMinusX Y - X Element
     * @param Z Z Element.
     * @param T2d T2d Element.
     */
    constructor(yPlusX?: FieldElement, yMinusX?: FieldElement, Z?: FieldElement, T2d?: FieldElement) {
        this.yPlusX = yPlusX ?? new FieldElement();
        this.yMinusX = yMinusX ?? new FieldElement();
        this.Z = Z ?? new FieldElement();
        this.T2d = T2d ?? new FieldElement();
    }
}

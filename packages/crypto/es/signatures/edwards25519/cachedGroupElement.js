// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { FieldElement } from "./fieldElement";
/**
 * Cached group element.
 */
export class CachedGroupElement {
    /**
     * Create a new instance of CachedGroupElement.
     * @param yPlusX Y + X Element.
     * @param yMinusX Y - X Element.
     * @param Z Z Element.
     * @param T2d T2d Element.
     */
    constructor(yPlusX, yMinusX, Z, T2d) {
        this.yPlusX = yPlusX !== null && yPlusX !== void 0 ? yPlusX : new FieldElement();
        this.yMinusX = yMinusX !== null && yMinusX !== void 0 ? yMinusX : new FieldElement();
        this.Z = Z !== null && Z !== void 0 ? Z : new FieldElement();
        this.T2d = T2d !== null && T2d !== void 0 ? T2d : new FieldElement();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVkR3JvdXBFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NpZ25hdHVyZXMvZWR3YXJkczI1NTE5L2NhY2hlZEdyb3VwRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBRXRDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxrQkFBa0I7SUFxQjNCOzs7Ozs7T0FNRztJQUNILFlBQVksTUFBcUIsRUFBRSxPQUFzQixFQUFFLENBQWdCLEVBQUUsR0FBa0I7UUFDM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBRCxDQUFDLGNBQUQsQ0FBQyxHQUFJLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLGFBQUgsR0FBRyxjQUFILEdBQUcsR0FBSSxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7Q0FDSiJ9
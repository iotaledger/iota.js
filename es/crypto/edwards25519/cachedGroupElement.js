"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedGroupElement = void 0;
const fieldElement_1 = require("./fieldElement");
/**
 * Cached group element.
 */
class CachedGroupElement {
    /**
     * Create a new instance of CachedGroupElement.
     * @param yPlusX Y + X Element.
     * @param yMinusX Y - X Element
     * @param Z Z Element.
     * @param T2d T2d Element.
     */
    constructor(yPlusX, yMinusX, Z, T2d) {
        this.yPlusX = yPlusX !== null && yPlusX !== void 0 ? yPlusX : new fieldElement_1.FieldElement();
        this.yMinusX = yMinusX !== null && yMinusX !== void 0 ? yMinusX : new fieldElement_1.FieldElement();
        this.Z = Z !== null && Z !== void 0 ? Z : new fieldElement_1.FieldElement();
        this.T2d = T2d !== null && T2d !== void 0 ? T2d : new fieldElement_1.FieldElement();
    }
}
exports.CachedGroupElement = CachedGroupElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVkR3JvdXBFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NyeXB0by9lZHdhcmRzMjU1MTkvY2FjaGVkR3JvdXBFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDOzs7QUFFdEMsaURBQThDO0FBRTlDOztHQUVHO0FBQ0gsTUFBYSxrQkFBa0I7SUFxQjNCOzs7Ozs7T0FNRztJQUNILFlBQVksTUFBcUIsRUFBRSxPQUFzQixFQUFFLENBQWdCLEVBQUUsR0FBa0I7UUFDM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFELENBQUMsY0FBRCxDQUFDLEdBQUksSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLGFBQUgsR0FBRyxjQUFILEdBQUcsR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0NBQ0o7QUFsQ0QsZ0RBa0NDIn0=
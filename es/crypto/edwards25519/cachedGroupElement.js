"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedGroupElement = void 0;
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
var fieldElement_1 = require("./fieldElement");
/**
 * Cached group element.
 */
var CachedGroupElement = /** @class */ (function () {
    /**
     * Create a new instance of CachedGroupElement.
     * @param yPlusX Y + X Element.
     * @param yMinusX Y - X Element
     * @param Z Z Element.
     * @param T2d T2d Element.
     */
    function CachedGroupElement(yPlusX, yMinusX, Z, T2d) {
        this.yPlusX = yPlusX !== null && yPlusX !== void 0 ? yPlusX : new fieldElement_1.FieldElement();
        this.yMinusX = yMinusX !== null && yMinusX !== void 0 ? yMinusX : new fieldElement_1.FieldElement();
        this.Z = Z !== null && Z !== void 0 ? Z : new fieldElement_1.FieldElement();
        this.T2d = T2d !== null && T2d !== void 0 ? T2d : new fieldElement_1.FieldElement();
    }
    return CachedGroupElement;
}());
exports.CachedGroupElement = CachedGroupElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVkR3JvdXBFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NyeXB0by9lZHdhcmRzMjU1MTkvY2FjaGVkR3JvdXBFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7O0dBSUc7QUFDSCwrQ0FBOEM7QUFFOUM7O0dBRUc7QUFDSDtJQXFCSTs7Ozs7O09BTUc7SUFDSCw0QkFBWSxNQUFxQixFQUFFLE9BQXNCLEVBQUUsQ0FBZ0IsRUFBRSxHQUFrQjtRQUMzRixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQUQsQ0FBQyxjQUFELENBQUMsR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsYUFBSCxHQUFHLGNBQUgsR0FBRyxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFDTCx5QkFBQztBQUFELENBQUMsQUFsQ0QsSUFrQ0M7QUFsQ1ksZ0RBQWtCIn0=
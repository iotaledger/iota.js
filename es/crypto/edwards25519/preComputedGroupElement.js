"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreComputedGroupElement = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/**
 * This is a port of the Go code from https://github.com/hdevalence/ed25519consensus
 * which is an extension of https://github.com/golang/crypto/tree/master/ed25519
 * which in a port of the “ref10” implementation of ed25519 from SUPERCOP
 */
var const_1 = require("./const");
var fieldElement_1 = require("./fieldElement");
/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
 * y^2 where d = -121665/121666.
 * PreComputedGroupElement: (y+x,y-x,2dxy)
 */
var PreComputedGroupElement = /** @class */ (function () {
    /**
     * Create a new instance of PreComputedGroupElement.
     * @param yPlusX Y + X Element.
     * @param yMinusX Y - X Element
     * @param xy2d XY2d Element.
     */
    function PreComputedGroupElement(yPlusX, yMinusX, xy2d) {
        this.yPlusX = yPlusX !== null && yPlusX !== void 0 ? yPlusX : new fieldElement_1.FieldElement();
        this.yMinusX = yMinusX !== null && yMinusX !== void 0 ? yMinusX : new fieldElement_1.FieldElement();
        this.xy2d = xy2d !== null && xy2d !== void 0 ? xy2d : new fieldElement_1.FieldElement();
    }
    /**
     * Set the elements to zero.
     */
    PreComputedGroupElement.prototype.zero = function () {
        this.yPlusX.one();
        this.yMinusX.one();
        this.xy2d.zero();
    };
    /**
     * CMove the pre computed element.
     * @param u The u.
     * @param b The b.
     */
    PreComputedGroupElement.prototype.cMove = function (u, b) {
        this.yPlusX.cMove(u.yPlusX, b);
        this.yMinusX.cMove(u.yMinusX, b);
        this.xy2d.cMove(u.xy2d, b);
    };
    /**
     * Select point.
     * @param pos The position.
     * @param b The index.
     */
    PreComputedGroupElement.prototype.selectPoint = function (pos, b) {
        var minusT = new PreComputedGroupElement();
        var bNegative = this.negative(b);
        var bAbs = b - (((-bNegative) & b) << 1);
        this.zero();
        for (var i = 0; i < 8; i++) {
            this.cMove(const_1.CONST_BASE[pos][i], this.equal(bAbs, i + 1));
        }
        minusT.yPlusX = this.yMinusX.clone();
        minusT.yMinusX = this.yPlusX.clone();
        minusT.xy2d = this.xy2d.clone();
        minusT.xy2d.neg();
        this.cMove(minusT, bNegative);
    };
    /**
     * Negative returns 1 if b < 0 and 0 otherwise.
     * @param b The b.
     * @returns 1 if b < 0 and 0
     */
    PreComputedGroupElement.prototype.negative = function (b) {
        return (b >> 31) & 1;
    };
    /**
     * Equal returns 1 if b == c and 0 otherwise, assuming that b and c are
     * non-negative.
     * @param b The b.
     * @param c the c.
     * @returns 1 if b == c and 0
     */
    PreComputedGroupElement.prototype.equal = function (b, c) {
        var x = (b ^ c) & 0xFFFFFFFF;
        x--;
        return Math.abs(x >> 31);
    };
    return PreComputedGroupElement;
}());
exports.PreComputedGroupElement = PreComputedGroupElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlQ29tcHV0ZWRHcm91cEVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL2Vkd2FyZHMyNTUxOS9wcmVDb21wdXRlZEdyb3VwRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQjs7OztHQUlHO0FBQ0gsaUNBQXFDO0FBQ3JDLCtDQUE4QztBQUU5Qzs7OztHQUlHO0FBQ0g7SUFnQkk7Ozs7O09BS0c7SUFDSCxpQ0FBWSxNQUFxQixFQUFFLE9BQXNCLEVBQUUsSUFBbUI7UUFDMUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxhQUFKLElBQUksY0FBSixJQUFJLEdBQUksSUFBSSwyQkFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksc0NBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksdUNBQUssR0FBWixVQUFhLENBQTBCLEVBQUUsQ0FBUztRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDZDQUFXLEdBQWxCLFVBQW1CLEdBQVcsRUFBRSxDQUFTO1FBQ3JDLElBQU0sTUFBTSxHQUFHLElBQUksdUJBQXVCLEVBQUUsQ0FBQztRQUM3QyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNEO1FBRUQsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVsQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDBDQUFRLEdBQWhCLFVBQWlCLENBQVM7UUFDdEIsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLHVDQUFLLEdBQWIsVUFBYyxDQUFTLEVBQUUsQ0FBUztRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDN0IsQ0FBQyxFQUFFLENBQUM7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDTCw4QkFBQztBQUFELENBQUMsQUE1RkQsSUE0RkM7QUE1RlksMERBQXVCIn0=
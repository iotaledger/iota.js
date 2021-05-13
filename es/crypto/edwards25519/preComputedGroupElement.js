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
const const_1 = require("./const");
const fieldElement_1 = require("./fieldElement");
/**
 * Group elements are members of the elliptic curve -x^2 + y^2 = 1 + d * x^2 *
 * y^2 where d = -121665/121666.
 * PreComputedGroupElement: (y+x,y-x,2dxy)
 */
class PreComputedGroupElement {
    /**
     * Create a new instance of PreComputedGroupElement.
     * @param yPlusX Y + X Element.
     * @param yMinusX Y - X Element
     * @param xy2d XY2d Element.
     */
    constructor(yPlusX, yMinusX, xy2d) {
        this.yPlusX = yPlusX !== null && yPlusX !== void 0 ? yPlusX : new fieldElement_1.FieldElement();
        this.yMinusX = yMinusX !== null && yMinusX !== void 0 ? yMinusX : new fieldElement_1.FieldElement();
        this.xy2d = xy2d !== null && xy2d !== void 0 ? xy2d : new fieldElement_1.FieldElement();
    }
    /**
     * Set the elements to zero.
     */
    zero() {
        this.yPlusX.one();
        this.yMinusX.one();
        this.xy2d.zero();
    }
    /**
     * CMove the pre computed element.
     * @param u The u.
     * @param b The b.
     */
    cMove(u, b) {
        this.yPlusX.cMove(u.yPlusX, b);
        this.yMinusX.cMove(u.yMinusX, b);
        this.xy2d.cMove(u.xy2d, b);
    }
    /**
     * Select point.
     * @param pos The position.
     * @param b The index.
     */
    selectPoint(pos, b) {
        const minusT = new PreComputedGroupElement();
        const bNegative = this.negative(b);
        const bAbs = b - (((-bNegative) & b) << 1);
        this.zero();
        for (let i = 0; i < 8; i++) {
            this.cMove(const_1.CONST_BASE[pos][i], this.equal(bAbs, i + 1));
        }
        minusT.yPlusX = this.yMinusX.clone();
        minusT.yMinusX = this.yPlusX.clone();
        minusT.xy2d = this.xy2d.clone();
        minusT.xy2d.neg();
        this.cMove(minusT, bNegative);
    }
    /**
     * Negative returns 1 if b < 0 and 0 otherwise.
     * @param b The b.
     * @returns 1 if b < 0 and 0
     */
    negative(b) {
        return (b >> 31) & 1;
    }
    /**
     * Equal returns 1 if b == c and 0 otherwise, assuming that b and c are
     * non-negative.
     * @param b The b.
     * @param c the c.
     * @returns 1 if b == c and 0
     */
    equal(b, c) {
        let x = (b ^ c) & 0xFFFFFFFF;
        x--;
        return Math.abs(x >> 31);
    }
}
exports.PreComputedGroupElement = PreComputedGroupElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlQ29tcHV0ZWRHcm91cEVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL2Vkd2FyZHMyNTUxOS9wcmVDb21wdXRlZEdyb3VwRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQjs7OztHQUlHO0FBQ0gsbUNBQXFDO0FBQ3JDLGlEQUE4QztBQUU5Qzs7OztHQUlHO0FBQ0gsTUFBYSx1QkFBdUI7SUFnQmhDOzs7OztPQUtHO0lBQ0gsWUFBWSxNQUFxQixFQUFFLE9BQXNCLEVBQUUsSUFBbUI7UUFDMUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxhQUFKLElBQUksY0FBSixJQUFJLEdBQUksSUFBSSwyQkFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksSUFBSTtRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLENBQTBCLEVBQUUsQ0FBUztRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFdBQVcsQ0FBQyxHQUFXLEVBQUUsQ0FBUztRQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFJLHVCQUF1QixFQUFFLENBQUM7UUFDN0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzRDtRQUVELE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxRQUFRLENBQUMsQ0FBUztRQUN0QixPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssS0FBSyxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUM3QixDQUFDLEVBQUUsQ0FBQztRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNKO0FBNUZELDBEQTRGQyJ9
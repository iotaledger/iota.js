"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreComputedGroupElement = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlQ29tcHV0ZWRHcm91cEVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL2Vkd2FyZHMyNTUxOS9wcmVDb21wdXRlZEdyb3VwRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0I7Ozs7R0FJRztBQUNILGlDQUFxQztBQUNyQywrQ0FBOEM7QUFFOUM7Ozs7R0FJRztBQUNIO0lBZ0JJOzs7OztPQUtHO0lBQ0gsaUNBQVksTUFBcUIsRUFBRSxPQUFzQixFQUFFLElBQW1CO1FBQzFFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLElBQUksMkJBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNJLHNDQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLHVDQUFLLEdBQVosVUFBYSxDQUEwQixFQUFFLENBQVM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSw2Q0FBVyxHQUFsQixVQUFtQixHQUFXLEVBQUUsQ0FBUztRQUNyQyxJQUFNLE1BQU0sR0FBRyxJQUFJLHVCQUF1QixFQUFFLENBQUM7UUFDN0MsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzRDtRQUVELE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSywwQ0FBUSxHQUFoQixVQUFpQixDQUFTO1FBQ3RCLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyx1Q0FBSyxHQUFiLFVBQWMsQ0FBUyxFQUFFLENBQVM7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQzdCLENBQUMsRUFBRSxDQUFDO1FBQ0osT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQUFDLEFBNUZELElBNEZDO0FBNUZZLDBEQUF1QiJ9
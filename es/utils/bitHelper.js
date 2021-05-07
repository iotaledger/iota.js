"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitHelper = void 0;
/**
 * Bit manipulation methods.
 * @internal
 */
var BitHelper = /** @class */ (function () {
    function BitHelper() {
    }
    /**
     * Combine unsigned bytes to unsigned 32-bit.
     * @param bytes The byte array.
     * @param startIndex The start index to convert.
     * @returns The 32 bit number.
     * @internal
     */
    BitHelper.u8To32LittleEndian = function (bytes, startIndex) {
        return bytes[startIndex] |
            (bytes[startIndex + 1] << 8) |
            (bytes[startIndex + 2] << 16) |
            (bytes[startIndex + 3] << 24);
    };
    /**
     * Write a 32 bit unsigned into a byte array.
     * @param bytes The array to write in to.
     * @param startIndex The index to start writing at.
     * @param value The 32 bit value.
     * @internal
     */
    BitHelper.u32To8LittleEndian = function (bytes, startIndex, value) {
        bytes[startIndex] = value;
        value >>>= 8;
        bytes[startIndex + 1] = value;
        value >>>= 8;
        bytes[startIndex + 2] = value;
        value >>>= 8;
        bytes[startIndex + 3] = value;
    };
    /**
     * Rotate the 32 bit number.
     * @param value The value to rotate,
     * @param bits The number of bits to rotate by.
     * @returns The rotated number.
     * @internal
     */
    BitHelper.rotate = function (value, bits) {
        return (value << bits) | (value >>> (32 - bits));
    };
    return BitHelper;
}());
exports.BitHelper = BitHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2JpdEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywrQkFBK0I7OztBQUUvQjs7O0dBR0c7QUFDSDtJQUFBO0lBMENBLENBQUM7SUF6Q0c7Ozs7OztPQU1HO0lBQ1csNEJBQWtCLEdBQWhDLFVBQWlDLEtBQWlCLEVBQUUsVUFBa0I7UUFDbEUsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3BCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNZLDRCQUFrQixHQUFoQyxVQUFpQyxLQUFpQixFQUFFLFVBQWtCLEVBQUUsS0FBYTtRQUNsRixLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzFCLEtBQUssTUFBTSxDQUFDLENBQUM7UUFDYixLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM5QixLQUFLLE1BQU0sQ0FBQyxDQUFDO1FBQ2IsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDOUIsS0FBSyxNQUFNLENBQUMsQ0FBQztRQUNiLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDWSxnQkFBTSxHQUFwQixVQUFxQixLQUFhLEVBQUUsSUFBWTtRQUM3QyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQTFDRCxJQTBDQztBQTFDWSw4QkFBUyJ9
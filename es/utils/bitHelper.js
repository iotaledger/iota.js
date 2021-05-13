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
class BitHelper {
    /**
     * Combine unsigned bytes to unsigned 32-bit.
     * @param bytes The byte array.
     * @param startIndex The start index to convert.
     * @returns The 32 bit number.
     * @internal
     */
    static u8To32LittleEndian(bytes, startIndex) {
        return bytes[startIndex] |
            (bytes[startIndex + 1] << 8) |
            (bytes[startIndex + 2] << 16) |
            (bytes[startIndex + 3] << 24);
    }
    /**
     * Write a 32 bit unsigned into a byte array.
     * @param bytes The array to write in to.
     * @param startIndex The index to start writing at.
     * @param value The 32 bit value.
     * @internal
     */
    static u32To8LittleEndian(bytes, startIndex, value) {
        bytes[startIndex] = value;
        value >>>= 8;
        bytes[startIndex + 1] = value;
        value >>>= 8;
        bytes[startIndex + 2] = value;
        value >>>= 8;
        bytes[startIndex + 3] = value;
    }
    /**
     * Rotate the 32 bit number.
     * @param value The value to rotate,
     * @param bits The number of bits to rotate by.
     * @returns The rotated number.
     * @internal
     */
    static rotate(value, bits) {
        return (value << bits) | (value >>> (32 - bits));
    }
}
exports.BitHelper = BitHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml0SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2JpdEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywrQkFBK0I7OztBQUUvQjs7O0dBR0c7QUFDSCxNQUFhLFNBQVM7SUFDbEI7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQWlCLEVBQUUsVUFBa0I7UUFDbEUsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3BCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFpQixFQUFFLFVBQWtCLEVBQUUsS0FBYTtRQUNsRixLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzFCLEtBQUssTUFBTSxDQUFDLENBQUM7UUFDYixLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM5QixLQUFLLE1BQU0sQ0FBQyxDQUFDO1FBQ2IsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDOUIsS0FBSyxNQUFNLENBQUMsQ0FBQztRQUNiLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQWEsRUFBRSxJQUFZO1FBQzdDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0o7QUExQ0QsOEJBMENDIn0=
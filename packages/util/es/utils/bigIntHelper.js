// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/* eslint-disable newline-per-chained-call */
/* eslint-disable no-mixed-operators */
import bigInt from "big-integer";
import { Converter } from "./converter";
import { RandomHelper } from "./randomHelper";
/**
 * Helper methods for bigints.
 */
export class BigIntHelper {
    /**
     * Load 3 bytes from array as bigint.
     * @param data The input array.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    static read3(data, byteOffset) {
        const v0 = (data[byteOffset + 0] + (data[byteOffset + 1] << 8) + (data[byteOffset + 2] << 16)) >>> 0;
        return bigInt(v0);
    }
    /**
     * Load 4 bytes from array as bigint.
     * @param data The input array.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    static read4(data, byteOffset) {
        const v0 = (data[byteOffset + 0] +
            (data[byteOffset + 1] << 8) +
            (data[byteOffset + 2] << 16) +
            (data[byteOffset + 3] << 24)) >>>
            0;
        return bigInt(v0);
    }
    /**
     * Load 8 bytes from array as bigint.
     * @param data The data to read from.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    static read8(data, byteOffset) {
        const bytes = data.slice(byteOffset, byteOffset + 8);
        // convert to little endian hex by reversing the bytes
        const hex = Converter.bytesToHex(bytes, undefined, undefined, true);
        return bigInt(hex, 16);
    }
    /**
     * Load 32 bytes (256 bits) from array as bigint.
     * @param data The data to read from.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    static read32(data, byteOffset) {
        const bytes = data.slice(byteOffset, byteOffset + 32);
        // convert to little endian hex by reversing the bytes
        const hex = Converter.bytesToHex(bytes, undefined, undefined, true);
        return bigInt(hex, 16);
    }
    /**
     * Convert a big int to bytes.
     * @param value The bigint.
     * @param data The buffer to write into.
     * @param byteOffset The start index to write from.
     */
    static write8(value, data, byteOffset) {
        let hex = value.toString(16);
        // Hex is twice the length of the bytes for padding
        hex = hex.padStart(16, "0");
        // Reverse so little endian
        const littleEndian = Converter.hexToBytes(hex, true);
        data.set(littleEndian, byteOffset);
    }
    /**
     * Convert a big int 32 bytes (256 bits) to bytes.
     * @param value The bigint.
     * @param data The buffer to write into.
     * @param byteOffset The start index to write from.
     */
    static write32(value, data, byteOffset) {
        let hex = value.toString(16);
        // Hex is twice the length of the bytes for padding
        hex = hex.padStart(64, "0");
        // Reverse so little endian
        const littleEndian = Converter.hexToBytes(hex, true);
        data.set(littleEndian, byteOffset);
    }
    /**
     * Generate a random bigint.
     * @param length The length of the bigint to generate.
     * @returns The bigint.
     */
    static random(length = 8) {
        return bigInt(Converter.bytesToHex(RandomHelper.generate(length)), 16);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlnSW50SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2JpZ0ludEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQiw2Q0FBNkM7QUFDN0MsdUNBQXVDO0FBQ3ZDLE9BQU8sTUFBc0IsTUFBTSxhQUFhLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sWUFBWTtJQUNyQjs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBZ0IsRUFBRSxVQUFrQjtRQUNwRCxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyRyxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQWdCLEVBQUUsVUFBa0I7UUFDcEQsTUFBTSxFQUFFLEdBQ0osQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNqQixDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQztRQUVOLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBZ0IsRUFBRSxVQUFrQjtRQUNwRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFckQsc0RBQXNEO1FBQ3RELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFcEUsT0FBTyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBZ0IsRUFBRSxVQUFrQjtRQUNyRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFdEQsc0RBQXNEO1FBQ3RELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFcEUsT0FBTyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBaUIsRUFBRSxJQUFnQixFQUFFLFVBQWtCO1FBQ3hFLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsbURBQW1EO1FBQ25ELEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1QiwyQkFBMkI7UUFDM0IsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFpQixFQUFFLElBQWdCLEVBQUUsVUFBa0I7UUFDekUsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixtREFBbUQ7UUFDbkQsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLDJCQUEyQjtRQUMzQixNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBaUIsQ0FBQztRQUNuQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBQ0oifQ==
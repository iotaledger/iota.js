"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigIntHelper = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
const randomHelper_1 = require("./randomHelper");
/**
 * Helper methods for bigints.
 */
class BigIntHelper {
    /**
     * Load 3 bytes from array as bigint.
     * @param data The input array.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    static read3(data, byteOffset) {
        const v0 = (data[byteOffset + 0] +
            (data[byteOffset + 1] << 8) +
            (data[byteOffset + 2] << 16)) >>> 0;
        return BigInt(v0);
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
            (data[byteOffset + 3] << 24)) >>> 0;
        return BigInt(v0);
    }
    /**
     * Load 8 bytes from array as bigint.
     * @param data The data to read from.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    static read8(data, byteOffset) {
        const v0 = (data[byteOffset + 0] +
            (data[byteOffset + 1] << 8) +
            (data[byteOffset + 2] << 16) +
            (data[byteOffset + 3] << 24)) >>> 0;
        const v1 = (data[byteOffset + 4] +
            (data[byteOffset + 5] << 8) +
            (data[byteOffset + 6] << 16) +
            (data[byteOffset + 7] << 24)) >>> 0;
        return (BigInt(v1) << BigIntHelper.BIG_32) | BigInt(v0);
    }
    /**
     * Convert a big int to bytes.
     * @param value The bigint.
     * @param data The buffer to write into.
     * @param byteOffset The start index to write from.
     */
    static write8(value, data, byteOffset) {
        const v0 = Number(value & BigIntHelper.BIG_32_MASK);
        const v1 = Number((value >> BigIntHelper.BIG_32) & BigIntHelper.BIG_32_MASK);
        data[byteOffset] = v0 & 0xFF;
        data[byteOffset + 1] = (v0 >> 8) & 0xFF;
        data[byteOffset + 2] = (v0 >> 16) & 0xFF;
        data[byteOffset + 3] = (v0 >> 24) & 0xFF;
        data[byteOffset + 4] = v1 & 0xFF;
        data[byteOffset + 5] = (v1 >> 8) & 0xFF;
        data[byteOffset + 6] = (v1 >> 16) & 0xFF;
        data[byteOffset + 7] = (v1 >> 24) & 0xFF;
    }
    /**
     * Generate a random bigint.
     * @returns The bitint.
     */
    static random() {
        return BigIntHelper.read8(randomHelper_1.RandomHelper.generate(8), 0);
    }
}
exports.BigIntHelper = BigIntHelper;
/* @internal */
BigIntHelper.BIG_32 = BigInt(32);
/* @internal */
BigIntHelper.BIG_32_MASK = BigInt(0xFFFFFFFF);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlnSW50SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2JpZ0ludEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQixpREFBOEM7QUFFOUM7O0dBRUc7QUFDSCxNQUFhLFlBQVk7SUFPckI7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQWdCLEVBQUUsVUFBa0I7UUFDcEQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUM1QixDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QyxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQWdCLEVBQUUsVUFBa0I7UUFDcEQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUM1QixDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBZ0IsRUFBRSxVQUFrQjtR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
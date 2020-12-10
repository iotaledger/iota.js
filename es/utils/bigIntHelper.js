"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigIntHelper = void 0;
/* eslint-disable no-bitwise */
var randomHelper_1 = require("./randomHelper");
/**
 * Helper methods for bigints.
 */
var BigIntHelper = /** @class */ (function () {
    function BigIntHelper() {
    }
    /**
     * Load 3 bytes from array as bigint.
     * @param data The input array.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    BigIntHelper.read3 = function (data, byteOffset) {
        var v0 = (data[byteOffset + 0] +
            (data[byteOffset + 1] << 8) +
            (data[byteOffset + 2] << 16)) >>> 0;
        return BigInt(v0);
    };
    /**
     * Load 4 bytes from array as bigint.
     * @param data The input array.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    BigIntHelper.read4 = function (data, byteOffset) {
        var v0 = (data[byteOffset + 0] +
            (data[byteOffset + 1] << 8) +
            (data[byteOffset + 2] << 16) +
            (data[byteOffset + 3] << 24)) >>> 0;
        return BigInt(v0);
    };
    /**
     * Load 8 bytes from array as bigint.
     * @param data The data to read from.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    BigIntHelper.read8 = function (data, byteOffset) {
        var v0 = (data[byteOffset + 0] +
            (data[byteOffset + 1] << 8) +
            (data[byteOffset + 2] << 16) +
            (data[byteOffset + 3] << 24)) >>> 0;
        var v1 = (data[byteOffset + 4] +
            (data[byteOffset + 5] << 8) +
            (data[byteOffset + 6] << 16) +
            (data[byteOffset + 7] << 24)) >>> 0;
        return (BigInt(v1) << BigIntHelper.BIG_32) | BigInt(v0);
    };
    /**
     * Convert a big int to bytes.
     * @param value The bigint.
     * @param data The buffer to write into.
     * @param byteOffset The start index to write from.
     */
    BigIntHelper.write8 = function (value, data, byteOffset) {
        var v0 = Number(value & BigIntHelper.BIG_32_MASK);
        var v1 = Number((value >> BigIntHelper.BIG_32) & BigIntHelper.BIG_32_MASK);
        data[byteOffset] = v0 & 0xFF;
        data[byteOffset + 1] = (v0 >> 8) & 0xFF;
        data[byteOffset + 2] = (v0 >> 16) & 0xFF;
        data[byteOffset + 3] = (v0 >> 24) & 0xFF;
        data[byteOffset + 4] = v1 & 0xFF;
        data[byteOffset + 5] = (v1 >> 8) & 0xFF;
        data[byteOffset + 6] = (v1 >> 16) & 0xFF;
        data[byteOffset + 7] = (v1 >> 24) & 0xFF;
    };
    /**
     * Generate a random bigint.
     * @returns The bitint.
     */
    BigIntHelper.random = function () {
        return BigIntHelper.read8(randomHelper_1.RandomHelper.generate(8), 0);
    };
    /* @internal */
    BigIntHelper.BIG_32 = BigInt(32);
    /* @internal */
    BigIntHelper.BIG_32_MASK = BigInt(0xFFFFFFFF);
    return BigIntHelper;
}());
exports.BigIntHelper = BigIntHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlnSW50SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2JpZ0ludEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0IsK0NBQThDO0FBRTlDOztHQUVHO0FBQ0g7SUFBQTtJQW1GQSxDQUFDO0lBNUVHOzs7OztPQUtHO0lBQ1csa0JBQUssR0FBbkIsVUFBb0IsSUFBZ0IsRUFBRSxVQUFrQjtRQUNwRCxJQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLGtCQUFLLEdBQW5CLFVBQW9CLElBQWdCLEVBQUUsVUFBa0I7UUFDcEQsSUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUM1QixDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLGtCQUFLLEdBQW5CLFVBQW9CLElBQWdCLEVBQUUsVUFBa0I7UUFDcEQsSUFBTSxFQUFFLEdBQUcsQ0FBQyxJ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
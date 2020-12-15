"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HmacSha256 = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
var sha256_1 = require("./sha256");
/**
 * Class to help with HmacSha256 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha256
 */
var HmacSha256 = /** @class */ (function () {
    /**
     * Create a new instance of HmacSha256.
     * @param key The key for the hmac.
     * @param bits The number of bits.
     */
    function HmacSha256(key, bits) {
        if (bits === void 0) { bits = 256; }
        this._bits = bits;
        this._sha256 = new sha256_1.Sha256(bits);
        if (key.length > 64) {
            key = new sha256_1.Sha256(bits)
                .update(key)
                .digest();
        }
        this._oKeyPad = new Uint8Array(64);
        var iKeyPad = new Uint8Array(64);
        for (var i = 0; i < 64; ++i) {
            var b = key[i] || 0;
            this._oKeyPad[i] = 0x5C ^ b;
            iKeyPad[i] = 0x36 ^ b;
        }
        this._sha256.update(iKeyPad);
    }
    /**
     * Perform Sum 256 on the data.
     * @param key The key for the hmac.
     * @param data The data to operate on.
     * @returns The sum 256 of the data.
     */
    HmacSha256.sum256 = function (key, data) {
        var b2b = new HmacSha256(key, 256);
        b2b.update(data);
        return b2b.digest();
    };
    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    HmacSha256.prototype.update = function (message) {
        this._sha256.update(message);
        return this;
    };
    /**
     * Get the digest.
     * @returns The digest.
     */
    HmacSha256.prototype.digest = function () {
        var innerHash = this._sha256.digest();
        var finalSha256 = new sha256_1.Sha256(this._bits);
        finalSha256.update(this._oKeyPad);
        finalSha256.update(innerHash);
        return finalSha256.digest();
    };
    return HmacSha256;
}());
exports.HmacSha256 = HmacSha256;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG1hY1NoYTI1Ni5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vaG1hY1NoYTI1Ni50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQixtQ0FBa0M7QUFFbEM7OztHQUdHO0FBQ0g7SUFtQkk7Ozs7T0FJRztJQUNILG9CQUFZLEdBQWUsRUFBRSxJQUFrQjtRQUFsQixxQkFBQSxFQUFBLFVBQWtCO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRTtZQUNqQixHQUFHLEdBQUcsSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDO2lCQUNqQixNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQyxJQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3pCLElBQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1csaUJBQU0sR0FBcEIsVUFBcUIsR0FBZSxFQUFFLElBQWdCO1FBQ2xELElBQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksMkJBQU0sR0FBYixVQUFjLE9BQW1CO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSwyQkFBTSxHQUFiO1FBQ0ksSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV4QyxJQUFNLFdBQVcsR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU5QixPQUFPLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBbEZELElBa0ZDO0FBbEZZLGdDQUFVIn0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HmacSha512 = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
var sha512_1 = require("./sha512");
/**
 * Class to help with HmacSha512 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha512
 */
var HmacSha512 = /** @class */ (function () {
    /**
     * Create a new instance of HmacSha512.
     * @param key The key for the hmac.
     * @param bits The number of bits.
     */
    function HmacSha512(key, bits) {
        if (bits === void 0) { bits = 512; }
        this._bits = bits;
        this._sha512 = new sha512_1.Sha512(bits);
        if (key.length > 128) {
            key = new sha512_1.Sha512(bits).digest();
        }
        this._oKeyPad = new Uint8Array(128);
        var iKeyPad = new Uint8Array(128);
        for (var i = 0; i < 128; ++i) {
            var b = key[i] || 0;
            this._oKeyPad[i] = 0x5C ^ b;
            iKeyPad[i] = 0x36 ^ b;
        }
        this._sha512.update(iKeyPad);
    }
    /**
     * Perform Sum 512 on the data.
     * @param key The key for thr hmac.
     * @param data The data to operate on.
     * @returns The sum 512 of the data.
     */
    HmacSha512.sum512 = function (key, data) {
        var b2b = new HmacSha512(key, 512);
        b2b.update(data);
        return b2b.digest();
    };
    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    HmacSha512.prototype.update = function (message) {
        this._sha512.update(message);
        return this;
    };
    /**
     * Get the digest.
     * @returns The digest.
     */
    HmacSha512.prototype.digest = function () {
        var innerHash = this._sha512.digest();
        var finalSha512 = new sha512_1.Sha512(this._bits);
        finalSha512.update(this._oKeyPad);
        finalSha512.update(innerHash);
        return finalSha512.digest();
    };
    return HmacSha512;
}());
exports.HmacSha512 = HmacSha512;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG1hY1NoYTUxMi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnlwdG8vaG1hY1NoYTUxMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQixtQ0FBa0M7QUFFbEM7OztHQUdHO0FBQ0g7SUFtQkk7Ozs7T0FJRztJQUNILG9CQUFZLEdBQWUsRUFBRSxJQUFrQjtRQUFsQixxQkFBQSxFQUFBLFVBQWtCO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNsQixHQUFHLEdBQUcsSUFBSSxlQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkM7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDMUIsSUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7U0FDekI7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyxpQkFBTSxHQUFwQixVQUFxQixHQUFlLEVBQUUsSUFBZ0I7UUFDbEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSwyQkFBTSxHQUFiLFVBQWMsT0FBbUI7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDJCQUFNLEdBQWI7UUFDSSxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXhDLElBQU0sV0FBVyxHQUFHLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTlCLE9BQU8sV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUFoRkQsSUFnRkM7QUFoRlksZ0NBQVUifQ==
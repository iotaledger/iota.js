"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowHelper = void 0;
/* eslint-disable no-bitwise */
var blake2b_1 = require("../crypto/blake2b");
var curl_1 = require("../crypto/curl");
var b1t6_1 = require("../encoding/b1t6");
var bigIntHelper_1 = require("./bigIntHelper");
/**
 * Helper methods for POW.
 */
var PowHelper = /** @class */ (function () {
    function PowHelper() {
    }
    /**
     * Perform the score calculation.
     * @param message The data to perform the score on
     * @returns The score for the data.
     */
    PowHelper.score = function (message) {
        // the PoW digest is the hash of msg without the nonce
        var powRelevantData = message.slice(0, -8);
        var powDigest = blake2b_1.Blake2b.sum256(powRelevantData);
        var nonce = bigIntHelper_1.BigIntHelper.read8(message, message.length - 8);
        var zeros = PowHelper.trailingZeros(powDigest, nonce);
        return Math.pow(3, zeros) / message.length;
    };
    /**
     * Calculate the trailing zeros.
     * @param powDigest The pow digest.
     * @param nonce The nonce.
     * @returns The trailing zeros.
     * @internal
     */
    PowHelper.trailingZeros = function (powDigest, nonce) {
        // allocate exactly one Curl block
        var buf = new Int8Array(243);
        var n = b1t6_1.B1T6.encode(buf, 0, powDigest);
        // add the nonce to the trit buffer
        PowHelper.encodeNonce(buf, n, nonce);
        var curl = new curl_1.Curl();
        curl.absorb(buf, 0, buf.length);
        var digest = new Int8Array(243);
        curl.squeeze(digest, 0, digest.length);
        return PowHelper.trinaryTrailingZeros(digest);
    };
    /**
     * Find the number of trailing zeros.
     * @param trits The trits to look for zeros.
     * @returns The number of trailing zeros.
     * @internal
     */
    PowHelper.trinaryTrailingZeros = function (trits) {
        var z = 0;
        for (var i = trits.length - 1; i >= 0 && trits[i] === 0; i--) {
            z++;
        }
        return z;
    };
    /**
     * Encodes nonce as 48 trits using the b1t6 encoding.
     * @param dst The destination buffer.
     * @param startIndex The start index;
     * @param nonce The nonce to encode.
     * @internal
     */
    PowHelper.encodeNonce = function (dst, startIndex, nonce) {
        var arr = new Uint8Array(8);
        bigIntHelper_1.BigIntHelper.write8(nonce, arr, 0);
        b1t6_1.B1T6.encode(dst, startIndex, arr);
    };
    return PowHelper;
}());
exports.PowHelper = PowHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG93SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3Bvd0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0IsNkNBQTRDO0FBQzVDLHVDQUFzQztBQUN0Qyx5Q0FBd0M7QUFDeEMsK0NBQThDO0FBRTlDOztHQUVHO0FBQ0g7SUFBQTtJQXNFQSxDQUFDO0lBckVHOzs7O09BSUc7SUFDVyxlQUFLLEdBQW5CLFVBQW9CLE9BQW1CO1FBQ25DLHNEQUFzRDtRQUN0RCxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdDLElBQU0sU0FBUyxHQUFHLGlCQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRWxELElBQU0sS0FBSyxHQUFHLDJCQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTlELElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ1csdUJBQWEsR0FBM0IsVUFBNEIsU0FBcUIsRUFBRSxLQUFhO1FBQzVELGtDQUFrQztRQUNsQyxJQUFNLEdBQUcsR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUvQixJQUFNLENBQUMsR0FBRyxXQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFekMsbUNBQW1DO1FBQ25DLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVyQyxJQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFaEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV2QyxPQUFPLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyw4QkFBb0IsR0FBbEMsVUFBbUMsS0FBZ0I7UUFDL0MsSUFBSSxDQUFDLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFELENBQUMsRUFBRSxDQUFDO1NBQ1A7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDVyxxQkFBVyxHQUF6QixVQUEwQixHQUFjLEVBQUUsVUFBa0IsRUFBRSxLQUFhO1FBQ3ZFLElBQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLDJCQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsV0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUF0RUQsSUFzRUM7QUF0RVksOEJBQVMifQ==
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowHelper = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG93SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3Bvd0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQiw2Q0FBNEM7QUFDNUMsdUNBQXNDO0FBQ3RDLHlDQUF3QztBQUN4QywrQ0FBOEM7QUFFOUM7O0dBRUc7QUFDSDtJQUFBO0lBc0VBLENBQUM7SUFyRUc7Ozs7T0FJRztJQUNXLGVBQUssR0FBbkIsVUFBb0IsT0FBbUI7UUFDbkMsc0RBQXNEO1FBQ3RELElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0MsSUFBTSxTQUFTLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFbEQsSUFBTSxLQUFLLEdBQUcsMkJBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFOUQsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDVyx1QkFBYSxHQUEzQixVQUE0QixTQUFxQixFQUFFLEtBQWE7UUFDNUQsa0NBQWtDO1FBQ2xDLElBQU0sR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9CLElBQU0sQ0FBQyxHQUFHLFdBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV6QyxtQ0FBbUM7UUFDbkMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXJDLElBQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVoQyxJQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZDLE9BQU8sU0FBUyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLDhCQUFvQixHQUFsQyxVQUFtQyxLQUFnQjtRQUMvQyxJQUFJLENBQUMsR0FBVyxDQUFDLENBQUM7UUFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUQsQ0FBQyxFQUFFLENBQUM7U0FDUDtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNXLHFCQUFXLEdBQXpCLFVBQTBCLEdBQWMsRUFBRSxVQUFrQixFQUFFLEtBQWE7UUFDdkUsSUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsMkJBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxXQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQXRFRCxJQXNFQztBQXRFWSw4QkFBUyJ9
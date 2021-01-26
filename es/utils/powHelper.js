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
     */
    PowHelper.trailingZeros = function (powDigest, nonce) {
        var buf = new Int8Array(curl_1.Curl.HASH_LENGTH);
        var digestTritsLen = b1t6_1.B1T6.encode(buf, 0, powDigest);
        var biArr = new Uint8Array(8);
        bigIntHelper_1.BigIntHelper.write8(nonce, biArr, 0);
        b1t6_1.B1T6.encode(buf, digestTritsLen, biArr);
        var curl = new curl_1.Curl();
        curl.absorb(buf, 0, curl_1.Curl.HASH_LENGTH);
        var hash = new Int8Array(curl_1.Curl.HASH_LENGTH);
        curl.squeeze(hash, 0, curl_1.Curl.HASH_LENGTH);
        return PowHelper.trinaryTrailingZeros(hash);
    };
    /**
     * Find the number of trailing zeros.
     * @param trits The trits to look for zeros.
     * @returns The number of trailing zeros.
     */
    PowHelper.trinaryTrailingZeros = function (trits) {
        var z = 0;
        for (var i = trits.length - 1; i >= 0 && trits[i] === 0; i--) {
            z++;
        }
        return z;
    };
    return PowHelper;
}());
exports.PowHelper = PowHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG93SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3Bvd0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQiw2Q0FBNEM7QUFDNUMsdUNBQXNDO0FBQ3RDLHlDQUF3QztBQUN4QywrQ0FBOEM7QUFFOUM7O0dBRUc7QUFDSDtJQUFBO0lBc0RBLENBQUM7SUFyREc7Ozs7T0FJRztJQUNXLGVBQUssR0FBbkIsVUFBb0IsT0FBbUI7UUFDbkMsc0RBQXNEO1FBQ3RELElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0MsSUFBTSxTQUFTLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFbEQsSUFBTSxLQUFLLEdBQUcsMkJBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFOUQsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLHVCQUFhLEdBQTNCLFVBQTRCLFNBQXFCLEVBQUUsS0FBYTtRQUM1RCxJQUFNLEdBQUcsR0FBRyxJQUFJLFNBQVMsQ0FBQyxXQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUMsSUFBTSxjQUFjLEdBQUcsV0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhDLDJCQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsV0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhDLElBQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV0QyxJQUFNLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxXQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV4QyxPQUFPLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLDhCQUFvQixHQUFsQyxVQUFtQyxLQUFnQjtRQUMvQyxJQUFJLENBQUMsR0FBVyxDQUFDLENBQUM7UUFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUQsQ0FBQyxFQUFFLENBQUM7U0FDUDtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQXRERCxJQXNEQztBQXREWSw4QkFBUyJ9
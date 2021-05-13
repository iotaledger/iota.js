"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowHelper = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
const blake2b_1 = require("../crypto/blake2b");
const curl_1 = require("../crypto/curl");
const b1t6_1 = require("../encoding/b1t6");
const bigIntHelper_1 = require("./bigIntHelper");
/**
 * Helper methods for POW.
 */
class PowHelper {
    /**
     * Perform the score calculation.
     * @param message The data to perform the score on
     * @returns The score for the data.
     */
    static score(message) {
        // the PoW digest is the hash of msg without the nonce
        const powRelevantData = message.slice(0, -8);
        const powDigest = blake2b_1.Blake2b.sum256(powRelevantData);
        const nonce = bigIntHelper_1.BigIntHelper.read8(message, message.length - 8);
        const zeros = PowHelper.trailingZeros(powDigest, nonce);
        return Math.pow(3, zeros) / message.length;
    }
    /**
     * Calculate the trailing zeros.
     * @param powDigest The pow digest.
     * @param nonce The nonce.
     * @returns The trailing zeros.
     */
    static trailingZeros(powDigest, nonce) {
        const buf = new Int8Array(curl_1.Curl.HASH_LENGTH);
        const digestTritsLen = b1t6_1.B1T6.encode(buf, 0, powDigest);
        const biArr = new Uint8Array(8);
        bigIntHelper_1.BigIntHelper.write8(nonce, biArr, 0);
        b1t6_1.B1T6.encode(buf, digestTritsLen, biArr);
        const curl = new curl_1.Curl();
        curl.absorb(buf, 0, curl_1.Curl.HASH_LENGTH);
        const hash = new Int8Array(curl_1.Curl.HASH_LENGTH);
        curl.squeeze(hash, 0, curl_1.Curl.HASH_LENGTH);
        return PowHelper.trinaryTrailingZeros(hash);
    }
    /**
     * Find the number of trailing zeros.
     * @param trits The trits to look for zeros.
     * @returns The number of trailing zeros.
     */
    static trinaryTrailingZeros(trits) {
        let z = 0;
        for (let i = trits.length - 1; i >= 0 && trits[i] === 0; i--) {
            z++;
        }
        return z;
    }
}
exports.PowHelper = PowHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG93SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3Bvd0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQiwrQ0FBNEM7QUFDNUMseUNBQXNDO0FBQ3RDLDJDQUF3QztBQUN4QyxpREFBOEM7QUFFOUM7O0dBRUc7QUFDSCxNQUFhLFNBQVM7SUFDbEI7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBbUI7UUFDbkMsc0RBQXNEO1FBQ3RELE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0MsTUFBTSxTQUFTLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFbEQsTUFBTSxLQUFLLEdBQUcsMkJBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFOUQsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBcUIsRUFBRSxLQUFhO1FBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1QyxNQUFNLGNBQWMsR0FBRyxXQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEMsMkJBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQyxXQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsV0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXRDLE1BQU0sSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsV0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLG9CQUFvQixDQUFDLEtBQWdCO1FBQy9DLElBQUksQ0FBQyxHQUFXLENBQUMsQ0FBQztRQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxRCxDQUFDLEVBQUUsQ0FBQztTQUNQO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0NBQ0o7QUF0REQsOEJBc0RDIn0=
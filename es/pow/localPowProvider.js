"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalPowProvider = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const blake2b_1 = require("../crypto/blake2b");
const curl_1 = require("../crypto/curl");
const b1t6_1 = require("../encoding/b1t6");
const bigIntHelper_1 = require("../utils/bigIntHelper");
const powHelper_1 = require("../utils/powHelper");
/**
 * Local POW Provider.
 * WARNING - This is really slow.
 */
class LocalPowProvider {
    constructor() {
        /**
         * LN3 Const see https://oeis.org/A002391
         * @internal
         */
        this.LN3 = 1.098612288668109691395245236922525704647490557822749451734694333;
    }
    /**
     * Perform pow on the message and return the nonce of at least targetScore.
     * @param message The message to process.
     * @param targetScore the target score.
     * @returns The nonce.
     */
    pow(message, targetScore) {
        return __awaiter(this, void 0, void 0, function* () {
            const powRelevantData = message.slice(0, -8);
            const powDigest = blake2b_1.Blake2b.sum256(powRelevantData);
            const targetZeros = Math.ceil(Math.log((powRelevantData.length + 8) * targetScore) / this.LN3);
            return this.worker(powDigest, targetZeros);
        });
    }
    /**
     * Perform the hash on the data until we reach target number of zeros.
     * @param powDigest The pow digest.
     * @param target The target number of zeros.
     * @returns The nonce.
     * @internal
     */
    worker(powDigest, target) {
        let nonce = BigInt(0);
        let returnNonce;
        const buf = new Int8Array(curl_1.Curl.HASH_LENGTH);
        const digestTritsLen = b1t6_1.B1T6.encode(buf, 0, powDigest);
        const hash = new Int8Array(curl_1.Curl.HASH_LENGTH);
        const biArr = new Uint8Array(8);
        const curl = new curl_1.Curl();
        do {
            bigIntHelper_1.BigIntHelper.write8(nonce, biArr, 0);
            b1t6_1.B1T6.encode(buf, digestTritsLen, biArr);
            curl.reset();
            curl.absorb(buf, 0, curl_1.Curl.HASH_LENGTH);
            curl.squeeze(hash, 0, curl_1.Curl.HASH_LENGTH);
            if (powHelper_1.PowHelper.trinaryTrailingZeros(hash) >= target) {
                returnNonce = nonce;
            }
            else {
                nonce++;
            }
        } while (returnNonce === undefined);
        return returnNonce !== null && returnNonce !== void 0 ? returnNonce : BigInt(0);
    }
}
exports.LocalPowProvider = LocalPowProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxQb3dQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wb3cvbG9jYWxQb3dQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtDQUE0QztBQUM1Qyx5Q0FBc0M7QUFDdEMsMkNBQXdDO0FBRXhDLHdEQUFxRDtBQUNyRCxrREFBK0M7QUFFL0M7OztHQUdHO0FBQ0gsTUFBYSxnQkFBZ0I7SUFBN0I7UUFDSTs7O1dBR0c7UUFDYyxRQUFHLEdBQVcsaUVBQWlFLENBQUM7SUFvRHJHLENBQUM7SUFsREc7Ozs7O09BS0c7SUFDVSxHQUFHLENBQUMsT0FBbUIsRUFBRSxXQUFtQjs7WUFDckQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3QyxNQUFNLFNBQVMsR0FBRyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUVsRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUvRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FBQTtJQUVEOzs7Ozs7T0FNRztJQUNLLE1BQU0sQ0FBQyxTQUFxQixFQUFFLE1BQWM7UUFDaEQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksV0FBVyxDQUFDO1FBRWhCLE1BQU0sR0FBRyxHQUFjLElBQUksU0FBUyxDQUFDLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RCxNQUFNLGNBQWMsR0FBRyxXQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEQsTUFBTSxJQUFJLEdBQWMsSUFBSSxTQUFTLENBQUMsV0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFFeEIsR0FBRztZQUNDLDJCQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckMsV0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXhDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxXQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFdBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUV4QyxJQUFJLHFCQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxFQUFFO2dCQUNoRCxXQUFXLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNILEtBQUssRUFBRSxDQUFDO2FBQ1g7U0FDSixRQUFRLFdBQVcsS0FBSyxTQUFTLEVBQUU7UUFFcEMsT0FBTyxXQUFXLGFBQVgsV0FBVyxjQUFYLFdBQVcsR0FBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUNKO0FBekRELDRDQXlEQyJ9
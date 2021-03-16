"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slip0010 = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
var converter_1 = require("../utils/converter");
var ed25519_1 = require("./ed25519");
var hmacSha512_1 = require("./hmacSha512");
/**
 * Class to help with slip0010 key derivation.
 * https://github.com/satoshilabs/slips/blob/master/slip-0010.md
 */
var Slip0010 = /** @class */ (function () {
    function Slip0010() {
    }
    /**
     * Get the master key from the seed.
     * @param seed The seed to generate the master key from.
     * @returns The key and chain code.
     */
    Slip0010.getMasterKeyFromSeed = function (seed) {
        var hmac = new hmacSha512_1.HmacSha512(converter_1.Converter.utf8ToBytes("ed25519 seed"));
        var fullKey = hmac.update(seed).digest();
        return {
            privateKey: Uint8Array.from(fullKey.slice(0, 32)),
            chainCode: Uint8Array.from(fullKey.slice(32))
        };
    };
    /**
     * Derive a key from the path.
     * @param seed The seed.
     * @param path The path.
     * @returns The key and chain code.
     */
    Slip0010.derivePath = function (seed, path) {
        var _a = Slip0010.getMasterKeyFromSeed(seed), privateKey = _a.privateKey, chainCode = _a.chainCode;
        var segments = path.numberSegments();
        for (var i = 0; i < segments.length; i++) {
            var indexValue = 0x80000000 + segments[i];
            var data = new Uint8Array(1 + privateKey.length + 4);
            data[0] = 0;
            data.set(privateKey, 1);
            data[privateKey.length + 1] = indexValue >>> 24;
            data[privateKey.length + 2] = indexValue >>> 16;
            data[privateKey.length + 3] = indexValue >>> 8;
            data[privateKey.length + 4] = indexValue & 0xFF;
            var fullKey = new hmacSha512_1.HmacSha512(chainCode)
                .update(data)
                .digest();
            privateKey = Uint8Array.from(fullKey.slice(0, 32));
            chainCode = Uint8Array.from(fullKey.slice(32));
        }
        return {
            privateKey: privateKey,
            chainCode: chainCode
        };
    };
    /**
     * Get the public key from the private key.
     * @param privateKey The private key.
     * @param withZeroByte Include a zero bute prefix.
     * @returns The public key.
     */
    Slip0010.getPublicKey = function (privateKey, withZeroByte) {
        if (withZeroByte === void 0) { withZeroByte = true; }
        var keyPair = ed25519_1.Ed25519.keyPairFromSeed(privateKey);
        var signPk = keyPair.privateKey.slice(32);
        if (withZeroByte) {
            var arr = new Uint8Array(1 + signPk.length);
            arr[0] = 0;
            arr.set(signPk, 1);
            return arr;
        }
        return signPk;
    };
    return Slip0010;
}());
exports.Slip0010 = Slip0010;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpcDAwMTAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL3NsaXAwMDEwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLGdEQUErQztBQUUvQyxxQ0FBb0M7QUFDcEMsMkNBQTBDO0FBRTFDOzs7R0FHRztBQUNIO0lBQUE7SUF5RUEsQ0FBQztJQXhFRzs7OztPQUlHO0lBQ1csNkJBQW9CLEdBQWxDLFVBQW1DLElBQWdCO1FBSS9DLElBQU0sSUFBSSxHQUFHLElBQUksdUJBQVUsQ0FBQyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDM0MsT0FBTztZQUNILFVBQVUsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELFNBQVMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDaEQsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLG1CQUFVLEdBQXhCLFVBQXlCLElBQWdCLEVBQUUsSUFBZTtRQUlsRCxJQUFBLEtBQTRCLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBN0QsVUFBVSxnQkFBQSxFQUFFLFNBQVMsZUFBd0MsQ0FBQztRQUNwRSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsSUFBTSxVQUFVLEdBQUcsVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1QyxJQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUV2RCxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxLQUFLLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLEtBQUssRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQztZQUVoRCxJQUFNLE9BQU8sR0FBRyxJQUFJLHVCQUFVLENBQUMsU0FBUyxDQUFDO2lCQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDO2lCQUNaLE1BQU0sRUFBRSxDQUFDO1lBRWQsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRCxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEQ7UUFDRCxPQUFPO1lBQ0gsVUFBVSxZQUFBO1lBQ1YsU0FBUyxXQUFBO1NBQ1osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLHFCQUFZLEdBQTFCLFVBQTJCLFVBQXNCLEVBQUUsWUFBNEI7UUFBNUIsNkJBQUEsRUFBQSxtQkFBNEI7UUFDM0UsSUFBTSxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUMsSUFBSSxZQUFZLEVBQUU7WUFDZCxJQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQixPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLEFBekVELElBeUVDO0FBekVZLDRCQUFRIn0=
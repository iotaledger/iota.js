"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bech32Helper = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
var bech32_1 = require("../crypto/bech32");
/**
 * Convert address to bech32.
 */
var Bech32Helper = /** @class */ (function () {
    function Bech32Helper() {
    }
    /**
     * Encode an address to bech32.
     * @param addressType The address type to encode.
     * @param addressBytes The address bytes to encode.
     * @param humanReadablePart The human readable part to use.
     * @returns The array formated as hex.
     */
    Bech32Helper.toBech32 = function (addressType, addressBytes, humanReadablePart) {
        if (humanReadablePart === void 0) { humanReadablePart = Bech32Helper.BECH32_DEFAULT_HRP_MAIN; }
        var addressData = new Uint8Array(1 + addressBytes.length);
        addressData[0] = addressType;
        addressData.set(addressBytes, 1);
        return bech32_1.Bech32.encode(humanReadablePart, addressData);
    };
    /**
     * Decode an address from bech32.
     * @param bech32Text The bech32 text to decode.
     * @param humanReadablePart The human readable part to use.
     * @returns The address type and address bytes or undefined if it cannot be decoded.
     */
    Bech32Helper.fromBech32 = function (bech32Text, humanReadablePart) {
        if (humanReadablePart === void 0) { humanReadablePart = Bech32Helper.BECH32_DEFAULT_HRP_MAIN; }
        var decoded = bech32_1.Bech32.decode(bech32Text);
        if (decoded) {
            if (decoded.humanReadablePart !== humanReadablePart) {
                throw new Error("The hrp part of the address should be " + humanReadablePart + ", it is " + decoded.humanReadablePart);
            }
            if (decoded.data.length === 0) {
                throw new Error("The data part of the address should be at least length 1, it is 0");
            }
            var addressType = decoded.data[0];
            var addressBytes = decoded.data.slice(1);
            return {
                addressType: addressType,
                addressBytes: addressBytes
            };
        }
    };
    /**
     * Does the provided string look like it might be an bech32 address with matching hrp.
     * @param bech32Text The bech32 text to text.
     * @param humanReadablePart The human readable part to match.
     * @returns True if the passed address matches the pattern for a bech32 address.
     */
    Bech32Helper.matches = function (bech32Text, humanReadablePart) {
        if (humanReadablePart === void 0) { humanReadablePart = Bech32Helper.BECH32_DEFAULT_HRP_MAIN; }
        return bech32_1.Bech32.matches(humanReadablePart, bech32Text);
    };
    /**
     * The default human readable part of the bech32 addresses for mainnet, currently 'iot'.
     */
    Bech32Helper.BECH32_DEFAULT_HRP_MAIN = "iot";
    /**
     * The default human readable part of the bech32 addresses for testnet, currently 'toi'.
     */
    Bech32Helper.BECH32_DEFAULT_HRP_TEST = "toi";
    return Bech32Helper;
}());
exports.Bech32Helper = Bech32Helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVjaDMySGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2JlY2gzMkhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQiwyQ0FBMEM7QUFFMUM7O0dBRUc7QUFDSDtJQUFBO0lBc0VBLENBQUM7SUEzREc7Ozs7OztPQU1HO0lBQ1cscUJBQVEsR0FBdEIsVUFDSSxXQUFtQixFQUNuQixZQUF3QixFQUN4QixpQkFBZ0U7UUFBaEUsa0NBQUEsRUFBQSxvQkFBNEIsWUFBWSxDQUFDLHVCQUF1QjtRQUNoRSxJQUFNLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7UUFDN0IsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsT0FBTyxlQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLHVCQUFVLEdBQXhCLFVBQXlCLFVBQWtCLEVBQUUsaUJBQWdFO1FBQWhFLGtDQUFBLEVBQUEsb0JBQTRCLFlBQVksQ0FBQyx1QkFBdUI7UUFJekcsSUFBTSxPQUFPLEdBQUcsZUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksT0FBTyxDQUFDLGlCQUFpQixLQUFLLGlCQUFpQixFQUFFO2dCQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUF5QyxpQkFBaUIsZ0JBQzNELE9BQU8sQ0FBQyxpQkFBbUIsQ0FBQyxDQUFDO2FBQy9DO1lBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQzthQUN4RjtZQUVELElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0MsT0FBTztnQkFDSCxXQUFXLGFBQUE7Z0JBQ1gsWUFBWSxjQUFBO2FBQ2YsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1csb0JBQU8sR0FBckIsVUFDSSxVQUFtQixFQUNuQixpQkFBZ0U7UUFBaEUsa0NBQUEsRUFBQSxvQkFBNEIsWUFBWSxDQUFDLHVCQUF1QjtRQUNoRSxPQUFPLGVBQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQXBFRDs7T0FFRztJQUNXLG9DQUF1QixHQUFXLEtBQUssQ0FBQztJQUV0RDs7T0FFRztJQUNXLG9DQUF1QixHQUFXLEtBQUssQ0FBQztJQTZEMUQsbUJBQUM7Q0FBQSxBQXRFRCxJQXNFQztBQXRFWSxvQ0FBWSJ9
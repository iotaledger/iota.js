"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bech32Helper = void 0;
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
        if (humanReadablePart === void 0) { humanReadablePart = Bech32Helper.BECH32_DEFAULT_HRP; }
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
        if (humanReadablePart === void 0) { humanReadablePart = Bech32Helper.BECH32_DEFAULT_HRP; }
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
        if (humanReadablePart === void 0) { humanReadablePart = Bech32Helper.BECH32_DEFAULT_HRP; }
        return bech32_1.Bech32.matches(humanReadablePart, bech32Text);
    };
    /**
     * The human readable part of the bech32 addresses.
     */
    Bech32Helper.BECH32_DEFAULT_HRP = "iot";
    return Bech32Helper;
}());
exports.Bech32Helper = Bech32Helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVjaDMySGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2JlY2gzMkhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0IsMkNBQTBDO0FBRTFDOztHQUVHO0FBQ0g7SUFBQTtJQStEQSxDQUFDO0lBekRHOzs7Ozs7T0FNRztJQUNXLHFCQUFRLEdBQXRCLFVBQ0ksV0FBbUIsRUFDbkIsWUFBd0IsRUFDeEIsaUJBQTJEO1FBQTNELGtDQUFBLEVBQUEsb0JBQTRCLFlBQVksQ0FBQyxrQkFBa0I7UUFDM0QsSUFBTSxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQzdCLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sZUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyx1QkFBVSxHQUF4QixVQUF5QixVQUFrQixFQUFFLGlCQUEyRDtRQUEzRCxrQ0FBQSxFQUFBLG9CQUE0QixZQUFZLENBQUMsa0JBQWtCO1FBSXBHLElBQU0sT0FBTyxHQUFHLGVBQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLE9BQU8sQ0FBQyxpQkFBaUIsS0FBSyxpQkFBaUIsRUFBRTtnQkFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBeUMsaUJBQWlCLGdCQUMzRCxPQUFPLENBQUMsaUJBQW1CLENBQUMsQ0FBQzthQUMvQztZQUVELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLG1FQUFtRSxDQUFDLENBQUM7YUFDeEY7WUFFRCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNDLE9BQU87Z0JBQ0gsV0FBVyxhQUFBO2dCQUNYLFlBQVksY0FBQTthQUNmLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLG9CQUFPLEdBQXJCLFVBQXNCLFVBQW1CLEVBQUUsaUJBQTJEO1FBQTNELGtDQUFBLEVBQUEsb0JBQTRCLFlBQVksQ0FBQyxrQkFBa0I7UUFDbEcsT0FBTyxlQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUE3REQ7O09BRUc7SUFDVywrQkFBa0IsR0FBVyxLQUFLLENBQUM7SUEyRHJELG1CQUFDO0NBQUEsQUEvREQsSUErREM7QUEvRFksb0NBQVkifQ==
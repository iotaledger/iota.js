"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bech32Helper = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
const bech32_1 = require("../crypto/bech32");
/**
 * Convert address to bech32.
 */
class Bech32Helper {
    /**
     * Encode an address to bech32.
     * @param addressType The address type to encode.
     * @param addressBytes The address bytes to encode.
     * @param humanReadablePart The human readable part to use.
     * @returns The array formated as hex.
     */
    static toBech32(addressType, addressBytes, humanReadablePart) {
        const addressData = new Uint8Array(1 + addressBytes.length);
        addressData[0] = addressType;
        addressData.set(addressBytes, 1);
        return bech32_1.Bech32.encode(humanReadablePart, addressData);
    }
    /**
     * Decode an address from bech32.
     * @param bech32Text The bech32 text to decode.
     * @param humanReadablePart The human readable part to use.
     * @returns The address type and address bytes or undefined if it cannot be decoded.
     */
    static fromBech32(bech32Text, humanReadablePart) {
        const decoded = bech32_1.Bech32.decode(bech32Text);
        if (decoded) {
            if (decoded.humanReadablePart !== humanReadablePart) {
                throw new Error(`The hrp part of the address should be ${humanReadablePart}, it is ${decoded.humanReadablePart}`);
            }
            if (decoded.data.length === 0) {
                throw new Error("The data part of the address should be at least length 1, it is 0");
            }
            const addressType = decoded.data[0];
            const addressBytes = decoded.data.slice(1);
            return {
                addressType,
                addressBytes
            };
        }
    }
    /**
     * Does the provided string look like it might be an bech32 address with matching hrp.
     * @param bech32Text The bech32 text to text.
     * @param humanReadablePart The human readable part to match.
     * @returns True if the passed address matches the pattern for a bech32 address.
     */
    static matches(bech32Text, humanReadablePart) {
        return bech32_1.Bech32.matches(humanReadablePart, bech32Text);
    }
}
exports.Bech32Helper = Bech32Helper;
/**
 * The default human readable part of the bech32 addresses for mainnet, currently 'iota'.
 */
Bech32Helper.BECH32_DEFAULT_HRP_MAIN = "iota";
/**
 * The default human readable part of the bech32 addresses for testnet, currently 'atoi'.
 */
Bech32Helper.BECH32_DEFAULT_HRP_TEST = "atoi";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVjaDMySGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2JlY2gzMkhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQiw2Q0FBMEM7QUFFMUM7O0dBRUc7QUFDSCxNQUFhLFlBQVk7SUFXckI7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FDbEIsV0FBbUIsRUFDbkIsWUFBd0IsRUFDeEIsaUJBQXlCO1FBQ3pCLE1BQU0sV0FBVyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUM3QixXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPLGVBQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFrQixFQUFFLGlCQUF5QjtRQUlsRSxNQUFNLE9BQU8sR0FBRyxlQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxPQUFPLENBQUMsaUJBQWlCLEtBQUssaUJBQWlCLEVBQUU7Z0JBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLGlCQUNyRCxXQUFXLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7YUFDL0M7WUFFRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO2FBQ3hGO1lBRUQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUzQyxPQUFPO2dCQUNILFdBQVc7Z0JBQ1gsWUFBWTthQUNmLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQ2pCLFVBQWtCLEVBQ2xCLGlCQUF5QjtRQUN6QixPQUFPLGVBQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7QUFyRUwsb0NBc0VDO0FBckVHOztHQUVHO0FBQ1csb0NBQXVCLEdBQVcsTUFBTSxDQUFDO0FBRXZEOztHQUVHO0FBQ1csb0NBQXVCLEdBQVcsTUFBTSxDQUFDIn0=
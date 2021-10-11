// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
import { Bech32 } from "@iota/crypto.js";
/**
 * Convert address to bech32.
 */
export class Bech32Helper {
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
        return Bech32.encode(humanReadablePart, addressData);
    }
    /**
     * Decode an address from bech32.
     * @param bech32Text The bech32 text to decode.
     * @param humanReadablePart The human readable part to use.
     * @returns The address type and address bytes or undefined if it cannot be decoded.
     */
    static fromBech32(bech32Text, humanReadablePart) {
        const decoded = Bech32.decode(bech32Text);
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
        return Bech32.matches(humanReadablePart, bech32Text);
    }
}
/**
 * The default human readable part of the bech32 addresses for mainnet, currently 'iota'.
 */
Bech32Helper.BECH32_DEFAULT_HRP_MAIN = "iota";
/**
 * The default human readable part of the bech32 addresses for devnet, currently 'atoi'.
 */
Bech32Helper.BECH32_DEFAULT_HRP_DEV = "atoi";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVjaDMySGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2JlY2gzMkhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFekM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sWUFBWTtJQVdyQjs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQW1CLEVBQUUsWUFBd0IsRUFBRSxpQkFBeUI7UUFDM0YsTUFBTSxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQzdCLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUNwQixVQUFrQixFQUNsQixpQkFBeUI7UUFPekIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksT0FBTyxDQUFDLGlCQUFpQixLQUFLLGlCQUFpQixFQUFFO2dCQUNqRCxNQUFNLElBQUksS0FBSyxDQUNYLHlDQUF5QyxpQkFBaUIsV0FBVyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FDbkcsQ0FBQzthQUNMO1lBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQzthQUN4RjtZQUVELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0MsT0FBTztnQkFDSCxXQUFXO2dCQUNYLFlBQVk7YUFDZixDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQWtCLEVBQUUsaUJBQXlCO1FBQy9ELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN6RCxDQUFDOztBQXJFRDs7R0FFRztBQUNXLG9DQUF1QixHQUFXLE1BQU0sQ0FBQztBQUV2RDs7R0FFRztBQUNXLG1DQUFzQixHQUFXLE1BQU0sQ0FBQyJ9
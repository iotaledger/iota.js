// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
import { Bech32 } from "../crypto/bech32";

/**
 * Convert address to bech32.
 */
export class Bech32Helper {
    /**
     * The default human readable part of the bech32 addresses for mainnet, currently 'iota'.
     */
    public static BECH32_DEFAULT_HRP_MAIN: string = "iota";

    /**
     * The default human readable part of the bech32 addresses for testnet, currently 'atoi'.
     */
    public static BECH32_DEFAULT_HRP_TEST: string = "atoi";

    /**
     * Encode an address to bech32.
     * @param addressType The address type to encode.
     * @param addressBytes The address bytes to encode.
     * @param humanReadablePart The human readable part to use.
     * @returns The array formated as hex.
     */
    public static toBech32(
        addressType: number,
        addressBytes: Uint8Array,
        humanReadablePart: string): string {
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
    public static fromBech32(bech32Text: string, humanReadablePart: string): {
        addressType: number;
        addressBytes: Uint8Array;
    } | undefined {
        const decoded = Bech32.decode(bech32Text);
        if (decoded) {
            if (decoded.humanReadablePart !== humanReadablePart) {
                throw new Error(`The hrp part of the address should be ${humanReadablePart
                    }, it is ${decoded.humanReadablePart}`);
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
    public static matches(
        bech32Text: string,
        humanReadablePart: string): boolean {
        return Bech32.matches(humanReadablePart, bech32Text);
    }
}

/**
 * Convert address to bech32.
 */
export declare class Bech32Helper {
    /**
     * The default human readable part of the bech32 addresses for mainnet, currently 'iota'.
     */
    static BECH32_DEFAULT_HRP_MAIN: string;
    /**
     * The default human readable part of the bech32 addresses for testnet, currently 'atoi'.
     */
    static BECH32_DEFAULT_HRP_TEST: string;
    /**
     * Encode an address to bech32.
     * @param addressType The address type to encode.
     * @param addressBytes The address bytes to encode.
     * @param humanReadablePart The human readable part to use.
     * @returns The array formated as hex.
     */
    static toBech32(addressType: number, addressBytes: Uint8Array, humanReadablePart: string): string;
    /**
     * Decode an address from bech32.
     * @param bech32Text The bech32 text to decode.
     * @param humanReadablePart The human readable part to use.
     * @returns The address type and address bytes or undefined if it cannot be decoded.
     */
    static fromBech32(bech32Text: string, humanReadablePart: string): {
        addressType: number;
        addressBytes: Uint8Array;
    } | undefined;
    /**
     * Does the provided string look like it might be an bech32 address with matching hrp.
     * @param bech32Text The bech32 text to text.
     * @param humanReadablePart The human readable part to match.
     * @returns True if the passed address matches the pattern for a bech32 address.
     */
    static matches(bech32Text: string, humanReadablePart: string): boolean;
}

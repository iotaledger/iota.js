// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/**
 * Class to help with base32 Encoding/Decoding using RFC4648.
 */
export class Base32 {
    /**
     * Convert the base 32 string to a byte array.
     * @param base32 The base32 string to convert.
     * @returns The byte array.
     * @throws If the input string contains a character not in the Base32 alphabet.
     */
    static decode(base32) {
        let bits = 0;
        let value = 0;
        // eslint-disable-next-line no-div-regex
        base32 = base32.replace(/=+$/, "");
        let index = 0;
        const output = new Uint8Array(Math.trunc((base32.length * 5) / 8));
        for (let i = 0; i < base32.length; i++) {
            const idx = Base32._ALPHABET.indexOf(base32[i]);
            if (idx === -1) {
                throw new Error(`"Invalid character found '${base32[i]}'`);
            }
            value = (value << 5) | idx;
            bits += 5;
            if (bits >= 8) {
                output[index++] = (value >>> (bits - 8)) & 255;
                bits -= 8;
            }
        }
        return output;
    }
    /**
     * Convert a byte array to base 32.
     * @param bytes The byte array to convert.
     * @returns The data as base32 string.
     */
    static encode(bytes) {
        let bits = 0;
        let value = 0;
        let output = "";
        for (let i = 0; i < bytes.byteLength; i++) {
            value = (value << 8) | bytes[i];
            bits += 8;
            while (bits >= 5) {
                output += Base32._ALPHABET[(value >>> (bits - 5)) & 31];
                bits -= 5;
            }
        }
        if (bits > 0) {
            output += Base32._ALPHABET[(value << (5 - bits)) & 31];
        }
        while (output.length % 8 !== 0) {
            output += "=";
        }
        return output;
    }
}
/**
 * Alphabet table for encoding.
 * @internal
 */
Base32._ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTMyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuY29kaW5nL2Jhc2UzMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQjs7R0FFRztBQUNILE1BQU0sT0FBTyxNQUFNO0lBT2Y7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQWM7UUFDL0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWQsd0NBQXdDO1FBQ3hDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVuQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxNQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5FLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWhELElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUQ7WUFDRCxLQUFLLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzNCLElBQUksSUFBSSxDQUFDLENBQUM7WUFFVixJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQy9DLElBQUksSUFBSSxDQUFDLENBQUM7YUFDYjtTQUNKO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQWlCO1FBQ2xDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxLQUFLLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksSUFBSSxDQUFDLENBQUM7WUFFVixPQUFPLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQ2QsTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxJQUFJLENBQUMsQ0FBQzthQUNiO1NBQ0o7UUFFRCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDVixNQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsT0FBTyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEdBQUcsQ0FBQztTQUNqQjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7O0FBckVEOzs7R0FHRztBQUNxQixnQkFBUyxHQUFXLGtDQUFrQyxDQUFDIn0=
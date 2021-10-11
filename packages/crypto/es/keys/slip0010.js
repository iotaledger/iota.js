// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
import { Converter } from "@iota/util.js";
import { HmacSha512 } from "../macs/hmacSha512";
import { Ed25519 } from "../signatures/ed25519";
/**
 * Class to help with slip0010 key derivation
 * https://github.com/satoshilabs/slips/blob/master/slip-0010.md.
 */
export class Slip0010 {
    /**
     * Get the master key from the seed.
     * @param seed The seed to generate the master key from.
     * @returns The key and chain code.
     */
    static getMasterKeyFromSeed(seed) {
        const hmac = new HmacSha512(Converter.utf8ToBytes("ed25519 seed"));
        const fullKey = hmac.update(seed).digest();
        return {
            privateKey: Uint8Array.from(fullKey.slice(0, 32)),
            chainCode: Uint8Array.from(fullKey.slice(32))
        };
    }
    /**
     * Derive a key from the path.
     * @param seed The seed.
     * @param path The path.
     * @returns The key and chain code.
     */
    static derivePath(seed, path) {
        let { privateKey, chainCode } = Slip0010.getMasterKeyFromSeed(seed);
        const segments = path.numberSegments();
        for (let i = 0; i < segments.length; i++) {
            const indexValue = 0x80000000 + segments[i];
            const data = new Uint8Array(1 + privateKey.length + 4);
            data[0] = 0;
            data.set(privateKey, 1);
            data[privateKey.length + 1] = indexValue >>> 24;
            data[privateKey.length + 2] = indexValue >>> 16;
            data[privateKey.length + 3] = indexValue >>> 8;
            data[privateKey.length + 4] = indexValue & 0xff;
            // eslint-disable-next-line newline-per-chained-call
            const fullKey = new HmacSha512(chainCode).update(data).digest();
            privateKey = Uint8Array.from(fullKey.slice(0, 32));
            chainCode = Uint8Array.from(fullKey.slice(32));
        }
        return {
            privateKey,
            chainCode
        };
    }
    /**
     * Get the public key from the private key.
     * @param privateKey The private key.
     * @param withZeroByte Include a zero bute prefix.
     * @returns The public key.
     */
    static getPublicKey(privateKey, withZeroByte = true) {
        const keyPair = Ed25519.keyPairFromSeed(privateKey);
        const signPk = keyPair.privateKey.slice(32);
        if (withZeroByte) {
            const arr = new Uint8Array(1 + signPk.length);
            arr[0] = 0;
            arr.set(signPk, 1);
            return arr;
        }
        return signPk;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpcDAwMTAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMva2V5cy9zbGlwMDAxMC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHaEQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFFBQVE7SUFDakI7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFnQjtRQUkvQyxNQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQyxPQUFPO1lBQ0gsVUFBVSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakQsU0FBUyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNoRCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FDcEIsSUFBZ0IsRUFDaEIsSUFBZTtRQUtmLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxNQUFNLFVBQVUsR0FBRyxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTVDLE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRXZELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLEtBQUssRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsS0FBSyxFQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxLQUFLLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRWhELG9EQUFvRDtZQUNwRCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFaEUsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRCxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEQ7UUFDRCxPQUFPO1lBQ0gsVUFBVTtZQUNWLFNBQVM7U0FDWixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFzQixFQUFFLGVBQXdCLElBQUk7UUFDM0UsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLFlBQVksRUFBRTtZQUNkLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNYLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0oifQ==
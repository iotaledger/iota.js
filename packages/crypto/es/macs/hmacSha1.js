// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
import { Sha1 } from "../hashes/sha1";
/**
 * Class to help with HmacSha1 scheme.
 * TypeScript conversion from https://github.com/emn178/js-sha1.
 */
export class HmacSha1 {
    /**
     * Create a new instance of HmacSha1.
     * @param key The key for the hmac.
     */
    constructor(key) {
        this._sha1 = new Sha1();
        if (key.length > 64) {
            // eslint-disable-next-line newline-per-chained-call
            key = new Sha1().update(key).digest();
        }
        this._oKeyPad = new Uint8Array(64);
        const iKeyPad = new Uint8Array(64);
        for (let i = 0; i < 64; ++i) {
            const b = key[i] || 0;
            this._oKeyPad[i] = 0x5c ^ b;
            iKeyPad[i] = 0x36 ^ b;
        }
        this._sha1.update(iKeyPad);
    }
    /**
     * Perform Sum on the data.
     * @param key The key for the hmac.
     * @param data The data to operate on.
     * @returns The sum of the data.
     */
    static sum(key, data) {
        const b2b = new HmacSha1(key);
        b2b.update(data);
        return b2b.digest();
    }
    /**
     * Update the hash with the data.
     * @param message The data to update the hash with.
     * @returns The instance for chaining.
     */
    update(message) {
        this._sha1.update(message);
        return this;
    }
    /**
     * Get the digest.
     * @returns The digest.
     */
    digest() {
        const innerHash = this._sha1.digest();
        const finalSha256 = new Sha1();
        finalSha256.update(this._oKeyPad);
        finalSha256.update(innerHash);
        return finalSha256.digest();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG1hY1NoYTEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWFjcy9obWFjU2hhMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtCQUErQjtBQUMvQixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEM7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFFBQVE7SUFhakI7OztPQUdHO0lBQ0gsWUFBWSxHQUFlO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUV4QixJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFO1lBQ2pCLG9EQUFvRDtZQUNwRCxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDekM7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRW5DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDekIsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7U0FDekI7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQWUsRUFBRSxJQUFnQjtRQUMvQyxNQUFNLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE9BQW1CO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNO1FBQ1QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV0QyxNQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRS9CLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFOUIsT0FBTyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUNKIn0=
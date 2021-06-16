// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Class to help with random generation.
 */
export class RandomHelper {
    /**
     * Generate a new random array.
     * @param length The length of buffer to create.
     * @returns The random array.
     */
    static generate(length) {
        if (process.env.BROWSER) {
            const randomBytes = new Uint8Array(length);
            window.crypto.getRandomValues(randomBytes);
            return randomBytes;
            // eslint-disable-next-line no-else-return
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
            const crypto = require("crypto");
            return crypto.randomBytes(length);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JhbmRvbUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBRXRDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUFDckI7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBYztRQUNqQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ3JCLE1BQU0sV0FBVyxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sV0FBVyxDQUFDO1lBQ3ZCLDBDQUEwQztTQUN6QzthQUFNO1lBQ0gsb0dBQW9HO1lBQ3BHLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqQyxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFlLENBQUM7U0FDbkQ7SUFDTCxDQUFDO0NBQ0oifQ==
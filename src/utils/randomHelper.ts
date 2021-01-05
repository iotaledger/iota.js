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
    public static generate(length: number): Uint8Array {
        if (process.env.BROWSER) {
            const randomBytes = new Uint8Array(length);
            window.crypto.getRandomValues(randomBytes);
            return randomBytes;
        // eslint-disable-next-line no-else-return
        } else {
            // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
            const crypto = require("crypto");
            return crypto.randomBytes(length) as Uint8Array;
        }
    }
}

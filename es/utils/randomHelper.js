"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomHelper = void 0;
/**
 * Class to help with random generation.
 */
class RandomHelper {
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
exports.RandomHelper = RandomHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JhbmRvbUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQzs7O0FBRXRDOztHQUVHO0FBQ0gsTUFBYSxZQUFZO0lBQ3JCOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQWM7UUFDakMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNyQixNQUFNLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQyxPQUFPLFdBQVcsQ0FBQztZQUN2QiwwQ0FBMEM7U0FDekM7YUFBTTtZQUNILG9HQUFvRztZQUNwRyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBZSxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztDQUNKO0FBbEJELG9DQWtCQyJ9
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { PlatformHelper } from "./platformHelper";
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
        if (PlatformHelper.isNodeJs) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
            const crypto = require("crypto");
            return crypto.randomBytes(length);
            // Keep this as else return so that packager keeps only one side
            // of the if based on platform
            // eslint-disable-next-line no-else-return
        }
        else {
            const randomBytes = new Uint8Array(length);
            window.crypto.getRandomValues(randomBytes);
            return randomBytes;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JhbmRvbUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVsRDs7R0FFRztBQUNILE1BQU0sT0FBTyxZQUFZO0lBQ3JCOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQWM7UUFDakMsSUFBSSxjQUFjLENBQUMsUUFBUSxFQUFFO1lBQ3pCLG9HQUFvRztZQUNwRyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBZSxDQUFDO1lBQ2hELGdFQUFnRTtZQUNoRSw4QkFBOEI7WUFDOUIsMENBQTBDO1NBQzdDO2FBQU07WUFDSCxNQUFNLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQyxPQUFPLFdBQVcsQ0FBQztTQUN0QjtJQUNMLENBQUM7Q0FDSiJ9
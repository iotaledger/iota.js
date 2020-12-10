
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
        let randomBytes: Uint8Array;
        if (globalThis.crypto?.getRandomValues) {
            randomBytes = new Uint8Array(length);
            globalThis.crypto.getRandomValues(randomBytes);
        } else if (typeof require !== "undefined") {
            // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
            const crypto = require("crypto");
            randomBytes = crypto.randomBytes(length);
        } else {
            throw new TypeError("No random method available");
        }
        return randomBytes;
    }
}

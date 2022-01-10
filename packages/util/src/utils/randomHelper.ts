// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

/**
 * Class to help with random generation.
 */
export class RandomHelper {
    /**
     * Polyfilled random method.
     * @internal
     */
    public static randomPolyfill?: (length: number) => Uint8Array;

    /**
     * Generate a new random array.
     * @param length The length of buffer to create.
     * @returns The random array.
     */
    public static generate(length: number): Uint8Array {
        return RandomHelper.randomPolyfill ? RandomHelper.randomPolyfill(length) : new Uint8Array(length);
    }
}

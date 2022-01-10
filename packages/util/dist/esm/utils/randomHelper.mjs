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
        return RandomHelper.randomPolyfill ? RandomHelper.randomPolyfill(length) : new Uint8Array(length);
    }
}

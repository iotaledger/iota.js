// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { Bip32Path } from "../crypto/bip32Path";
import type { IKeyPair } from "./IKeyPair";

/**
 * Interface definitions for seed.
 */
export interface ISeed {
    /**
     * Get the key pair from the seed.
     * @returns The key pair.
     */
    keyPair(): IKeyPair;

    /**
     * Generate a new seed from the path.
     * @param path The path to generate the seed for.
     * @returns The generated seed.
     */
    generateSeedFromPath(path: Bip32Path): ISeed;

    /**
     * Return the key as bytes.
     * @returns The key as bytes.
     */
    toBytes(): Uint8Array;

    /**
     * Return the key as string.
     * @returns The key as string.
     */
    toString(): string;
}

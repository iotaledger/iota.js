// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { Bip32Path } from "../crypto/bip32Path";
import { Bip39 } from "../crypto/bip39";
import { Ed25519 } from "../crypto/ed25519";
import { Slip0010 } from "../crypto/slip0010";
import type { IKeyPair } from "../models/IKeyPair";
import type { ISeed } from "../models/ISeed";

/**
 * The global type for the seed.
 */
export const ED25519_SEED_TYPE: number = 1;

/**
 * Class to help with seeds.
 */
export class Ed25519Seed implements ISeed {
    /**
     * The secret key for the seed.
     * @internal
     */
    private readonly _secretKey: Uint8Array;

    /**
     * Create a new instance of Ed25519Seed.
     * @param secretKeyBytes The bytes.
     */
    constructor(secretKeyBytes?: Uint8Array) {
        this._secretKey = secretKeyBytes ?? new Uint8Array();
    }

    /**
     * Create the seed from a Bip39 mnemonic.
     * @param mnemonic The mnemonic to create the seed from.
     * @returns A new instance of Ed25519Seed.
     */
    public static fromMnemonic(mnemonic: string): Ed25519Seed {
        return new Ed25519Seed(Bip39.mnemonicToSeed(mnemonic));
    }

    /**
     * Get the key pair from the seed.
     * @returns The key pair.
     */
    public keyPair(): IKeyPair {
        const signKeyPair = Ed25519.keyPairFromSeed(this._secretKey);

        return {
            publicKey: signKeyPair.publicKey,
            privateKey: signKeyPair.privateKey
        };
    }

    /**
     * Generate a new seed from the path.
     * @param path The path to generate the seed for.
     * @returns The generated seed.
     */
    public generateSeedFromPath(path: Bip32Path): ISeed {
        const keys = Slip0010.derivePath(this._secretKey, path);
        return new Ed25519Seed(keys.privateKey);
    }

    /**
     * Return the key as bytes.
     * @returns The key as bytes.
     */
    public toBytes(): Uint8Array {
        return this._secretKey;
    }
}

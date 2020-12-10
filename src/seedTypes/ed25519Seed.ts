import { Bip32Path } from "../crypto/bip32Path";
import { Ed25519 } from "../crypto/ed25519";
import { Slip0010 } from "../crypto/slip0010";
import { IKeyPair } from "../models/IKeyPair";
import { ISeed } from "../models/ISeed";

/**
 * The global type for the seed.
 */
export const ED25519_SEED_TYPE: number = 1;

/**
 * Class to help with seeds.
 */
export class Ed25519Seed implements ISeed {
    /**
     * SeedSize is the size, in bytes, of private key seeds.
     * @internal
     */
    public static SEED_SIZE_BYTES: number = 32;

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

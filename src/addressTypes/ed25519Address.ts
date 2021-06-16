// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b } from "../crypto/blake2b";
import type { IAddress } from "../models/IAddress";
import { ArrayHelper } from "../utils/arrayHelper";

/**
 * Class to help with Ed25519 Signature scheme.
 */
export class Ed25519Address implements IAddress {
    /**
     * Address size.
     * @internal
     */
    public static ADDRESS_LENGTH: number = Blake2b.SIZE_256;

    /**
     * The public key for the address.
     */
    private readonly _publicKey: Uint8Array;

    /**
     * Create a new instance of Ed25519Address.
     * @param publicKey The public key for the address.
     */
    constructor(publicKey: Uint8Array) {
        this._publicKey = publicKey;
    }

    /**
     * Convert the public key to an address.
     * @returns The address.
     */
    public toAddress(): Uint8Array {
        return Blake2b.sum256(this._publicKey);
    }

    /**
     * Use the public key to validate the address.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    public verify(address: Uint8Array): boolean {
        return ArrayHelper.equal(this.toAddress(), address);
    }
}

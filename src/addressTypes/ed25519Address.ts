// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b } from "../crypto/blake2b";
import { IAddress } from "../models/IAddress";
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
     * Convert the public key to an address.
     * @param publicKey The public key to convert.
     * @returns The address.
     */
    public publicKeyToAddress(publicKey: Uint8Array): Uint8Array {
        return Blake2b.sum256(publicKey);
    }

    /**
     * Use the public key to validate the address.
     * @param publicKey The public key to verify with.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    public verifyAddress(publicKey: Uint8Array, address: Uint8Array): boolean {
        return ArrayHelper.equal(this.publicKeyToAddress(publicKey), address);
    }
}

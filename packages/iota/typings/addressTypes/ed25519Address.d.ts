import type { IAddress } from "../models/IAddress";
/**
 * Class to help with Ed25519 Signature scheme.
 */
export declare class Ed25519Address implements IAddress {
    /**
     * The public key for the address.
     */
    private readonly _publicKey;
    /**
     * Create a new instance of Ed25519Address.
     * @param publicKey The public key for the address.
     */
    constructor(publicKey: Uint8Array);
    /**
     * Convert the public key to an address.
     * @returns The address.
     */
    toAddress(): Uint8Array;
    /**
     * Use the public key to validate the address.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    verify(address: Uint8Array): boolean;
}

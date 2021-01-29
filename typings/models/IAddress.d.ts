/**
 * Interface defining address.
 */
export interface IAddress {
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
    verify(publicKey: Uint8Array, address: Uint8Array): boolean;
}

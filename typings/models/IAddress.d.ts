/**
 * Interface defining address.
 */
export interface IAddress {
    /**
     * Convert the public key to an address.
     * @param publicKey The public key to convert.
     * @returns The address.
     */
    publicKeyToAddress(publicKey: Uint8Array): Uint8Array;
    /**
     * Use the public key to validate the address.
     * @param publicKey The public key to verify with.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    verifyAddress(publicKey: Uint8Array, address: Uint8Array): boolean;
}

/**
 * Definition of signature key pair.
 */
export interface IKeyPair {
    /**
     * The public key.
     */
    publicKey: Uint8Array;
    /**
     * The private key.
     */
    privateKey: Uint8Array;
}

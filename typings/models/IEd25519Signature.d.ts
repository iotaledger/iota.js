import type { ITypeBase } from "./ITypeBase";
/**
 * The global type for the signature type.
 */
export declare const ED25519_SIGNATURE_TYPE = 0;
/**
 * Ed25519Signature signature.
 */
export interface IEd25519Signature extends ITypeBase<0> {
    /**
     * The public key.
     */
    publicKey: string;
    /**
     * The signature.
     */
    signature: string;
}

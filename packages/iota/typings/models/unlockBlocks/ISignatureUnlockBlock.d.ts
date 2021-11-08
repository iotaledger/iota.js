import type { ITypeBase } from "../ITypeBase";
import type { IEd25519Signature } from "../signatures/IEd25519Signature";
/**
 * The global type for the unlock block.
 */
export declare const SIGNATURE_UNLOCK_BLOCK_TYPE = 0;
/**
 * An unlock block holding one or more signatures unlocking one or more inputs..
 */
export interface ISignatureUnlockBlock extends ITypeBase<0> {
    /**
     * The signature.
     */
    signature: IEd25519Signature;
}

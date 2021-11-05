import type { IAliasUnlockBlock } from "./IAliasUnlockBlock";
import type { INftUnlockBlock } from "./INftUnlockBlock";
import type { IReferenceUnlockBlock } from "./IReferenceUnlockBlock";
import type { ISignatureUnlockBlock } from "./ISignatureUnlockBlock";
/**
 * All of the unlock block types.
 */
export declare type UnlockBlockTypes = ISignatureUnlockBlock | IReferenceUnlockBlock | IAliasUnlockBlock | INftUnlockBlock;

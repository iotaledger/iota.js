import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the reference unlock block.
 */
export declare const REFERENCE_UNLOCK_BLOCK_TYPE = 1;
/**
 * An unlock block which must reference a previous unlock block which unlocks
 * also the input at the same index as this Reference Unlock Block.
 */
export interface IReferenceUnlockBlock extends ITypeBase<1> {
    /**
     * The reference.
     */
    reference: number;
}

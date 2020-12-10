import { ITypeBase } from "./ITypeBase";

/**
 * The global type for the unlock block.
 */
export const REFERENCE_UNLOCK_BLOCK_TYPE: number = 1;

/**
 * Reference unlock block.
 */
export interface IReferenceUnlockBlock extends ITypeBase<1> {
    /**
     * The reference.
     */
    reference: number;
}

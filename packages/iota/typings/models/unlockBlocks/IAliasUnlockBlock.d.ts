import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the alias unlock block.
 */
export declare const ALIAS_UNLOCK_BLOCK_TYPE = 2;
/**
 * An unlock block which must reference a previous unlock block which unlocks the alias that the input is locked to.
 */
export interface IAliasUnlockBlock extends ITypeBase<2> {
    /**
     * The reference.
     */
    reference: number;
}

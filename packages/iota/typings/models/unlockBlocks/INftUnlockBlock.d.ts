import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the NFT unlock block.
 */
export declare const NFTUNLOCK_BLOCK_TYPE = 3;
/**
 * An unlock block which must reference a previous unlock block which unlocks the NFT that the input is locked to.
 */
export interface INftUnlockBlock extends ITypeBase<3> {
    /**
     * The reference.
     */
    reference: number;
}

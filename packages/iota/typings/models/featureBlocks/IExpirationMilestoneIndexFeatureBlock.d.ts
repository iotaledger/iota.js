import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the expiration milestone feature block.
 */
export declare const EXPIRATION_MILESTONE_INDEX_FEATURE_BLOCK_TYPE = 5;
/**
 * Expiration Milestone Index feature block.
 */
export interface IExpirationMilestoneIndexFeatureBlock extends ITypeBase<5> {
    /**
     * The milestone index starting from which the output can be consumed.
     */
    milestoneIndex: number;
}

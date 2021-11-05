import type { ITypeBase } from "../ITypeBase";
/**
 * The global type for the timelock milestone feature block.
 */
export declare const TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE = 3;
/**
 * Timelock Milestone Index feature block.
 */
export interface ITimelockMilestoneIndexFeatureBlock extends ITypeBase<3> {
    /**
     * Before this milestone index, Address is allowed to unlock the output,
     * after that only the address defined in Sender Block.
     */
    milestoneIndex: number;
}

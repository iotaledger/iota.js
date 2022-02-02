import type { FeatureBlockTypes } from "../featureBlocks/featureBlockTypes";
import type { INativeToken } from "../INativeToken";
import type { ITypeBase } from "../ITypeBase";
import type { UnlockConditionTypes } from "../unlockConditions/unlockConditionTypes";
/**
 * The global type for the extended output.
 */
export declare const EXTENDED_OUTPUT_TYPE = 3;
/**
 * Extended output.
 */
export interface IExtendedOutput extends ITypeBase<3> {
    /**
     * The amount of IOTA coins to held by the output.
     */
    amount: number;
    /**
     * The native tokens held by the output.
     */
    nativeTokens: INativeToken[];
    /**
     * The unlock conditions for the output.
     */
    unlockConditions: UnlockConditionTypes[];
    /**
     * Feature blocks contained by the output.
     */
    featureBlocks: FeatureBlockTypes[];
}

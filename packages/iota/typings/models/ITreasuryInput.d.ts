import type { ITypeBase } from "./ITypeBase";
/**
 * The global type for the treasury input.
 */
export declare const TREASURY_INPUT_TYPE = 1;
/**
 * Treasury Input.
 */
export interface ITreasuryInput extends ITypeBase<1> {
    /**
     * The milestone id of the input.
     */
    milestoneId: string;
}

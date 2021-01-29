import { IAmountOutput } from "./IAmountOutput";
import { ITypeBase } from "./ITypeBase";
/**
 * The global type for the treasury output.
 */
export declare const TREASURY_OUTPUT_TYPE = 2;
/**
 * Treasury Output.
 */
export interface ITreasuryOutput extends ITypeBase<2>, IAmountOutput {
}

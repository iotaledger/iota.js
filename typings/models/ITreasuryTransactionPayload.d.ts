import type { ITreasuryInput } from "./ITreasuryInput";
import type { ITreasuryOutput } from "./ITreasuryOutput";
import type { ITypeBase } from "./ITypeBase";
/**
 * The global type for the payload.
 */
export declare const TREASURY_TRANSACTION_PAYLOAD_TYPE = 4;
/**
 * Receipt payload.
 */
export interface ITreasuryTransactionPayload extends ITypeBase<4> {
    /**
     * The input of this transaction.
     */
    input: ITreasuryInput;
    /**
     * The output of this transaction.
     */
    output: ITreasuryOutput;
}

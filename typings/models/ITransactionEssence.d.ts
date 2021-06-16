import type { IIndexationPayload } from "./IIndexationPayload";
import type { ISigLockedDustAllowanceOutput } from "./ISigLockedDustAllowanceOutput";
import type { ISigLockedSingleOutput } from "./ISigLockedSingleOutput";
import type { ITypeBase } from "./ITypeBase";
import type { IUTXOInput } from "./IUTXOInput";
/**
 * The global type for the transaction essence.
 */
export declare const TRANSACTION_ESSENCE_TYPE = 0;
/**
 * Transaction payload.
 */
export interface ITransactionEssence extends ITypeBase<0> {
    /**
     * The inputs of the transaction.
     */
    inputs: IUTXOInput[];
    /**
     * The outputs of the transaction.
     */
    outputs: (ISigLockedSingleOutput | ISigLockedDustAllowanceOutput)[];
    /**
     * Indexation payload.
     */
    payload?: IIndexationPayload;
}

import { IIndexationPayload } from "./IIndexationPayload";
import { ISigLockedSingleOutput } from "./ISigLockedSingleOutput";
import { ITypeBase } from "./ITypeBase";
import { IUTXOInput } from "./IUTXOInput";

/**
 * The global type for the transaction essence.
 */
export const TRANSACTION_ESSENCE_TYPE: number = 0;

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
    outputs: ISigLockedSingleOutput[];

    /**
     * Indexation payload.
     */
    payload?: IIndexationPayload;
}

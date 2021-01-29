import { IIndexationPayload } from "./IIndexationPayload";
import { ITypeBase } from "./ITypeBase";
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
    inputs: ITypeBase<unknown>[];
    /**
     * The outputs of the transaction.
     */
    outputs: ITypeBase<unknown>[];
    /**
     * Indexation payload.
     */
    payload?: IIndexationPayload;
}

import type { OutputTypes } from "../models/outputs/outputTypes";
import type { IUTXOInput } from "./inputs/IUTXOInput";
import type { ITypeBase } from "./ITypeBase";
import type { ITaggedDataPayload } from "./payloads/ITaggedDataPayload";
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
    outputs: OutputTypes[];
    /**
     * Tagged data payload.
     */
    payload?: ITaggedDataPayload;
}

import type { OutputTypes } from "../models/outputs/outputTypes";
import type { IUTXOInput } from "./inputs/IUTXOInput";
import type { ITypeBase } from "./ITypeBase";
import type { ITaggedDataPayload } from "./payloads/ITaggedDataPayload";
/**
 * The global type for the transaction essence.
 */
export declare const TRANSACTION_ESSENCE_TYPE = 0;
/**
 * Inputs commitment size.
 */
export declare const INPUTS_COMMITMENT_SIZE: number;
/**
 * Transaction payload.
 */
export interface ITransactionEssence extends ITypeBase<0> {
    /**
     * The network id of the message.
     */
    networkId?: string;
    /**
     * The inputs of the transaction.
     */
    inputs: IUTXOInput[];
    /**
     * The commitment to the referenced inputs.
     */
    inputsCommitment: string;
    /**
     * The outputs of the transaction.
     */
    outputs: OutputTypes[];
    /**
     * Tagged data payload.
     */
    payload?: ITaggedDataPayload;
}

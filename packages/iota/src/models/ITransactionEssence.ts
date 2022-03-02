// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b } from "@iota/crypto.js";
import type { OutputTypes } from "../models/outputs/outputTypes";
import type { IUTXOInput } from "./inputs/IUTXOInput";
import type { ITypeBase } from "./ITypeBase";
import type { ITaggedDataPayload } from "./payloads/ITaggedDataPayload";

/**
 * The global type for the transaction essence.
 */
export const TRANSACTION_ESSENCE_TYPE = 1;

/**
 * Inputs commitment size.
 */
export const INPUTS_COMMITMENT_SIZE: number = Blake2b.SIZE_256;

/**
 * Transaction payload.
 */
export interface ITransactionEssence extends ITypeBase<1> {
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

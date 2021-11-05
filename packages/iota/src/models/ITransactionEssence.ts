// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { OutputTypes } from "../models/outputs/outputTypes";
import type { IUTXOInput } from "./inputs/IUTXOInput";
import type { ITypeBase } from "./ITypeBase";
import type { IIndexationPayload } from "./payloads/IIndexationPayload";

/**
 * The global type for the transaction essence.
 */
export const TRANSACTION_ESSENCE_TYPE = 0;

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
     * Indexation payload.
     */
    payload?: IIndexationPayload;
}

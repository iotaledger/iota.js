// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { IIndexationPayload } from "./IIndexationPayload";
import { ITypeBase } from "./ITypeBase";

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
    inputs: ITypeBase<number>[];

    /**
     * The outputs of the transaction.
     */
    outputs: ITypeBase<number>[];

    /**
     * Indexation payload.
     */
    payload?: IIndexationPayload;
}

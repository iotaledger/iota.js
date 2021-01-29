// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { IIndexationPayload } from "./IIndexationPayload";
import { ISigLockedDustAllowanceOutput } from "./ISigLockedDustAllowanceOutput";
import { ISigLockedSingleOutput } from "./ISigLockedSingleOutput";
import { ITypeBase } from "./ITypeBase";
import { IUTXOInput } from "./IUTXOInput";

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
    outputs: (ISigLockedSingleOutput | ISigLockedDustAllowanceOutput)[];

    /**
     * Indexation payload.
     */
    payload?: IIndexationPayload;
}

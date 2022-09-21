// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { HexEncodedString } from "../hexEncodedTypes";
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the input.
 */
export const UTXO_INPUT_TYPE = 0;

/**
 * UTXO Transaction Input.
 */
export interface IUTXOInput extends ITypeBase<0> {
    /**
     * The transaction Id.
     */
    transactionId: HexEncodedString;

    /**
     * The output index.
     */
    transactionOutputIndex: number;
}

// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "./ITypeBase";

/**
 * The global type for the treasury output.
 */
export const TREASURY_OUTPUT_TYPE = 2;

/**
 * Treasury Output.
 */
export interface ITreasuryOutput extends ITypeBase<2> {
    /**
     * The amount of the output.
     */
    amount: number;
}

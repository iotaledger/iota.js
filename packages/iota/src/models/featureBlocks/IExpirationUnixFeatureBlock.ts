// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../ITypeBase";

/**
 * The global type for the expiration unix feature block.
 */
export const EXPIRATION_UNIX_FEATURE_BLOCK_TYPE = 6;

/**
 * Expiration Unix feature block.
 */
export interface IExpirationUnixFeatureBlock extends ITypeBase<6> {
    /**
     * Before this unix time, Address is allowed to unlock the output,
     * after that only the address defined in Sender Block.
     */
    unixTime: number;
}

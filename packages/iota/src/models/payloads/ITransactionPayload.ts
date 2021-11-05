// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITransactionEssence } from "../ITransactionEssence";
import type { ITypeBase } from "../ITypeBase";
import type { UnlockBlockTypes } from "../unlockBlocks/unlockBlockTypes";

/**
 * The global type for the payload.
 */
export const TRANSACTION_PAYLOAD_TYPE = 0;

/**
 * Transaction payload.
 */
export interface ITransactionPayload extends ITypeBase<0> {
    /**
     * The index name.
     */
    essence: ITransactionEssence;

    /**
     * The unlock blocks.
     */
    unlockBlocks: UnlockBlockTypes[];
}

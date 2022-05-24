// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IMilestonePayload } from "./payloads/IMilestonePayload";
import type { ITaggedDataPayload } from "./payloads/ITaggedDataPayload";
import type { ITransactionPayload } from "./payloads/ITransactionPayload";

/**
 * An interface with partial data for a Block.
 */
export interface IBlockPartial {
    /**
     * The protocol version under which this block operates.
     */
    protocolVersion?: number;

    /**
     * The parent block ids.
     */
    parents?: string[];

    /**
     * The payload contents.
     */
    payload?: ITransactionPayload | IMilestonePayload | ITaggedDataPayload;

    /**
     * The nonce for the block.
     */
    nonce?: string;
}

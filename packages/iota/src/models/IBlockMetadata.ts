// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ConflictReason } from "./conflictReason";
import type { LedgerInclusionState } from "./ledgerInclusionState";

/**
 * Response from the metadata endpoint.
 */
export interface IBlockMetadata {
    /**
     * The block id.
     */
    blockId: string;

    /**
     * The parent block ids.
     */
    parents?: string[];

    /**
     * Is the block solid.
     */
    isSolid: boolean;

    /**
     * Is the block referenced by a milestone.
     */
    referencedByMilestoneIndex?: number;

    /**
     * Is this block a valid milestone.
     */
    milestoneIndex?: number;

    /**
     * The ledger inclusion state.
     */
    ledgerInclusionState?: LedgerInclusionState;

    /**
     * The conflict reason.
     */
    conflictReason?: ConflictReason;

    /**
     * Should the block be promoted.
     */
    shouldPromote?: boolean;

    /**
     * Should the block be reattached.
     */
    shouldReattach?: boolean;
}

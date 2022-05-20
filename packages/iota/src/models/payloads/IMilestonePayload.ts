// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../ITypeBase";
import type { MilestoneOptionTypes } from "../milestoneOptions/milestoneOptionTypes";
import type { IEd25519Signature } from "../signatures/IEd25519Signature";

/**
 * The global type for the payload.
 */
export const MILESTONE_PAYLOAD_TYPE = 7;

/**
 * Milestone payload.
 */
export interface IMilestonePayload extends ITypeBase<7> {
    /**
     * The index name.
     */
    index: number;

    /**
     * The timestamp of the milestone.
     */
    timestamp: number;

    /**
     * The protocol version.
     */
    protocolVersion: number;

    /**
     * The id of the previous milestone.
     */
    previousMilestoneId: string;

    /**
     * The parents where this milestone attaches to.
     */
    parents: string[];

    /**
     * The Merkle tree hash of all blocks confirmed by this milestone.
     */
    inclusionMerkleRoot: string;

    /**
     * The Merkle tree hash of all blocks applied by this milestone.
     */
    appliedMerkleRoot: string;

    /**
     * The metadata.
     */
    metadata?: string;

    /**
     * The milestone options.
     */
    options?: MilestoneOptionTypes[];

    /**
     * The signatures.
     */
    signatures: IEd25519Signature[];
}

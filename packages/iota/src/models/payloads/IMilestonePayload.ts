// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../ITypeBase";
import type { IEd25519Signature } from "../signatures/IEd25519Signature";
import type { MilestoneOptionTypes } from "../milestoneOptions/milestoneOptionTypes";

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
     * The timestamp of the milestone.
     */
    lastMilestoneId: string;

    /**
     * The parents where this milestone attaches to.
     */
    parentMessageIds: string[];

    /**
     * The merkle proof confirmation.
     */
    confirmedMerkleRoot: string;
    
    /**
     * The merkle proof applied.
     */
    appliedMerkleRoot: string;

    /**
     * The metadata.
     */
    metadata: string;

    /**
     * The milestone options.
     */
    options: MilestoneOptionTypes[];

    /**
     * The signatures.
     */
    signatures: IEd25519Signature[];
}

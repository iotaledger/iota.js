// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IReceiptPayload } from "./IReceiptPayload";
import type { ITypeBase } from "./ITypeBase";

/**
 * The global type for the payload.
 */
export const MILESTONE_PAYLOAD_TYPE = 1;

/**
 * Milestone payload.
 */
export interface IMilestonePayload extends ITypeBase<1> {
    /**
     * The index name.
     */
    index: number;

    /**
     * The timestamp of the milestone.
     */
    timestamp: number;

    /**
     * The parents where this milestone attaches to.
     */
    parentMessageIds: string[];

    /**
     * The merkle proof inclusions.
     */
    inclusionMerkleProof: string;

    /**
     * The next PoW score.
     */
    nextPoWScore: number;

    /**
     * The milestone at which the next PoW score becomes active.
     */
    nextPoWScoreMilestoneIndex: number;

    /**
     * The public keys.
     */
    publicKeys: string[];

    /**
     * The signatures.
     */
    signatures: string[];

    /**
     * Receipt payload.
     */
    receipt?: IReceiptPayload;
}

// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../ITypeBase";
import type { IEd25519Signature } from "../signatures/IEd25519Signature";
import type { IReceiptPayload } from "./IReceiptPayload";

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
     * The metadata.
     */
    metadata: string;

    /**
     * The signatures.
     */
    signatures: IEd25519Signature[];

    /**
     * Receipt payload.
     */
    receipt?: IReceiptPayload;
}

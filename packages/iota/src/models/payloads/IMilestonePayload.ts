// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { HexEncodedString } from "../hexEncodedTypes";
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
    previousMilestoneId: HexEncodedString;

    /**
     * The parents where this milestone attaches to.
     */
    parents: HexEncodedString[];

    /**
     * The Merkle tree hash of all blocks confirmed by this milestone.
     */
    inclusionMerkleRoot: HexEncodedString;

    /**
     * The Merkle tree hash of all blocks applied by this milestone.
     */
    appliedMerkleRoot: HexEncodedString;

    /**
     * The metadata.
     */
    metadata?: HexEncodedString;

    /**
     * The milestone options.
     */
    options?: MilestoneOptionTypes[];

    /**
     * The signatures.
     */
    signatures: IEd25519Signature[];
}

// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b } from "@iota/crypto.js";
import { Converter, WriteStream } from "@iota/util.js";
import { serializeBlock } from "../binary/block";
import { serializeMilestoneEssence } from "../binary/payloads/milestonePayload";
import type { IBlock } from "../models/IBlock";
import type { IMilestonePayload } from "../models/payloads/IMilestonePayload";

/**
 * Compute a milestoneId from a milestone payload.
 * @param payload The milestone payload.
 * @returns The milestone id hex prefixed string.
 */
export function milestoneIdFromMilestonePayload(payload: IMilestonePayload): string {
    const writeStream = new WriteStream();
    serializeMilestoneEssence(writeStream, payload);
    const essenceFinal = writeStream.finalBytes();
    const essenceHash = Blake2b.sum256(essenceFinal);

    return Converter.bytesToHex(essenceHash, true);
}

/**
 * Compute a blockId from a milestone payload.
 * @param protocolVersion The protocol version to use.
 * @param payload The milestone payload.
 * @returns The blockId of the block with the milestone payload.
 */
export function blockIdFromMilestonePayload(protocolVersion: number, payload: IMilestonePayload) {
    const writeStream = new WriteStream();
    const block: IBlock = {
        protocolVersion,
        parents: payload.parents,
        payload,
        nonce: "0"
    };
    serializeBlock(writeStream, block);

    const blockFinal = writeStream.finalBytes();
    const blockHash = Blake2b.sum256(blockFinal);

    return Converter.bytesToHex(blockHash, true);
}


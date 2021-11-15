// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import {
    ITimelockMilestoneIndexFeatureBlock,
    TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE
} from "../../models/featureBlocks/ITimelockMilestoneIndexFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a timelock milestone index feature block binary representation.
 */
export const MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH: number = SMALL_TYPE_LENGTH + UINT32_SIZE;

/**
 * Deserialize the timelock milestone index feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTimelockMilestoneIndexFeatureBlock(
    readStream: ReadStream
): ITimelockMilestoneIndexFeatureBlock {
    if (!readStream.hasRemaining(MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH)) {
        throw new Error(
            `TimelockMilestoneIndex Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_LENGTH}`
        );
    }

    const type = readStream.readUInt8("timelockMilestoneIndexFeatureBlock.type");
    if (type !== TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in timelockMilestoneIndexFeatureBlock ${type}`);
    }

    const milestoneIndex = readStream.readUInt32("timelockMilestoneIndexFeatureBlock.milestoneIndex");

    return {
        type: TIMELOCK_MILESTONE_INDEX_FEATURE_BLOCK_TYPE,
        milestoneIndex
    };
}

/**
 * Serialize the timelock milestone index feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTimelockMilestoneIndexFeatureBlock(
    writeStream: WriteStream,
    object: ITimelockMilestoneIndexFeatureBlock
): void {
    writeStream.writeUInt8("timelockMilestoneIndexFeatureBlock.type", object.type);
    writeStream.writeUInt32("timelockMilestoneIndexFeatureBlock.milestoneIndex", object.milestoneIndex);
}

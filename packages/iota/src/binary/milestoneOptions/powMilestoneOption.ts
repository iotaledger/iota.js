// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-mixed-operators */
import type { ReadStream, WriteStream } from "@iota/util.js";
import { IPoWMilestoneOption, POW_MILESTONE_OPTION_TYPE } from "../../models/milestoneOptions/IPoWMilestoneOption";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";

/**
 * The minimum length of a pow milestone option binary representation.
 */
export const MIN_POW_MILESTONE_OPTION_LENGTH: number =
    SMALL_TYPE_LENGTH +
    UINT32_SIZE + // nextPoWScore
    UINT32_SIZE; // nextPowScoreMilestoneIndex
    
/**
 * Deserialize the pow milestone option from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializePoWMilestoneOption(readStream: ReadStream): IPoWMilestoneOption {
    if (!readStream.hasRemaining(MIN_POW_MILESTONE_OPTION_LENGTH)) {
        throw new Error(
            `PoW Milestone Option data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_POW_MILESTONE_OPTION_LENGTH}`
        );
    }

    const type = readStream.readUInt8("powMilestoneOption.type");
    if (type !== POW_MILESTONE_OPTION_TYPE) {
        throw new Error(`Type mismatch in powMilestoneOption ${type}`);
    }

    const nextPoWScore = readStream.readUInt32("powMilestoneOption.nextPoWScore");
    const nextPoWScoreMilestoneIndex = readStream.readUInt32("powMilestoneOption.nextPoWScoreMilestoneIndex");

    return {
        type: POW_MILESTONE_OPTION_TYPE,
        nextPoWScore,
        nextPoWScoreMilestoneIndex,
    };
}

/**
 * Serialize the receipt payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializePoWMilestoneOption(writeStream: WriteStream, object: IPoWMilestoneOption): void {
    writeStream.writeUInt8("powMilestoneOption.type", object.type);
    writeStream.writeUInt32("powMilestoneOption.nextPoWScore", object.nextPoWScore);
    writeStream.writeUInt32("powMilestoneOption.nextPoWScoreMilestoneIndex", object.nextPoWScoreMilestoneIndex);
}

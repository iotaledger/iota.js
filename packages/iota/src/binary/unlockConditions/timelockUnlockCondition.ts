// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { ITimelockUnlockCondition, TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/ITimelockUnlockCondition";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";

/**
 * The minimum length of an timelock unlock condition binary representation.
 */
export const MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH: number =
    SMALL_TYPE_LENGTH +
    UINT32_SIZE +
    UINT32_SIZE;

/**
 * Deserialize the timelock unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTimelockUnlockCondition(readStream: ReadStream): ITimelockUnlockCondition {
    if (!readStream.hasRemaining(MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(
            `Timelock unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH}`
        );
    }

    const type = readStream.readUInt8("timelockUnlockCondition.type");
    if (type !== TIMELOCK_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in timelockUnlockCondition ${type}`);
    }

    const milestoneIndex = readStream.readUInt32("timelockUnlockCondition.milestoneIndex");
    const unixTime = readStream.readUInt32("timelockUnlockCondition.unixTime");

    return {
        type: TIMELOCK_UNLOCK_CONDITION_TYPE,
        milestoneIndex: milestoneIndex > 0 ? milestoneIndex : undefined,
        unixTime: unixTime > 0 ? unixTime : undefined
    };
}

/**
 * Serialize the timelock unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTimelockUnlockCondition(
    writeStream: WriteStream, object: ITimelockUnlockCondition): void {
    writeStream.writeUInt8("timelockUnlockCondition.type", object.type);
    writeStream.writeUInt32("timelockUnlockCondition.milestoneIndex", object.milestoneIndex ?? 0);
    writeStream.writeUInt32("timelockUnlockCondition.unixTime", object.unixTime ?? 0);
}

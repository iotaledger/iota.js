// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { IExpirationUnlockCondition, EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IExpirationUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";

/**
 * The minimum length of an expiration unlock condition binary representation.
 */
export const MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH: number =
    SMALL_TYPE_LENGTH +
    MIN_ADDRESS_LENGTH +
    UINT32_SIZE +
    UINT32_SIZE;

/**
 * Deserialize the expiration unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeExpirationUnlockCondition(readStream: ReadStream): IExpirationUnlockCondition {
    if (!readStream.hasRemaining(MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(
            `Expiration unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH}`
        );
    }

    const type = readStream.readUInt8("expirationUnlockCondition.type");
    if (type !== EXPIRATION_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in expirationUnlockCondition ${type}`);
    }

    const returnAddress = deserializeAddress(readStream);

    const milestoneIndex = readStream.readUInt32("expirationUnlockCondition.milestoneIndex");
    const unixTime = readStream.readUInt32("expirationUnlockCondition.unixTime");

    return {
        type: EXPIRATION_UNLOCK_CONDITION_TYPE,
        returnAddress,
        milestoneIndex: milestoneIndex > 0 ? milestoneIndex : undefined,
        unixTime: unixTime > 0 ? unixTime : undefined
    };
}

/**
 * Serialize the expiration unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeExpirationUnlockCondition(
    writeStream: WriteStream, object: IExpirationUnlockCondition): void {
    writeStream.writeUInt8("expirationUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.returnAddress);
    writeStream.writeUInt32("expirationUnlockCondition.milestoneIndex", object.milestoneIndex ?? 0);
    writeStream.writeUInt32("expirationUnlockCondition.unixTime", object.unixTime ?? 0);
}

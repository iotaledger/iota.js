// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { IGovernorUnlockCondition, GOVERNOR_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";

/**
 * The minimum length of an governor unlock condition binary representation.
 */
export const MIN_GOVERNOR_UNLOCK_CONDITION_LENGTH: number = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;

/**
 * Deserialize the governor unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeGovernorUnlockCondition(readStream: ReadStream): IGovernorUnlockCondition {
    if (!readStream.hasRemaining(MIN_GOVERNOR_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(
            `Governor unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_GOVERNOR_UNLOCK_CONDITION_LENGTH}`
        );
    }

    const type = readStream.readUInt8("governorUnlockCondition.type");
    if (type !== GOVERNOR_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in governorUnlockCondition ${type}`);
    }

    const address = deserializeAddress(readStream);

    return {
        type: GOVERNOR_UNLOCK_CONDITION_TYPE,
        address
    };
}

/**
 * Serialize the governor unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeGovernorUnlockCondition(writeStream: WriteStream, object: IGovernorUnlockCondition): void {
    writeStream.writeUInt8("governorUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}

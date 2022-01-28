// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import { IStateControllerUnlockCondition, STATE_CONTROLLER_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";

/**
 * The minimum length of an state controller unlock condition binary representation.
 */
export const MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH: number = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;

/**
 * Deserialize the state controller unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeStateControllerUnlockCondition(readStream: ReadStream): IStateControllerUnlockCondition {
    if (!readStream.hasRemaining(MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(
            `State controller unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH}`
        );
    }

    const type = readStream.readUInt8("stateControllerUnlockCondition.type");
    if (type !== STATE_CONTROLLER_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in stateControllerUnlockCondition ${type}`);
    }

    const address = deserializeAddress(readStream);

    return {
        type: STATE_CONTROLLER_UNLOCK_CONDITION_TYPE,
        address
    };
}

/**
 * Serialize the state controller unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeStateControllerUnlockCondition(
    writeStream: WriteStream, object: IStateControllerUnlockCondition): void {
    writeStream.writeUInt8("stateControllerUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}

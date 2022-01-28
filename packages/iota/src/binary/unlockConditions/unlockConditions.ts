// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { ITypeBase } from "../../models/ITypeBase";
import {
    ADDRESS_UNLOCK_CONDITION_TYPE,
    IAddressUnlockCondition
} from "../../models/unlockConditions/IAddressUnlockCondition";
import {
    DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
    IDustDepositReturnUnlockCondition
} from "../../models/unlockConditions/IDustDepositReturnUnlockCondition";
import {
    EXPIRATION_UNLOCK_CONDITION_TYPE,
    IExpirationUnlockCondition
} from "../../models/unlockConditions/IExpirationUnlockCondition";
import {
    GOVERNOR_UNLOCK_CONDITION_TYPE,
    IGovernorUnlockCondition
} from "../../models/unlockConditions/IGovernorUnlockCondition";
import {
    IStateControllerUnlockCondition, STATE_CONTROLLER_UNLOCK_CONDITION_TYPE
} from "../../models/unlockConditions/IStateControllerUnlockCondition";
import {
    ITimelockUnlockCondition, TIMELOCK_UNLOCK_CONDITION_TYPE
} from "../../models/unlockConditions/ITimelockUnlockCondition";
import type { UnlockConditionTypes } from "../../models/unlockConditions/unlockConditionTypes";
import { UINT8_SIZE } from "../commonDataTypes";
import {
    deserializeAddressUnlockCondition,
    MIN_ADDRESS_UNLOCK_CONDITION_LENGTH,
    serializeAddressUnlockCondition
} from "../unlockConditions/addressUnlockCondition";
import {
    deserializeDustDepositReturnUnlockCondition,
    MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH,
    serializeDustDepositReturnUnlockCondition
} from "../unlockConditions/dustDepositReturnUnlockCondition";
import {
    deserializeExpirationUnlockCondition,
    MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH,
    serializeExpirationUnlockCondition
} from "../unlockConditions/expirationUnlockCondition";
import {
    deserializeGovernorUnlockCondition,
    MIN_GOVERNOR_UNLOCK_CONDITION_LENGTH,
    serializeGovernorUnlockCondition
} from "../unlockConditions/governorUnlockCondition";
import {
    deserializeStateControllerUnlockCondition,
    MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH,
    serializeStateControllerUnlockCondition
} from "../unlockConditions/stateControllerUnlockCondition";
import {
    deserializeTimelockUnlockCondition,
    MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH,
    serializeTimelockUnlockCondition
} from "../unlockConditions/timelockUnlockCondition";

/**
 * The minimum length of a unlock conditions list.
 */
export const MIN_UNLOCK_CONDITIONS_LENGTH: number = UINT8_SIZE;

/**
 * The minimum length of a unlock conditions binary representation.
 */
export const MIN_UNLOCK_CONDITION_LENGTH: number = Math.min(
    MIN_ADDRESS_UNLOCK_CONDITION_LENGTH,
    MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH,
    MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH,
    MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH,
    MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH,
    MIN_GOVERNOR_UNLOCK_CONDITION_LENGTH
);

/**
 * Deserialize the unlock conditions from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockConditions(readStream: ReadStream): UnlockConditionTypes[] {
    const numUnlockConditions = readStream.readUInt8("unlockConditions.numUnlockConditions");

    const unlockConditions: UnlockConditionTypes[] = [];
    for (let i = 0; i < numUnlockConditions; i++) {
        unlockConditions.push(deserializeUnlockCondition(readStream));
    }

    return unlockConditions;
}

/**
 * Serialize the unlock conditions to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeUnlockConditions(writeStream: WriteStream, objects: UnlockConditionTypes[]): void {
    writeStream.writeUInt8("unlockConditions.numUnlockConditions", objects.length);

    for (let i = 0; i < objects.length; i++) {
        serializeUnlockCondition(writeStream, objects[i]);
    }
}

/**
 * Deserialize the unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockCondition(readStream: ReadStream): UnlockConditionTypes {
    if (!readStream.hasRemaining(MIN_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(
            `Unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_UNLOCK_CONDITION_LENGTH}`
        );
    }

    const type = readStream.readUInt8("unlockCondition.type", false);
    let input;

    if (type === ADDRESS_UNLOCK_CONDITION_TYPE) {
        input = deserializeAddressUnlockCondition(readStream);
    } else if (type === DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        input = deserializeDustDepositReturnUnlockCondition(readStream);
    } else if (type === TIMELOCK_UNLOCK_CONDITION_TYPE) {
        input = deserializeTimelockUnlockCondition(readStream);
    } else if (type === EXPIRATION_UNLOCK_CONDITION_TYPE) {
        input = deserializeExpirationUnlockCondition(readStream);
    } else if (type === STATE_CONTROLLER_UNLOCK_CONDITION_TYPE) {
        input = deserializeStateControllerUnlockCondition(readStream);
    } else if (type === GOVERNOR_UNLOCK_CONDITION_TYPE) {
        input = deserializeGovernorUnlockCondition(readStream);
    } else {
        throw new Error(`Unrecognized unlock condition type ${type}`);
    }

    return input;
}

/**
 * Serialize the unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeUnlockCondition(writeStream: WriteStream, object: ITypeBase<number>): void {
    if (object.type === ADDRESS_UNLOCK_CONDITION_TYPE) {
        serializeAddressUnlockCondition(writeStream, object as IAddressUnlockCondition);
    } else if (object.type === DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        serializeDustDepositReturnUnlockCondition(writeStream, object as IDustDepositReturnUnlockCondition);
    } else if (object.type === TIMELOCK_UNLOCK_CONDITION_TYPE) {
        serializeTimelockUnlockCondition(writeStream, object as ITimelockUnlockCondition);
    } else if (object.type === EXPIRATION_UNLOCK_CONDITION_TYPE) {
        serializeExpirationUnlockCondition(writeStream, object as IExpirationUnlockCondition);
    } else if (object.type === STATE_CONTROLLER_UNLOCK_CONDITION_TYPE) {
        serializeStateControllerUnlockCondition(writeStream, object as IStateControllerUnlockCondition);
    } else if (object.type === GOVERNOR_UNLOCK_CONDITION_TYPE) {
        serializeGovernorUnlockCondition(writeStream, object as IGovernorUnlockCondition);
    } else {
        throw new Error(`Unrecognized unlock condition type ${object.type}`);
    }
}

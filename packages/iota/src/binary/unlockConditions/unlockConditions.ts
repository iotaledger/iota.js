// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ReadStream, WriteStream } from "@iota/util.js";
import type { ITypeBase } from "../../models/ITypeBase";
import {
    ADDRESS_UNLOCK_CONDITION_TYPE,
    IAddressUnlockCondition
} from "../../models/unlockConditions/IAddressUnlockCondition";
import {
    EXPIRATION_UNLOCK_CONDITION_TYPE,
    IExpirationUnlockCondition
} from "../../models/unlockConditions/IExpirationUnlockCondition";
import {
    GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
    IGovernorAddressUnlockCondition
} from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import {
    IImmutableAliasUnlockCondition, IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE
} from "../../models/unlockConditions/IImmutableAliasUnlockCondition";
import {
    IStateControllerAddressUnlockCondition, STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE
} from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import {
    IStorageDepositReturnUnlockCondition, STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE
} from "../../models/unlockConditions/IStorageDepositReturnUnlockCondition";
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
    deserializeExpirationUnlockCondition,
    MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH,
    serializeExpirationUnlockCondition
} from "../unlockConditions/expirationUnlockCondition";
import {
    deserializeImmutableAliasUnlockCondition,
    MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH,
    serializeImmutableAliasUnlockCondition
} from "../unlockConditions/immutableAliasUnlockCondition";
import {
    deserializeTimelockUnlockCondition,
    MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH,
    serializeTimelockUnlockCondition
} from "../unlockConditions/timelockUnlockCondition";
import {
    deserializeGovernorAddressUnlockCondition,
    MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH,
    serializeGovernorAddressUnlockCondition
} from "./governorAddressUnlockCondition";
import {
    deserializeStateControllerAddressUnlockCondition,
    MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH,
    serializeStateControllerAddressUnlockCondition
} from "./stateControllerAddressUnlockCondition";
import {
    deserializeStorageDepositReturnUnlockCondition,
    MIN_STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH,
    serializeStorageDepositReturnUnlockCondition
} from "./storageDepositReturnUnlockCondition";

/**
 * The minimum length of a unlock conditions list.
 */
export const MIN_UNLOCK_CONDITIONS_LENGTH: number = UINT8_SIZE;

/**
 * The minimum length of a unlock conditions binary representation.
 */
export const MIN_UNLOCK_CONDITION_LENGTH: number = Math.min(
    MIN_ADDRESS_UNLOCK_CONDITION_LENGTH,
    MIN_STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH,
    MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH,
    MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH,
    MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH,
    MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH,
    MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH
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
    } else if (type === STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        input = deserializeStorageDepositReturnUnlockCondition(readStream);
    } else if (type === TIMELOCK_UNLOCK_CONDITION_TYPE) {
        input = deserializeTimelockUnlockCondition(readStream);
    } else if (type === EXPIRATION_UNLOCK_CONDITION_TYPE) {
        input = deserializeExpirationUnlockCondition(readStream);
    } else if (type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE) {
        input = deserializeStateControllerAddressUnlockCondition(readStream);
    } else if (type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) {
        input = deserializeGovernorAddressUnlockCondition(readStream);
    } else if (type === IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE) {
        input = deserializeImmutableAliasUnlockCondition(readStream);
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
    } else if (object.type === STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        serializeStorageDepositReturnUnlockCondition(writeStream, object as IStorageDepositReturnUnlockCondition);
    } else if (object.type === TIMELOCK_UNLOCK_CONDITION_TYPE) {
        serializeTimelockUnlockCondition(writeStream, object as ITimelockUnlockCondition);
    } else if (object.type === EXPIRATION_UNLOCK_CONDITION_TYPE) {
        serializeExpirationUnlockCondition(writeStream, object as IExpirationUnlockCondition);
    } else if (object.type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE) {
        serializeStateControllerAddressUnlockCondition(writeStream, object as IStateControllerAddressUnlockCondition);
    } else if (object.type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) {
        serializeGovernorAddressUnlockCondition(writeStream, object as IGovernorAddressUnlockCondition);
    } else if (object.type === IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE) {
        serializeImmutableAliasUnlockCondition(writeStream, object as IImmutableAliasUnlockCondition);
    } else {
        throw new Error(`Unrecognized unlock condition type ${object.type}`);
    }
}

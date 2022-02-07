import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition.mjs";
import { DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IDustDepositReturnUnlockCondition.mjs";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IExpirationUnlockCondition.mjs";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition.mjs";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IImmutableAliasUnlockCondition.mjs";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition.mjs";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/ITimelockUnlockCondition.mjs";
import { UINT8_SIZE } from "../commonDataTypes.mjs";
import { deserializeAddressUnlockCondition, MIN_ADDRESS_UNLOCK_CONDITION_LENGTH, serializeAddressUnlockCondition } from "../unlockConditions/addressUnlockCondition.mjs";
import { deserializeDustDepositReturnUnlockCondition, MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH, serializeDustDepositReturnUnlockCondition } from "../unlockConditions/dustDepositReturnUnlockCondition.mjs";
import { deserializeExpirationUnlockCondition, MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH, serializeExpirationUnlockCondition } from "../unlockConditions/expirationUnlockCondition.mjs";
import { deserializeImmutableAliasUnlockCondition, MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH, serializeImmutableAliasUnlockCondition } from "../unlockConditions/immutableAliasUnlockCondition.mjs";
import { deserializeTimelockUnlockCondition, MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH, serializeTimelockUnlockCondition } from "../unlockConditions/timelockUnlockCondition.mjs";
import { deserializeGovernorAddressUnlockCondition, MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH, serializeGovernorAddressUnlockCondition } from "./governorAddressUnlockCondition.mjs";
import { deserializeStateControllerAddressUnlockCondition, MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH, serializeStateControllerAddressUnlockCondition } from "./stateControllerAddressUnlockCondition.mjs";
/**
 * The minimum length of a unlock conditions list.
 */
export const MIN_UNLOCK_CONDITIONS_LENGTH = UINT8_SIZE;
/**
 * The minimum length of a unlock conditions binary representation.
 */
export const MIN_UNLOCK_CONDITION_LENGTH = Math.min(MIN_ADDRESS_UNLOCK_CONDITION_LENGTH, MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH, MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH, MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH, MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH, MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH, MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH);
/**
 * Deserialize the unlock conditions from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockConditions(readStream) {
    const numUnlockConditions = readStream.readUInt8("unlockConditions.numUnlockConditions");
    const unlockConditions = [];
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
export function serializeUnlockConditions(writeStream, objects) {
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
export function deserializeUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("unlockCondition.type", false);
    let input;
    if (type === ADDRESS_UNLOCK_CONDITION_TYPE) {
        input = deserializeAddressUnlockCondition(readStream);
    }
    else if (type === DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        input = deserializeDustDepositReturnUnlockCondition(readStream);
    }
    else if (type === TIMELOCK_UNLOCK_CONDITION_TYPE) {
        input = deserializeTimelockUnlockCondition(readStream);
    }
    else if (type === EXPIRATION_UNLOCK_CONDITION_TYPE) {
        input = deserializeExpirationUnlockCondition(readStream);
    }
    else if (type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE) {
        input = deserializeStateControllerAddressUnlockCondition(readStream);
    }
    else if (type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) {
        input = deserializeGovernorAddressUnlockCondition(readStream);
    }
    else if (type === IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE) {
        input = deserializeImmutableAliasUnlockCondition(readStream);
    }
    else {
        throw new Error(`Unrecognized unlock condition type ${type}`);
    }
    return input;
}
/**
 * Serialize the unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeUnlockCondition(writeStream, object) {
    if (object.type === ADDRESS_UNLOCK_CONDITION_TYPE) {
        serializeAddressUnlockCondition(writeStream, object);
    }
    else if (object.type === DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        serializeDustDepositReturnUnlockCondition(writeStream, object);
    }
    else if (object.type === TIMELOCK_UNLOCK_CONDITION_TYPE) {
        serializeTimelockUnlockCondition(writeStream, object);
    }
    else if (object.type === EXPIRATION_UNLOCK_CONDITION_TYPE) {
        serializeExpirationUnlockCondition(writeStream, object);
    }
    else if (object.type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE) {
        serializeStateControllerAddressUnlockCondition(writeStream, object);
    }
    else if (object.type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) {
        serializeGovernorAddressUnlockCondition(writeStream, object);
    }
    else if (object.type === IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE) {
        serializeImmutableAliasUnlockCondition(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized unlock condition type ${object.type}`);
    }
}

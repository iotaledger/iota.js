import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IImmutableAliasUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/ITimelockUnlockCondition";
import { UINT8_SIZE } from "../commonDataTypes";
import { deserializeAddressUnlockCondition, MIN_ADDRESS_UNLOCK_CONDITION_LENGTH, serializeAddressUnlockCondition } from "../unlockConditions/addressUnlockCondition";
import { deserializeExpirationUnlockCondition, MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH, serializeExpirationUnlockCondition } from "../unlockConditions/expirationUnlockCondition";
import { deserializeImmutableAliasUnlockCondition, MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH, serializeImmutableAliasUnlockCondition } from "../unlockConditions/immutableAliasUnlockCondition";
import { deserializeTimelockUnlockCondition, MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH, serializeTimelockUnlockCondition } from "../unlockConditions/timelockUnlockCondition";
import { deserializeGovernorAddressUnlockCondition, MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH, serializeGovernorAddressUnlockCondition } from "./governorAddressUnlockCondition";
import { deserializeStateControllerAddressUnlockCondition, MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH, serializeStateControllerAddressUnlockCondition } from "./stateControllerAddressUnlockCondition";
import { deserializeStorageDepositReturnUnlockCondition, MIN_STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH, serializeStorageDepositReturnUnlockCondition } from "./storageDepositReturnUnlockCondition";
/**
 * The minimum length of a unlock conditions list.
 */
export const MIN_UNLOCK_CONDITIONS_LENGTH = UINT8_SIZE;
/**
 * The minimum length of a unlock conditions binary representation.
 */
export const MIN_UNLOCK_CONDITION_LENGTH = Math.min(MIN_ADDRESS_UNLOCK_CONDITION_LENGTH, MIN_STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH, MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH, MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH, MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH, MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH, MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH);
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
    else if (type === STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        input = deserializeStorageDepositReturnUnlockCondition(readStream);
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
    else if (object.type === STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        serializeStorageDepositReturnUnlockCondition(writeStream, object);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQ29uZGl0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvdW5sb2NrQ29uZGl0aW9ucy91bmxvY2tDb25kaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFDSCw2QkFBNkIsRUFFaEMsTUFBTSx1REFBdUQsQ0FBQztBQUMvRCxPQUFPLEVBQ0gsZ0NBQWdDLEVBRW5DLE1BQU0sMERBQTBELENBQUM7QUFDbEUsT0FBTyxFQUNILHNDQUFzQyxFQUV6QyxNQUFNLCtEQUErRCxDQUFDO0FBQ3ZFLE9BQU8sRUFDNkIscUNBQXFDLEVBQ3hFLE1BQU0sOERBQThELENBQUM7QUFDdEUsT0FBTyxFQUNxQyw4Q0FBOEMsRUFDekYsTUFBTSxzRUFBc0UsQ0FBQztBQUM5RSxPQUFPLEVBQ21DLDRDQUE0QyxFQUNyRixNQUFNLG9FQUFvRSxDQUFDO0FBQzVFLE9BQU8sRUFDdUIsOEJBQThCLEVBQzNELE1BQU0sd0RBQXdELENBQUM7QUFFaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsbUNBQW1DLEVBQ25DLCtCQUErQixFQUNsQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BELE9BQU8sRUFDSCxvQ0FBb0MsRUFDcEMsc0NBQXNDLEVBQ3RDLGtDQUFrQyxFQUNyQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3ZELE9BQU8sRUFDSCx3Q0FBd0MsRUFDeEMsMkNBQTJDLEVBQzNDLHNDQUFzQyxFQUN6QyxNQUFNLG1EQUFtRCxDQUFDO0FBQzNELE9BQU8sRUFDSCxrQ0FBa0MsRUFDbEMsb0NBQW9DLEVBQ3BDLGdDQUFnQyxFQUNuQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JELE9BQU8sRUFDSCx5Q0FBeUMsRUFDekMsNENBQTRDLEVBQzVDLHVDQUF1QyxFQUMxQyxNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFDSCxnREFB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
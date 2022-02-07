import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IDustDepositReturnUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IImmutableAliasUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/ITimelockUnlockCondition";
import { UINT8_SIZE } from "../commonDataTypes";
import { deserializeAddressUnlockCondition, MIN_ADDRESS_UNLOCK_CONDITION_LENGTH, serializeAddressUnlockCondition } from "../unlockConditions/addressUnlockCondition";
import { deserializeDustDepositReturnUnlockCondition, MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH, serializeDustDepositReturnUnlockCondition } from "../unlockConditions/dustDepositReturnUnlockCondition";
import { deserializeExpirationUnlockCondition, MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH, serializeExpirationUnlockCondition } from "../unlockConditions/expirationUnlockCondition";
import { deserializeImmutableAliasUnlockCondition, MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH, serializeImmutableAliasUnlockCondition } from "../unlockConditions/immutableAliasUnlockCondition";
import { deserializeTimelockUnlockCondition, MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH, serializeTimelockUnlockCondition } from "../unlockConditions/timelockUnlockCondition";
import { deserializeGovernorAddressUnlockCondition, MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH, serializeGovernorAddressUnlockCondition } from "./governorAddressUnlockCondition";
import { deserializeStateControllerAddressUnlockCondition, MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH, serializeStateControllerAddressUnlockCondition } from "./stateControllerAddressUnlockCondition";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQ29uZGl0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvdW5sb2NrQ29uZGl0aW9ucy91bmxvY2tDb25kaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFDSCw2QkFBNkIsRUFFaEMsTUFBTSx1REFBdUQsQ0FBQztBQUMvRCxPQUFPLEVBQ0gseUNBQXlDLEVBRTVDLE1BQU0saUVBQWlFLENBQUM7QUFDekUsT0FBTyxFQUNILGdDQUFnQyxFQUVuQyxNQUFNLDBEQUEwRCxDQUFDO0FBQ2xFLE9BQU8sRUFDSCxzQ0FBc0MsRUFFekMsTUFBTSwrREFBK0QsQ0FBQztBQUN2RSxPQUFPLEVBQzZCLHFDQUFxQyxFQUN4RSxNQUFNLDhEQUE4RCxDQUFDO0FBQ3RFLE9BQU8sRUFDcUMsOENBQThDLEVBQ3pGLE1BQU0sc0VBQXNFLENBQUM7QUFDOUUsT0FBTyxFQUN1Qiw4QkFBOEIsRUFDM0QsTUFBTSx3REFBd0QsQ0FBQztBQUVoRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUNILGlDQUFpQyxFQUNqQyxtQ0FBbUMsRUFDbkMsK0JBQStCLEVBQ2xDLE1BQU0sNENBQTRDLENBQUM7QUFDcEQsT0FBTyxFQUNILDJDQUEyQyxFQUMzQywrQ0FBK0MsRUFDL0MseUNBQXlDLEVBQzVDLE1BQU0sc0RBQXNELENBQUM7QUFDOUQsT0FBTyxFQUNILG9DQUFvQyxFQUNwQyxzQ0FBc0MsRUFDdEMsa0NBQWtDLEVBQ3JDLE1BQU0sK0NBQStDLENBQUM7QUFDdkQsT0FBTyxFQUNILHdDQUF3QyxFQUN4QywyQ0FBMkMsRUFDM0Msc0NBQXNDLEVBQ3pDLE1BQU0sbURBQW1ELENBQUM7QUFDM0QsT0FBTyxFQUNILGtDQUFrQyxFQUNsQyxvQ0FBb0MsRUFDcEMsZ0NBQWdDLEVBQ25DLE1BQU0sNkNBQTZDLENBQUM7QUFDckQsT0FBTyxFQUNILHlDQUF5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
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IDustDepositReturnUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorUnlockCondition";
import { STATE_CONTROLLER_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/ITimelockUnlockCondition";
import { UINT8_SIZE } from "../commonDataTypes";
import { deserializeAddressUnlockCondition, MIN_ADDRESS_UNLOCK_CONDITION_LENGTH, serializeAddressUnlockCondition } from "../unlockConditions/addressUnlockCondition";
import { deserializeDustDepositReturnUnlockCondition, MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH, serializeDustDepositReturnUnlockCondition } from "../unlockConditions/dustDepositReturnUnlockCondition";
import { deserializeExpirationUnlockCondition, MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH, serializeExpirationUnlockCondition } from "../unlockConditions/expirationUnlockCondition";
import { deserializeGovernorUnlockCondition, MIN_GOVERNOR_UNLOCK_CONDITION_LENGTH, serializeGovernorUnlockCondition } from "../unlockConditions/governorUnlockCondition";
import { deserializeStateControllerUnlockCondition, MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH, serializeStateControllerUnlockCondition } from "../unlockConditions/stateControllerUnlockCondition";
import { deserializeTimelockUnlockCondition, MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH, serializeTimelockUnlockCondition } from "../unlockConditions/timelockUnlockCondition";
/**
 * The minimum length of a unlock conditions list.
 */
export const MIN_UNLOCK_CONDITIONS_LENGTH = UINT8_SIZE;
/**
 * The minimum length of a unlock conditions binary representation.
 */
export const MIN_UNLOCK_CONDITION_LENGTH = Math.min(MIN_ADDRESS_UNLOCK_CONDITION_LENGTH, MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH, MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH, MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH, MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH, MIN_GOVERNOR_UNLOCK_CONDITION_LENGTH);
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
    else if (type === STATE_CONTROLLER_UNLOCK_CONDITION_TYPE) {
        input = deserializeStateControllerUnlockCondition(readStream);
    }
    else if (type === GOVERNOR_UNLOCK_CONDITION_TYPE) {
        input = deserializeGovernorUnlockCondition(readStream);
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
    else if (object.type === STATE_CONTROLLER_UNLOCK_CONDITION_TYPE) {
        serializeStateControllerUnlockCondition(writeStream, object);
    }
    else if (object.type === GOVERNOR_UNLOCK_CONDITION_TYPE) {
        serializeGovernorUnlockCondition(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized unlock condition type ${object.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQ29uZGl0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvdW5sb2NrQ29uZGl0aW9ucy91bmxvY2tDb25kaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFDSCw2QkFBNkIsRUFFaEMsTUFBTSx1REFBdUQsQ0FBQztBQUMvRCxPQUFPLEVBQ0gseUNBQXlDLEVBRTVDLE1BQU0saUVBQWlFLENBQUM7QUFDekUsT0FBTyxFQUNILGdDQUFnQyxFQUVuQyxNQUFNLDBEQUEwRCxDQUFDO0FBQ2xFLE9BQU8sRUFDSCw4QkFBOEIsRUFFakMsTUFBTSx3REFBd0QsQ0FBQztBQUNoRSxPQUFPLEVBQzhCLHNDQUFzQyxFQUMxRSxNQUFNLCtEQUErRCxDQUFDO0FBQ3ZFLE9BQU8sRUFDdUIsOEJBQThCLEVBQzNELE1BQU0sd0RBQXdELENBQUM7QUFFaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsbUNBQW1DLEVBQ25DLCtCQUErQixFQUNsQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BELE9BQU8sRUFDSCwyQ0FBMkMsRUFDM0MsK0NBQStDLEVBQy9DLHlDQUF5QyxFQUM1QyxNQUFNLHNEQUFzRCxDQUFDO0FBQzlELE9BQU8sRUFDSCxvQ0FBb0MsRUFDcEMsc0NBQXNDLEVBQ3RDLGtDQUFrQyxFQUNyQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3ZELE9BQU8sRUFDSCxrQ0FBa0MsRUFDbEMsb0NBQW9DLEVBQ3BDLGdDQUFnQyxFQUNuQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JELE9BQU8sRUFDSCx5Q0FBeUMsRUFDekMsNENBQTRDLEVBQzVDLHVDQUF1QyxFQUMxQyxNQUFNLG9EQUFvRCxDQUFDO0FBQzVELE9BQU8sRUFDSCxrQ0FBa0MsRUFDbEMsb0NBQW9DLEVBQ3BDLGdDQUFnQyxFQUNuQyxNQUFNLDZDQUE2QyxD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
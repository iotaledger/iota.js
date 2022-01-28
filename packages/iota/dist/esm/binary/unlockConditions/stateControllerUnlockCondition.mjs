import { STATE_CONTROLLER_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerUnlockCondition.mjs";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses.mjs";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes.mjs";
/**
 * The minimum length of an state controller unlock condition binary representation.
 */
export const MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the state controller unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeStateControllerUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`State controller unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH}`);
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
export function serializeStateControllerUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("stateControllerUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}

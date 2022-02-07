import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition.mjs";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses.mjs";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes.mjs";
/**
 * The minimum length of an state controller address unlock condition binary representation.
 */
export const MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the state controller address unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeStateControllerAddressUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`State controller addres unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("stateControllerAddresUnlockCondition.type");
    if (type !== STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in stateControllerAddresUnlockCondition ${type}`);
    }
    const address = deserializeAddress(readStream);
    return {
        type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
        address
    };
}
/**
 * Serialize the state controller address unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeStateControllerAddressUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("stateControllerAddressUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}

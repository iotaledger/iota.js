import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition.mjs";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses.mjs";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes.mjs";
/**
 * The minimum length of an governor unlock condition binary representation.
 */
export const MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the governor address unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeGovernorAddressUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Governor unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("governorUnlockCondition.type");
    if (type !== GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in governorUnlockCondition ${type}`);
    }
    const address = deserializeAddress(readStream);
    return {
        type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
        address
    };
}
/**
 * Serialize the governor address unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeGovernorAddressUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("governorUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}

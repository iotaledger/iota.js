import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition.mjs";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses.mjs";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes.mjs";
/**
 * The minimum length of an address unlock condition binary representation.
 */
export const MIN_ADDRESS_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the address unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAddressUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_ADDRESS_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Address unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ADDRESS_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("addressUnlockCondition.type");
    if (type !== ADDRESS_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in addressUnlockCondition ${type}`);
    }
    const address = deserializeAddress(readStream);
    return {
        type: ADDRESS_UNLOCK_CONDITION_TYPE,
        address
    };
}
/**
 * Serialize the address unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeAddressUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("addressUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}

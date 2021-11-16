import { BLS_ADDRESS_TYPE } from "../../models/addresses/IBlsAddress.mjs";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes.mjs";
/**
 * The length of a BLS address.
 */
export const BLS_ADDRESS_LENGTH = 32;
/**
 * The minimum length of an bls address binary representation.
 */
export const MIN_BLS_ADDRESS_LENGTH = SMALL_TYPE_LENGTH + BLS_ADDRESS_LENGTH;
/**
 * Deserialize the bls address from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeBlsAddress(readStream) {
    if (!readStream.hasRemaining(MIN_BLS_ADDRESS_LENGTH)) {
        throw new Error(`BLS address data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_BLS_ADDRESS_LENGTH}`);
    }
    const type = readStream.readUInt8("blsAddress.type");
    if (type !== BLS_ADDRESS_TYPE) {
        throw new Error(`Type mismatch in blsAddress ${type}`);
    }
    const address = readStream.readFixedHex("blsAddress.address", BLS_ADDRESS_LENGTH);
    return {
        type: BLS_ADDRESS_TYPE,
        address
    };
}
/**
 * Serialize the bls address to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeBlsAddress(writeStream, object) {
    writeStream.writeUInt8("blsAddress.type", object.type);
    writeStream.writeFixedHex("blsAddress.address", BLS_ADDRESS_LENGTH, object.address);
}

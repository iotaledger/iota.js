import { SENDER_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/ISenderFeatureBlock.mjs";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses.mjs";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes.mjs";
/**
 * The minimum length of a sender feature block binary representation.
 */
export const MIN_SENDER_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the sender feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSenderFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_SENDER_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`Sender Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SENDER_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("senderFeatureBlock.type");
    if (type !== SENDER_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in senderFeatureBlock ${type}`);
    }
    const address = deserializeAddress(readStream);
    return {
        type: SENDER_FEATURE_BLOCK_TYPE,
        address
    };
}
/**
 * Serialize the sender feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSenderFeatureBlock(writeStream, object) {
    writeStream.writeByte("senderFeatureBlock.type", object.type);
    serializeAddress(writeStream, object.address);
}

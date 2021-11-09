import bigInt from "big-integer";
import { RETURN_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IReturnFeatureBlock.mjs";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of a return feature block binary representation.
 */
export const MIN_RETURN_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT64_SIZE;
/**
 * Deserialize the return feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeReturnFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_RETURN_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`Return Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_RETURN_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("returnFeatureBlock.type");
    if (type !== RETURN_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in returnFeatureBlock ${type}`);
    }
    const amount = readStream.readUInt64("returnFeatureBlock.amount");
    return {
        type: RETURN_FEATURE_BLOCK_TYPE,
        amount: Number(amount)
    };
}
/**
 * Serialize the return feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeReturnFeatureBlock(writeStream, object) {
    writeStream.writeByte("returnFeatureBlock.type", object.type);
    writeStream.writeUInt64("returnFeatureBlock.amount", bigInt(object.amount));
}

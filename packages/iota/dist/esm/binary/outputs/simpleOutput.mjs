import bigInt from "big-integer";
import { SIMPLE_OUTPUT_TYPE } from "../../models/outputs/ISimpleOutput.mjs";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses.mjs";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of a simple output binary representation.
 */
export const MIN_SIMPLE_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
    MIN_ADDRESS_LENGTH + // Address
    UINT64_SIZE; // Amount
/**
 * Deserialize the simple output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSimpleOutput(readStream) {
    if (!readStream.hasRemaining(MIN_SIMPLE_OUTPUT_LENGTH)) {
        throw new Error(`Simple Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIMPLE_OUTPUT_LENGTH}`);
    }
    const type = readStream.readUInt8("simpleOutput.type");
    if (type !== SIMPLE_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in simpleOutput ${type}`);
    }
    const address = deserializeAddress(readStream);
    const amount = readStream.readUInt64("simpleOutput.amount");
    return {
        type: SIMPLE_OUTPUT_TYPE,
        address,
        amount: Number(amount)
    };
}
/**
 * Serialize the simple output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSimpleOutput(writeStream, object) {
    writeStream.writeUInt8("simpleOutput.type", object.type);
    serializeAddress(writeStream, object.address);
    writeStream.writeUInt64("simpleOutput.amount", bigInt(object.amount));
}

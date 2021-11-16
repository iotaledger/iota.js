import bigInt from "big-integer";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput.mjs";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of a treasury output binary representation.
 */
export const MIN_TREASURY_OUTPUT_LENGTH = SMALL_TYPE_LENGTH + // Type
    UINT64_SIZE; // Amount
/**
 * Deserialize the treasury output from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTreasuryOutput(readStream) {
    if (!readStream.hasRemaining(MIN_TREASURY_OUTPUT_LENGTH)) {
        throw new Error(`Treasury Output data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TREASURY_OUTPUT_LENGTH}`);
    }
    const type = readStream.readUInt8("treasuryOutput.type");
    if (type !== TREASURY_OUTPUT_TYPE) {
        throw new Error(`Type mismatch in treasuryOutput ${type}`);
    }
    const amount = readStream.readUInt64("treasuryOutput.amount");
    return {
        type: TREASURY_OUTPUT_TYPE,
        amount: Number(amount)
    };
}
/**
 * Serialize the treasury output to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTreasuryOutput(writeStream, object) {
    writeStream.writeUInt8("treasuryOutput.type", object.type);
    writeStream.writeUInt64("treasuryOutput.amount", bigInt(object.amount));
}

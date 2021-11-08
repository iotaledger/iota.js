import { TREASURY_INPUT_TYPE } from "../../models/inputs/ITreasuryInput.mjs";
import { SMALL_TYPE_LENGTH, TRANSACTION_ID_LENGTH } from "../commonDataTypes.mjs";
/**
 * The minimum length of a treasury input binary representation.
 */
export const MIN_TREASURY_INPUT_LENGTH = SMALL_TYPE_LENGTH + TRANSACTION_ID_LENGTH;
/**
 * Deserialize the treasury input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTreasuryInput(readStream) {
    if (!readStream.hasRemaining(MIN_TREASURY_INPUT_LENGTH)) {
        throw new Error(`Treasury Input data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TREASURY_INPUT_LENGTH}`);
    }
    const type = readStream.readByte("treasuryInput.type");
    if (type !== TREASURY_INPUT_TYPE) {
        throw new Error(`Type mismatch in treasuryInput ${type}`);
    }
    const milestoneId = readStream.readFixedHex("treasuryInput.milestoneId", TRANSACTION_ID_LENGTH);
    return {
        type: TREASURY_INPUT_TYPE,
        milestoneId
    };
}
/**
 * Serialize the treasury input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTreasuryInput(writeStream, object) {
    writeStream.writeByte("treasuryInput.type", object.type);
    writeStream.writeFixedHex("treasuryInput.milestoneId", TRANSACTION_ID_LENGTH, object.milestoneId);
}

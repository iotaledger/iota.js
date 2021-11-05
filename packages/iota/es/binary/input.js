import { TREASURY_INPUT_TYPE } from "../models/inputs/ITreasuryInput";
import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { SMALL_TYPE_LENGTH, TRANSACTION_ID_LENGTH, UINT16_SIZE } from "./common";
/**
 * The minimum length of an input binary representation.
 */
export const MIN_INPUT_LENGTH = SMALL_TYPE_LENGTH;
/**
 * The minimum length of a utxo input binary representation.
 */
export const MIN_UTXO_INPUT_LENGTH = MIN_INPUT_LENGTH + TRANSACTION_ID_LENGTH + UINT16_SIZE;
/**
 * The minimum length of a treasury input binary representation.
 */
export const MIN_TREASURY_INPUT_LENGTH = MIN_INPUT_LENGTH + TRANSACTION_ID_LENGTH;
/**
 * The minimum number of inputs.
 */
export const MIN_INPUT_COUNT = 1;
/**
 * The maximum number of inputs.
 */
export const MAX_INPUT_COUNT = 127;
/**
 * Deserialize the inputs from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeInputs(readStream) {
    const numInputs = readStream.readUInt16("inputs.numInputs");
    const inputs = [];
    for (let i = 0; i < numInputs; i++) {
        inputs.push(deserializeInput(readStream));
    }
    return inputs;
}
/**
 * Serialize the inputs to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeInputs(writeStream, objects) {
    if (objects.length < MIN_INPUT_COUNT) {
        throw new Error(`The minimum number of inputs is ${MIN_INPUT_COUNT}, you have provided ${objects.length}`);
    }
    if (objects.length > MAX_INPUT_COUNT) {
        throw new Error(`The maximum number of inputs is ${MAX_INPUT_COUNT}, you have provided ${objects.length}`);
    }
    writeStream.writeUInt16("inputs.numInputs", objects.length);
    for (let i = 0; i < objects.length; i++) {
        serializeInput(writeStream, objects[i]);
    }
}
/**
 * Deserialize the input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeInput(readStream) {
    if (!readStream.hasRemaining(MIN_INPUT_LENGTH)) {
        throw new Error(`Input data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_INPUT_LENGTH}`);
    }
    const type = readStream.readByte("input.type", false);
    let input;
    if (type === UTXO_INPUT_TYPE) {
        input = deserializeUTXOInput(readStream);
    }
    else if (type === TREASURY_INPUT_TYPE) {
        input = deserializeTreasuryInput(readStream);
    }
    else {
        throw new Error(`Unrecognized input type ${type}`);
    }
    return input;
}
/**
 * Serialize the input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeInput(writeStream, object) {
    if (object.type === UTXO_INPUT_TYPE) {
        serializeUTXOInput(writeStream, object);
    }
    else if (object.type === TREASURY_INPUT_TYPE) {
        serializeTreasuryInput(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized input type ${object.type}`);
    }
}
/**
 * Deserialize the utxo input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUTXOInput(readStream) {
    if (!readStream.hasRemaining(MIN_UTXO_INPUT_LENGTH)) {
        throw new Error(`UTXO Input data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_UTXO_INPUT_LENGTH}`);
    }
    const type = readStream.readByte("utxoInput.type");
    if (type !== UTXO_INPUT_TYPE) {
        throw new Error(`Type mismatch in utxoInput ${type}`);
    }
    const transactionId = readStream.readFixedHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH);
    const transactionOutputIndex = readStream.readUInt16("utxoInput.transactionOutputIndex");
    return {
        type: UTXO_INPUT_TYPE,
        transactionId,
        transactionOutputIndex
    };
}
/**
 * Serialize the utxo input to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeUTXOInput(writeStream, object) {
    writeStream.writeByte("utxoInput.type", object.type);
    writeStream.writeFixedHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH, object.transactionId);
    writeStream.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluYXJ5L2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBa0IsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RixPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVqRjs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFXLGlCQUFpQixDQUFDO0FBRTFEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQVcsZ0JBQWdCLEdBQUcscUJBQXFCLEdBQUcsV0FBVyxDQUFDO0FBRXBHOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQVcsZ0JBQWdCLEdBQUcscUJBQXFCLENBQUM7QUFFMUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQVcsQ0FBQyxDQUFDO0FBRXpDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFXLEdBQUcsQ0FBQztBQUUzQzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLFVBQXNCO0lBQ3BELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU1RCxNQUFNLE1BQU0sR0FBaUIsRUFBRSxDQUFDO0lBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQzdDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUs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
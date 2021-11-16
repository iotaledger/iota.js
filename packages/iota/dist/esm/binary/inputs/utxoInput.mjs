import { UTXO_INPUT_TYPE } from "../../models/inputs/IUTXOInput.mjs";
import { SMALL_TYPE_LENGTH, TRANSACTION_ID_LENGTH, UINT16_SIZE } from "../commonDataTypes.mjs";
/**
 * The minimum length of a utxo input binary representation.
 */
export const MIN_UTXO_INPUT_LENGTH = SMALL_TYPE_LENGTH + TRANSACTION_ID_LENGTH + UINT16_SIZE;
/**
 * Deserialize the utxo input from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUTXOInput(readStream) {
    if (!readStream.hasRemaining(MIN_UTXO_INPUT_LENGTH)) {
        throw new Error(`UTXO Input data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_UTXO_INPUT_LENGTH}`);
    }
    const type = readStream.readUInt8("utxoInput.type");
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
    writeStream.writeUInt8("utxoInput.type", object.type);
    writeStream.writeFixedHex("utxoInput.transactionId", TRANSACTION_ID_LENGTH, object.transactionId);
    writeStream.writeUInt16("utxoInput.transactionOutputIndex", object.transactionOutputIndex);
}

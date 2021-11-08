import { UTXO_INPUT_TYPE } from "../../models/inputs/IUTXOInput";
import { SMALL_TYPE_LENGTH, TRANSACTION_ID_LENGTH, UINT16_SIZE } from "../commonDataTypes";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXR4b0lucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9pbnB1dHMvdXR4b0lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFM0Y7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBVyxpQkFBaUIsR0FBRyxxQkFBcUIsR0FBRyxXQUFXLENBQUM7QUFFckc7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxVQUFzQjtJQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1FBQ2pELE1BQU0sSUFBSSxLQUFLLENBQ1gsc0JBQXNCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLHFCQUFxQixFQUFFLENBQ25JLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNuRCxJQUFJLElBQUksS0FBSyxlQUFlLEVBQUU7UUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN6RDtJQUVELE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMseUJBQXlCLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUNoRyxNQUFNLHNCQUFzQixHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUV6RixPQUFPO1FBQ0gsSUFBSSxFQUFFLGVBQWU7UUFDckIsYUFBYTtRQUNiLHNCQUFzQjtLQUN6QixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsV0FBd0IsRUFBRSxNQUFrQjtJQUMzRSxXQUFXLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRCxXQUFXLENBQUMsYUFBYSxDQUFDLHlCQUF5QixFQUFFLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRyxXQUFXLENBQUMsV0FBVyxDQUFDLGtDQUFrQyxFQUFFLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQy9GLENBQUMifQ==
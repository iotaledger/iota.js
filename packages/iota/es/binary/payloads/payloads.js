import { MILESTONE_PAYLOAD_TYPE } from "../../models/payloads/IMilestonePayload";
import { RECEIPT_PAYLOAD_TYPE } from "../../models/payloads/IReceiptPayload";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../../models/payloads/ITaggedDataPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITransactionPayload";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITreasuryTransactionPayload";
import { UINT32_SIZE } from "../commonDataTypes";
import { deserializeMilestonePayload, MIN_MILESTONE_PAYLOAD_LENGTH, serializeMilestonePayload } from "./milestonePayload";
import { deserializeReceiptPayload, MIN_RECEIPT_PAYLOAD_LENGTH, serializeReceiptPayload } from "./receiptPayload";
import { deserializeTaggedDataPayload, MIN_TAGGED_DATA_PAYLOAD_LENGTH, serializeTaggedDataPayload } from "./taggedDataPayload";
import { deserializeTransactionPayload, MIN_TRANSACTION_PAYLOAD_LENGTH, serializeTransactionPayload } from "./transactionPayload";
import { deserializeTreasuryTransactionPayload, MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH, serializeTreasuryTransactionPayload } from "./treasuryTransactionPayload";
/**
 * The minimum length of a payload binary representation.
 */
export const MIN_PAYLOAD_LENGTH = Math.min(MIN_TRANSACTION_PAYLOAD_LENGTH, MIN_MILESTONE_PAYLOAD_LENGTH, MIN_TAGGED_DATA_PAYLOAD_LENGTH, MIN_RECEIPT_PAYLOAD_LENGTH, MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH);
/**
 * Deserialize the payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializePayload(readStream) {
    const payloadLength = readStream.readUInt32("payload.length");
    if (!readStream.hasRemaining(payloadLength)) {
        throw new Error(`Payload length ${payloadLength} exceeds the remaining data ${readStream.unused()}`);
    }
    let payload;
    if (payloadLength > 0) {
        const payloadType = readStream.readUInt32("payload.type", false);
        if (payloadType === TRANSACTION_PAYLOAD_TYPE) {
            payload = deserializeTransactionPayload(readStream);
        }
        else if (payloadType === MILESTONE_PAYLOAD_TYPE) {
            payload = deserializeMilestonePayload(readStream);
        }
        else if (payloadType === RECEIPT_PAYLOAD_TYPE) {
            payload = deserializeReceiptPayload(readStream);
        }
        else if (payloadType === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            payload = deserializeTreasuryTransactionPayload(readStream);
        }
        else if (payloadType === TAGGED_DATA_PAYLOAD_TYPE) {
            payload = deserializeTaggedDataPayload(readStream);
        }
        else {
            throw new Error(`Unrecognized payload type ${payloadType}`);
        }
    }
    return payload;
}
/**
 * Serialize the payload essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializePayload(writeStream, object) {
    // Store the location for the payload length and write 0
    // we will rewind and fill in once the size of the payload is known
    const payloadLengthWriteIndex = writeStream.getWriteIndex();
    writeStream.writeUInt32("payload.length", 0);
    if (!object) {
        // No other data to write
    }
    else if (object.type === TRANSACTION_PAYLOAD_TYPE) {
        serializeTransactionPayload(writeStream, object);
    }
    else if (object.type === MILESTONE_PAYLOAD_TYPE) {
        serializeMilestonePayload(writeStream, object);
    }
    else if (object.type === RECEIPT_PAYLOAD_TYPE) {
        serializeReceiptPayload(writeStream, object);
    }
    else if (object.type === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        serializeTreasuryTransactionPayload(writeStream, object);
    }
    else if (object.type === TAGGED_DATA_PAYLOAD_TYPE) {
        serializeTaggedDataPayload(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized transaction type ${object.type}`);
    }
    const endOfPayloadWriteIndex = writeStream.getWriteIndex();
    writeStream.setWriteIndex(payloadLengthWriteIndex);
    writeStream.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - UINT32_SIZE);
    writeStream.setWriteIndex(endOfPayloadWriteIndex);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bG9hZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3BheWxvYWRzL3BheWxvYWRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXRHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsMkJBQTJCLEVBQzNCLDRCQUE0QixFQUM1Qix5QkFBeUIsRUFDNUIsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsMEJBQTBCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsSCxPQUFPLEVBQ0gsNEJBQTRCLEVBQzVCLDhCQUE4QixFQUM5QiwwQkFBMEIsRUFDN0IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQ0gsNkJBQTZCLEVBQzdCLDhCQUE4QixFQUM5QiwyQkFBMkIsRUFDOUIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQ0gscUNBQXFDLEVBQ3JDLHVDQUF1QyxFQUN2QyxtQ0FBbUMsRUFDdEMsTUFBTSw4QkFBOEIsQ0FBQztBQUV0Qzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFXLElBQUksQ0FBQyxHQUFHLENBQzlDLDhCQUE4QixFQUM5Qiw0QkFBNEIsRUFDNUIsOEJBQThCLEVBQzlCLDBCQUEwQixFQUMxQix1Q0FBdUMsQ0FDMUMsQ0FBQztBQUVGOzs7O0dBSUc7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
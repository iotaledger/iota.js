import { INDEXATION_PAYLOAD_TYPE } from "../../models/payloads/IIndexationPayload";
import { MILESTONE_PAYLOAD_TYPE } from "../../models/payloads/IMilestonePayload";
import { RECEIPT_PAYLOAD_TYPE } from "../../models/payloads/IReceiptPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITransactionPayload";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITreasuryTransactionPayload";
import { UINT32_SIZE } from "../commonDataTypes";
import { deserializeIndexationPayload, MIN_INDEXATION_PAYLOAD_LENGTH, serializeIndexationPayload } from "./indexationPayload";
import { deserializeMilestonePayload, MIN_MILESTONE_PAYLOAD_LENGTH, serializeMilestonePayload } from "./milestonePayload";
import { deserializeReceiptPayload, MIN_RECEIPT_PAYLOAD_LENGTH, serializeReceiptPayload } from "./receiptPayload";
import { deserializeTransactionPayload, MIN_TRANSACTION_PAYLOAD_LENGTH, serializeTransactionPayload } from "./transactionPayload";
import { deserializeTreasuryTransactionPayload, MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH, serializeTreasuryTransactionPayload } from "./treasuryTransactionPayload";
/**
 * The minimum length of a payload binary representation.
 */
export const MIN_PAYLOAD_LENGTH = Math.min(MIN_TRANSACTION_PAYLOAD_LENGTH, MIN_MILESTONE_PAYLOAD_LENGTH, MIN_INDEXATION_PAYLOAD_LENGTH, MIN_RECEIPT_PAYLOAD_LENGTH, MIN_TREASURY_TRANSACTION_PAYLOAD_LENGTH);
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
        else if (payloadType === INDEXATION_PAYLOAD_TYPE) {
            payload = deserializeIndexationPayload(readStream);
        }
        else if (payloadType === RECEIPT_PAYLOAD_TYPE) {
            payload = deserializeReceiptPayload(readStream);
        }
        else if (payloadType === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            payload = deserializeTreasuryTransactionPayload(readStream);
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
    else if (object.type === INDEXATION_PAYLOAD_TYPE) {
        serializeIndexationPayload(writeStream, object);
    }
    else if (object.type === RECEIPT_PAYLOAD_TYPE) {
        serializeReceiptPayload(writeStream, object);
    }
    else if (object.type === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        serializeTreasuryTransactionPayload(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized transaction type ${object.type}`);
    }
    const endOfPayloadWriteIndex = writeStream.getWriteIndex();
    writeStream.setWriteIndex(payloadLengthWriteIndex);
    writeStream.writeUInt32("payload.length", endOfPayloadWriteIndex - payloadLengthWriteIndex - UINT32_SIZE);
    writeStream.setWriteIndex(endOfPayloadWriteIndex);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bG9hZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3BheWxvYWRzL3BheWxvYWRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBRXRHLE9BQU8sRUFDSCxXQUFXLEVBQ2QsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsNkJBQTZCLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5SCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsNEJBQTRCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMxSCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsMEJBQTBCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsOEJBQThCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsSSxPQUFPLEVBQUUscUNBQXFDLEVBQUUsdUNBQXVDLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVuSzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUMzQixJQUFJLENBQUMsR0FBRyxDQUNKLDhCQUE4QixFQUM5Qiw0QkFBNEIsRUFDNUIsNkJBQTZCLEVBQzdCLDBCQUEwQixFQUMxQix1Q0FBdUMsQ0FDMUMsQ0FBQztBQUVOOzs7O0dBSUc7QUFDSCxNQUFNLFVB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
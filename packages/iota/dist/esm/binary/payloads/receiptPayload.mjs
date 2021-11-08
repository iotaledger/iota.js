import { RECEIPT_PAYLOAD_TYPE } from "../../models/payloads/IReceiptPayload.mjs";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITreasuryTransactionPayload.mjs";
import { TYPE_LENGTH, UINT16_SIZE, UINT32_SIZE } from "../commonDataTypes.mjs";
import { deserializeFunds, MIN_MIGRATED_FUNDS_LENGTH, serializeFunds } from "../funds.mjs";
import { deserializePayload, serializePayload } from "./payloads.mjs";
/**
 * The minimum length of a receipt payload binary representation.
 */
export const MIN_RECEIPT_PAYLOAD_LENGTH = TYPE_LENGTH +
    UINT32_SIZE + // migratedAt
    UINT16_SIZE + // numFunds
    MIN_MIGRATED_FUNDS_LENGTH; // 1 Fund
/**
 * Deserialize the receipt payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeReceiptPayload(readStream) {
    if (!readStream.hasRemaining(MIN_RECEIPT_PAYLOAD_LENGTH)) {
        throw new Error(`Receipt Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_RECEIPT_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadReceipt.type");
    if (type !== RECEIPT_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadReceipt ${type}`);
    }
    const migratedAt = readStream.readUInt32("payloadReceipt.migratedAt");
    const final = readStream.readBoolean("payloadReceipt.final");
    const funds = deserializeFunds(readStream);
    const treasuryTransactionPayload = deserializePayload(readStream);
    if (!treasuryTransactionPayload || treasuryTransactionPayload.type !== TREASURY_TRANSACTION_PAYLOAD_TYPE) {
        throw new Error(`payloadReceipts can only contain treasury payloads ${type}`);
    }
    return {
        type: RECEIPT_PAYLOAD_TYPE,
        migratedAt,
        final,
        funds,
        transaction: treasuryTransactionPayload
    };
}
/**
 * Serialize the receipt payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeReceiptPayload(writeStream, object) {
    writeStream.writeUInt32("payloadReceipt.type", object.type);
    writeStream.writeUInt32("payloadReceipt.migratedAt", object.migratedAt);
    writeStream.writeBoolean("payloadReceipt.final", object.final);
    serializeFunds(writeStream, object.funds);
    serializePayload(writeStream, object.transaction);
}

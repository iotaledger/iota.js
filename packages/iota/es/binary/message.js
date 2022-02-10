import bigInt from "big-integer";
import { DEFAULT_PROTOCOL_VERSION } from "../models/IMessage";
import { MILESTONE_PAYLOAD_TYPE } from "../models/payloads/IMilestonePayload";
import { RECEIPT_PAYLOAD_TYPE } from "../models/payloads/IReceiptPayload";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITreasuryTransactionPayload";
import { MESSAGE_ID_LENGTH, UINT64_SIZE, UINT8_SIZE } from "./commonDataTypes";
import { deserializePayload, MIN_PAYLOAD_LENGTH, serializePayload } from "./payloads/payloads";
/**
 * The minimum length of a message binary representation.
 */
const MIN_MESSAGE_LENGTH = UINT8_SIZE + // Protocol Version
    UINT8_SIZE + // Parent count
    MESSAGE_ID_LENGTH + // Single parent
    MIN_PAYLOAD_LENGTH + // Min payload length
    UINT64_SIZE; // Nonce
/**
 * The maximum length of a message.
 */
export const MAX_MESSAGE_LENGTH = 32768;
/**
 * The maximum number of parents.
 */
export const MAX_NUMBER_PARENTS = 8;
/**
 * The minimum number of parents.
 */
export const MIN_NUMBER_PARENTS = 1;
/**
 * Deserialize the message from binary.
 * @param readStream The message to deserialize.
 * @returns The deserialized message.
 */
export function deserializeMessage(readStream) {
    if (!readStream.hasRemaining(MIN_MESSAGE_LENGTH)) {
        throw new Error(`Message data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_MESSAGE_LENGTH}`);
    }
    const protocolVersion = readStream.readUInt8("message.protocolVersion");
    const numParents = readStream.readUInt8("message.numParents");
    const parents = [];
    for (let i = 0; i < numParents; i++) {
        const parentMessageId = readStream.readFixedHex(`message.parentMessageId${i}`, MESSAGE_ID_LENGTH);
        parents.push(parentMessageId);
    }
    const payload = deserializePayload(readStream);
    if (payload && (payload.type === RECEIPT_PAYLOAD_TYPE || payload.type === TREASURY_TRANSACTION_PAYLOAD_TYPE)) {
        throw new Error("Messages can not contain receipt or treasury transaction payloads");
    }
    const nonce = readStream.readUInt64("message.nonce");
    const unused = readStream.unused();
    if (unused !== 0) {
        throw new Error(`Message data length ${readStream.length()} has unused data ${unused}`);
    }
    return {
        protocolVersion,
        parentMessageIds: parents,
        payload,
        nonce: nonce.toString(10)
    };
}
/**
 * Serialize the message essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeMessage(writeStream, object) {
    var _a, _b, _c, _d;
    writeStream.writeUInt8("message.protocolVersion", (_a = object.protocolVersion) !== null && _a !== void 0 ? _a : DEFAULT_PROTOCOL_VERSION);
    const numParents = (_c = (_b = object.parentMessageIds) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
    writeStream.writeUInt8("message.numParents", numParents);
    if (object.parentMessageIds) {
        if (numParents > MAX_NUMBER_PARENTS) {
            throw new Error(`A maximum of ${MAX_NUMBER_PARENTS} parents is allowed, you provided ${numParents}`);
        }
        if (new Set(object.parentMessageIds).size !== numParents) {
            throw new Error("The message parents must be unique");
        }
        const sorted = object.parentMessageIds.slice().sort();
        for (let i = 0; i < numParents; i++) {
            if (sorted[i] !== object.parentMessageIds[i]) {
                throw new Error("The message parents must be lexographically sorted");
            }
            writeStream.writeFixedHex(`message.parentMessageId${i + 1}`, MESSAGE_ID_LENGTH, object.parentMessageIds[i]);
        }
    }
    if (object.payload &&
        object.payload.type !== TRANSACTION_PAYLOAD_TYPE &&
        object.payload.type !== MILESTONE_PAYLOAD_TYPE &&
        object.payload.type !== TAGGED_DATA_PAYLOAD_TYPE) {
        throw new Error("Messages can only contain transaction, milestone or tagged data payloads");
    }
    serializePayload(writeStream, object.payload);
    writeStream.writeUInt64("message.nonce", bigInt((_d = object.nonce) !== null && _d !== void 0 ? _d : "0"));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUFFLHdCQUF3QixFQUFZLE1BQU0sb0JBQW9CLENBQUM7QUFDeEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDakYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDbkcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUvRjs7R0FFRztBQUNILE1BQU0sa0JBQWtCLEdBQ3BCLFVBQVUsR0FBRyxtQkFBbUI7SUFDaEMsVUFBVSxHQUFHLGVBQWU7SUFDNUIsaUJBQWlCLEdBQUcsZ0JBQWdCO0lBQ3BDLGtCQUFrQixHQUFHLHFCQUFxQjtJQUMxQyxXQUFXLENBQUMsQ0FBQyxRQUFRO0FBRXpCOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQVcsS0FBSyxDQUFDO0FBRWhEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQVcsQ0FBQyxDQUFDO0FBRTVDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQVcsQ0FBQyxDQUFDO0FBRTVDOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMs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
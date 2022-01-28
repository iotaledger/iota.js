import bigInt from "big-integer";
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
const MIN_MESSAGE_LENGTH = UINT64_SIZE + // Network id
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
    const networkId = readStream.readUInt64("message.networkId");
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
        networkId: networkId.toString(10),
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
    writeStream.writeUInt64("message.networkId", bigInt((_a = object.networkId) !== null && _a !== void 0 ? _a : "0"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFFakMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDakYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDbkcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUvRjs7R0FFRztBQUNILE1BQU0sa0JBQWtCLEdBQ3BCLFdBQVcsR0FBRyxhQUFhO0lBQzNCLFVBQVUsR0FBRyxlQUFlO0lBQzVCLGlCQUFpQixHQUFHLGdCQUFnQjtJQUNwQyxrQkFBa0IsR0FBRyxxQkFBcUI7SUFDMUMsV0FBVyxDQUFDLENBQUMsUUFBUTtBQUV6Qjs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFXLEtBQUssQ0FBQztBQUVoRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFXLENBQUMsQ0FBQztBQUU1Qzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFXLENBQUMsQ0FBQztBQUU1Qzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFVBQXNCO0lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGtCQUFr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
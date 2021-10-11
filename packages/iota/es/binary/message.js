import bigInt from "big-integer";
import { INDEXATION_PAYLOAD_TYPE } from "../models/IIndexationPayload";
import { MILESTONE_PAYLOAD_TYPE } from "../models/IMilestonePayload";
import { RECEIPT_PAYLOAD_TYPE } from "../models/IReceiptPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/ITransactionPayload";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../models/ITreasuryTransactionPayload";
import { BYTE_SIZE, MESSAGE_ID_LENGTH, UINT64_SIZE } from "./common";
import { deserializePayload, MIN_PAYLOAD_LENGTH, serializePayload } from "./payload";
/**
 * The minimum length of a message binary representation.
 */
const MIN_MESSAGE_LENGTH = UINT64_SIZE + // Network id
    BYTE_SIZE + // Parent count
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
    const numParents = readStream.readByte("message.numParents");
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
    writeStream.writeByte("message.numParents", numParents);
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
        object.payload.type !== INDEXATION_PAYLOAD_TYPE &&
        object.payload.type !== MILESTONE_PAYLOAD_TYPE) {
        throw new Error("Messages can only contain transaction, indexation or milestone payloads");
    }
    serializePayload(writeStream, object.payload);
    writeStream.writeUInt64("message.nonce", bigInt((_d = object.nonce) !== null && _d !== void 0 ? _d : "0"));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDMUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXJGOztHQUVHO0FBQ0gsTUFBTSxrQkFBa0IsR0FDcEIsV0FBVyxHQUFHLGFBQWE7SUFDM0IsU0FBUyxHQUFHLGVBQWU7SUFDM0IsaUJBQWlCLEdBQUcsZ0JBQWdCO0lBQ3BDLGtCQUFrQixHQUFHLHFCQUFxQjtJQUMxQyxXQUFXLENBQUMsQ0FBQyxRQUFRO0FBRXpCOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQVcsS0FBSyxDQUFDO0FBRWhEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQVcsQ0FBQyxDQUFDO0FBRTVDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQVcsQ0FBQyxDQUFDO0FBRTVDOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsVUFBc0I7SUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUM5QyxNQUFNLElBQUksS0FBSyxDQUNYLG1CQUFtQixVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSxrQkFBa0IsRUFBRSxDQUM3SCxDQUFDO0tBQ0w7SUFFRCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFN0QsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzdELE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztJQUU3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2pDLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsRUFBRSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDbEcsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNqQztJQUVELE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxvQkFBb0IsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLGlDQUFpQyxDQUFDLEVBQUU7UUFDMUcsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO0tBQ3hGO0lBRUQsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUVyRCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkMsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUMzRjtJQUVELE9BQU87UUFDSCxTQUFTLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDakMsZ0JBQWdCLEVBQUUsT0FBTztRQUN6QixPQUFPO1FBQ1AsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0tBQzVCLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxXQUF3QixFQUFFLE1BQWdCOztJQUN2RSxXQUFXLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxNQUFBLE1BQU0sQ0FBQyxTQUFTLG1DQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFOUUsTUFBTSxVQUFVLEdBQUcsTUFBQSxNQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsMENBQUUsTUFBTSxtQ0FBSSxDQUFDLENBQUM7SUFDeEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUV4RCxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QixJQUFJLFVBQVUsR0FBRyxrQkFBa0IsRUFBRTtZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixrQkFBa0IscUNBQXFDLFVBQVUsRUFBRSxDQUFDLENBQUM7U0FDeEc7UUFDRCxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7WUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7YUFDekU7WUFDRCxXQUFXLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0c7S0FDSjtJQUVELElBQ0ksTUFBTSxDQUFDLE9BQU87UUFDZCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyx3QkFBd0I7UUFDaEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssdUJBQXVCO1FBQy9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLHNCQUFzQixFQUNoRDtRQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMseUVBQXlFLENBQUMsQ0FBQztLQUM5RjtJQUVELGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLE1BQUEsTUFBTSxDQUFDLEtBQUssbUNBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFDIn0=
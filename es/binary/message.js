"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeMessage = exports.deserializeMessage = void 0;
var common_1 = require("./common");
var payload_1 = require("./payload");
var MIN_MESSAGE_LENGTH = common_1.UINT64_SIZE +
    (2 * common_1.MESSAGE_ID_LENGTH) +
    payload_1.MIN_PAYLOAD_LENGTH +
    common_1.UINT64_SIZE;
var EMPTY_MESSAGE_ID_HEX = "0".repeat(common_1.MESSAGE_ID_LENGTH * 2);
/**
 * Deserialize the message from binary.
 * @param readStream The message to deserialize.
 * @returns The deserialized message.
 */
function deserializeMessage(readStream) {
    if (!readStream.hasRemaining(MIN_MESSAGE_LENGTH)) {
        throw new Error("Message data is " + readStream.length() + " in length which is less than the minimimum size required of " + MIN_MESSAGE_LENGTH);
    }
    var networkId = readStream.readUInt64("message.networkId");
    var parent1MessageId = readStream.readFixedHex("message.parent1MessageId", common_1.MESSAGE_ID_LENGTH);
    var parent2MessageId = readStream.readFixedHex("message.parent2MessageId", common_1.MESSAGE_ID_LENGTH);
    var payload = payload_1.deserializePayload(readStream);
    var nonce = readStream.readUInt64("message.nonce");
    var unused = readStream.unused();
    if (unused !== 0) {
        throw new Error("Message data length " + readStream.length() + " has unused data " + unused);
    }
    return {
        networkId: networkId.toString(10),
        payload: payload,
        parent1MessageId: parent1MessageId,
        parent2MessageId: parent2MessageId,
        nonce: nonce.toString(10)
    };
}
exports.deserializeMessage = deserializeMessage;
/**
 * Serialize the message essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeMessage(writeStream, object) {
    var _a, _b, _c, _d;
    writeStream.writeUInt64("message.networkId", BigInt((_a = object.networkId) !== null && _a !== void 0 ? _a : 0));
    writeStream.writeFixedHex("message.parent1MessageId", common_1.MESSAGE_ID_LENGTH, (_b = object.parent1MessageId) !== null && _b !== void 0 ? _b : EMPTY_MESSAGE_ID_HEX);
    writeStream.writeFixedHex("message.parent2MessageId", common_1.MESSAGE_ID_LENGTH, (_c = object.parent2MessageId) !== null && _c !== void 0 ? _c : EMPTY_MESSAGE_ID_HEX);
    payload_1.serializePayload(writeStream, object.payload);
    writeStream.writeUInt64("message.nonce", BigInt((_d = object.nonce) !== null && _d !== void 0 ? _d : 0));
}
exports.serializeMessage = serializeMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxtQ0FBMEQ7QUFDMUQscUNBQXFGO0FBRXJGLElBQU0sa0JBQWtCLEdBQVcsb0JBQVc7SUFDMUMsQ0FBQyxDQUFDLEdBQUcsMEJBQWlCLENBQUM7SUFDdkIsNEJBQWtCO0lBQ2xCLG9CQUFXLENBQUM7QUFFaEIsSUFBTSxvQkFBb0IsR0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLDBCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRXZFOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxVQUFzQjtJQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQW1CLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ2Msa0JBQW9CLENBQUMsQ0FBQztLQUM3RjtJQUVELElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUU3RCxJQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsMEJBQTBCLEVBQUUsMEJBQWlCLENBQUMsQ0FBQztJQUNoRyxJQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsMEJBQTBCLEVBQUUsMEJBQWlCLENBQUMsQ0FBQztJQUVoRyxJQUFNLE9BQU8sR0FBRyw0QkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXJELElBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuQyxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF1QixVQUFVLENBQUMsTUFBTSxFQUFFLHlCQUFvQixNQUFRLENBQUMsQ0FBQztLQUMzRjtJQUVELE9BQU87UUFDSCxTQUFTLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDakMsT0FBTyxTQUFBO1FBQ1AsZ0JBQWdCLGtCQUFBO1FBQ2hCLGdCQUFnQixrQkFBQTtRQUNoQixLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7S0FDNUIsQ0FBQztBQUNOLENBQUM7QUEzQkQsZ0RBMkJDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFdBQXdCLEVBQUUsTUFBZ0I7O0lBQ3ZFLFdBQVcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxPQUFDLE1BQU0sQ0FBQyxTQUFTLG1DQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUUsV0FBVyxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsRUFDaEQsMEJBQWlCLFFBQUUsTUFBTSxDQUFDLGdCQUFnQixtQ0FBSSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3hFLFdBQVcsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQ2hELDBCQUFpQixRQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsbUNBQUksb0JBQW9CLENBQUMsQ0FBQztJQUV4RSwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlDLFdBQVcsQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLE1BQU0sT0FBQyxNQUFNLENBQUMsS0FBSyxtQ0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLENBQUM7QUFYRCw0Q0FXQyJ9
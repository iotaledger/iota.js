"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeMessage = exports.deserializeMessage = exports.MAX_MESSAGE_LENGTH = void 0;
var common_1 = require("./common");
var payload_1 = require("./payload");
var MIN_MESSAGE_LENGTH = common_1.UINT64_SIZE +
    (2 * common_1.MESSAGE_ID_LENGTH) +
    payload_1.MIN_PAYLOAD_LENGTH +
    common_1.UINT64_SIZE;
var EMPTY_MESSAGE_ID_HEX = "0".repeat(common_1.MESSAGE_ID_LENGTH * 2);
/**
 * The maximum length of a message.
 */
exports.MAX_MESSAGE_LENGTH = 32768;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxtQ0FBMEQ7QUFDMUQscUNBQXFGO0FBRXJGLElBQU0sa0JBQWtCLEdBQVcsb0JBQVc7SUFDMUMsQ0FBQyxDQUFDLEdBQUcsMEJBQWlCLENBQUM7SUFDdkIsNEJBQWtCO0lBQ2xCLG9CQUFXLENBQUM7QUFFaEIsSUFBTSxvQkFBb0IsR0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLDBCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRXZFOztHQUVHO0FBQ1UsUUFBQSxrQkFBa0IsR0FBVyxLQUFLLENBQUM7QUFFaEQ7Ozs7R0FJRztBQUNILFNBQWdCLGtCQUFrQixDQUFDLFVBQXNCO0lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBbUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxxRUFDYyxrQkFBb0IsQ0FBQyxDQUFDO0tBQzdGO0lBRUQsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRTdELElBQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQywwQkFBMEIsRUFBRSwwQkFBaUIsQ0FBQyxDQUFDO0lBQ2hHLElBQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQywwQkFBMEIsRUFBRSwwQkFBaUIsQ0FBQyxDQUFDO0lBRWhHLElBQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFckQsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25DLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXVCLFVBQVUsQ0FBQyxNQUFNLEVBQUUseUJBQW9CLE1BQVEsQ0FBQyxDQUFDO0tBQzNGO0lBRUQsT0FBTztRQUNILFNBQVMsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxPQUFPLFNBQUE7UUFDUCxnQkFBZ0Isa0JBQUE7UUFDaEIsZ0JBQWdCLGtCQUFBO1FBQ2hCLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztLQUM1QixDQUFDO0FBQ04sQ0FBQztBQTNCRCxnREEyQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsV0FBd0IsRUFBRSxNQUFnQjs7SUFDdkUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLE9BQUMsTUFBTSxDQUFDLFNBQVMsbUNBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU1RSxXQUFXLENBQUMsYUFBYSxDQUFDLDBCQUEwQixFQUNoRCwwQkFBaUIsUUFBRSxNQUFNLENBQUMsZ0JBQWdCLG1DQUFJLG9CQUFvQixDQUFDLENBQUM7SUFDeEUsV0FBVyxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsRUFDaEQsMEJBQWlCLFFBQUUsTUFBTSxDQUFDLGdCQUFnQixtQ0FBSSxvQkFBb0IsQ0FBQyxDQUFDO0lBRXhFLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsTUFBTSxPQUFDLE1BQU0sQ0FBQyxLQUFLLG1DQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQVhELDRDQVdDIn0=
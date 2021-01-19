"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeMessage = exports.deserializeMessage = exports.MAX_MESSAGE_LENGTH = void 0;
var common_1 = require("./common");
var payload_1 = require("./payload");
/**
 * The minimum length of a message binary representation.
 */
var MIN_MESSAGE_LENGTH = common_1.UINT64_SIZE +
    common_1.BYTE_SIZE +
    (2 * common_1.MESSAGE_ID_LENGTH) +
    payload_1.MIN_PAYLOAD_LENGTH +
    common_1.UINT64_SIZE;
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
    var numParents = readStream.readByte("message.numParents");
    var parents = [];
    for (var i = 0; i < numParents; i++) {
        var parentMessageId = readStream.readFixedHex("message.parentMessageId", common_1.MESSAGE_ID_LENGTH);
        parents.push(parentMessageId);
    }
    var payload = payload_1.deserializePayload(readStream);
    var nonce = readStream.readUInt64("message.nonce");
    var unused = readStream.unused();
    if (unused !== 0) {
        throw new Error("Message data length " + readStream.length() + " has unused data " + unused);
    }
    return {
        networkId: networkId.toString(10),
        parents: parents,
        payload: payload,
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
    var numParents = (_c = (_b = object.parents) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
    writeStream.writeByte("message.numParents", numParents);
    if (object.parents) {
        for (var i = 0; i < numParents; i++) {
            writeStream.writeFixedHex("message.parentMessageId" + (i + 1), common_1.MESSAGE_ID_LENGTH, object.parents[i]);
        }
    }
    payload_1.serializePayload(writeStream, object.payload);
    writeStream.writeUInt64("message.nonce", BigInt((_d = object.nonce) !== null && _d !== void 0 ? _d : 0));
}
exports.serializeMessage = serializeMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxtQ0FBcUU7QUFDckUscUNBQXFGO0FBRXJGOztHQUVHO0FBQ0gsSUFBTSxrQkFBa0IsR0FBVyxvQkFBVztJQUMxQyxrQkFBUztJQUNULENBQUMsQ0FBQyxHQUFHLDBCQUFpQixDQUFDO0lBQ3ZCLDRCQUFrQjtJQUNsQixvQkFBVyxDQUFDO0FBRWhCOztHQUVHO0FBQ1UsUUFBQSxrQkFBa0IsR0FBVyxLQUFLLENBQUM7QUFFaEQ7Ozs7R0FJRztBQUNILFNBQWdCLGtCQUFrQixDQUFDLFVBQXNCO0lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBbUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxxRUFDYyxrQkFBb0IsQ0FBQyxDQUFDO0tBQzdGO0lBRUQsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRTdELElBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM3RCxJQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7SUFFN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxJQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLHlCQUF5QixFQUFFLDBCQUFpQixDQUFDLENBQUM7UUFDOUYsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNqQztJQUVELElBQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFckQsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25DLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXVCLFVBQVUsQ0FBQyxNQUFNLEVBQUUseUJBQW9CLE1BQVEsQ0FBQyxDQUFDO0tBQzNGO0lBRUQsT0FBTztRQUNILFNBQVMsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxPQUFPLFNBQUE7UUFDUCxPQUFPLFNBQUE7UUFDUCxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7S0FDNUIsQ0FBQztBQUNOLENBQUM7QUEvQkQsZ0RBK0JDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFdBQXdCLEVBQUUsTUFBZ0I7O0lBQ3ZFLFdBQVcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxPQUFDLE1BQU0sQ0FBQyxTQUFTLG1DQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUUsSUFBTSxVQUFVLGVBQUcsTUFBTSxDQUFDLE9BQU8sMENBQUUsTUFBTSxtQ0FBSSxDQUFDLENBQUM7SUFDL0MsV0FBVyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUV4RCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7UUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxXQUFXLENBQUMsYUFBYSxDQUFDLDZCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFFLEVBQ3ZELDBCQUFpQixFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QztLQUNKO0lBRUQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU5QyxXQUFXLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxNQUFNLE9BQUMsTUFBTSxDQUFDLEtBQUssbUNBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBaEJELDRDQWdCQyJ9
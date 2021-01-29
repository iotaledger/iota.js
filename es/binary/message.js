"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeMessage = exports.deserializeMessage = exports.MIN_NUMBER_PARENTS = exports.MAX_NUMBER_PARENTS = exports.MAX_MESSAGE_LENGTH = void 0;
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
 * The maximum number of parents.
 */
exports.MAX_NUMBER_PARENTS = 8;
/**
 * The minimum number of parents.
 */
exports.MIN_NUMBER_PARENTS = 1;
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
        var parentMessageId = readStream.readFixedHex("message.parentMessageId" + i, common_1.MESSAGE_ID_LENGTH);
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
        if (numParents > exports.MAX_NUMBER_PARENTS) {
            throw new Error("A maximum of " + exports.MAX_NUMBER_PARENTS + " parents is allowed, you provided " + numParents);
        }
        if ((new Set(object.parents)).size !== numParents) {
            throw new Error("The message parents must be unique");
        }
        var sorted = object.parents.slice().sort();
        for (var i = 0; i < numParents; i++) {
            if (sorted[i] !== object.parents[i]) {
                throw new Error("The message parents must be lexographically sorted");
            }
            writeStream.writeFixedHex("message.parentMessageId" + (i + 1), common_1.MESSAGE_ID_LENGTH, object.parents[i]);
        }
    }
    payload_1.serializePayload(writeStream, object.payload);
    writeStream.writeUInt64("message.nonce", BigInt((_d = object.nonce) !== null && _d !== void 0 ? _d : 0));
}
exports.serializeMessage = serializeMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxtQ0FBcUU7QUFDckUscUNBQXFGO0FBRXJGOztHQUVHO0FBQ0gsSUFBTSxrQkFBa0IsR0FBVyxvQkFBVztJQUMxQyxrQkFBUztJQUNULENBQUMsQ0FBQyxHQUFHLDBCQUFpQixDQUFDO0lBQ3ZCLDRCQUFrQjtJQUNsQixvQkFBVyxDQUFDO0FBRWhCOztHQUVHO0FBQ1UsUUFBQSxrQkFBa0IsR0FBVyxLQUFLLENBQUM7QUFFaEQ7O0dBRUc7QUFDVSxRQUFBLGtCQUFrQixHQUFXLENBQUMsQ0FBQztBQUU1Qzs7R0FFRztBQUNVLFFBQUEsa0JBQWtCLEdBQVcsQ0FBQyxDQUFDO0FBRTVDOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxVQUFzQjtJQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQW1CLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ2Msa0JBQW9CLENBQUMsQ0FBQztLQUM3RjtJQUVELElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUU3RCxJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDN0QsSUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO0lBRTdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsSUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBMEIsQ0FBRyxFQUFFLDBCQUFpQixDQUFDLENBQUM7UUFDbEcsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNqQztJQUVELElBQU0sT0FBTyxHQUFHLDRCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFckQsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25DLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXVCLFVBQVUsQ0FBQyxNQUFNLEVBQUUseUJBQW9CLE1BQVEsQ0FBQyxDQUFDO0tBQzNGO0lBRUQsT0FBTztRQUNILFNBQVMsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxPQUFPLFNBQUE7UUFDUCxPQUFPLFNBQUE7UUFDUCxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7S0FDNUIsQ0FBQztBQUNOLENBQUM7QUEvQkQsZ0RBK0JDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFdBQXdCLEVBQUUsTUFBZ0I7O0lBQ3ZFLFdBQVcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxPQUFDLE1BQU0sQ0FBQyxTQUFTLG1DQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUUsSUFBTSxVQUFVLGVBQUcsTUFBTSxDQUFDLE9BQU8sMENBQUUsTUFBTSxtQ0FBSSxDQUFDLENBQUM7SUFDL0MsV0FBVyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUV4RCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7UUFDaEIsSUFBSSxVQUFVLEdBQUcsMEJBQWtCLEVBQUU7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBZ0IsMEJBQWtCLDBDQUNULFVBQVksQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7WUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQzthQUN6RTtZQUNELFdBQVcsQ0FBQyxhQUFhLENBQUMsNkJBQTBCLENBQUMsR0FBRyxDQUFDLENBQUUsRUFDdkQsMEJBQWlCLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO0tBQ0o7SUFFRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlDLFdBQVcsQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLE1BQU0sT0FBQyxNQUFNLENBQUMsS0FBSyxtQ0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLENBQUM7QUEzQkQsNENBMkJDIn0=
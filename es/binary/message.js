"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeMessage = exports.deserializeMessage = exports.MAX_MESSAGE_LENGTH = void 0;
var common_1 = require("./common");
var payload_1 = require("./payload");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxtQ0FBcUU7QUFDckUscUNBQXFGO0FBRXJGLElBQU0sa0JBQWtCLEdBQVcsb0JBQVc7SUFDMUMsa0JBQVM7SUFDVCxDQUFDLENBQUMsR0FBRywwQkFBaUIsQ0FBQztJQUN2Qiw0QkFBa0I7SUFDbEIsb0JBQVcsQ0FBQztBQUVoQjs7R0FFRztBQUNVLFFBQUEsa0JBQWtCLEdBQVcsS0FBSyxDQUFDO0FBRWhEOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxVQUFzQjtJQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQW1CLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ2Msa0JBQW9CLENBQUMsQ0FBQztLQUM3RjtJQUVELElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUU3RCxJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDN0QsSUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO0lBRTdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsSUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsRUFBRSwwQkFBaUIsQ0FBQyxDQUFDO1FBQzlGLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDakM7SUFFRCxJQUFNLE9BQU8sR0FBRyw0QkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXJELElBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuQyxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF1QixVQUFVLENBQUMsTUFBTSxFQUFFLHlCQUFvQixNQUFRLENBQUMsQ0FBQztLQUMzRjtJQUVELE9BQU87UUFDSCxTQUFTLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDakMsT0FBTyxTQUFBO1FBQ1AsT0FBTyxTQUFBO1FBQ1AsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0tBQzVCLENBQUM7QUFDTixDQUFDO0FBL0JELGdEQStCQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxXQUF3QixFQUFFLE1BQWdCOztJQUN2RSxXQUFXLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sT0FBQyxNQUFNLENBQUMsU0FBUyxtQ0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVFLElBQU0sVUFBVSxlQUFHLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLE1BQU0sbUNBQUksQ0FBQyxDQUFDO0lBQy9DLFdBQVcsQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFeEQsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsV0FBVyxDQUFDLGFBQWEsQ0FBQyw2QkFBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBRSxFQUN2RCwwQkFBaUIsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7S0FDSjtJQUVELDBCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsTUFBTSxPQUFDLE1BQU0sQ0FBQyxLQUFLLG1DQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQWhCRCw0Q0FnQkMifQ==
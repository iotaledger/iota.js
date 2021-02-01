"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeMessage = exports.deserializeMessage = exports.MIN_NUMBER_PARENTS = exports.MAX_NUMBER_PARENTS = exports.MAX_MESSAGE_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var IIndexationPayload_1 = require("../models/IIndexationPayload");
var IMilestonePayload_1 = require("../models/IMilestonePayload");
var ITransactionPayload_1 = require("../models/ITransactionPayload");
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
    if (payload &&
        payload.type !== ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE &&
        payload.type !== IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE &&
        payload.type !== IMilestonePayload_1.MILESTONE_PAYLOAD_TYPE) {
        throw new Error("Messages can only contain transaction, indexation or milestone payloads");
    }
    var nonce = readStream.readUInt64("message.nonce");
    var unused = readStream.unused();
    if (unused !== 0) {
        throw new Error("Message data length " + readStream.length() + " has unused data " + unused);
    }
    return {
        networkId: networkId.toString(10),
        parentMessageIds: parents,
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
    var numParents = (_c = (_b = object.parentMessageIds) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
    writeStream.writeByte("message.numParents", numParents);
    if (object.parentMessageIds) {
        if (numParents > exports.MAX_NUMBER_PARENTS) {
            throw new Error("A maximum of " + exports.MAX_NUMBER_PARENTS + " parents is allowed, you provided " + numParents);
        }
        if ((new Set(object.parentMessageIds)).size !== numParents) {
            throw new Error("The message parents must be unique");
        }
        var sorted = object.parentMessageIds.slice().sort();
        for (var i = 0; i < numParents; i++) {
            if (sorted[i] !== object.parentMessageIds[i]) {
                throw new Error("The message parents must be lexographically sorted");
            }
            writeStream.writeFixedHex("message.parentMessageId" + (i + 1), common_1.MESSAGE_ID_LENGTH, object.parentMessageIds[i]);
        }
    }
    if (object.payload &&
        object.payload.type !== ITransactionPayload_1.TRANSACTION_PAYLOAD_TYPE &&
        object.payload.type !== IIndexationPayload_1.INDEXATION_PAYLOAD_TYPE &&
        object.payload.type !== IMilestonePayload_1.MILESTONE_PAYLOAD_TYPE) {
        throw new Error("Messages can only contain transaction, indexation or milestone payloads");
    }
    payload_1.serializePayload(writeStream, object.payload);
    writeStream.writeUInt64("message.nonce", BigInt((_d = object.nonce) !== null && _d !== void 0 ? _d : 0));
}
exports.serializeMessage = serializeMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLG1FQUF1RTtBQUV2RSxpRUFBcUU7QUFDckUscUVBQXlFO0FBR3pFLG1DQUFxRTtBQUNyRSxxQ0FBcUY7QUFFckY7O0dBRUc7QUFDSCxJQUFNLGtCQUFrQixHQUFXLG9CQUFXO0lBQzFDLGtCQUFTO0lBQ1QsQ0FBQyxDQUFDLEdBQUcsMEJBQWlCLENBQUM7SUFDdkIsNEJBQWtCO0lBQ2xCLG9CQUFXLENBQUM7QUFFaEI7O0dBRUc7QUFDVSxRQUFBLGtCQUFrQixHQUFXLEtBQUssQ0FBQztBQUVoRDs7R0FFRztBQUNVLFFBQUEsa0JBQWtCLEdBQVcsQ0FBQyxDQUFDO0FBRTVDOztHQUVHO0FBQ1UsUUFBQSxrQkFBa0IsR0FBVyxDQUFDLENBQUM7QUFFNUM7Ozs7R0FJRztBQUNILFNBQWdCLGtCQUFrQixDQUFDLFVBQXNCO0lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBbUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxxRUFDYyxrQkFBb0IsQ0FBQyxDQUFDO0tBQzdGO0lBRUQsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRTdELElBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM3RCxJQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7SUFFN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxJQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLDRCQUEwQixDQUFHLEVBQUUsMEJBQWlCLENBQUMsQ0FBQztRQUNsRyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ2pDO0lBRUQsSUFBTSxPQUFPLEdBQUcsNEJBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFL0MsSUFBSSxPQUFPO1FBQ1AsT0FBTyxDQUFDLElBQUksS0FBSyw4Q0FBd0I7UUFDekMsT0FBTyxDQUFDLElBQUksS0FBSyw0Q0FBdUI7UUFDeEMsT0FBTyxDQUFDLElBQUksS0FBSywwQ0FBc0IsRUFBRTtRQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7S0FDOUY7SUFFRCxJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXJELElBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuQyxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF1QixVQUFVLENBQUMsTUFBTSxFQUFFLHlCQUFvQixNQUFRLENBQUMsQ0FBQztLQUMzRjtJQUVELE9BQU87UUFDSCxTQUFTLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDakMsZ0JBQWdCLEVBQUUsT0FBTztRQUN6QixPQUFPLFNBQUE7UUFDUCxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7S0FDNUIsQ0FBQztBQUNOLENBQUM7QUF0Q0QsZ0RBc0NDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFdBQXdCLEVBQUUsTUFBZ0I7O0lBQ3ZFLFdBQVcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxPQUFDLE1BQU0sQ0FBQyxTQUFTLG1DQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUUsSUFBTSxVQUFVLGVBQUcsTUFBTSxDQUFDLGdCQUFnQiwwQ0FBRSxNQUFNLG1DQUFJLENBQUMsQ0FBQztJQUN4RCxXQUFXLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRXhELElBQUksTUFBTSxDQUFDLGdCQUFnQixFQUFFO1FBQ3pCLElBQUksVUFBVSxHQUFHLDBCQUFrQixFQUFFO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWdCLDBCQUFrQiwwQ0FDVCxVQUFZLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7WUFDeEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7YUFDekU7WUFDRCxXQUFXLENBQUMsYUFBYSxDQUFDLDZCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFFLEVBQ3ZELDBCQUFpQixFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3REO0tBQ0o7SUFFRCxJQUFJLE1BQU0sQ0FBQyxPQUFPO1FBQ2QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssOENBQXdCO1FBQ2hELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLDRDQUF1QjtRQUMvQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSywwQ0FBc0IsRUFBRTtRQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7S0FDOUY7SUFFRCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlDLFdBQVcsQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLE1BQU0sT0FBQyxNQUFNLENBQUMsS0FBSyxtQ0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLENBQUM7QUFsQ0QsNENBa0NDIn0=
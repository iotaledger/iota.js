"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeMessage = exports.deserializeMessage = exports.MIN_NUMBER_PARENTS = exports.MAX_NUMBER_PARENTS = exports.MAX_MESSAGE_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const IIndexationPayload_1 = require("../models/IIndexationPayload");
const IMilestonePayload_1 = require("../models/IMilestonePayload");
const IReceiptPayload_1 = require("../models/IReceiptPayload");
const ITransactionPayload_1 = require("../models/ITransactionPayload");
const ITreasuryTransactionPayload_1 = require("../models/ITreasuryTransactionPayload");
const common_1 = require("./common");
const payload_1 = require("./payload");
/**
 * The minimum length of a message binary representation.
 */
const MIN_MESSAGE_LENGTH = common_1.UINT64_SIZE + // Network id
    common_1.BYTE_SIZE + // Parent count
    common_1.MESSAGE_ID_LENGTH + // Single parent
    payload_1.MIN_PAYLOAD_LENGTH + // Min payload length
    common_1.UINT64_SIZE; // Nonce
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
        throw new Error(`Message data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_MESSAGE_LENGTH}`);
    }
    const networkId = readStream.readUInt64("message.networkId");
    const numParents = readStream.readByte("message.numParents");
    const parents = [];
    for (let i = 0; i < numParents; i++) {
        const parentMessageId = readStream.readFixedHex(`message.parentMessageId${i}`, common_1.MESSAGE_ID_LENGTH);
        parents.push(parentMessageId);
    }
    const payload = payload_1.deserializePayload(readStream);
    if (payload &&
        (payload.type === IReceiptPayload_1.RECEIPT_PAYLOAD_TYPE ||
            payload.type === ITreasuryTransactionPayload_1.TREASURY_TRANSACTION_PAYLOAD_TYPE)) {
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
exports.deserializeMessage = deserializeMessage;
/**
 * Serialize the message essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeMessage(writeStream, object) {
    var _a, _b, _c, _d;
    writeStream.writeUInt64("message.networkId", BigInt((_a = object.networkId) !== null && _a !== void 0 ? _a : 0));
    const numParents = (_c = (_b = object.parentMessageIds) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
    writeStream.writeByte("message.numParents", numParents);
    if (object.parentMessageIds) {
        if (numParents > exports.MAX_NUMBER_PARENTS) {
            throw new Error(`A maximum of ${exports.MAX_NUMBER_PARENTS} parents is allowed, you provided ${numParents}`);
        }
        if ((new Set(object.parentMessageIds)).size !== numParents) {
            throw new Error("The message parents must be unique");
        }
        const sorted = object.parentMessageIds.slice().sort();
        for (let i = 0; i < numParents; i++) {
            if (sorted[i] !== object.parentMessageIds[i]) {
                throw new Error("The message parents must be lexographically sorted");
            }
            writeStream.writeFixedHex(`message.parentMessageId${i + 1}`, common_1.MESSAGE_ID_LENGTH, object.parentMessageIds[i]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW5hcnkvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLHFFQUF1RTtBQUV2RSxtRUFBcUU7QUFDckUsK0RBQWlFO0FBQ2pFLHVFQUF5RTtBQUN6RSx1RkFBMEY7QUFHMUYscUNBQXFFO0FBQ3JFLHVDQUFxRjtBQUVyRjs7R0FFRztBQUNILE1BQU0sa0JBQWtCLEdBQ3BCLG9CQUFXLEdBQUcsYUFBYTtJQUMzQixrQkFBUyxHQUFHLGVBQWU7SUFDM0IsMEJBQWlCLEdBQUcsZ0JBQWdCO0lBQ3BDLDRCQUFrQixHQUFHLHFCQUFxQjtJQUMxQyxvQkFBVyxDQUFDLENBQUMsUUFBUTtBQUV6Qjs7R0FFRztBQUNVLFFBQUEsa0JBQWtCLEdBQVcsS0FBSyxDQUFDO0FBRWhEOztHQUVHO0FBQ1UsUUFBQSxrQkFBa0IsR0FBVyxDQUFDLENBQUM7QUFFNUM7O0dBRUc7QUFDVSxRQUFBLGtCQUFrQixHQUFXLENBQUMsQ0FBQztBQUU1Qzs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsVUFBc0I7SUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixVQUFVLENBQUMsTUFBTSxFQUNoRCxnRUFBZ0Usa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO0tBQzdGO0lBRUQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRTdELE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM3RCxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7SUFFN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFB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
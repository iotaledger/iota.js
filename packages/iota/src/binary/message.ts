// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper, ReadStream, WriteStream } from "@iota/util.js";
import { DEFAULT_PROTOCOL_VERSION, IMessage } from "../models/IMessage";
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
const MIN_MESSAGE_LENGTH: number =
    UINT8_SIZE + // Protocol Version
    UINT8_SIZE + // Parent count
    MESSAGE_ID_LENGTH + // Single parent
    MIN_PAYLOAD_LENGTH + // Min payload length
    UINT64_SIZE; // Nonce

/**
 * The maximum length of a message.
 */
export const MAX_MESSAGE_LENGTH: number = 32768;

/**
 * The maximum number of parents.
 */
export const MAX_NUMBER_PARENTS: number = 8;

/**
 * The minimum number of parents.
 */
export const MIN_NUMBER_PARENTS: number = 1;

/**
 * Deserialize the message from binary.
 * @param readStream The message to deserialize.
 * @returns The deserialized message.
 */
export function deserializeMessage(readStream: ReadStream): IMessage {
    if (!readStream.hasRemaining(MIN_MESSAGE_LENGTH)) {
        throw new Error(
            `Message data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_MESSAGE_LENGTH}`
        );
    }

    const protocolVersion = readStream.readUInt8("message.protocolVersion");
    const numParents = readStream.readUInt8("message.numParents");
    const parents: string[] = [];

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
        nonce: HexHelper.fromBigInt(nonce)
    };
}

/**
 * Serialize the message essence to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeMessage(writeStream: WriteStream, object: IMessage): void {
    writeStream.writeUInt8("message.protocolVersion", object.protocolVersion ?? DEFAULT_PROTOCOL_VERSION);

    const numParents = object.parentMessageIds?.length ?? 0;
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

    if (
        object.payload &&
        object.payload.type !== TRANSACTION_PAYLOAD_TYPE &&
        object.payload.type !== MILESTONE_PAYLOAD_TYPE &&
        object.payload.type !== TAGGED_DATA_PAYLOAD_TYPE
    ) {
        throw new Error("Messages can only contain transaction, milestone or tagged data payloads");
    }

    serializePayload(writeStream, object.payload);

    writeStream.writeUInt64("message.nonce", HexHelper.toBigInt(object.nonce ?? "0x00"));
}

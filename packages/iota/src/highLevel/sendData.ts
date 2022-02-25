// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable unicorn/no-nested-ternary */
import { Converter } from "@iota/util.js";
import { MAX_TAG_LENGTH } from "../binary/payloads/taggedDataPayload";
import { SingleNodeClient } from "../clients/singleNodeClient";
import type { IClient } from "../models/IClient";
import type { IMessage } from "../models/IMessage";
import { ITaggedDataPayload, TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";

/**
 * Send a data message.
 * @param client The client or node endpoint to send the data with.
 * @param tag The tag for the data.
 * @param data The data as either UTF8 text or Uint8Array bytes.
 * @returns The id of the message created and the message.
 */
export async function sendData(
    client: IClient | string,
    tag?: Uint8Array | string,
    data?: Uint8Array | string
): Promise<{
    message: IMessage;
    messageId: string;
}> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const localTagHex = typeof tag === "string" ? Converter.utf8ToHex(tag) : Converter.bytesToHex(tag);

    if (localTagHex.length / 2 > MAX_TAG_LENGTH) {
        throw new Error(
            `The tag length is ${localTagHex.length / 2
            }, which exceeds the maximum size of ${MAX_TAG_LENGTH}`
        );
    }

    const taggedDataPayload: ITaggedDataPayload = {
        type: TAGGED_DATA_PAYLOAD_TYPE,
        tag: localTagHex,
        data: data
            ? typeof data === "string"
                ? Converter.utf8ToHex(data)
                : Converter.bytesToHex(data)
            : undefined
    };

    const message: IMessage = {
        payload: taggedDataPayload
    };

    const messageId = await localClient.messageSubmit(message);
    return {
        message,
        messageId
    };
}

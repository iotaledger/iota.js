// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_INDEXATION_KEY_LENGTH, MIN_INDEXATION_KEY_LENGTH } from "../binary/payload";
import { IClient } from "../models/IClient";
import { IIndexationPayload, INDEXATION_PAYLOAD_TYPE } from "../models/IIndexationPayload";
import { IMessage } from "../models/IMessage";
import { Converter } from "../utils/converter";

/**
 * Send a data message.
 * @param client The client to send the transfer with.
 * @param indexationKey The index name.
 * @param indexationData The index data.
 * @returns The id of the message created and the message.
 */
export async function sendData(client: IClient, indexationKey: string, indexationData?: Uint8Array): Promise<{
    message: IMessage;
    messageId: string;
}> {
    if (!indexationKey) {
        throw new Error("indexationKey must not be empty");
    }

    if (indexationKey.length < MIN_INDEXATION_KEY_LENGTH) {
        throw new Error(`The indexation key length is ${indexationKey.length
            }, which is below the minimum size of ${MIN_INDEXATION_KEY_LENGTH}`);
    }

    if (indexationKey.length > MAX_INDEXATION_KEY_LENGTH) {
        throw new Error(`The indexation key length is ${indexationKey.length
            }, which exceeds the maximum size of ${MAX_INDEXATION_KEY_LENGTH}`);
    }

    const indexationPayload: IIndexationPayload = {
        type: INDEXATION_PAYLOAD_TYPE,
        index: indexationKey,
        data: indexationData ? Converter.bytesToHex(indexationData) : ""
    };

    const tipsResponse = await client.tips();

    const message: IMessage = {
        parents: tipsResponse.tips,
        payload: indexationPayload
    };

    const messageId = await client.messageSubmit(message);
    return {
        message,
        messageId
    };
}

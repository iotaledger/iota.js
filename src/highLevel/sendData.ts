// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_INDEXATION_KEY_LENGTH } from "../binary/payload";
import { IClient } from "../models/IClient";
import { IIndexationPayload } from "../models/IIndexationPayload";
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
    if (!indexationKey || indexationKey.length === 0) {
        throw new Error("indexationKey must not be empty");
    }

    if (indexationKey.length > MAX_INDEXATION_KEY_LENGTH) {
        throw new Error(`The indexation key length is ${indexationKey.length
            }, which exceeds the maximum size of ${MAX_INDEXATION_KEY_LENGTH}`);
    }

    const indexationPayload: IIndexationPayload = {
        type: 2,
        index: indexationKey,
        data: indexationData ? Converter.bytesToHex(indexationData) : ""
    };

    const tips = await client.tips();

    const message: IMessage = {
        parent1MessageId: tips.tip1MessageId,
        parent2MessageId: tips.tip2MessageId,
        payload: indexationPayload
    };

    const messageId = await client.messageSubmit(message);
    return {
        message,
        messageId
    };
}

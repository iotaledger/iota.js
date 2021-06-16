// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_INDEXATION_KEY_LENGTH, MIN_INDEXATION_KEY_LENGTH } from "../binary/payload";
import { SingleNodeClient } from "../clients/singleNodeClient";
import type { IClient } from "../models/IClient";
import { IIndexationPayload, INDEXATION_PAYLOAD_TYPE } from "../models/IIndexationPayload";
import type { IMessage } from "../models/IMessage";
import { Converter } from "../utils/converter";

/**
 * Send a data message.
 * @param client The client or node endpoint to send the data with.
 * @param indexationKey The index name.
 * @param indexationData The index data as either UTF8 text or Uint8Array bytes.
 * @returns The id of the message created and the message.
 */
export async function sendData(
    client: IClient | string,
    indexationKey: Uint8Array | string,
    indexationData?: Uint8Array | string): Promise<{
        message: IMessage;
        messageId: string;
    }> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    if (!indexationKey) {
        throw new Error("indexationKey must not be empty");
    }

    const localIndexationKeyHex = typeof (indexationKey) === "string"
        ? Converter.utf8ToHex(indexationKey) : Converter.bytesToHex(indexationKey);

    if (localIndexationKeyHex.length / 2 < MIN_INDEXATION_KEY_LENGTH) {
        throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2
            }, which is below the minimum size of ${MIN_INDEXATION_KEY_LENGTH}`);
    }

    if (localIndexationKeyHex.length / 2 > MAX_INDEXATION_KEY_LENGTH) {
        throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2
            }, which exceeds the maximum size of ${MAX_INDEXATION_KEY_LENGTH}`);
    }

    const indexationPayload: IIndexationPayload = {
        type: INDEXATION_PAYLOAD_TYPE,
        index: localIndexationKeyHex,
        data: indexationData ? (typeof indexationData === "string"
            ? Converter.utf8ToHex(indexationData) : Converter.bytesToHex(indexationData)) : undefined
    };

    const message: IMessage = {
        payload: indexationPayload
    };

    const messageId = await localClient.messageSubmit(message);
    return {
        message,
        messageId
    };
}

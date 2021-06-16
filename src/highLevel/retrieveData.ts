// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { SingleNodeClient } from "../clients/singleNodeClient";
import type { IClient } from "../models/IClient";
import { IIndexationPayload, INDEXATION_PAYLOAD_TYPE } from "../models/IIndexationPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/ITransactionPayload";
import { Converter } from "../utils/converter";

/**
 * Retrieve a data message.
 * @param client The client or node endpoint to retrieve the data with.
 * @param messageId The message id of the data to get.
 * @returns The message index and data.
 */
export async function retrieveData(client: IClient | string, messageId: string): Promise<{
    index: Uint8Array;
    data?: Uint8Array;
} | undefined> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const message = await localClient.message(messageId);

    if (message?.payload) {
        let indexationPayload: IIndexationPayload | undefined;

        if (message.payload.type === TRANSACTION_PAYLOAD_TYPE) {
            indexationPayload = message.payload.essence.payload;
        } else if (message.payload.type === INDEXATION_PAYLOAD_TYPE) {
            indexationPayload = message.payload;
        }

        if (indexationPayload) {
            return {
                index: Converter.hexToBytes(indexationPayload.index),
                data: indexationPayload.data ? Converter.hexToBytes(indexationPayload.data) : undefined
            };
        }
    }
}

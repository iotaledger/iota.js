// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { IClient } from "../models/IClient";
import { IIndexationPayload, INDEXATION_PAYLOAD_TYPE } from "../models/IIndexationPayload";
import { ITransactionPayload, TRANSACTION_PAYLOAD_TYPE } from "../models/ITransactionPayload";
import { Converter } from "../utils/converter";

/**
 * Retrieve a data message.
 * @param client The client to send the transfer with.
 * @param messageId The message id of the data to get.
 * @returns The message index and data.
 */
export async function retrieveData(client: IClient, messageId: string): Promise<{
    index: string;
    data?: Uint8Array;
} | undefined> {
    const message = await client.message(messageId);

    if (message?.payload) {
        let indexationPayload: IIndexationPayload | undefined;

        if (message.payload.type === TRANSACTION_PAYLOAD_TYPE) {
            indexationPayload = (message.payload as ITransactionPayload).essence.payload;
        } else if (message.payload.type === INDEXATION_PAYLOAD_TYPE) {
            indexationPayload = message.payload as IIndexationPayload;
        }

        if (indexationPayload) {
            return {
                index: indexationPayload.index,
                data: indexationPayload.data ? Converter.hexToBytes(indexationPayload.data) : undefined
            };
        }
    }
}

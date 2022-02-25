// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { SingleNodeClient } from "../clients/singleNodeClient";
import type { IClient } from "../models/IClient";
import { ITaggedDataPayload, TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload";

/**
 * Retrieve a data message.
 * @param client The client or node endpoint to retrieve the data with.
 * @param messageId The message id of the data to get.
 * @returns The message tag and data.
 */
export async function retrieveData(
    client: IClient | string,
    messageId: string
): Promise<
    | {
          tag?: Uint8Array;
          data?: Uint8Array;
      }
    | undefined
> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const message = await localClient.message(messageId);

    if (message?.payload) {
        let taggedDataPayload: ITaggedDataPayload | undefined;

        if (message.payload.type === TRANSACTION_PAYLOAD_TYPE) {
            taggedDataPayload = message.payload.essence.payload;
        } else if (message.payload.type === TAGGED_DATA_PAYLOAD_TYPE) {
            taggedDataPayload = message.payload;
        }

        if (taggedDataPayload) {
            return {
                tag: taggedDataPayload.tag ? Converter.hexToBytes(taggedDataPayload.tag) : undefined,
                data: taggedDataPayload.data ? Converter.hexToBytes(taggedDataPayload.data) : undefined
            };
        }
    }
}

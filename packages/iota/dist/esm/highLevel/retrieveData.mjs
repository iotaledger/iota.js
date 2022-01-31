// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { SingleNodeClient } from "../clients/singleNodeClient.mjs";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload.mjs";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload.mjs";
/**
 * Retrieve a data message.
 * @param client The client or node endpoint to retrieve the data with.
 * @param messageId The message id of the data to get.
 * @returns The message tag and data.
 */
export async function retrieveData(client, messageId) {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const message = await localClient.message(messageId);
    if (message === null || message === void 0 ? void 0 : message.payload) {
        let taggedDataPayload;
        if (message.payload.type === TRANSACTION_PAYLOAD_TYPE) {
            taggedDataPayload = message.payload.essence.payload;
        }
        else if (message.payload.type === TAGGED_DATA_PAYLOAD_TYPE) {
            taggedDataPayload = message.payload;
        }
        if (taggedDataPayload) {
            return {
                tag: Converter.hexToBytes(taggedDataPayload.tag),
                data: taggedDataPayload.data ? Converter.hexToBytes(taggedDataPayload.data) : undefined
            };
        }
    }
}

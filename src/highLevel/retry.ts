// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { SingleNodeClient } from "../clients/singleNodeClient";
import type { IClient } from "../models/IClient";
import type { IMessage } from "../models/IMessage";
import { promote } from "./promote";
import { reattach } from "./reattach";

/**
 * Retry an existing message either by promoting or reattaching.
 * @param client The client or node endpoint to perform the retry with.
 * @param messageId The message to retry.
 * @returns The id and message that were retried.
 */
export async function retry(client: IClient | string, messageId: string): Promise<{
    message: IMessage;
    messageId: string;
}> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const metadata = await localClient.messageMetadata(messageId);

    if (!metadata) {
        throw new Error("The message does not exist.");
    }

    if (metadata.shouldPromote) {
        return promote(client, messageId);
    } else if (metadata.shouldReattach) {
        return reattach(client, messageId);
    }

    throw new Error("The message should not be promoted or reattached.");
}

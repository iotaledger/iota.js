// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { SingleNodeClient } from "../clients/singleNodeClient";
import type { IClient } from "../models/IClient";
import type { IMessage } from "../models/IMessage";

/**
 * Reattach an existing message.
 * @param client The client or node endpoint to perform the reattach with.
 * @param messageId The message to reattach.
 * @returns The id and message that were reattached.
 */
export async function reattach(
    client: IClient | string,
    messageId: string
): Promise<{
    message: IMessage;
    messageId: string;
}> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const message = await localClient.message(messageId);
    if (!message) {
        throw new Error("The message does not exist.");
    }

    const reattachMessage: IMessage = {
        payload: message.payload
    };

    const reattachedMessageId = await localClient.messageSubmit(reattachMessage);

    return {
        message,
        messageId: reattachedMessageId
    };
}

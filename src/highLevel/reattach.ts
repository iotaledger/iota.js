// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { IClient } from "../models/IClient";
import { IMessage } from "../models/IMessage";

/**
 * Reattach an existing message.
 * @param client The client to perform the reattach with.
 * @param messageId The message to reattach.
 * @returns The id and message that were reattached.
 */
export async function reattach(client: IClient, messageId: string): Promise<{
    message: IMessage;
    messageId: string;
}> {
    const message = await client.message(messageId);
    if (!message) {
        throw new Error("The message does not exist.");
    }

    const reattachMessage: IMessage = {
        payload: message.payload
    };

    const reattachedMessageId = await client.messageSubmit(reattachMessage);

    return {
        message,
        messageId: reattachedMessageId
    };
}

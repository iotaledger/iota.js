// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { IClient } from "../models/IClient";
import { IMessage } from "../models/IMessage";

/**
 * Promote an existing message.
 * @param client The client to perform the promote with.
 * @param messageId The message to promote.
 * @returns The id and message that were promoted.
 */
export async function promote(client: IClient, messageId: string): Promise<{
    message: IMessage;
    messageId: string;
}> {
    const message = await client.message(messageId);
    if (!message) {
        throw new Error("The message does not exist.");
    }

    const tips = await client.tips();

    const promoteMessage: IMessage = {
        parent1MessageId: tips.tip1MessageId,
        parent2MessageId: messageId
    };

    const promoteMessageId = await client.messageSubmit(promoteMessage);

    return {
        message,
        messageId: promoteMessageId
    };
}

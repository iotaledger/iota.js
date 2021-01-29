// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_NUMBER_PARENTS } from "../binary/message";
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

    const tipsResponse = await client.tips();

    // Parents must be unique and lexicographically sorted
    // so don't add the messageId if it is already one of the tips
    if (!tipsResponse.tips.includes(messageId)) {
        tipsResponse.tips.push(messageId);
    }

    // If we now exceed the max parents remove one
    if (tipsResponse.tips.length > MAX_NUMBER_PARENTS) {
        tipsResponse.tips.shift();
    }

    // Finally sort the list
    tipsResponse.tips.sort();

    const promoteMessage: IMessage = {
        parents: tipsResponse.tips
    };

    const promoteMessageId = await client.messageSubmit(promoteMessage);

    return {
        message,
        messageId: promoteMessageId
    };
}

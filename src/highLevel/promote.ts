// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_NUMBER_PARENTS } from "../binary/message";
import { SingleNodeClient } from "../clients/singleNodeClient";
import type { IClient } from "../models/IClient";
import type { IMessage } from "../models/IMessage";

/**
 * Promote an existing message.
 * @param client The clientor node endpoint to perform the promote with.
 * @param messageId The message to promote.
 * @returns The id and message that were promoted.
 */
export async function promote(client: IClient | string, messageId: string): Promise<{
    message: IMessage;
    messageId: string;
}> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const message = await localClient.message(messageId);
    if (!message) {
        throw new Error("The message does not exist.");
    }

    const tipsResponse = await localClient.tips();

    // Parents must be unique and lexicographically sorted
    // so don't add the messageId if it is already one of the tips
    if (!tipsResponse.tipMessageIds.includes(messageId)) {
        tipsResponse.tipMessageIds.unshift(messageId);
    }

    // If we now exceed the max parents remove as many as we need
    if (tipsResponse.tipMessageIds.length > MAX_NUMBER_PARENTS) {
        tipsResponse.tipMessageIds = tipsResponse.tipMessageIds.slice(0, MAX_NUMBER_PARENTS);
    }

    // Finally sort the list
    tipsResponse.tipMessageIds.sort();

    const promoteMessage: IMessage = {
        parentMessageIds: tipsResponse.tipMessageIds
    };

    const promoteMessageId = await localClient.messageSubmit(promoteMessage);

    return {
        message,
        messageId: promoteMessageId
    };
}

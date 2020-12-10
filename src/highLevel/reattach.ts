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

    const tips = await client.tips();

    const reattachMessage: IMessage = {
        parent1MessageId: tips.tip1MessageId,
        parent2MessageId: tips.tip2MessageId,
        payload: message.payload
    };

    const reattachedMessageId = await client.messageSubmit(reattachMessage);

    return {
        message,
        messageId: reattachedMessageId
    };
}

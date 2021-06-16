import type { IClient } from "../models/IClient";
import type { IMessage } from "../models/IMessage";
/**
 * Reattach an existing message.
 * @param client The client or node endpoint to perform the reattach with.
 * @param messageId The message to reattach.
 * @returns The id and message that were reattached.
 */
export declare function reattach(client: IClient | string, messageId: string): Promise<{
    message: IMessage;
    messageId: string;
}>;

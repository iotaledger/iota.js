import type { IClient } from "../models/IClient";
import type { IMessage } from "../models/IMessage";
/**
 * Promote an existing message.
 * @param client The clientor node endpoint to perform the promote with.
 * @param messageId The message to promote.
 * @returns The id and message that were promoted.
 */
export declare function promote(client: IClient | string, messageId: string): Promise<{
    message: IMessage;
    messageId: string;
}>;

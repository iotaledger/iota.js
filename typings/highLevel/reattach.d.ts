import { IClient } from "../models/IClient";
import { IMessage } from "../models/IMessage";
/**
 * Reattach an existing message.
 * @param client The client to perform the reattach with.
 * @param messageId The message to reattach.
 * @returns The id and message that were reattached.
 */
export declare function reattach(client: IClient, messageId: string): Promise<{
    message: IMessage;
    messageId: string;
}>;

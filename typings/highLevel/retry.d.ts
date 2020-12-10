import { IClient } from "../models/IClient";
import { IMessage } from "../models/IMessage";
/**
 * Retry an existing message either by promoting or reattaching.
 * @param client The client to perform the retry with.
 * @param messageId The message to retry.
 * @returns The id and message that were retried.
 */
export declare function retry(client: IClient, messageId: string): Promise<{
    message: IMessage;
    messageId: string;
}>;

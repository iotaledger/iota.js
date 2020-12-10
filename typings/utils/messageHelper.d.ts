import { IClient } from "../models/IClient";
import { IMessage } from "../models/IMessage";
/**
 * Helper methods for messages.
 */
export declare class MessageHelper {
    /**
     * Validate a transaction the message.
     * @param client The client for making API calls.
     * @param message The message to validate.
     * @returns The reasons why to message is not valid.
     */
    static validateTransaction(client: IClient, message: IMessage): Promise<string[]>;
}

import { IClient } from "../models/IClient";
/**
 * Retrieve a data message.
 * @param client The client to send the transfer with.
 * @param messageId The message id of the data to get.
 * @returns The message index and data.
 */
export declare function retrieveData(client: IClient, messageId: string): Promise<{
    index: string;
    data?: Uint8Array;
} | undefined>;

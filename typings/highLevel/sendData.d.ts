import { IClient } from "../models/IClient";
import { IMessage } from "../models/IMessage";
/**
 * Send a data message.
 * @param client The client or node endpoint to send the data with.
 * @param indexationKey The index name.
 * @param indexationData The index data as either UTF8 text or Uint8Array bytes.
 * @returns The id of the message created and the message.
 */
export declare function sendData(client: IClient | string, indexationKey: string, indexationData?: string | Uint8Array): Promise<{
    message: IMessage;
    messageId: string;
}>;

import type { IClient } from "../models/IClient";
import type { IMessage } from "../models/IMessage";
/**
 * Send a data message.
 * @param client The client or node endpoint to send the data with.
 * @param tag The tag for the data.
 * @param data The data as either UTF8 text or Uint8Array bytes.
 * @returns The id of the message created and the message.
 */
export declare function sendData(client: IClient | string, tag?: Uint8Array | string, data?: Uint8Array | string): Promise<{
    message: IMessage;
    messageId: string;
}>;

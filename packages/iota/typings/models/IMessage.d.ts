import type { IMilestonePayload } from "./payloads/IMilestonePayload";
import type { ITaggedDataPayload } from "./payloads/ITaggedDataPayload";
import type { ITransactionPayload } from "./payloads/ITransactionPayload";
/**
 * Message layout.
 */
export interface IMessage {
    /**
     * The network id of the message.
     */
    networkId?: string;
    /**
     * The parent message ids.
     */
    parentMessageIds?: string[];
    /**
     * The payload contents.
     */
    payload?: ITransactionPayload | IMilestonePayload | ITaggedDataPayload;
    /**
     * The nonce for the message.
     */
    nonce?: string;
}

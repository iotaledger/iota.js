import type { IIndexationPayload } from "./payloads/IIndexationPayload";
import type { IMilestonePayload } from "./payloads/IMilestonePayload";
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
    payload?: ITransactionPayload | IMilestonePayload | IIndexationPayload;
    /**
     * The nonce for the message.
     */
    nonce?: string;
}

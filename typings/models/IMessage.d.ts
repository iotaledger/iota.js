import { IIndexationPayload } from "./IIndexationPayload";
import { IMilestonePayload } from "./IMilestonePayload";
import { ITransactionPayload } from "./ITransactionPayload";
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
    parents?: string[];
    /**
     * The payload contents.
     */
    payload?: IIndexationPayload | IMilestonePayload | ITransactionPayload;
    /**
     * The nonce for the message.
     */
    nonce?: string;
}

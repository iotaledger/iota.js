import { ITypeBase } from "./ITypeBase";
/**
 * Message layout.
 */
export interface IMessage {
    /**
     * The network id of the message.
     */
    networkId?: string;
    /**
     * The parent 1 message id.
     */
    parent1MessageId?: string;
    /**
     * The parent 2 message id.
     */
    parent2MessageId?: string;
    /**
     * The payload contents.
     */
    payload?: ITypeBase<unknown>;
    /**
     * The nonce for the message.
     */
    nonce?: string;
}

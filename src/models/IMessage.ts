// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
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

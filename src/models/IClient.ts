// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IAddressOutputsResponse } from "./api/IAddressOutputsResponse";
import type { IAddressResponse } from "./api/IAddressResponse";
import type { IChildrenResponse } from "./api/IChildrenResponse";
import type { IMessagesResponse } from "./api/IMessagesResponse";
import type { IMilestoneResponse } from "./api/IMilestoneResponse";
import type { IMilestoneUtxoChangesResponse } from "./api/IMilestoneUtxoChangesResponse";
import type { IOutputResponse } from "./api/IOutputResponse";
import type { IReceiptsResponse } from "./api/IReceiptsResponse";
import type { ITipsResponse } from "./api/ITipsResponse";
import type { IMessage } from "./IMessage";
import type { IMessageMetadata } from "./IMessageMetadata";
import type { INodeInfo } from "./INodeInfo";
import type { IPeer } from "./IPeer";
import type { ITreasury } from "./ITreasury";

/**
 * Client interface definition for API communication.
 */
export interface IClient {
    /**
     * Get the health of the node.
     * @returns True if the node is healthy.
     */
    health(): Promise<boolean>;

    /**
     * Get the info about the node.
     * @returns The node information.
     */
    info(): Promise<INodeInfo>;

    /**
     * Get the tips from the node.
     * @returns The tips.
     */
    tips(): Promise<ITipsResponse>;

    /**
     * Get the message data by id.
     * @param messageId The message to get the data for.
     * @returns The message data.
     */
    message(messageId: string): Promise<IMessage>;

    /**
     * Get the message metadata by id.
     * @param messageId The message to get the metadata for.
     * @returns The message metadata.
     */
    messageMetadata(messageId: string): Promise<IMessageMetadata>;

    /**
     * Get the message raw data by id.
     * @param messageId The message to get the data for.
     * @returns The message raw data.
     */
    messageRaw(messageId: string): Promise<Uint8Array>;

    /**
     * Submit message.
     * @param message The message to submit.
     * @returns The messageId.
     */
    messageSubmit(message: IMessage): Promise<string>;

    /**
     * Submit message in raw format.
     * @param message The message to submit.
     * @returns The messageId.
     */
    messageSubmitRaw(message: Uint8Array): Promise<string>;

    /**
     * Find messages by index.
     * @param indexationKey The index value as a byte array or UTF8 string.
     * @returns The messageId.
     */
    messagesFind(indexationKey: Uint8Array | string): Promise<IMessagesResponse>;

    /**
     * Get the children of a message.
     * @param messageId The id of the message to get the children for.
     * @returns The messages children.
     */
    messageChildren(messageId: string): Promise<IChildrenResponse>;

    /**
     * Get the message that was included in the ledger for a transaction.
     * @param transactionId The id of the transaction to get the included message for.
     * @returns The message.
     */
    transactionIncludedMessage(transactionId: string): Promise<IMessage>;

    /**
     * Find an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    output(outputId: string): Promise<IOutputResponse>;

    /**
     * Get the address details using bech32 address.
     * @param addressBech32 The address to get the details for.
     * @returns The address details.
     */
    address(addressBech32: string): Promise<IAddressResponse>;

    /**
     * Get the address outputs using bech32 address.
     * @param addressBech32 The address to get the outputs for.
     * @param type Filter the type of outputs you are looking up, defaults to all.
     * @param includeSpent Filter the type of outputs you are looking up, defaults to false.
     * @returns The address outputs.
     */
    addressOutputs(addressBech32: string, type?: number, includeSpent?: boolean): Promise<IAddressOutputsResponse>;

    /**
     * Get the address details using ed25519 address.
     * @param addressEd25519 The address to get the details for.
     * @returns The address details.
     */
    addressEd25519(addressEd25519: string): Promise<IAddressResponse>;

    /**
     * Get the address outputs.
     * @param addressEd25519 The address to get the outputs for.
     * @param type Filter the type of outputs you are looking up, defaults to all.
     * @param includeSpent Filter the type of outputs you are looking up, defaults to false.
     * @returns The address outputs.
     */
    addressEd25519Outputs(addressEd25519: string, type?: number, includeSpent?: boolean):
        Promise<IAddressOutputsResponse>;

    /**
     * Get the requested milestone.
     * @param index The index of the milestone to get.
     * @returns The milestone details.
     */
    milestone(index: number): Promise<IMilestoneResponse>;

    /**
     * Get the requested milestone utxo changes.
     * @param index The index of the milestone to request the changes for.
     * @returns The milestone utxo changes details.
     */
    milestoneUtxoChanges(index: number): Promise<IMilestoneUtxoChangesResponse>;

    /**
     * Get the current treasury output.
     * @returns The details for the treasury.
     */
    treasury(): Promise<ITreasury>;

    /**
     * Get all the stored receipts or those for a given migrated at index.
     * @param migratedAt The index the receipts were migrated at, if not supplied returns all stored receipts.
     * @returns The stored receipts.
     */
    receipts(migratedAt?: number): Promise<IReceiptsResponse>;

    /**
     * Get the list of peers.
     * @returns The list of peers.
     */
    peers(): Promise<IPeer[]>;

    /**
     * Add a new peer.
     * @param multiAddress The address of the peer to add.
     * @param alias An optional alias for the peer.
     * @returns The details for the created peer.
     */
    peerAdd(multiAddress: string, alias?: string): Promise<IPeer>;

    /**
     * Delete a peer.
     * @param peerId The peer to delete.
     * @returns Nothing.
     */
    peerDelete(peerId: string): Promise<void>;

    /**
     * Get a peer.
     * @param peerId The peer to delete.
     * @returns The details for the created peer.
     */
    peer(peerId: string): Promise<IPeer>;
}

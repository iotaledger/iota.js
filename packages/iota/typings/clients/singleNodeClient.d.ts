import type { IChildrenResponse } from "../models/api/IChildrenResponse";
import type { IMilestoneResponse } from "../models/api/IMilestoneResponse";
import type { IMilestoneUtxoChangesResponse } from "../models/api/IMilestoneUtxoChangesResponse";
import type { IOutputResponse } from "../models/api/IOutputResponse";
import type { IReceiptsResponse } from "../models/api/IReceiptsResponse";
import type { ITipsResponse } from "../models/api/ITipsResponse";
import type { IClient } from "../models/IClient";
import type { IMessage } from "../models/IMessage";
import type { IMessageMetadata } from "../models/IMessageMetadata";
import type { INodeInfo } from "../models/INodeInfo";
import type { IPeer } from "../models/IPeer";
import type { ITreasury } from "../models/ITreasury";
import type { SingleNodeClientOptions } from "./singleNodeClientOptions";
/**
 * Client for API communication.
 */
export declare class SingleNodeClient implements IClient {
    /**
     * Create a new instance of client.
     * @param endpoint The endpoint.
     * @param options Options for the client.
     */
    constructor(endpoint: string, options?: SingleNodeClientOptions);
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
    /**
     * Get the bech 32 human readable part.
     * @returns The bech 32 human readable part.
     */
    bech32Hrp(): Promise<string>;
    /**
     * Get the network name.
     * @returns The network name.
     */
    networkName(): Promise<string>;
    /**
     * Get the network id.
     * @returns The network id as the blake256 bytes.
     */
    networkId(): Promise<Uint8Array>;
    /**
     * Extension method which provides request methods for plugins.
     * @param basePluginPath The base path for the plugin eg indexer/v1/ .
     * @param method The http method.
     * @param methodPath The path for the plugin request.
     * @param queryParams Additional query params for the request.
     * @param request The request object.
     * @returns The response object.
     */
    pluginFetch<T, S>(basePluginPath: string, method: "get" | "post" | "delete", methodPath: string, queryParams?: string[], request?: T): Promise<S>;
    /**
     * Combine the query params.
     * @param queryParams The quer params to combine.
     * @returns The combined query params.
     */
    private combineQueryParams;
}

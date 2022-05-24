// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IMilestonePayload } from "../index-browser";
import type { IChildrenResponse } from "./api/IChildrenResponse";
import type { IMilestoneUtxoChangesResponse } from "./api/IMilestoneUtxoChangesResponse";
import type { IOutputMetadataResponse } from "./api/IOutputMetadataResponse";
import type { IOutputResponse } from "./api/IOutputResponse";
import type { IReceiptsResponse } from "./api/IReceiptsResponse";
import type { ITipsResponse } from "./api/ITipsResponse";
import type { IBlock } from "./IBlock";
import type { IBlockMetadata } from "./IBlockMetadata";
import type { IBlockPartial } from "./IBlockPartial";
import type { INodeInfo } from "./info/INodeInfo";
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
     * Get the block data by id.
     * @param blockId The block to get the data for.
     * @returns The block data.
     */
    block(blockId: string): Promise<IBlock>;

    /**
     * Get the block metadata by id.
     * @param blockId The block to get the metadata for.
     * @returns The block metadata.
     */
    blockMetadata(blockId: string): Promise<IBlockMetadata>;

    /**
     * Get the block raw data by id.
     * @param blockId The block to get the data for.
     * @returns The block raw data.
     */
    blockRaw(blockId: string): Promise<Uint8Array>;

    /**
     * Submit block.
     * @param partialBlock The block to submit.
     * @returns The blockId.
     */
    blockSubmit(partialBlock: IBlockPartial): Promise<string>;

    /**
     * Submit block in raw format.
     * @param block The block to submit.
     * @returns The blockId.
     */
    blockSubmitRaw(block: Uint8Array): Promise<string>;

    /**
     * Get the children of a block.
     * @param blockId The id of the block to get the children for.
     * @returns The blocks children.
     */
    blockChildren(blockId: string): Promise<IChildrenResponse>;

    /**
     * Get the block that was included in the ledger for a transaction.
     * @param transactionId The id of the transaction to get the included block for.
     * @returns The block.
     */
    transactionIncludedBlock(transactionId: string): Promise<IBlock>;

    /**
     * Get raw block that was included in the ledger for a transaction.
     * @param transactionId The id of the transaction to get the included block for.
     * @returns The block.
     */
    transactionIncludedBlockRaw(transactionId: string): Promise<Uint8Array>;

    /**
     * Get an output by its identifier.
     * @param outputId The id of the output to get.
     * @returns The output details.
     */
    output(outputId: string): Promise<IOutputResponse>;

    /**
     * Get an outputs metadata by its identifier.
     * @param outputId The id of the output to get the metadata for.
     * @returns The output metadata.
     */
    outputMetadata(outputId: string): Promise<IOutputMetadataResponse>;

    /**
     * Get an outputs raw data.
     * @param outputId The id of the output to get the raw data for.
     * @returns The output metadata.
     */
    outputRaw(outputId: string): Promise<Uint8Array>;

    /**
     * Get the requested milestone.
     * @param index The index of the milestone to look up.
     * @returns The milestone payload.
     */
    milestoneByIndex(index: number): Promise<IMilestonePayload>;

    /**
     * Get the requested milestone raw.
     * @param index The index of the milestone to look up.
     * @returns The milestone payload raw.
     */
    milestoneByIndexRaw(index: number): Promise<Uint8Array>;

    /**
     * Get the requested milestone utxo changes.
     * @param index The index of the milestone to request the changes for.
     * @returns The milestone utxo changes details.
     */
    milestoneUtxoChangesByIndex(index: number): Promise<IMilestoneUtxoChangesResponse>;

    /**
     * Get the requested milestone.
     * @param milestoneId The id of the milestone to look up.
     * @returns The milestone payload.
     */
    milestoneById(milestoneId: string): Promise<IMilestonePayload>;

    /**
     * Get the requested milestone raw.
     * @param milestoneId The id of the milestone to look up.
     * @returns The milestone payload raw.
     */
    milestoneByIdRaw(milestoneId: string): Promise<Uint8Array>;

    /**
     * Get the requested milestone utxo changes.
     * @param milestoneId The id of the milestone to request the changes for.
     * @returns The milestone utxo changes details.
     */
    milestoneUtxoChangesById(milestoneId: string): Promise<IMilestoneUtxoChangesResponse>;

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
     * Get the protocol info from the node.
     * @returns The protocol info.
     */
    protocolInfo(): Promise<{
        /**
         * The human friendly name of the network on which the node operates on.
         */
        networkName: string;

        /**
         * The network id as a string encoded 64 bit number.
         */
        networkId: string;

        /**
         * The human readable part of bech32 addresses.
         */
        bech32HRP: string;

        /**
         * The minimum score required for PoW.
         */
        minPoWScore: number;
    }>;

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
}

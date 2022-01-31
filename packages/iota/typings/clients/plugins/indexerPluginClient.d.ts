import type { IOutputsResponse } from "../../models/api/plugins/indexer/IOutputsResponse";
import type { IClient } from "../../models/IClient";
/**
 * Indexer plugin which provides access to the indexer plugin API.
 */
export declare class IndexerPluginClient {
    /**
     * The client to perform the communications through.
     */
    private readonly _client;
    /**
     * The base plugin path.
     */
    private readonly _basePluginPath;
    /**
     * Create a new instance of IndexerPluginClient.
     * @param client The client for communications.
     * @param options Options for the plugin.
     * @param options.basePluginPath Base path for the plugin routes,
     * relative to client basePluginPath, defaults to indexer/v1/ .
     */
    constructor(client: IClient | string, options?: {
        basePluginPath?: string;
    });
    /**
     * Find outputs using filter options.
     * @param filterOptions The options for filtering.
     * @param filterOptions.addressBech32 Filter outputs that are unlockable by the address.
     * @param filterOptions.requiresDustReturn Filter outputs by those with a dust return.
     * @param filterOptions.senderBech32 Filter outputs by the sender.
     * @param filterOptions.tagHex Filter outputs by the tag in hex format.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.offset Request the items from the given offset, return from a previous request.
     * @returns The outputs with the requested filters.
     */
    outputs(filterOptions?: {
        addressBech32?: string;
        requiresDustReturn?: boolean;
        senderBech32?: string;
        tagHex?: string;
        pageSize?: number;
        offset?: string;
    }): Promise<IOutputsResponse>;
    /**
     * Find alises using filter options.
     * @param filterOptions The options for filtering.
     * @param filterOptions.stateControllerBech32 Filter for a certain state controller address.
     * @param filterOptions.governorBech32 Filter for a certain governance controller address.
     * @param filterOptions.issuerBech32 Filter for a certain issuer.
     * @param filterOptions.senderBech32 Filter outputs by the sender.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.offset Request the items from the given offset, return from a previous request.
     * @returns The outputs with the requested filters.
     */
    aliases(filterOptions?: {
        stateControllerBech32?: string;
        governorBech32?: boolean;
        issuerBech32?: string;
        senderBech32?: string;
        pageSize?: number;
        offset?: string;
    }): Promise<IOutputsResponse>;
    /**
     * Get the output for an alias.
     * @param aliasId The alias to get the output for.
     * @returns The output.
     */
    alias(aliasId: string): Promise<IOutputsResponse>;
    /**
     * Find nfts using filter options.
     * @param filterOptions The options for filtering.
     * @param filterOptions.addressBech32 Filter outputs that are unlockable by the address.
     * @param filterOptions.requiresDustReturn Filter outputs by those with a dust return.
     * @param filterOptions.issuerBech32 Filter outputs by the issuer.
     * @param filterOptions.senderBech32 Filter outputs by the sender.
     * @param filterOptions.tagHex Filter outputs by the tag in hex format.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.offset Request the items from the given offset, return from a previous request.
     * @returns The outputs with the requested filters.
     */
    nfts(filterOptions?: {
        addressBech32?: string;
        requiresDustReturn?: boolean;
        issuerBech32?: string;
        senderBech32?: string;
        tagHex?: string;
        pageSize?: number;
        offset?: string;
    }): Promise<IOutputsResponse>;
    /**
     * Get the output for a nft.
     * @param nftId The nft to get the output for.
     * @returns The output.
     */
    nft(nftId: string): Promise<IOutputsResponse>;
    /**
     * Find foundries using filter options.
     * @param filterOptions The options for filtering.
     * @param filterOptions.addressBech32 Filter outputs that are unlockable by the address.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.offset Request the items from the given offset, return from a previous request.
     * @returns The outputs with the requested filters.
     */
    foundries(filterOptions?: {
        addressBech32?: string;
        pageSize?: number;
        offset?: string;
    }): Promise<IOutputsResponse>;
    /**
     * Get the output for a foundry.
     * @param foundryId The foundry to get the output for.
     * @returns The output.
     */
    foundry(foundryId: string): Promise<IOutputsResponse>;
}

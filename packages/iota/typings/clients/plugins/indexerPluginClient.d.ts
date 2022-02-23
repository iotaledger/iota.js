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
     * @param filterOptions.hasStorageReturnCondition Filter for outputs having a storage return unlock condition.
     * @param filterOptions.storageReturnAddressBech32 Filter for outputs with a certain storage return address.
     * @param filterOptions.hasExpirationCondition Filter for outputs having an expiration unlock condition.
     * @param filterOptions.expirationReturnAddressBech32 Filter for outputs with a certain expiration return address.
     * @param filterOptions.expiresBefore Filter for outputs that expire before a certain unix time.
     * @param filterOptions.expiresAfter Filter for outputs that expire after a certain unix time.
     * @param filterOptions.expiresBeforeMilestone Filter for outputs that expire before a certain milestone index.
     * @param filterOptions.expiresAfterMilestone Filter for outputs that expire after a certain milestone index.
     * @param filterOptions.hasTimelockCondition Filter for outputs having a timelock unlock condition.
     * @param filterOptions.timelockedBefore Filter for outputs that are timelocked before a certain unix time.
     * @param filterOptions.timelockedAfter Filter for outputs that are timelocked after a certain unix time.
     * @param filterOptions.timelockedBeforeMilestone Filter for outputs that are timelocked before a certain
     * milestone index.
     * @param filterOptions.timelockedAfterMilestone Filter for outputs that are timelocked after a certain
     * milestone index.
     * @param filterOptions.hasNativeTokens Filter for outputs having native tokens.
     * @param filterOptions.minNativeTokenCount Filter for outputs that have at least an amount of native tokens.
     * @param filterOptions.maxNativeTokenCount Filter for outputs that have at the most an amount of native tokens.
     * @param filterOptions.senderBech32 Filter outputs by the sender.
     * @param filterOptions.tagHex Filter outputs by the tag in hex format.
     * @param filterOptions.createdBefore Filter for outputs that were created before the given time.
     * @param filterOptions.createdAfter Filter for outputs that were created after the given time.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.cursor Request the items from the given cursor, returned from a previous request.
     * @returns The outputs with the requested filters.
     */
    outputs(filterOptions?: {
        addressBech32?: string;
        hasStorageReturnCondition?: boolean;
        storageReturnAddressBech32?: string;
        hasExpirationCondition?: boolean;
        expirationReturnAddressBech32?: string;
        expiresBefore?: number;
        expiresAfter?: number;
        expiresBeforeMilestone?: number;
        expiresAfterMilestone?: number;
        hasTimelockCondition?: boolean;
        timelockedBefore?: number;
        timelockedAfter?: number;
        timelockedBeforeMilestone?: number;
        timelockedAfterMilestone?: number;
        hasNativeTokens?: boolean;
        minNativeTokenCount?: number;
        maxNativeTokenCount?: number;
        senderBech32?: string;
        tagHex?: string;
        createdBefore?: number;
        createdAfter?: number;
        pageSize?: number;
        cursor?: string;
    }): Promise<IOutputsResponse>;
    /**
     * Find alises using filter options.
     * @param filterOptions The options for filtering.
     * @param filterOptions.stateControllerBech32 Filter for a certain state controller address.
     * @param filterOptions.governorBech32 Filter for a certain governance controller address.
     * @param filterOptions.hasNativeTokens Filter for outputs having native tokens.
     * @param filterOptions.minNativeTokenCount Filter for outputs that have at least an amount of native tokens.
     * @param filterOptions.maxNativeTokenCount Filter for outputs that have at the most an amount of native tokens.
     * @param filterOptions.issuerBech32 Filter for a certain issuer.
     * @param filterOptions.senderBech32 Filter outputs by the sender.
     * @param filterOptions.createdBefore Filter for outputs that were created before the given time.
     * @param filterOptions.createdAfter Filter for outputs that were created after the given time.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.cursor Request the items from the given cursor, returned from a previous request.
     * @returns The outputs with the requested filters.
     */
    aliases(filterOptions?: {
        stateControllerBech32?: string;
        governorBech32?: boolean;
        issuerBech32?: string;
        senderBech32?: string;
        hasNativeTokens?: boolean;
        minNativeTokenCount?: number;
        maxNativeTokenCount?: number;
        createdBefore?: number;
        createdAfter?: number;
        pageSize?: number;
        cursor?: string;
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
     * @param filterOptions.hasStorageReturnCondition Filter for outputs having a storage return unlock condition.
     * @param filterOptions.storageReturnAddressBech32 Filter for outputs with a certain storage return address.
     * @param filterOptions.hasExpirationCondition Filter for outputs having an expiration unlock condition.
     * @param filterOptions.expirationReturnAddressBech32 Filter for outputs with a certain expiration return address.
     * @param filterOptions.expiresBefore Filter for outputs that expire before a certain unix time.
     * @param filterOptions.expiresAfter Filter for outputs that expire after a certain unix time.
     * @param filterOptions.expiresBeforeMilestone Filter for outputs that expire before a certain milestone index.
     * @param filterOptions.expiresAfterMilestone Filter for outputs that expire after a certain milestone index.
     * @param filterOptions.hasTimelockCondition Filter for outputs having a timelock unlock condition.
     * @param filterOptions.timelockedBefore Filter for outputs that are timelocked before a certain unix time.
     * @param filterOptions.timelockedAfter Filter for outputs that are timelocked after a certain unix time.
     * @param filterOptions.timelockedBeforeMilestone Filter for outputs that are timelocked before a certain
     * milestone index.
     * @param filterOptions.timelockedAfterMilestone Filter for outputs that are timelocked after a certain
     * milestone index.
     * @param filterOptions.hasNativeTokens Filter for outputs having native tokens.
     * @param filterOptions.minNativeTokenCount Filter for outputs that have at least an amount of native tokens.
     * @param filterOptions.maxNativeTokenCount Filter for outputs that have at the most an amount of native tokens.
     * @param filterOptions.issuerBech32 Filter outputs by the issuer.
     * @param filterOptions.senderBech32 Filter outputs by the sender.
     * @param filterOptions.tagHex Filter outputs by the tag in hex format.
     * @param filterOptions.createdBefore Filter for outputs that were created before the given time.
     * @param filterOptions.createdAfter Filter for outputs that were created after the given time.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.cursor Request the items from the given cursor, returned from a previous request.
     * @returns The outputs with the requested filters.
     */
    nfts(filterOptions?: {
        addressBech32?: string;
        hasStorageReturnCondition?: boolean;
        storageReturnAddressBech32?: string;
        hasExpirationCondition?: boolean;
        expirationReturnAddressBech32?: string;
        expiresBefore?: number;
        expiresAfter?: number;
        expiresBeforeMilestone?: number;
        expiresAfterMilestone?: number;
        hasTimelockCondition?: boolean;
        timelockedBefore?: number;
        timelockedAfter?: number;
        timelockedBeforeMilestone?: number;
        timelockedAfterMilestone?: number;
        hasNativeTokens?: boolean;
        minNativeTokenCount?: number;
        maxNativeTokenCount?: number;
        issuerBech32?: string;
        senderBech32?: string;
        tagHex?: string;
        createdBefore?: number;
        createdAfter?: number;
        pageSize?: number;
        cursor?: string;
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
     * @param filterOptions.aliasAddressBech32 Filter outputs that are unlockable by the address.
     * @param filterOptions.hasNativeTokens Filter for outputs having native tokens.
     * @param filterOptions.minNativeTokenCount Filter for outputs that have at least an amount of native tokens.
     * @param filterOptions.maxNativeTokenCount Filter for outputs that have at the most an amount of native tokens.
     * @param filterOptions.createdBefore Filter for outputs that were created before the given time.
     * @param filterOptions.createdAfter Filter for outputs that were created after the given time.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.cursor Request the items from the given cursor, returned from a previous request.
     * @returns The outputs with the requested filters.
     */
    foundries(filterOptions?: {
        aliasAddressBech32?: string;
        hasNativeTokens?: boolean;
        minNativeTokenCount?: number;
        maxNativeTokenCount?: number;
        createdBefore?: number;
        createdAfter?: number;
        pageSize?: number;
        cursor?: string;
    }): Promise<IOutputsResponse>;
    /**
     * Get the output for a foundry.
     * @param foundryId The foundry to get the output for.
     * @returns The output.
     */
    foundry(foundryId: string): Promise<IOutputsResponse>;
}

// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import type { IOutputsResponse } from "../../models/api/plugins/indexer/IOutputsResponse";
import type { IClient } from "../../models/IClient";
import { SingleNodeClient } from "../singleNodeClient";

/**
 * Indexer plugin which provides access to the indexer plugin API.
 */
export class IndexerPluginClient {
    /**
     * The client to perform the communications through.
     */
    private readonly _client: IClient;

    /**
     * The base plugin path.
     */
    private readonly _basePluginPath: string;

    /**
     * Create a new instance of IndexerPluginClient.
     * @param client The client for communications.
     * @param options Options for the plugin.
     * @param options.basePluginPath Base path for the plugin routes,
     * relative to client basePluginPath, defaults to indexer/v1/ .
     */
    constructor(client: IClient | string, options?: {
        basePluginPath?: string;
    }) {
        this._client = typeof client === "string" ? new SingleNodeClient(client) : client;
        this._basePluginPath = options?.basePluginPath ?? "indexer/v1/";
    }

    /**
     * Find outputs using filter options.
     * @param filterOptions The options for filtering.
     * @param filterOptions.addressBech32 Filter outputs that are unlockable by the address.
     * @param filterOptions.hasDustReturnCondition Filter for outputs having a dust return unlock condition.
     * @param filterOptions.dustReturnAddressBech32 Filter for outputs with a certain dust return address.
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
    public async outputs(filterOptions?: {
        addressBech32?: string;
        hasDustReturnCondition?: boolean;
        dustReturnAddressBech32?: string;
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
    }): Promise<IOutputsResponse> {
        const queryParams = [];
        if (filterOptions) {
            if (filterOptions.addressBech32 !== undefined) {
                queryParams.push(`address=${filterOptions.addressBech32}`);
            }
            if (filterOptions.hasDustReturnCondition) {
                queryParams.push(`hasDustReturnCondition=${filterOptions.hasDustReturnCondition}`);
            }
            if (filterOptions.dustReturnAddressBech32 !== undefined) {
                queryParams.push(`dustReturnAddress=${filterOptions.dustReturnAddressBech32}`);
            }
            if (filterOptions.hasExpirationCondition) {
                queryParams.push(`hasExpirationCondition=${filterOptions.hasExpirationCondition}`);
            }
            if (filterOptions.expirationReturnAddressBech32 !== undefined) {
                queryParams.push(`expirationReturnAddress=${filterOptions.expirationReturnAddressBech32}`);
            }
            if (filterOptions.expiresBefore !== undefined) {
                queryParams.push(`expiresBefore=${filterOptions.expiresBefore}`);
            }
            if (filterOptions.expiresAfter !== undefined) {
                queryParams.push(`expiresAfter=${filterOptions.expiresAfter}`);
            }
            if (filterOptions.expiresBeforeMilestone !== undefined) {
                queryParams.push(`expiresBeforeMilestone=${filterOptions.expiresBeforeMilestone}`);
            }
            if (filterOptions.expiresAfterMilestone !== undefined) {
                queryParams.push(`expiresAfterMilestone=${filterOptions.expiresAfterMilestone}`);
            }
            if (filterOptions.hasTimelockCondition !== undefined) {
                queryParams.push(`hasTimelockCondition=${filterOptions.hasTimelockCondition}`);
            }
            if (filterOptions.timelockedBefore !== undefined) {
                queryParams.push(`timelockedBefore=${filterOptions.timelockedBefore}`);
            }
            if (filterOptions.timelockedAfter !== undefined) {
                queryParams.push(`timelockedAfter=${filterOptions.timelockedAfter}`);
            }
            if (filterOptions.timelockedBefore !== undefined) {
                queryParams.push(`timelockedBefore=${filterOptions.timelockedBefore}`);
            }
            if (filterOptions.timelockedAfter !== undefined) {
                queryParams.push(`timelockedAfter=${filterOptions.timelockedAfter}`);
            }
            if (filterOptions.timelockedBeforeMilestone !== undefined) {
                queryParams.push(`timelockedBeforeMilestone=${filterOptions.timelockedBeforeMilestone}`);
            }
            if (filterOptions.timelockedAfterMilestone !== undefined) {
                queryParams.push(`timelockedAfterMilestone=${filterOptions.timelockedAfterMilestone}`);
            }
            if (filterOptions.hasNativeTokens !== undefined) {
                queryParams.push(`hasNativeTokens=${filterOptions.hasNativeTokens}`);
            }
            if (filterOptions.minNativeTokenCount !== undefined) {
                queryParams.push(`minNativeTokenCount=${filterOptions.minNativeTokenCount}`);
            }
            if (filterOptions.maxNativeTokenCount !== undefined) {
                queryParams.push(`maxNativeTokenCount=${filterOptions.maxNativeTokenCount}`);
            }
            if (filterOptions.senderBech32 !== undefined) {
                queryParams.push(`sender=${filterOptions.senderBech32}`);
            }
            if (filterOptions.tagHex !== undefined) {
                queryParams.push(`tag=${filterOptions.tagHex}`);
            }
            if (filterOptions.createdBefore !== undefined) {
                queryParams.push(`createdBefore=${filterOptions.createdBefore}`);
            }
            if (filterOptions.createdAfter !== undefined) {
                queryParams.push(`createdAfter=${filterOptions.createdAfter}`);
            }
            if (filterOptions.pageSize !== undefined) {
                queryParams.push(`pageSize=${filterOptions.pageSize}`);
            }
            if (filterOptions.cursor !== undefined) {
                queryParams.push(`cursor=${filterOptions.cursor}`);
            }
        }
        return this._client.pluginFetch<never, IOutputsResponse>(
            this._basePluginPath,
            "get",
            "outputs",
            queryParams
        );
    }

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
    public async aliases(filterOptions?: {
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
    }): Promise<IOutputsResponse> {
        const queryParams = [];
        if (filterOptions) {
            if (filterOptions.stateControllerBech32 !== undefined) {
                queryParams.push(`stateController=${filterOptions.stateControllerBech32}`);
            }
            if (filterOptions.governorBech32 !== undefined) {
                queryParams.push(`governor=${filterOptions.governorBech32}`);
            }
            if (filterOptions.hasNativeTokens !== undefined) {
                queryParams.push(`hasNativeTokens=${filterOptions.hasNativeTokens}`);
            }
            if (filterOptions.minNativeTokenCount !== undefined) {
                queryParams.push(`minNativeTokenCount=${filterOptions.minNativeTokenCount}`);
            }
            if (filterOptions.maxNativeTokenCount !== undefined) {
                queryParams.push(`maxNativeTokenCount=${filterOptions.maxNativeTokenCount}`);
            }
            if (filterOptions.issuerBech32 !== undefined) {
                queryParams.push(`issuer=${filterOptions.issuerBech32}`);
            }
            if (filterOptions.senderBech32 !== undefined) {
                queryParams.push(`sender=${filterOptions.senderBech32}`);
            }
            if (filterOptions.createdBefore !== undefined) {
                queryParams.push(`createdBefore=${filterOptions.createdBefore}`);
            }
            if (filterOptions.createdAfter !== undefined) {
                queryParams.push(`createdAfter=${filterOptions.createdAfter}`);
            }
            if (filterOptions.pageSize !== undefined) {
                queryParams.push(`pageSize=${filterOptions.pageSize}`);
            }
            if (filterOptions.cursor !== undefined) {
                queryParams.push(`cursor=${filterOptions.cursor}`);
            }
        }
        return this._client.pluginFetch<never, IOutputsResponse>(
            this._basePluginPath,
            "get",
            "aliases",
            queryParams
        );
    }

    /**
     * Get the output for an alias.
     * @param aliasId The alias to get the output for.
     * @returns The output.
     */
    public async alias(aliasId: string): Promise<IOutputsResponse> {
        if (!Converter.isHex(aliasId)) {
            throw new Error("The alias id does not appear to be hex format");
        }
        return this._client.pluginFetch<never, IOutputsResponse>(
            this._basePluginPath,
            "get",
            `aliases/${aliasId}`
        );
    }

    /**
     * Find nfts using filter options.
     * @param filterOptions The options for filtering.
     * @param filterOptions.addressBech32 Filter outputs that are unlockable by the address.
     * @param filterOptions.hasDustReturnCondition Filter for outputs having a dust return unlock condition.
     * @param filterOptions.dustReturnAddressBech32 Filter for outputs with a certain dust return address.
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
    public async nfts(filterOptions?: {
        addressBech32?: string;
        hasDustReturnCondition?: boolean;
        dustReturnAddressBech32?: string;
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
    }): Promise<IOutputsResponse> {
        const queryParams = [];
        if (filterOptions) {
            if (filterOptions.addressBech32 !== undefined) {
                queryParams.push(`address=${filterOptions.addressBech32}`);
            }
            if (filterOptions.hasDustReturnCondition) {
                queryParams.push(`hasDustReturnCondition=${filterOptions.hasDustReturnCondition}`);
            }
            if (filterOptions.dustReturnAddressBech32 !== undefined) {
                queryParams.push(`dustReturnAddress=${filterOptions.dustReturnAddressBech32}`);
            }
            if (filterOptions.hasExpirationCondition) {
                queryParams.push(`hasExpirationCondition=${filterOptions.hasExpirationCondition}`);
            }
            if (filterOptions.expirationReturnAddressBech32 !== undefined) {
                queryParams.push(`expirationReturnAddress=${filterOptions.expirationReturnAddressBech32}`);
            }
            if (filterOptions.expiresBefore !== undefined) {
                queryParams.push(`expiresBefore=${filterOptions.expiresBefore}`);
            }
            if (filterOptions.expiresAfter !== undefined) {
                queryParams.push(`expiresAfter=${filterOptions.expiresAfter}`);
            }
            if (filterOptions.expiresBeforeMilestone !== undefined) {
                queryParams.push(`expiresBeforeMilestone=${filterOptions.expiresBeforeMilestone}`);
            }
            if (filterOptions.expiresAfterMilestone !== undefined) {
                queryParams.push(`expiresAfterMilestone=${filterOptions.expiresAfterMilestone}`);
            }
            if (filterOptions.hasTimelockCondition !== undefined) {
                queryParams.push(`hasTimelockCondition=${filterOptions.hasTimelockCondition}`);
            }
            if (filterOptions.timelockedBefore !== undefined) {
                queryParams.push(`timelockedBefore=${filterOptions.timelockedBefore}`);
            }
            if (filterOptions.timelockedAfter !== undefined) {
                queryParams.push(`timelockedAfter=${filterOptions.timelockedAfter}`);
            }
            if (filterOptions.timelockedBeforeMilestone !== undefined) {
                queryParams.push(`timelockedBeforeMilestone=${filterOptions.timelockedBeforeMilestone}`);
            }
            if (filterOptions.timelockedAfterMilestone !== undefined) {
                queryParams.push(`timelockedAfterMilestone=${filterOptions.timelockedAfterMilestone}`);
            }
            if (filterOptions.hasNativeTokens !== undefined) {
                queryParams.push(`hasNativeTokens=${filterOptions.hasNativeTokens}`);
            }
            if (filterOptions.minNativeTokenCount !== undefined) {
                queryParams.push(`minNativeTokenCount=${filterOptions.minNativeTokenCount}`);
            }
            if (filterOptions.maxNativeTokenCount !== undefined) {
                queryParams.push(`maxNativeTokenCount=${filterOptions.maxNativeTokenCount}`);
            }
            if (filterOptions.issuerBech32 !== undefined) {
                queryParams.push(`issuer=${filterOptions.issuerBech32}`);
            }
            if (filterOptions.senderBech32 !== undefined) {
                queryParams.push(`sender=${filterOptions.senderBech32}`);
            }
            if (filterOptions.tagHex !== undefined) {
                queryParams.push(`tag=${filterOptions.tagHex}`);
            }
            if (filterOptions.createdBefore !== undefined) {
                queryParams.push(`createdBefore=${filterOptions.createdBefore}`);
            }
            if (filterOptions.createdAfter !== undefined) {
                queryParams.push(`createdAfter=${filterOptions.createdAfter}`);
            }
            if (filterOptions.pageSize !== undefined) {
                queryParams.push(`pageSize=${filterOptions.pageSize}`);
            }
            if (filterOptions.cursor !== undefined) {
                queryParams.push(`cursor=${filterOptions.cursor}`);
            }
        }
        return this._client.pluginFetch<never, IOutputsResponse>(
            this._basePluginPath,
            "get",
            "nfts",
            queryParams
        );
    }

    /**
     * Get the output for a nft.
     * @param nftId The nft to get the output for.
     * @returns The output.
     */
    public async nft(nftId: string): Promise<IOutputsResponse> {
        if (!Converter.isHex(nftId)) {
            throw new Error("The nft id does not appear to be hex format");
        }
        return this._client.pluginFetch<never, IOutputsResponse>(
            this._basePluginPath,
            "get",
            `nfts/${nftId}`
        );
    }

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
    public async foundries(filterOptions?: {
        aliasAddressBech32?: string;
        hasNativeTokens?: boolean;
        minNativeTokenCount?: number;
        maxNativeTokenCount?: number;
        createdBefore?: number;
        createdAfter?: number;
        pageSize?: number;
        cursor?: string;
    }): Promise<IOutputsResponse> {
        const queryParams = [];
        if (filterOptions) {
            if (filterOptions.aliasAddressBech32 !== undefined) {
                queryParams.push(`aliasAddress=${filterOptions.aliasAddressBech32}`);
            }
            if (filterOptions.hasNativeTokens !== undefined) {
                queryParams.push(`hasNativeTokens=${filterOptions.hasNativeTokens}`);
            }
            if (filterOptions.minNativeTokenCount !== undefined) {
                queryParams.push(`minNativeTokenCount=${filterOptions.minNativeTokenCount}`);
            }
            if (filterOptions.maxNativeTokenCount !== undefined) {
                queryParams.push(`maxNativeTokenCount=${filterOptions.maxNativeTokenCount}`);
            }
            if (filterOptions.createdBefore !== undefined) {
                queryParams.push(`createdBefore=${filterOptions.createdBefore}`);
            }
            if (filterOptions.createdAfter !== undefined) {
                queryParams.push(`createdAfter=${filterOptions.createdAfter}`);
            }
            if (filterOptions.pageSize !== undefined) {
                queryParams.push(`pageSize=${filterOptions.pageSize}`);
            }
            if (filterOptions.cursor !== undefined) {
                queryParams.push(`cursor=${filterOptions.cursor}`);
            }
        }
        return this._client.pluginFetch<never, IOutputsResponse>(
            this._basePluginPath,
            "get",
            "foundries",
            queryParams
        );
    }

    /**
     * Get the output for a foundry.
     * @param foundryId The foundry to get the output for.
     * @returns The output.
     */
    public async foundry(foundryId: string): Promise<IOutputsResponse> {
        if (!Converter.isHex(foundryId)) {
            throw new Error("The foundry id does not appear to be hex format");
        }
        return this._client.pluginFetch<never, IOutputsResponse>(
            this._basePluginPath,
            "get",
            `foundries/${foundryId}`
        );
    }
}

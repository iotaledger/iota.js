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
     * @param filterOptions.requiresDustReturn Filter outputs by those with a dust return.
     * @param filterOptions.senderBech32 Filter outputs by the sender.
     * @param filterOptions.tagHex Filter outputs by the tag in hex format.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.offset Request the items from the given offset, return from a previous request.
     * @returns The outputs with the requested filters.
     */
    public async outputs(filterOptions?: {
        addressBech32?: string;
        requiresDustReturn?: boolean;
        senderBech32?: string;
        tagHex?: string;
        pageSize?: number;
        offset?: string;
    }): Promise<IOutputsResponse> {
        const queryParams = [];
        if (filterOptions) {
            if (filterOptions.addressBech32 !== undefined) {
                queryParams.push(`address=${filterOptions.addressBech32}`);
            }
            if (filterOptions.requiresDustReturn) {
                queryParams.push(`requiresDustReturn=${filterOptions.requiresDustReturn}`);
            }
            if (filterOptions.senderBech32 !== undefined) {
                queryParams.push(`sender=${filterOptions.senderBech32}`);
            }
            if (filterOptions.tagHex !== undefined) {
                queryParams.push(`tag=${filterOptions.tagHex}`);
            }
            if (filterOptions.pageSize !== undefined) {
                queryParams.push(`pageSize=${filterOptions.pageSize}`);
            }
            if (filterOptions.offset !== undefined) {
                queryParams.push(`offset=${filterOptions.offset}`);
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
     * @param filterOptions.issuerBech32 Filter for a certain issuer.
     * @param filterOptions.senderBech32 Filter outputs by the sender.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.offset Request the items from the given offset, return from a previous request.
     * @returns The outputs with the requested filters.
     */
    public async aliases(filterOptions?: {
        stateControllerBech32?: string;
        governorBech32?: boolean;
        issuerBech32?: string;
        senderBech32?: string;
        pageSize?: number;
        offset?: string;
    }): Promise<IOutputsResponse> {
        const queryParams = [];
        if (filterOptions) {
            if (filterOptions.stateControllerBech32 !== undefined) {
                queryParams.push(`stateController=${filterOptions.stateControllerBech32}`);
            }
            if (filterOptions.governorBech32 !== undefined) {
                queryParams.push(`governor=${filterOptions.governorBech32}`);
            }
            if (filterOptions.issuerBech32 !== undefined) {
                queryParams.push(`issuer=${filterOptions.issuerBech32}`);
            }
            if (filterOptions.senderBech32 !== undefined) {
                queryParams.push(`sender=${filterOptions.senderBech32}`);
            }
            if (filterOptions.pageSize !== undefined) {
                queryParams.push(`pageSize=${filterOptions.pageSize}`);
            }
            if (filterOptions.offset !== undefined) {
                queryParams.push(`offset=${filterOptions.offset}`);
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
     * @param filterOptions.requiresDustReturn Filter outputs by those with a dust return.
     * @param filterOptions.issuerBech32 Filter outputs by the issuer.
     * @param filterOptions.senderBech32 Filter outputs by the sender.
     * @param filterOptions.tagHex Filter outputs by the tag in hex format.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.offset Request the items from the given offset, return from a previous request.
     * @returns The outputs with the requested filters.
     */
    public async nfts(filterOptions?: {
        addressBech32?: string;
        requiresDustReturn?: boolean;
        issuerBech32?: string;
        senderBech32?: string;
        tagHex?: string;
        pageSize?: number;
        offset?: string;
    }): Promise<IOutputsResponse> {
        const queryParams = [];
        if (filterOptions) {
            if (filterOptions.addressBech32 !== undefined) {
                queryParams.push(`address=${filterOptions.addressBech32}`);
            }
            if (filterOptions.requiresDustReturn) {
                queryParams.push(`requiresDustReturn=${filterOptions.requiresDustReturn}`);
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
            if (filterOptions.pageSize !== undefined) {
                queryParams.push(`pageSize=${filterOptions.pageSize}`);
            }
            if (filterOptions.offset !== undefined) {
                queryParams.push(`offset=${filterOptions.offset}`);
            }
        }
        return this._client.pluginFetch<never, IOutputsResponse>(
            this._basePluginPath,
            "get",
            "nft",
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
            `nft/${nftId}`
        );
    }

    /**
     * Find foundries using filter options.
     * @param filterOptions The options for filtering.
     * @param filterOptions.addressBech32 Filter outputs that are unlockable by the address.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.offset Request the items from the given offset, return from a previous request.
     * @returns The outputs with the requested filters.
     */
    public async foundries(filterOptions?: {
        addressBech32?: string;
        pageSize?: number;
        offset?: string;
    }): Promise<IOutputsResponse> {
        const queryParams = [];
        if (filterOptions) {
            if (filterOptions.addressBech32 !== undefined) {
                queryParams.push(`address=${filterOptions.addressBech32}`);
            }
            if (filterOptions.pageSize !== undefined) {
                queryParams.push(`pageSize=${filterOptions.pageSize}`);
            }
            if (filterOptions.offset !== undefined) {
                queryParams.push(`offset=${filterOptions.offset}`);
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

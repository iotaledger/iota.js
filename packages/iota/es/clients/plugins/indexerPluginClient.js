// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { SingleNodeClient } from "../singleNodeClient";
/**
 * Indexer plugin which provides access to the indexer plugin API.
 */
export class IndexerPluginClient {
    /**
     * Create a new instance of IndexerPluginClient.
     * @param client The client for communications.
     * @param options Options for the plugin.
     * @param options.basePluginPath Base path for the plugin routes,
     * relative to client basePluginPath, defaults to indexer/v1/ .
     */
    constructor(client, options) {
        var _a;
        this._client = typeof client === "string" ? new SingleNodeClient(client) : client;
        this._basePluginPath = (_a = options === null || options === void 0 ? void 0 : options.basePluginPath) !== null && _a !== void 0 ? _a : "indexer/v1/";
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
    async outputs(filterOptions) {
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
        return this._client.pluginFetch(this._basePluginPath, "get", "outputs", queryParams);
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
    async aliases(filterOptions) {
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
        return this._client.pluginFetch(this._basePluginPath, "get", "aliases", queryParams);
    }
    /**
     * Get the output for an alias.
     * @param aliasId The alias to get the output for.
     * @returns The output.
     */
    async alias(aliasId) {
        if (!Converter.isHex(aliasId)) {
            throw new Error("The alias id does not appear to be hex format");
        }
        return this._client.pluginFetch(this._basePluginPath, "get", `aliases/${aliasId}`);
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
    async nfts(filterOptions) {
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
        return this._client.pluginFetch(this._basePluginPath, "get", "nft", queryParams);
    }
    /**
     * Get the output for a nft.
     * @param nftId The nft to get the output for.
     * @returns The output.
     */
    async nft(nftId) {
        if (!Converter.isHex(nftId)) {
            throw new Error("The nft id does not appear to be hex format");
        }
        return this._client.pluginFetch(this._basePluginPath, "get", `nft/${nftId}`);
    }
    /**
     * Find foundries using filter options.
     * @param filterOptions The options for filtering.
     * @param filterOptions.addressBech32 Filter outputs that are unlockable by the address.
     * @param filterOptions.pageSize Set the page size for the response.
     * @param filterOptions.offset Request the items from the given offset, return from a previous request.
     * @returns The outputs with the requested filters.
     */
    async foundries(filterOptions) {
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
        return this._client.pluginFetch(this._basePluginPath, "get", "foundries", queryParams);
    }
    /**
     * Get the output for a foundry.
     * @param foundryId The foundry to get the output for.
     * @returns The output.
     */
    async foundry(foundryId) {
        if (!Converter.isHex(foundryId)) {
            throw new Error("The foundry id does not appear to be hex format");
        }
        return this._client.pluginFetch(this._basePluginPath, "get", `foundries/${foundryId}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhlclBsdWdpbkNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnRzL3BsdWdpbnMvaW5kZXhlclBsdWdpbkNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sbUJBQW1CO0lBVzVCOzs7Ozs7T0FNRztJQUNILFlBQVksTUFBd0IsRUFBRSxPQUVyQzs7UUFDRyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsY0FBYyxtQ0FBSSxhQUFhLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBT3BCO1FBQ0csTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksYUFBYSxFQUFFO1lBQ2YsSUFBSSxhQUFhLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDM0MsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2FBQzlEO1lBQ0QsSUFBSSxhQUFhLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ2xDLFdBQVcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7YUFDOUU7WUFDRCxJQUFJLGFBQWEsQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO2dC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
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
    async outputs(filterOptions) {
        const queryParams = [];
        if (filterOptions) {
            if (filterOptions.addressBech32 !== undefined) {
                queryParams.push(`address=${filterOptions.addressBech32}`);
            }
            if (filterOptions.hasStorageReturnCondition) {
                queryParams.push(`hasStorageReturnCondition=${filterOptions.hasStorageReturnCondition}`);
            }
            if (filterOptions.storageReturnAddressBech32 !== undefined) {
                queryParams.push(`storageReturnAddress=${filterOptions.storageReturnAddressBech32}`);
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
        return this._client.pluginFetch(this._basePluginPath, "get", "outputs", queryParams);
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
    async aliases(filterOptions) {
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
    async nfts(filterOptions) {
        const queryParams = [];
        if (filterOptions) {
            if (filterOptions.addressBech32 !== undefined) {
                queryParams.push(`address=${filterOptions.addressBech32}`);
            }
            if (filterOptions.hasStorageReturnCondition) {
                queryParams.push(`hasStorageReturnCondition=${filterOptions.hasStorageReturnCondition}`);
            }
            if (filterOptions.storageReturnAddressBech32 !== undefined) {
                queryParams.push(`storageReturnAddress=${filterOptions.storageReturnAddressBech32}`);
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
        return this._client.pluginFetch(this._basePluginPath, "get", "nfts", queryParams);
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
        return this._client.pluginFetch(this._basePluginPath, "get", `nfts/${nftId}`);
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
    async foundries(filterOptions) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhlclBsdWdpbkNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnRzL3BsdWdpbnMvaW5kZXhlclBsdWdpbkNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sbUJBQW1CO0lBVzVCOzs7Ozs7T0FNRztJQUNILFlBQVksTUFBd0IsRUFBRSxPQUVyQzs7UUFDRyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsY0FBYyxtQ0FBSSxhQUFhLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZCRztJQUNJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUF3QnBCO1FBQ0csTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksYUFBYSxFQUFFO1lBQ2YsSUFBSSxhQUFhLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDM0MsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2FBQzlEO1lBQ0QsSUFBSSxhQUFhLENBQUMseUJBQXlCLEVBQUU7Z0JBQ3pDLFdBQVcsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLGFBQWEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUM7YUFDNUY7WUFDRCxJQUFJLGFBQWEsQ0FBQywwQkFBMEIsS0FBSyxTQUFTLEVBQUU7Z0JBQ3hELFdBQVcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLGFBQWEsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUM7YUFDeEY7WUFDRCxJQUFJLGFBQWEsQ0FBQyxzQkFBc0IsRUFBRTtnQkFDdEMsV0FBVyxDQUFDLElBQUksQ0FBQywwQkFBMEIsYUFBYSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQzthQUN0RjtZQUNELElBQUksYUFBYSxDQUFDLDZCQUE2QixLQUFLLFNBQVMsRUFBRTtnQkFDM0QsV0FBVyxDQUFDLElBQUksQ0FBQywyQkFBMkIsYUFBYSxDQUFDLDZCQUE2QixFQUFFLENBQUMsQ0FBQzthQUM5RjtZQUNELElBQUksYUFBYSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7Z0JBQzNDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2FBQ3BFO1lBQ0QsSUFBSSxhQUFhLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtnQkFDMUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDbEU7WUFDRCxJQUFJLGFBQWEsQ0FBQyxzQkFBc0IsS0FBSyxTQUFTLEVBQUU7Z0JBQ3BELFdBQVcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLGFBQWEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7YUFDdEY7WUFDRCxJQUFJLGFBQWEsQ0FBQyxxQkFBcUIsS0FBSyxTQUFTLEVBQUU7Z0JBQ25ELFdBQVcsQ0FBQyxJQUFJLENBQUMseUJBQXlCLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7YUFDcEY7WUFDRCxJQUFJLGFBQWEsQ0FBQyxvQkFBb0IsS0FBSyxTQUFTLEVBQUU7Z0JBQ2xELFdBQVcsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLGFBQWEsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7YUFDbEY7WUFDRCxJQUFJLGFBQWEsQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLEVBQUU7Z0JBQzlDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7YUFDMUU7WUFDRCxJQUFJLGFBQWEsQ0FBQyxlQUFlLEtBQUssU0FBUyxFQUFFO2dCQUM3QyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixhQUFhLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQzthQUN4RTtZQUNELElBQUksYUFBYSxDQUFDLGdCQUFnQixLQUFLLFNBQVMsRUFBRTtnQkFDOUMsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQzthQUMxRTtZQUNELElBQUksYUFBYSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUU7Z0JBQzdDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO2FBQ3hFO1lBQ0QsSUFBSSxhQUFhLENBQUMseUJBQXlCLEtBQUssU0FBUyxFQUFFO2dCQUN2RCxXQUFXLENBQUMsSUFBSSxDQUFDLDZCQUE2QixhQUFhLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO2FBQzVGO1lBQ0QsSUFBSSxhQUFhLENBQUMsd0JBQXdCLEtBQUssU0FBUyxFQUFFO2dCQUN0RCxXQUFXLENBQUMsSUFBSSxDQUFDLDRCQUE0QixhQUFhLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDO2FBQzFGO1lBQ0QsSUFBSSxhQUFhLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBRTtnQkFDN0MsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7YUFDeEU7WUFDRCxJQUFJLGFBQWEsQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7Z0JBQ2pELFdBQVcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7YUFDaEY7WUFDRCxJQUFJLGFBQWEsQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7Z0JBQ2pELFdBQVcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7YUFDaEY7WUFDRCxJQUFJLGFBQWEsQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUMxQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDNUQ7WUFDRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDbkQ7WUFDRCxJQUFJLGFBQWEsQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO2dCQUMzQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixhQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQzthQUNwRTtZQUNELElBQUksYUFBYSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7Z0JBQzFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2FBQ2xFO1lBQ0QsSUFBSSxhQUFhLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDdEMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQzFEO1lBQ0QsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3REO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUMzQixJQUFJLENBQUMsZUFBZSxFQUNwQixLQUFLLEVBQ0wsU0FBUyxFQUNULFdBQVcsQ0FDZCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFZcEI7UUFDRyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLGFBQWEsQ0FBQyxxQkFBcUIsS0FBSyxTQUFTLEVBQUU7Z0JBQ25ELFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7YUFDOUU7WUFDRCxJQUFJLGFBQWEsQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUFFO2dCQUM1QyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7YUFDaEU7WUFDRCxJQUFJLGFBQWEsQ0FBQyxlQUFlLEtBQUssU0FBUyxFQUFFO2dCQUM3QyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixhQUFhLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQzthQUN4RTtZQUNELElBQUksYUFBYSxDQUFDLG1CQUFtQixLQUFLLFNBQVMsRUFBRTtnQkFDakQsV0FBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsYUFBYSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQzthQUNoRjtZQUNELElBQUksYUFBYSxDQUFDLG1CQUFtQixLQUFLLFNBQVMsRUFBRTtnQkFDakQsV0FBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsYUFBYSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQzthQUNoRjtZQUNELElBQUksYUFBYSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7Z0JBQzFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzthQUM1RDtZQUNELElBQUksYUFBYSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7Z0JBQzFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzthQUM1RDtZQUNELElBQUksYUFBYSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7Z0JBQzNDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2FBQ3BFO1lBQ0QsSUFBSSxhQUFhLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtnQkFDMUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDbEU7WUFDRCxJQUFJLGFBQWEsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO2dCQUN0QyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDMUQ7WUFDRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDdEQ7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQzNCLElBQUksQ0FBQyxlQUFlLEVBQ3BCLEtBQUssRUFDTCxTQUFTLEVBQ1QsV0FBVyxDQUNkLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBZTtRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7U0FDcEU7UUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUMzQixJQUFJLENBQUMsZUFBZSxFQUNwQixLQUFLLEVBQ0wsV0FBVyxPQUFPLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BOEJHO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxhQXlCakI7UUFDRyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLGFBQWEsQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO2dCQUMzQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7YUFDOUQ7WUFDRCxJQUFJLGFBQWEsQ0FBQyx5QkFBeUIsRUFBRTtnQkFDekMsV0FBVyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsYUFBYSxDQUFDLHlCQUF5QixFQUFFLENBQUMsQ0FBQzthQUM1RjtZQUNELElBQUksYUFBYSxDQUFDLDBCQUEwQixLQUFLLFNBQVMsRUFBRTtnQkFDeEQsV0FBVyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsYUFBYSxDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQzthQUN4RjtZQUNELElBQUksYUFBYSxDQUFDLHNCQUFzQixFQUFFO2dCQUN0QyxXQUFXLENBQUMsSUFBSSxDQUFDLDBCQUEwQixhQUFhLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2FBQ3RGO1lBQ0QsSUFBSSxhQUFhLENBQUMsNkJBQTZCLEtBQUssU0FBUyxFQUFFO2dCQUMzRCxXQUFXLENBQUMsSUFBSSxDQUFDLDJCQUEyQixhQUFhLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDO2FBQzlGO1lBQ0QsSUFBSSxhQUFhLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDM0MsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7YUFDcEU7WUFDRCxJQUFJLGFBQWEsQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUMxQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzthQUNsRTtZQUNELElBQUksYUFBYSxDQUFDLHNCQUFzQixLQUFLLFNBQVMsRUFBRTtnQkFDcEQsV0FBVyxDQUFDLElBQUksQ0FBQywwQkFBMEIsYUFBYSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQzthQUN0RjtZQUNELElBQUksYUFBYSxDQUFDLHFCQUFxQixLQUFLLFNBQVMsRUFBRTtnQkFDbkQsV0FBVyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQzthQUNwRjtZQUNELElBQUksYUFBYSxDQUFDLG9CQUFvQixLQUFLLFNBQVMsRUFBRTtnQkFDbEQsV0FBVyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsYUFBYSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQzthQUNsRjtZQUNELElBQUksYUFBYSxDQUFDLGdCQUFnQixLQUFLLFNBQVMsRUFBRTtnQkFDOUMsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQzthQUMxRTtZQUNELElBQUksYUFBYSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUU7Z0JBQzdDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO2FBQ3hFO1lBQ0QsSUFBSSxhQUFhLENBQUMseUJBQXlCLEtBQUssU0FBUyxFQUFFO2dCQUN2RCxXQUFXLENBQUMsSUFBSSxDQUFDLDZCQUE2QixhQUFhLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO2FBQzVGO1lBQ0QsSUFBSSxhQUFhLENBQUMsd0JBQXdCLEtBQUssU0FBUyxFQUFFO2dCQUN0RCxXQUFXLENBQUMsSUFBSSxDQUFDLDRCQUE0QixhQUFhLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDO2FBQzFGO1lBQ0QsSUFBSSxhQUFhLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBRTtnQkFDN0MsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7YUFDeEU7WUFDRCxJQUFJLGFBQWEsQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7Z0JBQ2pELFdBQVcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7YUFDaEY7WUFDRCxJQUFJLGFBQWEsQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7Z0JBQ2pELFdBQVcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7YUFDaEY7WUFDRCxJQUFJLGFBQWEsQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUMxQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDNUQ7WUFDRCxJQUFJLGFBQWEsQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUMxQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDNUQ7WUFDRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDbkQ7WUFDRCxJQUFJLGFBQWEsQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO2dCQUMzQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixhQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQzthQUNwRTtZQUNELElBQUksYUFBYSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7Z0JBQzFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2FBQ2xFO1lBQ0QsSUFBSSxhQUFhLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDdEMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQzFEO1lBQ0QsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3REO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUMzQixJQUFJLENBQUMsZUFBZSxFQUNwQixLQUFLLEVBQ0wsTUFBTSxFQUNOLFdBQVcsQ0FDZCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQWE7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FDM0IsSUFBSSxDQUFDLGVBQWUsRUFDcEIsS0FBSyxFQUNMLFFBQVEsS0FBSyxFQUFFLENBQ2xCLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxhQVN0QjtRQUNHLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLGFBQWEsRUFBRTtZQUNmLElBQUksYUFBYSxDQUFDLGtCQUFrQixLQUFLLFNBQVMsRUFBRTtnQkFDaEQsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsYUFBYSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQzthQUN4RTtZQUNELElBQUksYUFBYSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUU7Z0JBQzdDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO2FBQ3hFO1lBQ0QsSUFBSSxhQUFhLENBQUMsbUJBQW1CLEtBQUssU0FBUyxFQUFFO2dCQUNqRCxXQUFXLENBQUMsSUFBSSxDQUFDLHVCQUF1QixhQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO2FBQ2hGO1lBQ0QsSUFBSSxhQUFhLENBQUMsbUJBQW1CLEtBQUssU0FBUyxFQUFFO2dCQUNqRCxXQUFXLENBQUMsSUFBSSxDQUFDLHVCQUF1QixhQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO2FBQ2hGO1lBQ0QsSUFBSSxhQUFhLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDM0MsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7YUFDcEU7WUFDRCxJQUFJLGFBQWEsQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUMxQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzthQUNsRTtZQUNELElBQUksYUFBYSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7Z0JBQ3RDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUMxRDtZQUNELElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUN0RDtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FDM0IsSUFBSSxDQUFDLGVBQWUsRUFDcEIsS0FBSyxFQUNMLFdBQVcsRUFDWCxXQUFXLENBQ2QsQ0FBQztJQUNOLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFpQjtRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUMzQixJQUFJLENBQUMsZUFBZSxFQUNwQixLQUFLLEVBQ0wsYUFBYSxTQUFTLEVBQUUsQ0FDM0IsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9
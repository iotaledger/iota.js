// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "@iota/crypto.js";
import { Ed25519Address } from "../addressTypes/ed25519Address";
import { IndexerPluginClient } from "../clients/plugins/indexerPluginClient";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { BASIC_OUTPUT_TYPE } from "../models/outputs/IBasicOutput";
import { Bech32Helper } from "../utils/bech32Helper";
import { generateBip44Address } from "./addresses";
/**
 * Get all the unspent addresses.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @param addressOptions.requiredCount The max number of addresses to find.
 * @returns All the unspent addresses.
 */
export async function getUnspentAddresses(client, seed, accountIndex, addressOptions) {
    var _a;
    return getUnspentAddressesWithAddressGenerator(client, seed, {
        accountIndex,
        addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
        isInternal: false
    }, generateBip44Address, addressOptions);
}
/**
 * Get all the unspent addresses using an address generator.
 * @param client The client or node endpoint to get the addresses from.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddressPath Calculate the next address for inputs.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @param addressOptions.requiredCount The max number of addresses to find.
 * @returns All the unspent addresses.
 */
export async function getUnspentAddressesWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, addressOptions) {
    var _a, _b;
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const protocolInfo = await localClient.protocolInfo();
    const localRequiredLimit = (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.requiredCount) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER;
    const localZeroCount = (_b = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount) !== null && _b !== void 0 ? _b : 20;
    let finished = false;
    const allUnspent = [];
    let zeroBalance = 0;
    do {
        const path = nextAddressPath(initialAddressState);
        const addressSeed = seed.generateSeedFromPath(new Bip32Path(path));
        const ed25519Address = new Ed25519Address(addressSeed.keyPair().publicKey);
        const addressBytes = ed25519Address.toAddress();
        const addressBech32 = Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, addressBytes, protocolInfo.bech32HRP);
        const balance = await calculateAddressBalance(localClient, addressBech32);
        // If there is no balance we increment the counter and end
        // the text when we have reached the count
        if (balance === 0) {
            zeroBalance++;
            if (zeroBalance >= localZeroCount) {
                finished = true;
            }
        }
        else {
            allUnspent.push({
                address: addressBech32,
                path,
                balance
            });
            if (allUnspent.length === localRequiredLimit) {
                finished = true;
            }
        }
    } while (!finished);
    return allUnspent;
}
/**
 * Calculate address balance for an address.
 * @param client The client for communications.
 * @param addressBech32 The address in bech32 format.
 * @returns The unspent balance.
 */
export async function calculateAddressBalance(client, addressBech32) {
    const indexerPlugin = new IndexerPluginClient(client);
    let count = 0;
    let cursor;
    let balance = 0;
    do {
        const outputResponse = await indexerPlugin.outputs({
            addressBech32,
            pageSize: 20,
            cursor
        });
        count = outputResponse.items.length;
        cursor = outputResponse.cursor;
        for (const outputId of outputResponse.items) {
            const output = await client.output(outputId);
            if (output.output.type === BASIC_OUTPUT_TYPE && !output.isSpent) {
                balance += output.output.amount;
            }
        }
    } while (count > 0 && cursor);
    return balance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5zcGVudEFkZHJlc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvZ2V0VW5zcGVudEFkZHJlc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFLM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxtQkFBbUIsQ0FDckMsTUFBd0IsRUFDeEIsSUFBVyxFQUNYLFlBQW9CLEVBQ3BCLGNBSUM7O0lBUUQsT0FBTyx1Q0FBdUMsQ0FDMUMsTUFBTSxFQUNOLElBQUksRUFDSjtRQUNJLFlBQVk7UUFDWixZQUFZLEVBQUUsTUFBQSxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsVUFBVSxtQ0FBSSxDQUFDO1FBQzdDLFVBQVUsRUFBRSxLQUFLO0tBQ3BCLEVBQ0Qsb0JBQW9CLEVBQ3BCLGNBQWMsQ0FDakIsQ0FBQztBQUNOLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsdUNBQXVDLENBQ3pELE1BQXdCLEVBQ3hCLElBQVcsRUFDWCxtQkFBc0IsRUFDdEIs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
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "@iota/crypto.js";
import { Ed25519Address } from "../addressTypes/ed25519Address";
import { IndexerPluginClient } from "../clients/plugins/indexerPluginClient";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import type { IOutputsResponse } from "../models/api/plugins/indexer/IOutputsResponse";
import type { IBip44GeneratorState } from "../models/IBip44GeneratorState";
import type { IClient } from "../models/IClient";
import type { ISeed } from "../models/ISeed";
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
export async function getUnspentAddresses(
    client: IClient | string,
    seed: ISeed,
    accountIndex: number,
    addressOptions?: {
        startIndex?: number;
        zeroCount?: number;
        requiredCount?: number;
    }
): Promise<
    {
        address: string;
        path: string;
        balance: number;
    }[]
> {
    return getUnspentAddressesWithAddressGenerator<IBip44GeneratorState>(
        client,
        seed,
        {
            accountIndex,
            addressIndex: addressOptions?.startIndex ?? 0,
            isInternal: false
        },
        generateBip44Address,
        addressOptions
    );
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
export async function getUnspentAddressesWithAddressGenerator<T>(
    client: IClient | string,
    seed: ISeed,
    initialAddressState: T,
    nextAddressPath: (addressState: T) => string,
    addressOptions?: {
        startIndex?: number;
        zeroCount?: number;
        requiredCount?: number;
    }
): Promise<
    {
        address: string;
        path: string;
        balance: number;
    }[]
> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const bech32Hrp = await localClient.bech32Hrp();

    const localRequiredLimit = addressOptions?.requiredCount ?? Number.MAX_SAFE_INTEGER;
    const localZeroCount = addressOptions?.zeroCount ?? 20;
    let finished = false;
    const allUnspent: {
        address: string;
        path: string;
        balance: number;
    }[] = [];

    let zeroBalance = 0;

    do {
        const path = nextAddressPath(initialAddressState);

        const addressSeed = seed.generateSeedFromPath(new Bip32Path(path));

        const ed25519Address = new Ed25519Address(addressSeed.keyPair().publicKey);
        const addressBytes = ed25519Address.toAddress();
        const addressBech32 = Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, addressBytes, bech32Hrp);

        const balance = await calculateAddressBalance(localClient, addressBech32);

        // If there is no balance we increment the counter and end
        // the text when we have reached the count
        if (balance === 0) {
            zeroBalance++;
            if (zeroBalance >= localZeroCount) {
                finished = true;
            }
        } else {
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
export async function calculateAddressBalance(client: IClient, addressBech32: string): Promise<number> {
    const indexerPlugin = new IndexerPluginClient(client);

    let count = 0;
    let cursor;
    let balance = 0;
    do {
        const outputResponse: IOutputsResponse =
            await indexerPlugin.outputs({
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

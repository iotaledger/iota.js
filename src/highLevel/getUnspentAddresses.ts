// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Ed25519Address } from "../addressTypes/ed25519Address";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { Bip32Path } from "../crypto/bip32Path";
import type { IBip44GeneratorState } from "../models/IBip44GeneratorState";
import type { IClient } from "../models/IClient";
import { ED25519_ADDRESS_TYPE } from "../models/IEd25519Address";
import type { ISeed } from "../models/ISeed";
import { Bech32Helper } from "../utils/bech32Helper";
import { Converter } from "../utils/converter";
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
    }): Promise<{
        address: string;
        path: string;
        balance: number;
    }[]> {
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
    nextAddressPath: (addressState: T, isFirst: boolean) => string,
    addressOptions?: {
        startIndex?: number;
        zeroCount?: number;
        requiredCount?: number;
    }): Promise<{
        address: string;
        path: string;
        balance: number;
    }[]> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const nodeInfo = await localClient.info();
    const localRequiredLimit = addressOptions?.requiredCount ?? Number.MAX_SAFE_INTEGER;
    const localZeroCount = addressOptions?.zeroCount ?? 20;
    let finished = false;
    const allUnspent: {
        address: string;
        path: string;
        balance: number;
    }[] = [];

    let isFirst = true;
    let zeroBalance = 0;

    do {
        const path = nextAddressPath(initialAddressState, isFirst);
        isFirst = false;

        const addressSeed = seed.generateSeedFromPath(new Bip32Path(path));

        const ed25519Address = new Ed25519Address(addressSeed.keyPair().publicKey);
        const addressBytes = ed25519Address.toAddress();
        const addressHex = Converter.bytesToHex(addressBytes);
        const addressResponse = await localClient.addressEd25519(addressHex);

        // If there is no balance we increment the counter and end
        // the text when we have reached the count
        if (addressResponse.balance === 0) {
            zeroBalance++;
            if (zeroBalance >= localZeroCount) {
                finished = true;
            }
        } else {
            allUnspent.push({
                address: Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, addressBytes, nodeInfo.bech32HRP),
                path,
                balance: addressResponse.balance
            });

            if (allUnspent.length === localRequiredLimit) {
                finished = true;
            }
        }
    } while (!finished);

    return allUnspent;
}

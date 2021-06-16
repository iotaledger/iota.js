// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IClient } from "../models/IClient";
import type { ISeed } from "../models/ISeed";
import { getUnspentAddresses } from "./getUnspentAddresses";

/**
 * Get the balance for a list of addresses.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed.
 * @param accountIndex The account index in the wallet.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The balance.
 */
export async function getBalance(
    client: IClient | string,
    seed: ISeed,
    accountIndex: number,
    addressOptions?: {
        startIndex?: number;
        zeroCount?: number;
    }): Promise<number> {
    const allUnspent = await getUnspentAddresses(client, seed, accountIndex, addressOptions);

    let total = 0;
    for (const output of allUnspent) {
        total += output.balance;
    }

    return total;
}

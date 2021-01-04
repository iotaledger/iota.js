// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { IClient } from "../models/IClient";
import { ISeed } from "../models/ISeed";
import { getUnspentAddresses } from "./getUnspentAddresses";

/**
 * Get the balance for a list of addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed.
 * @param accountIndex The account index in the wallet.
 * @param startIndex The start index to generate from, defaults to 0.
 * @returns The balance.
 */
export async function getBalance(
    client: IClient,
    seed: ISeed,
    accountIndex: number,
    startIndex: number = 0): Promise<number> {
    const allUnspent = await getUnspentAddresses(client, seed, accountIndex, startIndex);

    let total = 0;
    for (const output of allUnspent) {
        total += output.balance;
    }

    return total;
}

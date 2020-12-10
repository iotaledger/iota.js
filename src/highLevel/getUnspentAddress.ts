import { Bip32Path } from "../crypto/bip32Path";
import { IClient } from "../models/IClient";
import { ISeed } from "../models/ISeed";
import { getUnspentAddresses } from "./getUnspentAddresses";

/**
 * Get the first unspent address.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @returns The first unspent address.
 */
export async function getUnspentAddress(
    client: IClient,
    seed: ISeed,
    basePath: Bip32Path,
    startIndex?: number): Promise<{
        address: string;
        index: number;
        balance: number;
    } | undefined> {
    const allUnspent = await getUnspentAddresses(client, seed, basePath, startIndex, 1);

    return allUnspent.length > 0 ? allUnspent[0] : undefined;
}

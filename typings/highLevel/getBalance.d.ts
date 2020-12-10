import { Bip32Path } from "../crypto/bip32Path";
import { IClient } from "../models/IClient";
import { ISeed } from "../models/ISeed";
/**
 * Get the balance for a list of addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex The start index to generate from, defaults to 0.
 * @returns The balance.
 */
export declare function getBalance(client: IClient, seed: ISeed, basePath: Bip32Path, startIndex?: number): Promise<number>;

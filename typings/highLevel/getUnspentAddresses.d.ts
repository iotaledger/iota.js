import type { IClient } from "../models/IClient";
import type { ISeed } from "../models/ISeed";
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
export declare function getUnspentAddresses(client: IClient | string, seed: ISeed, accountIndex: number, addressOptions?: {
    startIndex?: number;
    zeroCount?: number;
    requiredCount?: number;
}): Promise<{
    address: string;
    path: string;
    balance: number;
}[]>;
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
export declare function getUnspentAddressesWithAddressGenerator<T>(client: IClient | string, seed: ISeed, initialAddressState: T, nextAddressPath: (addressState: T, isFirst: boolean) => string, addressOptions?: {
    startIndex?: number;
    zeroCount?: number;
    requiredCount?: number;
}): Promise<{
    address: string;
    path: string;
    balance: number;
}[]>;

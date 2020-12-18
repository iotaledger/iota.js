import { IClient } from "../models/IClient";
import { ISeed } from "../models/ISeed";
/**
 * Get all the unspent addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @param countLimit Limit the number of items to find.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns All the unspent addresses.
 */
export declare function getUnspentAddresses(client: IClient, seed: ISeed, accountIndex: number, startIndex?: number, countLimit?: number, zeroCount?: number): Promise<{
    address: string;
    path: string;
    balance: number;
}[]>;
/**
 * Get all the unspent addresses using an address generator.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddressPath Calculate the next address for inputs.
 * @param countLimit Limit the number of items to find.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns All the unspent addresses.
 */
export declare function getUnspentAddressesWithAddressGenerator<T>(client: IClient, seed: ISeed, initialAddressState: T, nextAddressPath: (addressState: T, isFirst: boolean) => string, countLimit?: number, zeroCount?: number): Promise<{
    address: string;
    path: string;
    balance: number;
}[]>;

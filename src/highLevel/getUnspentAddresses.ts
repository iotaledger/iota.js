// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Ed25519Address } from "../addressTypes/ed25519Address";
import { Bip32Path } from "../crypto/bip32Path";
import { IBip44GeneratorState } from "../models/IBip44GeneratorState";
import { IClient } from "../models/IClient";
import { ED25519_ADDRESS_TYPE } from "../models/IEd25519Address";
import { ISeed } from "../models/ISeed";
import { Bech32Helper } from "../utils/bech32Helper";
import { Converter } from "../utils/converter";
import { generateBip44Address } from "./addresses";

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
export async function getUnspentAddresses(
    client: IClient,
    seed: ISeed,
    accountIndex: number,
    startIndex?: number,
    countLimit?: number,
    zeroCount?: number): Promise<{
        address: string;
        path: string;
        balance: number;
    }[]> {
    return getUnspentAddressesWithAddressGenerator<IBip44GeneratorState>(
        client,
        seed,
        {
            accountIndex,
            addressIndex: startIndex ?? 0,
            isInternal: false
        },
        generateBip44Address,
        countLimit,
        zeroCount
    );
}

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
export async function getUnspentAddressesWithAddressGenerator<T>(
    client: IClient,
    seed: ISeed,
    initialAddressState: T,
    nextAddressPath: (addressState: T, isFirst: boolean) => string,
    countLimit?: number,
    zeroCount?: number): Promise<{
        address: string;
        path: string;
        balance: number;
    }[]> {
    const localCountLimit = countLimit ?? Number.MAX_SAFE_INTEGER;
    const localZeroCount = zeroCount ?? 5;
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
        const addressResponse = await client.addressEd25519(addressHex);

        // If there are no outputs for the address we have reached the
        // end of the used addresses
        if (addressResponse.count === 0) {
            zeroBalance++;
            if (zeroBalance >= localZeroCount) {
                finished = true;
            }
        } else {
            allUnspent.push({
                address: Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, addressBytes),
                path,
                balance: addressResponse.balance
            });

            if (allUnspent.length === localCountLimit) {
                finished = true;
            }
        }
    } while (!finished);

    return allUnspent;
}

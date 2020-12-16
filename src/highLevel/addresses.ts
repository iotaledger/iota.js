// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "../crypto/bip32Path";
import { IAccountAddressGeneratorState } from "../models/IAccountAddressGeneratorState";
import { IBip32PathAddressGeneratorState } from "../models/IBip32PathAddressGeneratorState";
import { IKeyPair } from "../models/IKeyPair";
import { ISeed } from "../models/ISeed";

export const DEFAULT_BIP32_ACCOUNT_PATH: string = "m/44'/4218'";

/**
 * Generate an account path based on all its parts.
 * @param accountIndex The account index.
 * @param addressIndex The address index.
 * @param isInternal Is this an internal address.
 * @returns The generated address.
 */
export function generateAccountPath(
    accountIndex: number, addressIndex: number, isInternal: boolean): Bip32Path {
    const bip32Path = new Bip32Path(DEFAULT_BIP32_ACCOUNT_PATH);

    bip32Path.pushHardened(accountIndex);
    bip32Path.pushHardened(isInternal ? 1 : 0);
    bip32Path.pushHardened(addressIndex);

    return bip32Path;
}

/**
 * Generate addresses based on the account indexing style.
 * @param seed The seed to use for address generation.
 * @param addressState The address state.
 * @param addressState.seed The seed to generate the address for.
 * @param addressState.accountIndex The index of the account to calculate.
 * @param addressState.addressIndex The index of the address to calculate.
 * @param addressState.isInternal Are we generating an internal address.
 * @param isFirst Is this the first address we are generating.
 * @returns The key pair for the address.
 */
export function generateAccountAddress(seed: ISeed, addressState: IAccountAddressGeneratorState, isFirst: boolean): {
    keyPair: IKeyPair;
    path?: Bip32Path;
} {
    // Not the first address so increment the counters.
    if (!isFirst) {
        // Flip-flop between internal and external
        // and then increment the address Index
        if (!addressState.isInternal) {
            addressState.isInternal = true;
        } else {
            addressState.isInternal = false;
            addressState.addressIndex++;
        }
    }

    const path = generateAccountPath(
        addressState.accountIndex,
        addressState.addressIndex,
        addressState.isInternal
    );

    const addressSeed = seed.generateSeedFromPath(path);

    return {
        path,
        keyPair: addressSeed.keyPair()
    };
}

/**
 * Generate a bip32 path based on all its parts.
 * @param basePath The base path for the address.
 * @param addressIndex The address index.
 * @returns The generated address.
 */
export function generateBip32Path(
    basePath: Bip32Path,
    addressIndex: number): Bip32Path {
    const bip32Path = Bip32Path.fromPath(basePath);

    bip32Path.pushHardened(addressIndex);

    return bip32Path;
}

/**
 * Generate addresses based on a bip32 path increment.
 * @param seed The seed to use for address generation.
 * @param addressState The address state.
 * @param addressState.seed The seed to generate the address for.
 * @param addressState.basePath The base path to start building from.
 * @param addressState.addressIndex The index of the address to calculate.
 * @param isFirst Is this the first address we are generating.
 * @returns The key pair for the address.
 */
export function generateBip32Address(seed: ISeed, addressState: IBip32PathAddressGeneratorState, isFirst: boolean): {
    keyPair: IKeyPair;
    path?: Bip32Path;
} {
    // Not the first address so increment the counters.
    if (!isFirst) {
        addressState.addressIndex++;
    }

    const path = generateBip32Path(
        addressState.basePath,
        addressState.addressIndex
    );

    const addressSeed = seed.generateSeedFromPath(path);

    return {
        path,
        keyPair: addressSeed.keyPair()
    };
}

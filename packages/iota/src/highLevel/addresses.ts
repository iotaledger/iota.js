// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "@iota/crypto.js";
import type { IBip44GeneratorState } from "../models/IBip44GeneratorState";

export const COIN_TYPE_IOTA = 4218;
export const COIN_TYPE_SHIMMER = 4219;

/**
 * Generate a bip44 path based on all its parts.
 * @param accountIndex The account index.
 * @param addressIndex The address index.
 * @param isInternal Is this an internal address.
 * @param coinType The coin type, default is the IOTA coin type.
 * @returns The generated address.
 */
export function generateBip44Path(
    accountIndex: number,
    addressIndex: number,
    isInternal: boolean,
    coinType = COIN_TYPE_IOTA
): Bip32Path {
    const bip32Path = new Bip32Path(generateBip44BasePath(coinType));

    bip32Path.pushHardened(accountIndex);
    bip32Path.pushHardened(isInternal ? 1 : 0);
    bip32Path.pushHardened(addressIndex);

    return bip32Path;
}

/**
 * Generate addresses based on the account indexing style.
 * @param generatorState The address state.
 * @param generatorState.accountIndex The index of the account to calculate.
 * @param generatorState.addressIndex The index of the address to calculate.
 * @param generatorState.isInternal Are we generating an internal address.
 * @param coinType The coin type, default is the IOTA coin type.
 * @returns The key pair for the address.
 */
export function generateBip44Address(generatorState: IBip44GeneratorState, coinType = COIN_TYPE_IOTA): string {
    const path = new Bip32Path(generateBip44BasePath(coinType));

    path.pushHardened(generatorState.accountIndex);
    path.pushHardened(generatorState.isInternal ? 1 : 0);
    path.pushHardened(generatorState.addressIndex);

    // Flip-flop between internal and external
    // and then increment the address Index
    if (!generatorState.isInternal) {
        generatorState.isInternal = true;
    } else {
        generatorState.isInternal = false;
        generatorState.addressIndex++;
    }

    return path.toString();
}

/**
 * Create a bip44 base path for the provided coin type.
 * @param coinType The coin type.
 * @returns The bip44 address base path.
 */
function generateBip44BasePath(coinType: number) {
    return `m/44'/${coinType}'`;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBip32Address = exports.generateBip32Path = exports.generateAccountAddress = exports.generateAccountPath = exports.DEFAULT_BIP32_ACCOUNT_PATH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var bip32Path_1 = require("../crypto/bip32Path");
exports.DEFAULT_BIP32_ACCOUNT_PATH = "m/44'/4218'";
/**
 * Generate an account path based on all its parts.
 * @param accountIndex The account index.
 * @param addressIndex The address index.
 * @param isInternal Is this an internal address.
 * @returns The generated address.
 */
function generateAccountPath(accountIndex, addressIndex, isInternal) {
    var bip32Path = new bip32Path_1.Bip32Path(exports.DEFAULT_BIP32_ACCOUNT_PATH);
    bip32Path.pushHardened(accountIndex);
    bip32Path.pushHardened(isInternal ? 1 : 0);
    bip32Path.pushHardened(addressIndex);
    return bip32Path;
}
exports.generateAccountPath = generateAccountPath;
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
function generateAccountAddress(seed, addressState, isFirst) {
    // Not the first address so increment the counters.
    if (!isFirst) {
        // Flip-flop between internal and external
        // and then increment the address Index
        if (!addressState.isInternal) {
            addressState.isInternal = true;
        }
        else {
            addressState.isInternal = false;
            addressState.addressIndex++;
        }
    }
    var path = generateAccountPath(addressState.accountIndex, addressState.addressIndex, addressState.isInternal);
    var addressSeed = seed.generateSeedFromPath(path);
    return {
        path: path,
        keyPair: addressSeed.keyPair()
    };
}
exports.generateAccountAddress = generateAccountAddress;
/**
 * Generate a bip32 path based on all its parts.
 * @param basePath The base path for the address.
 * @param addressIndex The address index.
 * @returns The generated address.
 */
function generateBip32Path(basePath, addressIndex) {
    var bip32Path = bip32Path_1.Bip32Path.fromPath(basePath);
    bip32Path.pushHardened(addressIndex);
    return bip32Path;
}
exports.generateBip32Path = generateBip32Path;
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
function generateBip32Address(seed, addressState, isFirst) {
    // Not the first address so increment the counters.
    if (!isFirst) {
        addressState.addressIndex++;
    }
    var path = generateBip32Path(addressState.basePath, addressState.addressIndex);
    var addressSeed = seed.generateSeedFromPath(path);
    return {
        path: path,
        keyPair: addressSeed.keyPair()
    };
}
exports.generateBip32Address = generateBip32Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9hZGRyZXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxpREFBZ0Q7QUFNbkMsUUFBQSwwQkFBMEIsR0FBVyxhQUFhLENBQUM7QUFFaEU7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsbUJBQW1CLENBQy9CLFlBQW9CLEVBQUUsWUFBb0IsRUFBRSxVQUFtQjtJQUMvRCxJQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQUMsa0NBQTBCLENBQUMsQ0FBQztJQUU1RCxTQUFTLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JDLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFckMsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQVRELGtEQVNDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILFNBQWdCLHNCQUFzQixDQUFDLElBQVcsRUFBRSxZQUEyQyxFQUFFLE9BQWdCO0lBSTdHLG1EQUFtRDtJQUNuRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1YsMENBQTBDO1FBQzFDLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRTtZQUMxQixZQUFZLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUNsQzthQUFNO1lBQ0gsWUFBWSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDaEMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQy9CO0tBQ0o7SUFFRCxJQUFNLElBQUksR0FBRyxtQkFBbUIsQ0FDNUIsWUFBWSxDQUFDLFlBQVksRUFDekIsWUFBWSxDQUFDLFlBQVksRUFDekIsWUFBWSxDQUFDLFVBQVUsQ0FDMUIsQ0FBQztJQUVGLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVwRCxPQUFPO1FBQ0gsSUFBSSxNQUFBO1FBQ0osT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUU7S0FDakMsQ0FBQztBQUNOLENBQUM7QUE1QkQsd0RBNEJDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixpQkFBaUIsQ0FDN0IsUUFBbUIsRUFDbkIsWUFBb0I7SUFDcEIsSUFBTSxTQUFTLEdBQUcscUJBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFL0MsU0FBUyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVyQyxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBUkQsOENBUUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxJQUFXLEVBQUUsWUFBNkMsRUFBRSxPQUFnQjtJQUk3RyxtREFBbUQ7SUFDbkQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNWLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUMvQjtJQUVELElBQU0sSUFBSSxHQUFHLGlCQUFpQixDQUMxQixZQUFZLENBQUMsUUFBUSxFQUNyQixZQUFZLENBQUMsWUFBWSxDQUM1QixDQUFDO0lBRUYsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXBELE9BQU87UUFDSCxJQUFJLE1BQUE7UUFDSixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRTtLQUNqQyxDQUFDO0FBQ04sQ0FBQztBQXBCRCxvREFvQkMifQ==
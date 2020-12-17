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
 * @param addressState The address state.
 * @param addressState.seed The seed to generate the address for.
 * @param addressState.accountIndex The index of the account to calculate.
 * @param addressState.addressIndex The index of the address to calculate.
 * @param addressState.isInternal Are we generating an internal address.
 * @param isFirst Is this the first address we are generating.
 * @returns The key pair for the address.
 */
function generateAccountAddress(addressState, isFirst) {
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
    return path.toString();
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
 * @param addressState The address state.
 * @param addressState.seed The seed to generate the address for.
 * @param addressState.basePath The base path to start building from.
 * @param addressState.addressIndex The index of the address to calculate.
 * @param isFirst Is this the first address we are generating.
 * @returns The key pair for the address.
 */
function generateBip32Address(addressState, isFirst) {
    // Not the first address so increment the counters.
    if (!isFirst) {
        addressState.addressIndex++;
    }
    var path = generateBip32Path(addressState.basePath, addressState.addressIndex);
    return path.toString();
}
exports.generateBip32Address = generateBip32Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9hZGRyZXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxpREFBZ0Q7QUFJbkMsUUFBQSwwQkFBMEIsR0FBVyxhQUFhLENBQUM7QUFFaEU7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsbUJBQW1CLENBQy9CLFlBQW9CLEVBQUUsWUFBb0IsRUFBRSxVQUFtQjtJQUMvRCxJQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQUMsa0NBQTBCLENBQUMsQ0FBQztJQUU1RCxTQUFTLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JDLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFckMsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQVRELGtEQVNDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBZ0Isc0JBQXNCLENBQUMsWUFBMkMsRUFBRSxPQUFnQjtJQUNoRyxtREFBbUQ7SUFDbkQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNWLDBDQUEwQztRQUMxQyx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUU7WUFDMUIsWUFBWSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDbEM7YUFBTTtZQUNILFlBQVksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUMvQjtLQUNKO0lBRUQsSUFBTSxJQUFJLEdBQUcsbUJBQW1CLENBQzVCLFlBQVksQ0FBQyxZQUFZLEVBQ3pCLFlBQVksQ0FBQyxZQUFZLEVBQ3pCLFlBQVksQ0FBQyxVQUFVLENBQzFCLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUMzQixDQUFDO0FBcEJELHdEQW9CQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsaUJBQWlCLENBQzdCLFFBQW1CLEVBQ25CLFlBQW9CO0lBQ3BCLElBQU0sU0FBUyxHQUFHLHFCQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRS9DLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFckMsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQVJELDhDQVFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxZQUE2QyxFQUFFLE9BQWdCO0lBQ2hHLG1EQUFtRDtJQUNuRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1YsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQy9CO0lBRUQsSUFBTSxJQUFJLEdBQUcsaUJBQWlCLENBQzFCLFlBQVksQ0FBQyxRQUFRLEVBQ3JCLFlBQVksQ0FBQyxZQUFZLENBQzVCLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUMzQixDQUFDO0FBWkQsb0RBWUMifQ==
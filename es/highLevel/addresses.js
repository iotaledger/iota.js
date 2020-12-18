"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBip44Address = exports.generateBip44Path = exports.IOTA_BIP44_BASE_PATH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var bip32Path_1 = require("../crypto/bip32Path");
exports.IOTA_BIP44_BASE_PATH = "m/44'/4218'";
/**
 * Generate a bip44 path based on all its parts.
 * @param accountIndex The account index.
 * @param addressIndex The address index.
 * @param isInternal Is this an internal address.
 * @returns The generated address.
 */
function generateBip44Path(accountIndex, addressIndex, isInternal) {
    var bip32Path = new bip32Path_1.Bip32Path(exports.IOTA_BIP44_BASE_PATH);
    bip32Path.pushHardened(accountIndex);
    bip32Path.pushHardened(isInternal ? 1 : 0);
    bip32Path.pushHardened(addressIndex);
    return bip32Path;
}
exports.generateBip44Path = generateBip44Path;
/**
 * Generate addresses based on the account indexing style.
 * @param generatorState The address state.
 * @param generatorState.accountIndex The index of the account to calculate.
 * @param generatorState.addressIndex The index of the address to calculate.
 * @param generatorState.isInternal Are we generating an internal address.
 * @param isFirst Is this the first address we are generating.
 * @returns The key pair for the address.
 */
function generateBip44Address(generatorState, isFirst) {
    // Not the first address so increment the counters.
    if (!isFirst) {
        // Flip-flop between internal and external
        // and then increment the address Index
        if (!generatorState.isInternal) {
            generatorState.isInternal = true;
        }
        else {
            generatorState.isInternal = false;
            generatorState.addressIndex++;
        }
    }
    var path = new bip32Path_1.Bip32Path(exports.IOTA_BIP44_BASE_PATH);
    path.pushHardened(generatorState.accountIndex);
    path.pushHardened(generatorState.isInternal ? 1 : 0);
    path.pushHardened(generatorState.addressIndex);
    return path.toString();
}
exports.generateBip44Address = generateBip44Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9hZGRyZXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxpREFBZ0Q7QUFHbkMsUUFBQSxvQkFBb0IsR0FBVyxhQUFhLENBQUM7QUFFMUQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsaUJBQWlCLENBQzdCLFlBQW9CLEVBQUUsWUFBb0IsRUFBRSxVQUFtQjtJQUMvRCxJQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQUMsNEJBQW9CLENBQUMsQ0FBQztJQUV0RCxTQUFTLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JDLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFckMsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQVRELDhDQVNDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxjQUFvQyxFQUFFLE9BQWdCO0lBQ3ZGLG1EQUFtRDtJQUNuRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1YsMENBQTBDO1FBQzFDLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUM1QixjQUFjLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUNwQzthQUFNO1lBQ0gsY0FBYyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDbEMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2pDO0tBQ0o7SUFFRCxJQUFNLElBQUksR0FBRyxJQUFJLHFCQUFTLENBQUMsNEJBQW9CLENBQUMsQ0FBQztJQUVqRCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDM0IsQ0FBQztBQXBCRCxvREFvQkMifQ==
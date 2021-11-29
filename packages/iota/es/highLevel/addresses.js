// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "@iota/crypto.js";
export const IOTA_BIP44_BASE_PATH = "m/44'/4218'";
/**
 * Generate a bip44 path based on all its parts.
 * @param accountIndex The account index.
 * @param addressIndex The address index.
 * @param isInternal Is this an internal address.
 * @returns The generated address.
 */
export function generateBip44Path(accountIndex, addressIndex, isInternal) {
    const bip32Path = new Bip32Path(IOTA_BIP44_BASE_PATH);
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
 * @returns The key pair for the address.
 */
export function generateBip44Address(generatorState) {
    const path = new Bip32Path(IOTA_BIP44_BASE_PATH);
    path.pushHardened(generatorState.accountIndex);
    path.pushHardened(generatorState.isInternal ? 1 : 0);
    path.pushHardened(generatorState.addressIndex);
    // Flip-flop between internal and external
    // and then increment the address Index
    if (!generatorState.isInternal) {
        generatorState.isInternal = true;
    }
    else {
        generatorState.isInternal = false;
        generatorState.addressIndex++;
    }
    return path.toString();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9hZGRyZXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHNUMsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQVcsYUFBYSxDQUFDO0FBRTFEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxZQUFvQixFQUFFLFlBQW9CLEVBQUUsVUFBbUI7SUFDN0YsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUV0RCxTQUFTLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JDLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFckMsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsY0FBb0M7SUFDckUsTUFBTSxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUVqRCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFL0MsMENBQTBDO0lBQzFDLHVDQUF1QztJQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRTtRQUM1QixjQUFjLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztLQUNwQztTQUFNO1FBQ0gsY0FBYyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbEMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ2pDO0lBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDM0IsQ0FBQyJ9
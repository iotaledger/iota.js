// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "@iota/crypto.js";
import { Converter } from "@iota/util.js";
import { Ed25519Address } from "../addressTypes/ed25519Address";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { Bech32Helper } from "../utils/bech32Helper";
import { generateBip44Address } from "./addresses";
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
export async function getUnspentAddresses(client, seed, accountIndex, addressOptions) {
    var _a;
    return getUnspentAddressesWithAddressGenerator(client, seed, {
        accountIndex,
        addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
        isInternal: false
    }, generateBip44Address, addressOptions);
}
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
export async function getUnspentAddressesWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, addressOptions) {
    var _a, _b;
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const nodeInfo = await localClient.info();
    const localRequiredLimit = (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.requiredCount) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER;
    const localZeroCount = (_b = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount) !== null && _b !== void 0 ? _b : 20;
    let finished = false;
    const allUnspent = [];
    let zeroBalance = 0;
    do {
        const path = nextAddressPath(initialAddressState);
        const addressSeed = seed.generateSeedFromPath(new Bip32Path(path));
        const ed25519Address = new Ed25519Address(addressSeed.keyPair().publicKey);
        const addressBytes = ed25519Address.toAddress();
        const addressHex = Converter.bytesToHex(addressBytes);
        const addressResponse = await localClient.addressEd25519(addressHex);
        // If there is no balance we increment the counter and end
        // the text when we have reached the count
        if (addressResponse.balance === 0) {
            zeroBalance++;
            if (zeroBalance >= localZeroCount) {
                finished = true;
            }
        }
        else {
            allUnspent.push({
                address: Bech32Helper.toBech32(ED25519_ADDRESS_TYPE, addressBytes, nodeInfo.bech32HRP),
                path,
                balance: addressResponse.balance
            });
            if (allUnspent.length === localRequiredLimit) {
                finished = true;
            }
        }
    } while (!finished);
    return allUnspent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5zcGVudEFkZHJlc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvZ2V0VW5zcGVudEFkZHJlc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUkzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5EOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLG1CQUFtQixDQUNyQyxNQUF3QixFQUN4QixJQUFXLEVBQ1gsWUFBb0IsRUFDcEIsY0FJQzs7SUFRRCxPQUFPLHVDQUF1QyxDQUMxQyxNQUFNLEVBQ04sSUFBSSxFQUNKO1FBQ0ksWUFBWTtRQUNaLFlBQVksRUFBRSxNQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxVQUFVLG1DQUFJLENBQUM7UUFDN0MsVUFBVSxFQUFFLEtBQUs7S0FDcEIsRUFDRCxvQkFBb0IsRUFDcEIsY0FBYyxDQUNqQixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSx1Q0FBdUMsQ0FDekQsTUFBd0IsRUFDeEIsSUFBVyxFQUNYLG1CQUFzQixFQUN0QixlQUE0QyxFQUM1QyxjQUlDOztJQVFELE1BQU0sV0FBVyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRXZGLE1BQU0sUUFBUSxHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFDLE1BQU0sa0JBQWtCLEdBQUcsTUFBQSxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsYUFBYSxtQ0FBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDcEYsTUFBTSxjQUFjLEdBQUcsTUFBQSxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsU0FBUyxtQ0FBSSxFQUFFLENBQUM7SUFDdkQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLE1BQU0sVUFBVSxHQUlWLEVBQUUsQ0FBQztJQUVULElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztJQUVwQixHQUFHO1FBQ0MsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFbEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFbkUsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoRCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELE1BQU0sZUFBZSxHQUFHLE1BQU0sV0FBVyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyRSwwREFBMEQ7UUFDMUQsMENBQTBDO1FBQzFDLElBQUksZUFBZSxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUU7WUFDL0IsV0FBVyxFQUFFLENBQUM7WUFDZCxJQUFJLFdBQVcsSUFBSSxjQUFjLEVBQUU7Z0JBQy9CLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDbkI7U0FDSjthQUFNO1lBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDWixPQUFPLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFDdEYsSUFBSTtnQkFDSixPQUFPLEVBQUUsZUFBZSxDQUFDLE9BQU87YUFDbkMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLGtCQUFrQixFQUFFO2dCQUMxQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ25CO1NBQ0o7S0FDSixRQUFRLENBQUMsUUFBUSxFQUFFO0lBRXBCLE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUMifQ==
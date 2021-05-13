"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnspentAddressesWithAddressGenerator = exports.getUnspentAddresses = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const ed25519Address_1 = require("../addressTypes/ed25519Address");
const singleNodeClient_1 = require("../clients/singleNodeClient");
const bip32Path_1 = require("../crypto/bip32Path");
const IEd25519Address_1 = require("../models/IEd25519Address");
const bech32Helper_1 = require("../utils/bech32Helper");
const converter_1 = require("../utils/converter");
const addresses_1 = require("./addresses");
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
function getUnspentAddresses(client, seed, accountIndex, addressOptions) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        return getUnspentAddressesWithAddressGenerator(client, seed, {
            accountIndex,
            addressIndex: (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex) !== null && _a !== void 0 ? _a : 0,
            isInternal: false
        }, addresses_1.generateBip44Address, addressOptions);
    });
}
exports.getUnspentAddresses = getUnspentAddresses;
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
function getUnspentAddressesWithAddressGenerator(client, seed, initialAddressState, nextAddressPath, addressOptions) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const localClient = typeof client === "string" ? new singleNodeClient_1.SingleNodeClient(client) : client;
        const nodeInfo = yield localClient.info();
        const localRequiredLimit = (_a = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.requiredCount) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER;
        const localZeroCount = (_b = addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount) !== null && _b !== void 0 ? _b : 20;
        let finished = false;
        const allUnspent = [];
        let isFirst = true;
        let zeroBalance = 0;
        do {
            const path = nextAddressPath(initialAddressState, isFirst);
            isFirst = false;
            const addressSeed = seed.generateSeedFromPath(new bip32Path_1.Bip32Path(path));
            const ed25519Address = new ed25519Address_1.Ed25519Address(addressSeed.keyPair().publicKey);
            const addressBytes = ed25519Address.toAddress();
            const addressHex = converter_1.Converter.bytesToHex(addressBytes);
            const addressResponse = yield localClient.addressEd25519(addressHex);
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
                    address: bech32Helper_1.Bech32Helper.toBech32(IEd25519Address_1.ED25519_ADDRESS_TYPE, addressBytes, nodeInfo.bech32HRP),
                    path,
                    balance: addressResponse.balance
                });
                if (allUnspent.length === localRequiredLimit) {
                    finished = true;
                }
            }
        } while (!finished);
        return allUnspent;
    });
}
exports.getUnspentAddressesWithAddressGenerator = getUnspentAddressesWithAddressGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5zcGVudEFkZHJlc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvZ2V0VW5zcGVudEFkZHJlc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLG1FQUFnRTtBQUNoRSxrRUFBK0Q7QUFDL0QsbURBQWdEO0FBR2hELCtEQUFpRTtBQUVqRSx3REFBcUQ7QUFDckQsa0RBQStDO0FBQy9DLDJDQUFtRDtBQUVuRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsU0FBc0IsbUJBQW1CLENBQ3JDLE1BQXdCLEVBQ3hCLElBQVcsRUFDWCxZQUFvQixFQUNwQixjQUlDOzs7UUFLRCxPQUFPLHVDQUF1QyxDQUMxQyxNQUFNLEVBQ04sSUFBSSxFQUNKO1lBQ0ksWUFBWTtZQUNaLFlBQVksRUFBRSxNQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxVQUFVLG1DQUFJLENBQUM7WUFDN0MsVUFBVSxFQUFFLEtBQUs7U0FDcEIsRUFDRCxnQ0FBb0IsRUFDcEIsY0FBYyxDQUNqQixDQUFDOztDQUNMO0FBeEJELGtEQXdCQztBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsU0FBc0IsdUNBQXVDLENBQ3pELE1BQXdCLEVBQ3hCLElBQVcsRUFDWCxtQkFBc0IsRUFDdEIsZUFBOEQsRUFDOUQsY0FJQzs7O1FBS0QsTUFBTSxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLG1DQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFdkYsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUMsTUFBTSxrQkFBa0IsR0FBRyxNQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxhQUFhLG1DQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNwRixNQUFNLGNBQWMsR0FBRyxNQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxTQUFTLG1DQUFJLEVBQUUsQ0FBQztRQUN2RCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDckIsTUFBTSxVQUFVLEdBSVYsRUFBRSxDQUFDO1FBRVQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUVwQixHQUFHO1lBQ0MsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNELE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFaEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRW5FLE1BQU0sY0FBYyxHQUFHLElBQUksK0JBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0UsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2hELE1BQU0sVUFBVSxHQUFHLHFCQUFTLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RELE1BQU0sZUFBZSxHQUFHLE1BQU0sV0FBVyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVyRSwwREFBMEQ7WUFDMUQsMENBQTBDO1lBQzFDLElBQUksZUFBZSxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUU7Z0JBQy9CLFdBQVcsRUFBRSxDQUFDO2dCQUNkLElBQUksV0FBVyxJQUFJLGNBQWMsRUFBRTtvQkFDL0IsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDbkI7YUFDSjtpQkFBTTtnQkFDSCxVQUFVLENBQUMsSUFBSSxDQUFDO29CQUNaLE9BQU8sRUFBRSwyQkFBWSxDQUFDLFFBQVEsQ0FBQyxzQ0FBb0IsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQztvQkFDdEYsSUFBSTtvQkFDSixPQUFPLEVBQUUsZUFBZSxDQUFDLE9BQU87aUJBQ25DLENBQUMsQ0FBQztnQkFFSCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssa0JBQWtCLEVBQUU7b0JBQzFDLFFBQVEsR0FBRyxJQUFJLENBQUM7aUJBQ25CO2FBQ0o7U0FDSixRQUFRLENBQUMsUUFBUSxFQUFFO1FBRXBCLE9BQU8sVUFBVSxDQUFDOztDQUNyQjtBQTdERCwwRkE2REMifQ==
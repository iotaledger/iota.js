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
exports.LocalPowProvider = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const blake2b_1 = require("../crypto/blake2b");
const powHelper_1 = require("../utils/powHelper");
/**
 * Local POW Provider.
 * WARNING - This is really slow.
 */
class LocalPowProvider {
    /**
     * Perform pow on the message and return the nonce of at least targetScore.
     * @param message The message to process.
     * @param targetScore the target score.
     * @returns The nonce.
     */
    pow(message, targetScore) {
        return __awaiter(this, void 0, void 0, function* () {
            const powRelevantData = message.slice(0, -8);
            const powDigest = blake2b_1.Blake2b.sum256(powRelevantData);
            const targetZeros = powHelper_1.PowHelper.calculateTargetZeros(message, targetScore);
            return powHelper_1.PowHelper.performPow(powDigest, targetZeros, BigInt(0));
        });
    }
}
exports.LocalPowProvider = LocalPowProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxQb3dQcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wb3cvbG9jYWxQb3dQcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLCtDQUE0QztBQUU1QyxrREFBK0M7QUFFL0M7OztHQUdHO0FBQ0gsTUFBYSxnQkFBZ0I7SUFDekI7Ozs7O09BS0c7SUFDVSxHQUFHLENBQUMsT0FBbUIsRUFBRSxXQUFtQjs7WUFDckQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxNQUFNLFNBQVMsR0FBRyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsRCxNQUFNLFdBQVcsR0FBRyxxQkFBUyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN6RSxPQUFPLHFCQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQztLQUFBO0NBQ0o7QUFiRCw0Q0FhQyJ9
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
exports.getBalance = void 0;
const getUnspentAddresses_1 = require("./getUnspentAddresses");
/**
 * Get the balance for a list of addresses.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed.
 * @param accountIndex The account index in the wallet.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The balance.
 */
function getBalance(client, seed, accountIndex, addressOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const allUnspent = yield getUnspentAddresses_1.getUnspentAddresses(client, seed, accountIndex, addressOptions);
        let total = 0;
        for (const output of allUnspent) {
            total += output.balance;
        }
        return total;
    });
}
exports.getBalance = getBalance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QmFsYW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaWdoTGV2ZWwvZ2V0QmFsYW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFJQSwrREFBNEQ7QUFFNUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBc0IsVUFBVSxDQUM1QixNQUF3QixFQUN4QixJQUFXLEVBQ1gsWUFBb0IsRUFDcEIsY0FHQzs7UUFDRCxNQUFNLFVBQVUsR0FBRyxNQUFNLHlDQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRXpGLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEtBQUssTUFBTSxNQUFNLElBQUksVUFBVSxFQUFFO1lBQzdCLEtBQUssSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQzNCO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUFBO0FBaEJELGdDQWdCQyJ9
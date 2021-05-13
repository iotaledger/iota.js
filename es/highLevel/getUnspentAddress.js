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
exports.getUnspentAddress = void 0;
const getUnspentAddresses_1 = require("./getUnspentAddresses");
/**
 * Get the first unspent address.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The first unspent address.
 */
function getUnspentAddress(client, seed, accountIndex, addressOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const allUnspent = yield getUnspentAddresses_1.getUnspentAddresses(client, seed, accountIndex, {
            startIndex: addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.startIndex,
            zeroCount: addressOptions === null || addressOptions === void 0 ? void 0 : addressOptions.zeroCount,
            requiredCount: 1
        });
        return allUnspent.length > 0 ? allUnspent[0] : undefined;
    });
}
exports.getUnspentAddress = getUnspentAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VW5zcGVudEFkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL2dldFVuc3BlbnRBZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUlBLCtEQUE0RDtBQUU1RDs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFzQixpQkFBaUIsQ0FDbkMsTUFBd0IsRUFDeEIsSUFBVyxFQUNYLFlBQW9CLEVBQ3BCLGNBR0M7O1FBS0QsTUFBTSxVQUFVLEdBQUcsTUFBTSx5Q0FBbUIsQ0FDeEMsTUFBTSxFQUNOLElBQUksRUFDSixZQUFZLEVBQ1o7WUFDSSxVQUFVLEVBQUUsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLFVBQVU7WUFDdEMsU0FBUyxFQUFFLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxTQUFTO1lBQ3BDLGFBQWEsRUFBRSxDQUFDO1NBQ25CLENBQUMsQ0FBQztRQUVQLE9BQU8sVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzdELENBQUM7Q0FBQTtBQXZCRCw4Q0F1QkMifQ==
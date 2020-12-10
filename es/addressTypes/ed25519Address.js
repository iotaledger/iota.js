"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Address = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var blake2b_1 = require("../crypto/blake2b");
var arrayHelper_1 = require("../utils/arrayHelper");
/**
 * Class to help with Ed25519 Signature scheme.
 */
var Ed25519Address = /** @class */ (function () {
    function Ed25519Address() {
    }
    /**
     * Convert the public key to an address.
     * @param publicKey The public key to convert.
     * @returns The address.
     */
    Ed25519Address.prototype.publicKeyToAddress = function (publicKey) {
        return blake2b_1.Blake2b.sum256(publicKey);
    };
    /**
     * Use the public key to validate the address.
     * @param publicKey The public key to verify with.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    Ed25519Address.prototype.verifyAddress = function (publicKey, address) {
        return arrayHelper_1.ArrayHelper.equal(this.publicKeyToAddress(publicKey), address);
    };
    /**
     * Address size.
     * @internal
     */
    Ed25519Address.ADDRESS_LENGTH = blake2b_1.Blake2b.SIZE_256;
    return Ed25519Address;
}());
exports.Ed25519Address = Ed25519Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOUFkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWRkcmVzc1R5cGVzL2VkMjU1MTlBZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsNkNBQTRDO0FBRTVDLG9EQUFtRDtBQUVuRDs7R0FFRztBQUNIO0lBQUE7SUF5QkEsQ0FBQztJQWxCRzs7OztPQUlHO0lBQ0ksMkNBQWtCLEdBQXpCLFVBQTBCLFNBQXFCO1FBQzNDLE9BQU8saUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksc0NBQWEsR0FBcEIsVUFBcUIsU0FBcUIsRUFBRSxPQUFtQjtRQUMzRCxPQUFPLHlCQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBdkJEOzs7T0FHRztJQUNXLDZCQUFjLEdBQVcsaUJBQU8sQ0FBQyxRQUFRLENBQUM7SUFvQjVELHFCQUFDO0NBQUEsQUF6QkQsSUF5QkM7QUF6Qlksd0NBQWMifQ==
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
    /**
     * Create a new instance of Ed25519Address.
     * @param publicKey The public key for the address.
     */
    function Ed25519Address(publicKey) {
        this._publicKey = publicKey;
    }
    /**
     * Convert the public key to an address.
     * @returns The address.
     */
    Ed25519Address.prototype.toAddress = function () {
        return blake2b_1.Blake2b.sum256(this._publicKey);
    };
    /**
     * Use the public key to validate the address.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    Ed25519Address.prototype.verify = function (address) {
        return arrayHelper_1.ArrayHelper.equal(this.toAddress(), address);
    };
    /**
     * Address size.
     * @internal
     */
    Ed25519Address.ADDRESS_LENGTH = blake2b_1.Blake2b.SIZE_256;
    return Ed25519Address;
}());
exports.Ed25519Address = Ed25519Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOUFkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWRkcmVzc1R5cGVzL2VkMjU1MTlBZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsNkNBQTRDO0FBRTVDLG9EQUFtRDtBQUVuRDs7R0FFRztBQUNIO0lBWUk7OztPQUdHO0lBQ0gsd0JBQVksU0FBcUI7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGtDQUFTLEdBQWhCO1FBQ0ksT0FBTyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSwrQkFBTSxHQUFiLFVBQWMsT0FBbUI7UUFDN0IsT0FBTyx5QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQWxDRDs7O09BR0c7SUFDVyw2QkFBYyxHQUFXLGlCQUFPLENBQUMsUUFBUSxDQUFDO0lBK0I1RCxxQkFBQztDQUFBLEFBcENELElBb0NDO0FBcENZLHdDQUFjIn0=
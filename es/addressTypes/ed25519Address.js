"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Address = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const blake2b_1 = require("../crypto/blake2b");
const arrayHelper_1 = require("../utils/arrayHelper");
/**
 * Class to help with Ed25519 Signature scheme.
 */
class Ed25519Address {
    /**
     * Create a new instance of Ed25519Address.
     * @param publicKey The public key for the address.
     */
    constructor(publicKey) {
        this._publicKey = publicKey;
    }
    /**
     * Convert the public key to an address.
     * @returns The address.
     */
    toAddress() {
        return blake2b_1.Blake2b.sum256(this._publicKey);
    }
    /**
     * Use the public key to validate the address.
     * @param address The address to verify.
     * @returns True if the data and address is verified.
     */
    verify(address) {
        return arrayHelper_1.ArrayHelper.equal(this.toAddress(), address);
    }
}
exports.Ed25519Address = Ed25519Address;
/**
 * Address size.
 * @internal
 */
Ed25519Address.ADDRESS_LENGTH = blake2b_1.Blake2b.SIZE_256;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOUFkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWRkcmVzc1R5cGVzL2VkMjU1MTlBZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0NBQTRDO0FBRTVDLHNEQUFtRDtBQUVuRDs7R0FFRztBQUNILE1BQWEsY0FBYztJQVl2Qjs7O09BR0c7SUFDSCxZQUFZLFNBQXFCO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxTQUFTO1FBQ1osT0FBTyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsT0FBbUI7UUFDN0IsT0FBTyx5QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7QUFuQ0wsd0NBb0NDO0FBbkNHOzs7R0FHRztBQUNXLDZCQUFjLEdBQVcsaUJBQU8sQ0FBQyxRQUFRLENBQUMifQ==
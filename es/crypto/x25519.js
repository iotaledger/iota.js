"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
Object.defineProperty(exports, "__esModule", { value: true });
exports.X25519 = void 0;
/**
 * This is a TypeScript port of https://github.com/katzenpost/core/blob/master/crypto/extra25519/extra25519.go
 */
var sha512_1 = require("../crypto/sha512");
var extendedGroupElement_1 = require("./edwards25519/extendedGroupElement");
var fieldElement_1 = require("./edwards25519/fieldElement");
var X25519 = /** @class */ (function () {
    function X25519() {
    }
    /**
     * Convert Ed25519 private key to X25519 private key.
     * @param ed25519PrivateKey The ed25519 private key to convert.
     * @returns The x25519 private key.
     */
    X25519.convertPrivateKeyToX25519 = function (ed25519PrivateKey) {
        var digest = sha512_1.Sha512.sum512(ed25519PrivateKey.slice(0, 32));
        digest[0] &= 248;
        digest[31] &= 127;
        digest[31] |= 64;
        return digest.slice(0, 32);
    };
    /**
     * Convert Ed25519 public key to X25519 public key.
     * @param ed25519PublicKey The ed25519 public key to convert.
     * @returns The x25519 public key.
     */
    X25519.convertPublicKeyToX25519 = function (ed25519PublicKey) {
        var A = new extendedGroupElement_1.ExtendedGroupElement();
        if (!A.fromBytes(ed25519PublicKey)) {
            throw new Error("Invalid Ed25519 Public Key");
        }
        // A.Z = 1 as a postcondition of FromBytes.
        var x = X25519.edwardsToMontgomeryX(A.Y);
        var x25519PublicKey = new Uint8Array(32);
        x.toBytes(x25519PublicKey);
        return x25519PublicKey;
    };
    /**
     * Convert the edwards curve to montgomery curve.
     * @param y The point on the edwards curve.
     * @returns The x-coordinate of the mapping.
     * @internal
     */
    X25519.edwardsToMontgomeryX = function (y) {
        // We only need the x-coordinate of the curve25519 point, which I'll
        // call u. The isomorphism is u=(y+1)/(1-y), since y=Y/Z, this gives
        // u=(Y+Z)/(Z-Y). We know that Z=1, thus u=(Y+1)/(1-Y).
        var oneMinusY = new fieldElement_1.FieldElement();
        oneMinusY.one();
        oneMinusY.sub(oneMinusY, y);
        oneMinusY.invert(oneMinusY);
        var outX = new fieldElement_1.FieldElement();
        outX.one();
        outX.add(outX, y);
        outX.mul(outX, oneMinusY);
        return outX;
    };
    return X25519;
}());
exports.X25519 = X25519;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieDI1NTE5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by94MjU1MTkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCOzs7QUFFL0I7O0dBRUc7QUFDSCwyQ0FBMEM7QUFDMUMsNEVBQTJFO0FBQzNFLDREQUEyRDtBQUUzRDtJQUFBO0lBMkRBLENBQUM7SUExREc7Ozs7T0FJRztJQUNXLGdDQUF5QixHQUF2QyxVQUF3QyxpQkFBNkI7UUFDakUsSUFBTSxNQUFNLEdBQUcsZUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFN0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNqQixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFakIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLCtCQUF3QixHQUF0QyxVQUF1QyxnQkFBNEI7UUFDL0QsSUFBTSxDQUFDLEdBQXlCLElBQUksMkNBQW9CLEVBQUUsQ0FBQztRQUUzRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUNqRDtRQUVELDJDQUEyQztRQUMzQyxJQUFNLENBQUMsR0FBaUIsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFNLGVBQWUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sZUFBZSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNZLDJCQUFvQixHQUFuQyxVQUFvQyxDQUFlO1FBQy9DLG9FQUFvRTtRQUNwRSxvRUFBb0U7UUFDcEUsdURBQXVEO1FBQ3ZELElBQU0sU0FBUyxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBRXJDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQixTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QixTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVCLElBQU0sSUFBSSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWxCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTFCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FBQyxBQTNERCxJQTJEQztBQTNEWSx3QkFBTSJ9
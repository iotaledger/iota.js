"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
Object.defineProperty(exports, "__esModule", { value: true });
exports.X25519 = void 0;
/**
 * This is a TypeScript port of https://github.com/katzenpost/core/blob/master/crypto/extra25519/extra25519.go.
 */
const sha512_1 = require("../crypto/sha512");
const extendedGroupElement_1 = require("./edwards25519/extendedGroupElement");
const fieldElement_1 = require("./edwards25519/fieldElement");
/**
 * Implementation of X25519.
 */
class X25519 {
    /**
     * Convert Ed25519 private key to X25519 private key.
     * @param ed25519PrivateKey The ed25519 private key to convert.
     * @returns The x25519 private key.
     */
    static convertPrivateKeyToX25519(ed25519PrivateKey) {
        const digest = sha512_1.Sha512.sum512(ed25519PrivateKey.slice(0, 32));
        digest[0] &= 248;
        digest[31] &= 127;
        digest[31] |= 64;
        return digest.slice(0, 32);
    }
    /**
     * Convert Ed25519 public key to X25519 public key.
     * @param ed25519PublicKey The ed25519 public key to convert.
     * @returns The x25519 public key.
     */
    static convertPublicKeyToX25519(ed25519PublicKey) {
        const A = new extendedGroupElement_1.ExtendedGroupElement();
        if (!A.fromBytes(ed25519PublicKey)) {
            throw new Error("Invalid Ed25519 Public Key");
        }
        // A.Z = 1 as a postcondition of FromBytes.
        const x = X25519.edwardsToMontgomeryX(A.Y);
        const x25519PublicKey = new Uint8Array(32);
        x.toBytes(x25519PublicKey);
        return x25519PublicKey;
    }
    /**
     * Convert the edwards curve to montgomery curve.
     * @param y The point on the edwards curve.
     * @returns The x-coordinate of the mapping.
     * @internal
     */
    static edwardsToMontgomeryX(y) {
        // We only need the x-coordinate of the curve25519 point, which I'll
        // call u. The isomorphism is u=(y+1)/(1-y), since y=Y/Z, this gives
        // u=(Y+Z)/(Z-Y). We know that Z=1, thus u=(Y+1)/(1-Y).
        const oneMinusY = new fieldElement_1.FieldElement();
        oneMinusY.one();
        oneMinusY.sub(oneMinusY, y);
        oneMinusY.invert(oneMinusY);
        const outX = new fieldElement_1.FieldElement();
        outX.one();
        outX.add(outX, y);
        outX.mul(outX, oneMinusY);
        return outX;
    }
}
exports.X25519 = X25519;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieDI1NTE5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyeXB0by94MjU1MTkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCOzs7QUFFL0I7O0dBRUc7QUFDSCw2Q0FBMEM7QUFDMUMsOEVBQTJFO0FBQzNFLDhEQUEyRDtBQUUzRDs7R0FFRztBQUNILE1BQWEsTUFBTTtJQUNmOzs7O09BSUc7SUFDSSxNQUFNLENBQUMseUJBQXlCLENBQUMsaUJBQTZCO1FBQ2pFLE1BQU0sTUFBTSxHQUFHLGVBQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTdELE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDakIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNsQixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWpCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsd0JBQXdCLENBQUMsZ0JBQTRCO1FBQy9ELE1BQU0sQ0FBQyxHQUF5QixJQUFJLDJDQUFvQixFQUFFLENBQUM7UUFFM0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDakQ7UUFFRCwyQ0FBMkM7UUFDM0MsTUFBTSxDQUFDLEdBQWlCLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsTUFBTSxlQUFlLEdBQUcsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMzQixPQUFPLGVBQWUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBZTtRQUMvQyxvRUFBb0U7UUFDcEUsb0VBQW9FO1FBQ3BFLHVEQUF1RDtRQUN2RCxNQUFNLFNBQVMsR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUVyQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU1QixNQUFNLElBQUksR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVsQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUxQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUEzREQsd0JBMkRDIn0=
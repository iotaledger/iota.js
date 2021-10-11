// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/**
 * This is a TypeScript port of https://github.com/katzenpost/core/blob/master/crypto/extra25519/extra25519.go.
 */
import { Sha512 } from "../hashes/sha512";
import { ExtendedGroupElement } from "./edwards25519/extendedGroupElement";
import { FieldElement } from "./edwards25519/fieldElement";
/**
 * Implementation of X25519.
 */
export class X25519 {
    /**
     * Convert Ed25519 private key to X25519 private key.
     * @param ed25519PrivateKey The ed25519 private key to convert.
     * @returns The x25519 private key.
     */
    static convertPrivateKeyToX25519(ed25519PrivateKey) {
        const digest = Sha512.sum512(ed25519PrivateKey.slice(0, 32));
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
        const A = new ExtendedGroupElement();
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
        const oneMinusY = new FieldElement();
        oneMinusY.one();
        oneMinusY.sub(oneMinusY, y);
        oneMinusY.invert(oneMinusY);
        const outX = new FieldElement();
        outX.one();
        outX.add(outX, y);
        outX.mul(outX, oneMinusY);
        return outX;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieDI1NTE5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NpZ25hdHVyZXMveDI1NTE5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsK0JBQStCO0FBRS9COztHQUVHO0FBQ0gsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRDs7R0FFRztBQUNILE1BQU0sT0FBTyxNQUFNO0lBQ2Y7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxpQkFBNkI7UUFDakUsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFN0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNqQixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFakIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxnQkFBNEI7UUFDL0QsTUFBTSxDQUFDLEdBQXlCLElBQUksb0JBQW9CLEVBQUUsQ0FBQztRQUUzRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUNqRDtRQUVELDJDQUEyQztRQUMzQyxNQUFNLENBQUMsR0FBaUIsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxNQUFNLGVBQWUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sZUFBZSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFlO1FBQy9DLG9FQUFvRTtRQUNwRSxvRUFBb0U7UUFDcEUsdURBQXVEO1FBQ3ZELE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFckMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVCLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVsQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUxQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0oifQ==
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */

/**
 * This is a TypeScript port of https://github.com/katzenpost/core/blob/master/crypto/extra25519/extra25519.go.
 */
import { Sha512 } from "../crypto/sha512";
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
    public static convertPrivateKeyToX25519(ed25519PrivateKey: Uint8Array): Uint8Array {
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
    public static convertPublicKeyToX25519(ed25519PublicKey: Uint8Array): Uint8Array {
        const A: ExtendedGroupElement = new ExtendedGroupElement();

        if (!A.fromBytes(ed25519PublicKey)) {
            throw new Error("Invalid Ed25519 Public Key");
        }

        // A.Z = 1 as a postcondition of FromBytes.
        const x: FieldElement = X25519.edwardsToMontgomeryX(A.Y);
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
    private static edwardsToMontgomeryX(y: FieldElement): FieldElement {
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

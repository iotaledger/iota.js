// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ITypeBase } from "./ITypeBase";

/**
 * The global type for the signature type.
 */
export const ED25519_SIGNATURE_TYPE = 1;

/**
 * Ed25519Signature signature.
 */
export interface IEd25519Signature extends ITypeBase<1> {
    /**
     * The public key.
     */
    publicKey: string;

    /**
     * The signature.
     */
    signature: string;
}

// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_INPUT_COUNT } from "../../src/binary/inputs/inputs";
import { ED25519_SIGNATURE_TYPE } from "../../src/models/signatures/IEd25519Signature";
import { ALIAS_UNLOCK_TYPE } from "../../src/models/unlocks/IAliasUnlock";
import { NFT_UNLOCK_TYPE } from "../../src/models/unlocks/INftUnlock";
import { REFERENCE_UNLOCK_TYPE } from "../../src/models/unlocks/IReferenceUnlock";
import { SIGNATURE_UNLOCK_TYPE } from "../../src/models/unlocks/ISignatureUnlock";
import type { UnlockTypes } from "../../src/models/unlocks/unlockTypes";
import { validateUnlocks } from "../../src/validation/unlocks/unlocks";

describe("Unlocks validation", () => {
    test("should pass with valid unlocks", () => {
        const unlocks: UnlockTypes[] = [
            {
                type: SIGNATURE_UNLOCK_TYPE,
                signature: {
                    type: ED25519_SIGNATURE_TYPE,
                    publicKey: "0xf447b84edbd0564ca2bbbe277ccb857dae85d6cce7c6a166bdb34ee1b3879709",
                    signature: "0xdeacb2dfb478083210d24dab54caa93f3df237f0dbac48e5f78d9876a9ef693f6b6199d6ab8a7049953d2a5be108a7a2b0befd81b95893c9151b8dcc2e63ef0e"
                }
            },
            {
                type: SIGNATURE_UNLOCK_TYPE,
                signature: {
                    type: ED25519_SIGNATURE_TYPE,
                    publicKey: "0xf447b84edbd0564ca2bbbe277ccb857dae85d6cce7c6a166bdb34ee1b3879710",
                    signature: "0xdeacb2dfb478083210d24dab54caa93f3df237f0dbac48e5f78d9876a9ef693f6b6199d6ab8a7049953d2a5be108a7a2b0befd81b95893c9151b8dcc2e63efke"
                }
            },
            {
                type: REFERENCE_UNLOCK_TYPE,
                reference: 0
            },
            {
                type: ALIAS_UNLOCK_TYPE,
                reference: 0
            },
            {
                type: NFT_UNLOCK_TYPE,
                reference: 1
            }
        ];

        expect(() => validateUnlocks(unlocks)).not.toThrowError();
    });

    test("should fail on duplicate signature unlock", () => {
        const unlocks: UnlockTypes[] = [
            {
                type: SIGNATURE_UNLOCK_TYPE,
                signature: {
                    type: ED25519_SIGNATURE_TYPE,
                    publicKey: "0xf447b84edbd0564ca2bbbe277ccb857dae85d6cce7c6a166bdb34ee1b3879709",
                    signature: "0xdeacb2dfb478083210d24dab54caa93f3df237f0dbac48e5f78d9876a9ef693f6b6199d6ab8a7049953d2a5be108a7a2b0befd81b95893c9151b8dcc2e63ef0e"
                }
            },
            {
                type: SIGNATURE_UNLOCK_TYPE,
                signature: {
                    type: ED25519_SIGNATURE_TYPE,
                    publicKey: "0xf447b84edbd0564ca2bbbe277ccb857dae85d6cce7c6a166bdb34ee1b3879709",
                    signature: "0xdeacb2dfb478083210d24dab54caa93f3df237f0dbac48e5f78d9876a9ef693f6b6199d6ab8a7049953d2a5be108a7a2b0befd81b95893c9151b8dcc2e63ef0e"
                }
            }
        ];

        expect(() => validateUnlocks(unlocks)).toThrow("The Signature Unlock at index 1 must be unique.");
    });

    test("should fail with reference index larger than unlock index", () => {
        const unlocks: UnlockTypes[] = [
            {
                type: SIGNATURE_UNLOCK_TYPE,
                signature: {
                    type: ED25519_SIGNATURE_TYPE,
                    publicKey: "0xf447b84edbd0564ca2bbbe277ccb857dae85d6cce7c6a166bdb34ee1b3879709",
                    signature: "0xdeacb2dfb478083210d24dab54caa93f3df237f0dbac48e5f78d9876a9ef693f6b6199d6ab8a7049953d2a5be108a7a2b0befd81b95893c9151b8dcc2e63ef0e"
                }
            },
            {
                type: REFERENCE_UNLOCK_TYPE,
                reference: 2
            },
            {
                type: REFERENCE_UNLOCK_TYPE,
                reference: 0
            }
        ];

        expect(() => validateUnlocks(unlocks)).toThrow("The Reference Unlock at index 1 must have Reference < 1");
    });

    test("should fail on referencd unlock not a signature unlock", () => {
        const unlocks: UnlockTypes[] = [
            {
                type: SIGNATURE_UNLOCK_TYPE,
                signature: {
                    type: ED25519_SIGNATURE_TYPE,
                    publicKey: "0xf447b84edbd0564ca2bbbe277ccb857dae85d6cce7c6a166bdb34ee1b3879709",
                    signature: "0xdeacb2dfb478083210d24dab54caa93f3df237f0dbac48e5f78d9876a9ef693f6b6199d6ab8a7049953d2a5be108a7a2b0befd81b95893c9151b8dcc2e63ef0e"
                }
            },
            {
                type: REFERENCE_UNLOCK_TYPE,
                reference: 0
            },
            {
                type: REFERENCE_UNLOCK_TYPE,
                reference: 1
            }
        ];

        expect(() => validateUnlocks(unlocks)).toThrow("The Unlock at index 2 must Reference a Signature Unlock.");
    });

    test("should fail on reference index exceeds max inputs count", () => {
        const unlocks: UnlockTypes[] = [
            {
                type: SIGNATURE_UNLOCK_TYPE,
                signature: {
                    type: ED25519_SIGNATURE_TYPE,
                    publicKey: "0xf447b84edbd0564ca2bbbe277ccb857dae85d6cce7c6a166bdb34ee1b3879709",
                    signature: "0xdeacb2dfb478083210d24dab54caa93f3df237f0dbac48e5f78d9876a9ef693f6b6199d6ab8a7049953d2a5be108a7a2b0befd81b95893c9151b8dcc2e63ef0e"
                }
            }
        ];

        for (let index = 0; index < 127; index++) {
            unlocks.push({
                type: REFERENCE_UNLOCK_TYPE,
                reference: 0
            });
        }

        unlocks.push({
            type: SIGNATURE_UNLOCK_TYPE,
            signature: {
                type: ED25519_SIGNATURE_TYPE,
                publicKey: "0xf447b84edbd0564ca2bbbe277ccb857dae85d6cce7c6a167bdb34ee1b3879707",
                signature: "0xdeacb2dfb478083210d24dab54caa93f3df237f0dbac48e5f79d9876a9ef693f6b6199d6ab8a7049953d2a5be108a7a2b0befd81b95893c9151b8dcc2e63ef0f"
            }
        });

        unlocks.push({
            type: REFERENCE_UNLOCK_TYPE,
            reference: 128
        });

        expect(() => validateUnlocks(unlocks)).toThrow(`Reference Unlock Index must be between 0 and ${MAX_INPUT_COUNT}.`);
    });
});


// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ALIAS_UNLOCK_TYPE, ED25519_SIGNATURE_TYPE, MAX_INPUT_COUNT, NFT_UNLOCK_TYPE, REFERENCE_UNLOCK_TYPE, SIGNATURE_UNLOCK_TYPE } from "../../src";
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

        const result = validateUnlocks(unlocks);
        expect(result.isValid).toEqual(true);
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

        const result = validateUnlocks(unlocks);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(["The Signature Unlock at index 1 must be unique."]));
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

        const result = validateUnlocks(unlocks);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(["The Reference Unlock at index 1 must have Reference < 1"]));
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

        const result = validateUnlocks(unlocks);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(["The Unlock at index 2 must Reference a Signature Unlock."]));
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
            },
            {
                type: REFERENCE_UNLOCK_TYPE,
                reference: 0
            },
            {
                type: ALIAS_UNLOCK_TYPE,
                reference: 128
            }
        ];

        const result = validateUnlocks(unlocks);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining([`Reference Unlock Index must be between 0 and ${MAX_INPUT_COUNT}.`]));
    });
});

// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ED25519_SIGNATURE_TYPE } from "../../src/models/signatures/IEd25519Signature";
import { SIGNATURE_UNLOCK_TYPE } from "../../src/models/unlocks/ISignatureUnlock";
import { validateTransactionPayload } from "../../src/validation/payloads/payloads";
import { mockTransactionPayload, protocolInfoMock } from "./testValidationMocks";

describe("Transaction payload validation", () => {
    it("should fail with unlock counts and input counts in transaction essence must be same", () => {
        mockTransactionPayload.unlocks.push(
            {
                type: SIGNATURE_UNLOCK_TYPE,
                signature: {
                    type: ED25519_SIGNATURE_TYPE,
                    publicKey: "0xf447b84edbd0564ca2bbbe277ccb857dae85d6cce7c6a166bdb34ee1b3879701",
                    signature: "0xdeacb2dfb478083210d24dab54caa93f3df237f0dbac48e5f78d9876a9ef693f6b6199d6ab8a7049953d2a5be108a7a2b0befd81b95893c9151b8dcc2e63ef0a"
                }
            }
        );

        expect(() => validateTransactionPayload(mockTransactionPayload, protocolInfoMock)).toThrow("Transaction payload unlocks count must match inputs count of the Transaction Essence.");
    });
});

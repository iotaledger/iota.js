// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { validateTaggedDataPayload } from "../../src/validation/payloads/payloads";
import { cloneTaggedDataPayload } from "./testUtils";
import { mockTaggedDataPayload } from "./testValidationMocks";

describe("Tagged data payload validation", () => {
    it("should fail with length of tag doesnot exceeds maximum tag length", () => {
        const payload = cloneTaggedDataPayload(mockTaggedDataPayload);
        const tag = "tag".repeat(2 * 64);
        payload.tag = "0x".concat(tag);
        const result = validateTaggedDataPayload(payload);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Tagged Data Payload tag length exceeds the maximum size of 64."]
        ));
    });
});

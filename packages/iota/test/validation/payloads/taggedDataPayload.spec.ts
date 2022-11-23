// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_TAG_LENGTH } from "../../../src/binary/payloads/taggedDataPayload";
import { validateTaggedDataPayload } from "../../../src/validation/payloads/payloads";
import { cloneTaggedDataPayload } from "../testUtils";
import { mockTaggedDataPayload } from "../testValidationMocks";

describe("Tagged data payload validation", () => {
    it("should pass with valid Tagged Data Payload", () => {
        const payload = cloneTaggedDataPayload(mockTaggedDataPayload);

        expect(() => validateTaggedDataPayload(payload)).not.toThrowError();
    });

    it("should fail when length of tag exceeds maximum tag length", () => {
        const payload = cloneTaggedDataPayload(mockTaggedDataPayload);
        const tag = "tag".repeat(2 * 64);
        payload.tag = "0x".concat(tag);

        expect(() => validateTaggedDataPayload(payload)).toThrow(`Tagged Data Payload tag length exceeds the maximum size of ${2 * MAX_TAG_LENGTH}`);
    });
});

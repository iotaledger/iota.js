// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { validateBlock } from "../../src/validation/block";
import { cloneBlock } from "./testUtils";
import { mockBlock, protocolInfoMock } from "./testValidationMocks";

describe("Block validation", () => {
    it("should pass with valid parents in block", () => {
        const block = cloneBlock(mockBlock);
        const result = validateBlock(block, protocolInfoMock);

        expect(result.isValid).toEqual(true);
        expect(result.error).toEqual(undefined);
    });

    it("should fail with parents count must be greater then zero and less then 9", () => {
        const block = cloneBlock(mockBlock);
        block.parents = [];
        const result = validateBlock(block, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.error).toBeDefined();
        expect(result.error).toEqual("Parents count must be between 1 and 8.");
    });

    it("should fail with parents not sorted in lexographical order", () => {
        const block = cloneBlock(mockBlock);
        block.parents = [
            "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02",
            "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a01"
        ];

        const result = validateBlock(block, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.error).toBeDefined();
        expect(result.error).toEqual("Parents must be lexicographically sorted based on Parent id.");
    });
});


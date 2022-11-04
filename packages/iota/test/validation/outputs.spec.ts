// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../src/models/outputs/IBasicOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IAddressUnlockCondition";
import { validateOutputs } from "../../src/validation/outputs/outputs";
import { protocolInfoMock } from "./testValidationMocks";

describe("Basic output validation", () => {
    test("should pass with valid basic output", () => {
        const output: IBasicOutput = {
            type: BASIC_OUTPUT_TYPE,
            amount: "455655655",
            unlockConditions: [
                {
                    type: 0,
                    address: {
                        type: ADDRESS_UNLOCK_CONDITION_TYPE,
                        pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                    }
                }
            ]
        };

        const result = validateOutputs([output], protocolInfoMock);
        expect(result.isValid).toEqual(true);
    });

    test("should fail wth invalid basic output", () => {
        const output: IBasicOutput = {
            type: BASIC_OUTPUT_TYPE,
            amount: "0",
            unlockConditions: []
        };

        const result = validateOutputs([output], protocolInfoMock);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining([
            "Address Unlock Condition must be present.",
            "Basic output amount field must be larger than zero."
        ]));
    });
});

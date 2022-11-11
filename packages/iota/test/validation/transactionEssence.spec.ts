// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import { UTXO_INPUT_TYPE } from "../../src/models/inputs/IUTXOInput";
import { BASIC_OUTPUT_TYPE } from "../../src/models/outputs/IBasicOutput";
import { TREASURY_OUTPUT_TYPE } from "../../src/models/outputs/ITreasuryOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IAddressUnlockCondition";
import { validateInputs } from "../../src/validation/inputs/inputs";
import { validateOutputs } from "../../src/validation/outputs/outputs";
import { cloneTransactionEssence } from "./testUtils";
import { mockTransactionEssence, protocolInfoMock, mockMaxDistintNativeTokens } from "./testValidationMocks";

describe("Parents validation", () => {
    it("should fail with inputs count must be greater then equal to 1 and less then equal to 128", () => {
        const txEssence = cloneTransactionEssence(mockTransactionEssence);
        txEssence.inputs = [];
        const result = validateInputs(txEssence.inputs);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Inputs count must be between 1 and 128."]
        ));
    });

    it("should fail with same transaction id and transaction output index in list of inputs", () => {
        const txEssence = cloneTransactionEssence(mockTransactionEssence);
        txEssence.inputs.push({
            type: UTXO_INPUT_TYPE,
            transactionId: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            transactionOutputIndex: 2
        });
        const result = validateInputs(txEssence.inputs);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Each pair of Transaction Id and Transaction Output Index must be unique in the list of inputs."]
        ));
    });

    it("should fail with transaction output index greater then maximum input count", () => {
        const txEssence = cloneTransactionEssence(mockTransactionEssence);
        txEssence.inputs.push({
            type: UTXO_INPUT_TYPE,
            transactionId: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
            transactionOutputIndex: 129
        });
        const result = validateInputs(txEssence.inputs);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Transaction Output Index must be between 0 and 128."]
        ));
    });

    it("should fail with outputs count must be greater then equal to 1 and less then equal to 128", () => {
        const txEssence = cloneTransactionEssence(mockTransactionEssence);
        txEssence.outputs = [];
        const result = validateOutputs(txEssence.outputs, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Outputs count must be between 1 and 128."]
        ));
    });

    it("should fail with sum of all outputs amount exceeds maximum total supply", () => {
        const txEssence = cloneTransactionEssence(mockTransactionEssence);
        txEssence.outputs.push({
            type: BASIC_OUTPUT_TYPE,
            amount: "1450896407249092",
            nativeTokens: [],
            unlockConditions: [
                {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ED25519_ADDRESS_TYPE,
                        pubKeyHash: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
                    }
                }
            ],
            features: []
        });
        const result = validateOutputs(txEssence.outputs, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["The sum of all outputs amount field must be less then 1450896407249092."]
        ));
    });

    it("should fail with distinct native tokens count exceeds maximum native tokens count", () => {
        const txEssence = cloneTransactionEssence(mockTransactionEssence);
        txEssence.outputs.push({
            type: BASIC_OUTPUT_TYPE,
            amount: "100",
            nativeTokens: mockMaxDistintNativeTokens,
            unlockConditions: [
                {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ED25519_ADDRESS_TYPE,
                        pubKeyHash: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
                    }
                }
            ],
            features: []
        });
        const result = validateOutputs(txEssence.outputs, protocolInfoMock);
        console.log("result.errors", result.errors);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(2);
        expect(result.errors).toEqual(expect.arrayContaining(
            [
                "Max native tokens count exceeded.",
                "The count of all distinct native tokens present in outputs must be less then 64."
            ]
        ));
    });

    it("should fail with output type doesnot match with Basic, Alias, Foundry or NFT", () => {
        const txEssence = cloneTransactionEssence(mockTransactionEssence);
        txEssence.outputs.push({
            type: TREASURY_OUTPUT_TYPE,
            amount: "123456"
        });
        const result = validateOutputs(txEssence.outputs, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Output Type must be one of the following: Basic, Alias, Foundry and NFT."]
        ));
    });
});

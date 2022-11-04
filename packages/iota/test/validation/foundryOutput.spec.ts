// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ALIAS_ADDRESS_TYPE } from "../../src/models/addresses/IAliasAddress";
import { METADATA_FEATURE_TYPE } from "../../src/models/features/IMetadataFeature";
import type { INodeInfoProtocol } from "../../src/models/info/INodeInfoProtocol";
import { FOUNDRY_OUTPUT_TYPE, IFoundryOutput } from "../../src/models/outputs/IFoundryOutput";
import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../src/models/tokenSchemes/ISimpleTokenScheme";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IImmutableAliasUnlockCondition";
import { validateFoundryOutput } from "../../src/validation/outputs/foundryOutput";

const MAX_FOUNDRY_UNLOCK_CONDITIONS_COUNT = 1;
/**
 * The protocol info.
 */
const protocolInfo: INodeInfoProtocol = {
    "version": 2,
    "networkName": "testnet",
    "bech32Hrp": "rms",
    "minPowScore": 1500,
    "rentStructure": {
        "vByteCost": 100,
        "vByteFactorData": 1,
        "vByteFactorKey": 10
    },
    "tokenSupply": "1450896407249092"
};

describe("Foundry output validation", () => {
    test("should pass with valid foundry output", () => {
        const output: IFoundryOutput = {
            type: FOUNDRY_OUTPUT_TYPE,
            amount: "455655655",
            serialNumber: 1,
            nativeTokens: [
                {
                    id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740100000000",
                    amount: "15"
                },
                {
                    id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740200000000",
                    amount: "23"
                }
            ],
            unlockConditions: [
                {
                    type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ALIAS_ADDRESS_TYPE,
                        aliasId: "0x6920b176f613ec7be59e68fc68f597eb3393af80b176f613ec7be59e68fc68f5"
                    }
                }
            ],
            immutableFeatures: [
                {
                    type: METADATA_FEATURE_TYPE,
                    data: "0x546869732069732077686572652074686520696d6d757461626c65206d6574616461746120676f6573"
                }
            ],
            features: [
                {
                    type: METADATA_FEATURE_TYPE,
                    data: "0x546869732069732077686572652074686520696d6d757461626c65206d6574616461746120676f6573"
                }
            ],
            tokenScheme: {
                type: SIMPLE_TOKEN_SCHEME_TYPE,
                mintedTokens: "0x3e8",
                meltedTokens: "0x0",
                maximumSupply: "0x2710"
            }
        };

        const result = validateFoundryOutput(output, protocolInfo);
        expect(result.isValid).toEqual(true);
    });

    test("should fail with invalid foundry output", () => {
        const output: IFoundryOutput = {
            type: FOUNDRY_OUTPUT_TYPE,
            amount: "0",
            serialNumber: 1,
            unlockConditions: [],
            immutableFeatures: [
                {
                    type: METADATA_FEATURE_TYPE,
                    data: "0x546869732069732077686572652074686520696d6d757461626c65206d6574616461746120676f6573"
                }
            ],
            features: [
                {
                    type: METADATA_FEATURE_TYPE,
                    data: "0x546869732069732077686572652074686520696d6d757461626c65206d6574616461746120676f6573"
                }
            ],
            tokenScheme: {
                type: SIMPLE_TOKEN_SCHEME_TYPE,
                mintedTokens: "0x3e8",
                meltedTokens: "0x3e9",
                maximumSupply: "0x2710"
            }
        };

        const result = validateFoundryOutput(output, protocolInfo);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining([
            "Foundry output amount field must be larger than zero.",
            `Foundry output unlock conditions count must be equal to ${MAX_FOUNDRY_UNLOCK_CONDITIONS_COUNT}.`
        ]));
    });
});


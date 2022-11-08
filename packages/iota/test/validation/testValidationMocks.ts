// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ALIAS_ADDRESS_TYPE } from "../../src/models/addresses/IAliasAddress";
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import { ISSUER_FEATURE_TYPE } from "../../src/models/features/IIssuerFeature";
import { METADATA_FEATURE_TYPE } from "../../src/models/features/IMetadataFeature";
import { SENDER_FEATURE_TYPE } from "../../src/models/features/ISenderFeature";
import { TAG_FEATURE_TYPE } from "../../src/models/features/ITagFeature";
import type { INodeInfoProtocol } from "../../src/models/info/INodeInfoProtocol";
import { IAliasOutput, ALIAS_OUTPUT_TYPE } from "../../src/models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../src/models/outputs/IBasicOutput";
import { FOUNDRY_OUTPUT_TYPE, IFoundryOutput } from "../../src/models/outputs/IFoundryOutput";
import { INftOutput, NFT_OUTPUT_TYPE } from "../../src/models/outputs/INftOutput";
import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../src/models/tokenSchemes/ISimpleTokenScheme";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IGovernorAddressUnlockCondition";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IImmutableAliasUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStateControllerAddressUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/ITimelockUnlockCondition";

/**
 * The protocol info mock.
 */
export const protocolInfoMock: INodeInfoProtocol = {
    "version": 2,
    "networkName": "fakenet",
    "bech32Hrp": "rms",
    "minPowScore": 1500,
    "rentStructure": {
        "vByteCost": 100,
        "vByteFactorData": 1,
        "vByteFactorKey": 10
    },
    "tokenSupply": "1450896407249092"
};

/**
 * The Basic output mock.
 */
export const mockBasicOutput: IBasicOutput = {
    type: BASIC_OUTPUT_TYPE,
    amount: "455655655",
    nativeTokens: [
        { id: "0x1234567890", amount: "123" },
        { id: "0x1234567891", amount: "1234" }
    ],
    unlockConditions: [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        }
    ],
    features: [
        {
            type: SENDER_FEATURE_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        },
        {
            type: METADATA_FEATURE_TYPE,
            data: "0xthisissomefakedataandnotahex"
        },
        {
            type: TAG_FEATURE_TYPE,
            tag: "0xthisissomefakedataandnotahex"
        }
    ]
};

/**
 * The Alias output mock.
 */
export const mockAliasOutput: IAliasOutput = {
    type: ALIAS_OUTPUT_TYPE,
    amount: "455655655",
    aliasId: "0xb6b82443901a2ab6beefdcb88acff1ca359f211a474cb50cf63aa6a24721f9aa",
    stateIndex: 1,
    foundryCounter: 0,
    nativeTokens: [
        { id: "0x1234567890", amount: "123" },
        { id: "0x1234567891", amount: "1234" }
    ],
    unlockConditions: [
        {
            type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ALIAS_ADDRESS_TYPE,
                aliasId: "0x7ffec9e1233204d9c6dce6812b1539ee96af691ca2e4d9065daa85907d33e5d3"
            }
        },
        {
            type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ALIAS_ADDRESS_TYPE,
                aliasId: "0x7ffec9e1233204d9c6dce6812b1539ee96af691ca2e4d9065daa85907d33e5d3"
            }
        }
    ],
    features: [
        {
            type: SENDER_FEATURE_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        },
        {
            type: METADATA_FEATURE_TYPE,
            data: "0xthisissomefakedataandnotahex"
        }
    ],
    immutableFeatures: [
        {
            type: ISSUER_FEATURE_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        },
        {
            type: METADATA_FEATURE_TYPE,
            data: "0xthisissomefakedataandnotahex"
        }
    ]
};

/**
 * The NFT output mock.
 */
export const mockNftOutput: INftOutput = {
    type: NFT_OUTPUT_TYPE,
    nftId: "0x6920b176f613ec7be59e68fc68f597eb3393af80e68fc68f597eb3393af80120",
    amount: "133700",
    nativeTokens: [
        { id: "0x1234567890", amount: "123" },
        { id: "0x1234567891", amount: "1234" }
    ],
    unlockConditions: [
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        },
        {
            type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
            amount: "43600",
            returnAddress: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        },
        {
            type: TIMELOCK_UNLOCK_CONDITION_TYPE,
            unixTime: 123123123123
        },
        {
            type: EXPIRATION_UNLOCK_CONDITION_TYPE,
            unixTime: 123123123123,
            returnAddress: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        }
    ],
    features: [
        {
            type: SENDER_FEATURE_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        },
        {
            type: METADATA_FEATURE_TYPE,
            data: "0xthisissomefakedataandnotahex"
        },
        {
            type: TAG_FEATURE_TYPE,
            tag: "0xthisissomefaketagaandnotahex"
        }
    ],
    immutableFeatures: [
        {
            type: ISSUER_FEATURE_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        },
        {
            type: METADATA_FEATURE_TYPE,
            data: "0xthisissomefakedataandnotahex"
        }
    ]
};

/**
 * The Foundry output mock.
 */
export const mockFoundryOutput: IFoundryOutput = {
    type: FOUNDRY_OUTPUT_TYPE,
    amount: "133700",
    serialNumber: 1,
    nativeTokens: [
        {
            id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740100000000",
            amount: "15343"
        },
        {
            id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740200000000",
            amount: "2345"
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

// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ALIAS_ADDRESS_TYPE } from "../../src/models/addresses/IAliasAddress";
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import { ISSUER_FEATURE_TYPE } from "../../src/models/features/IIssuerFeature";
import { METADATA_FEATURE_TYPE } from "../../src/models/features/IMetadataFeature";
import { SENDER_FEATURE_TYPE } from "../../src/models/features/ISenderFeature";
import { TAG_FEATURE_TYPE } from "../../src/models/features/ITagFeature";
import { DEFAULT_PROTOCOL_VERSION, IBlock } from "../../src/models/IBlock";
import type { INativeToken } from "../../src/models/INativeToken";
import type { INodeInfoProtocol } from "../../src/models/info/INodeInfoProtocol";
import { UTXO_INPUT_TYPE } from "../../src/models/inputs/IUTXOInput";
import { TRANSACTION_ESSENCE_TYPE, ITransactionEssence } from "../../src/models/ITransactionEssence";
import { IAliasOutput, ALIAS_OUTPUT_TYPE } from "../../src/models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../src/models/outputs/IBasicOutput";
import { FOUNDRY_OUTPUT_TYPE, IFoundryOutput } from "../../src/models/outputs/IFoundryOutput";
import { INftOutput, NFT_OUTPUT_TYPE } from "../../src/models/outputs/INftOutput";
import { TAGGED_DATA_PAYLOAD_TYPE, ITaggedDataPayload } from "../../src/models/payloads/ITaggedDataPayload";
import { ITransactionPayload, TRANSACTION_PAYLOAD_TYPE } from "../../src/models/payloads/ITransactionPayload";
import { ED25519_SIGNATURE_TYPE } from "../../src/models/signatures/IEd25519Signature";
import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../src/models/tokenSchemes/ISimpleTokenScheme";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IGovernorAddressUnlockCondition";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IImmutableAliasUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStateControllerAddressUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/ITimelockUnlockCondition";
import { SIGNATURE_UNLOCK_TYPE } from "../../src/models/unlocks/ISignatureUnlock";

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
 * The block mock.
 */
export const mockBlock: IBlock = {
    protocolVersion: DEFAULT_PROTOCOL_VERSION,
    parents: [
        "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02",
        "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
    ],
    payload: {
        type: TAGGED_DATA_PAYLOAD_TYPE,
        tag: "0xthisissomefakedataandnotahex",
        data: "0xthisissomefakedataandnotahex"
    },
    nonce: "0"
};

/**
 * The tagged data payload mock.
 */
export const mockTaggedDataPayload: ITaggedDataPayload = {
    type: TAGGED_DATA_PAYLOAD_TYPE,
    tag: "0xthisissomefakedataandnotahex",
    data: "0xthisissomefakedataandnotahex"
};

/**
 * The transaction essence mock.
 */
export const mockTransactionEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: "123",
    inputs: [
        {
            type: UTXO_INPUT_TYPE,
            transactionId: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            transactionOutputIndex: 2
        }
    ],
    inputsCommitment: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    outputs: [
        {
            type: BASIC_OUTPUT_TYPE,
            amount: "100",
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
        }
    ]
};

/**
 * The transaction payload mock.
 */
export const mockTransactionPayload: ITransactionPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: mockTransactionEssence,
    unlocks: [
        {
            type: SIGNATURE_UNLOCK_TYPE,
            signature: {
                type: ED25519_SIGNATURE_TYPE,
                publicKey: "0xf447b84edbd0564ca2bbbe277ccb857dae85d6cce7c6a166bdb34ee1b3879709",
                signature: "0xdeacb2dfb478083210d24dab54caa93f3df237f0dbac48e5f78d9876a9ef693f6b6199d6ab8a7049953d2a5be108a7a2b0befd81b95893c9151b8dcc2e63ef0e"
            }
        }
    ]
};

/**
 * The max distinct native tokens mock.
 */
export const mockMaxDistintNativeTokens: INativeToken[] = [
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000000",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000001",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000002",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000003",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000004",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000005",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000006",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000007",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000008",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000009",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000010",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000011",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000012",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000013",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000014",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000015",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000016",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000017",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000018",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000019",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000020",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000021",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000022",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000023",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000024",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000025",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000026",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000027",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000028",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000029",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000030",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000031",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000032",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000033",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000034",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000035",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000036",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000037",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000038",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000039",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000040",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000041",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000042",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000043",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000044",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000045",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000046",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000047",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000048",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000049",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000050",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000051",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000052",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000053",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000054",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000055",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000056",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000057",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000058",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000059",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000060",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000061",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000062",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000063",
        amount: "0x64"
    },
    {
        id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000064",
        amount: "0x64"
    }
];

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

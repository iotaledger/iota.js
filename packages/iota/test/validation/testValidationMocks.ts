// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import { ISSUER_FEATURE_TYPE } from "../../src/models/features/IIssuerFeature";
import { METADATA_FEATURE_TYPE } from "../../src/models/features/IMetadataFeature";
import { SENDER_FEATURE_TYPE } from "../../src/models/features/ISenderFeature";
import { TAG_FEATURE_TYPE } from "../../src/models/features/ITagFeature";
import type { INodeInfoProtocol } from "../../src/models/info/INodeInfoProtocol";
import { INftOutput, NFT_OUTPUT_TYPE } from "../../src/models/outputs/INftOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IExpirationUnlockCondition";
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
                type: 0,
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
                type: 0,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        }
    ],
    features: [
        {
            type: SENDER_FEATURE_TYPE,
            address: {
                type: 0,
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
                type: 0,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        },
        {
            type: METADATA_FEATURE_TYPE,
            data: "0xthisissomefakedataandnotahex"
        }
    ]
};


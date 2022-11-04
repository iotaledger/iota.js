// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import type { INodeInfoProtocol } from "../../src/models/info/INodeInfoProtocol";
import { INftOutput, NFT_OUTPUT_TYPE } from "../../src/models/outputs/INftOutput";

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
            type: 0,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        },
        {
            type: 1,
            amount: "43600",
            returnAddress: {
                type: 0,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        },
        {
            type: 2,
            unixTime: 123123123123
        },
        {
            type: 3,
            unixTime: 123123123123,
            returnAddress: {
                type: 0,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        }
    ],
    features: [
        {
            type: 0,
            address: {
                type: 0,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        },
        {
            type: 2,
            data: "0xthisissomefakedataandnotahex"
        },
        {
            type: 3,
            tag: "0xthisissomefaketagaandnotahex"
        }
    ],
    immutableFeatures: [
        {
            type: 1,
            address: {
                type: 0,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        },
        {
            type: 2,
            data: "0xthisissomefakedataandnotahex"
        }
    ]
};


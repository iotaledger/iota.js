// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeMilestonePayload, serializeMilestonePayload } from "../../../src/binary/payloads/milestonePayload";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import { TREASURY_INPUT_TYPE } from "../../../src/models/inputs/ITreasuryInput";
import { TREASURY_OUTPUT_TYPE } from "../../../src/models/outputs/ITreasuryOutput";
import { IMilestonePayload, MILESTONE_PAYLOAD_TYPE } from "../../../src/models/payloads/IMilestonePayload";
import { RECEIPT_PAYLOAD_TYPE } from "../../../src/models/payloads/IReceiptPayload";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../../../src/models/payloads/ITreasuryTransactionPayload";

describe("Binary Miletsone Payload", () => {
    test("Can serialize and deserialize milestone payload with no receipt", () => {
        const payload: IMilestonePayload = {
            type: MILESTONE_PAYLOAD_TYPE,
            index: 1087,
            timestamp: 1605190003,
            parentMessageIds: [
                "04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02",
                "c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
            ],
            inclusionMerkleProof: "786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419",
            nextPoWScore: 0,
            nextPoWScoreMilestoneIndex: 1,
            publicKeys: [
                "ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248c",
                "f6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c"
            ],
            signatures: [
                "f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01",
                "fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c"
            ]
        };

        const serialized = new WriteStream();
        serializeMilestonePayload(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "010000003f0400007341ad5f000000000204ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419000000000100000002ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248cf6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c0000000002f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c"
        );
        const deserialized = deserializeMilestonePayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.index).toEqual(1087);
        expect(deserialized.timestamp).toEqual(1605190003);
        expect(deserialized.parentMessageIds[0]).toEqual(
            "04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02"
        );
        expect(deserialized.parentMessageIds[1]).toEqual(
            "c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
        );
        expect(deserialized.inclusionMerkleProof).toEqual(
            "786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419"
        );
        expect(deserialized.publicKeys.length).toEqual(2);
        expect(deserialized.publicKeys[0]).toEqual("ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248c");
        expect(deserialized.publicKeys[1]).toEqual("f6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c");
        expect(deserialized.signatures.length).toEqual(2);
        expect(deserialized.signatures[0]).toEqual(
            "f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01"
        );
        expect(deserialized.signatures[1]).toEqual(
            "fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c"
        );
    });

    test("Can serialize and deserialize milestone payload with receipt", () => {
        const payload: IMilestonePayload = {
            type: MILESTONE_PAYLOAD_TYPE,
            index: 1087,
            timestamp: 1605190003,
            parentMessageIds: [
                "04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02",
                "c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
            ],
            inclusionMerkleProof: "786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419",
            nextPoWScore: 0,
            nextPoWScoreMilestoneIndex: 1,
            publicKeys: [
                "ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248c",
                "f6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c"
            ],
            receipt: {
                type: RECEIPT_PAYLOAD_TYPE,
                migratedAt: 123456,
                final: true,
                funds: [
                    {
                        tailTransactionHash: "a".repeat(98),
                        address: {
                            type: ED25519_ADDRESS_TYPE,
                            pubKeyHash: "b".repeat(64)
                        },
                        deposit: 100
                    }
                ],
                transaction: {
                    type: TREASURY_TRANSACTION_PAYLOAD_TYPE,
                    input: {
                        type: TREASURY_INPUT_TYPE,
                        milestoneId: "a".repeat(64)
                    },
                    output: {
                        type: TREASURY_OUTPUT_TYPE,
                        amount: 9876
                    }
                }
            },
            signatures: [
                "f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01",
                "fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c"
            ]
        };

        const serialized = new WriteStream();
        serializeMilestonePayload(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "010000003f0400007341ad5f000000000204ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419000000000100000002ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248cf6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c970000000300000040e20100010100aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa00bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb64000000000000002e0000000400000001aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa02942600000000000002f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c"
        );
        const deserialized = deserializeMilestonePayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.index).toEqual(1087);
        expect(deserialized.timestamp).toEqual(1605190003);
        expect(deserialized.parentMessageIds[0]).toEqual(
            "04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02"
        );
        expect(deserialized.parentMessageIds[1]).toEqual(
            "c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
        );
        expect(deserialized.inclusionMerkleProof).toEqual(
            "786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419"
        );
        expect(deserialized.publicKeys.length).toEqual(2);
        expect(deserialized.publicKeys[0]).toEqual("ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248c");
        expect(deserialized.publicKeys[1]).toEqual("f6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c");
        expect(deserialized.receipt).toBeDefined();
        if (deserialized.receipt) {
            expect(deserialized.receipt.type).toEqual(3);
            expect(deserialized.receipt.migratedAt).toEqual(123456);
            expect(deserialized.receipt.funds.length).toEqual(1);
            expect(deserialized.receipt.funds[0].tailTransactionHash).toEqual("a".repeat(98));
            expect(deserialized.receipt.funds[0].address.type).toEqual(0);
            expect((deserialized.receipt.funds[0].address as IEd25519Address).pubKeyHash).toEqual("b".repeat(64));
            expect(deserialized.receipt.funds[0].deposit).toEqual(100);
        }
        expect(deserialized.signatures.length).toEqual(2);
        expect(deserialized.signatures[0]).toEqual(
            "f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01"
        );
        expect(deserialized.signatures[1]).toEqual(
            "fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c"
        );
    });
});

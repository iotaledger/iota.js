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

describe("Binary Milestone Payload", () => {
    test("Can serialize and deserialize milestone payload with no receipt", () => {
        const payload: IMilestonePayload = {
            type: MILESTONE_PAYLOAD_TYPE,
            index: 1087,
            timestamp: 1605190003,
            parentMessageIds: [
                "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02",
                "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
            ],
            inclusionMerkleProof: "0x786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419",
            nextPoWScore: 0,
            nextPoWScoreMilestoneIndex: 1,
            metadata: "0x1111111122222222",
            signatures: [
                {
                    type: 0,
                    publicKey: "0xd85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c98",
                    signature: "0x15188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d"
                },
                {
                    type: 0,
                    publicKey: "0xd9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2",
                    signature: "0x48afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
                }
            ]
        };

        const serialized = new WriteStream();
        serializeMilestonePayload(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "070000003f0400007341ad5f000000000204ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419000000000100000008001111111122222222000000000200d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c9815188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d00d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f248afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
        );
        const deserialized = deserializeMilestonePayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(7);
        expect(deserialized.index).toEqual(1087);
        expect(deserialized.timestamp).toEqual(1605190003);
        expect(deserialized.parentMessageIds[0]).toEqual(
            "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02"
        );
        expect(deserialized.parentMessageIds[1]).toEqual(
            "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
        );
        expect(deserialized.inclusionMerkleProof).toEqual(
            "0x786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419"
        );
        expect(deserialized.metadata).toEqual(
            "0x1111111122222222"
        );
        expect(deserialized.signatures.length).toEqual(2);
        expect(payload.signatures[0].type).toEqual(0);
        expect(payload.signatures[0].publicKey).toEqual(
            "0xd85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c98"
        );
        expect(payload.signatures[0].signature).toEqual(
            "0x15188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d"
        );
        expect(payload.signatures[1].type).toEqual(0);
        expect(payload.signatures[1].publicKey).toEqual(
            "0xd9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2"
        );
        expect(payload.signatures[1].signature).toEqual(
            "0x48afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
        );
    });

    test("Can serialize and deserialize milestone payload with receipt", () => {
        const payload: IMilestonePayload = {
            type: MILESTONE_PAYLOAD_TYPE,
            index: 1087,
            timestamp: 1605190003,
            parentMessageIds: [
                "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02",
                "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
            ],
            inclusionMerkleProof: "0x786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419",
            nextPoWScore: 0,
            nextPoWScoreMilestoneIndex: 1,
            metadata: "0x1111111122222222",
            receipt: {
                type: RECEIPT_PAYLOAD_TYPE,
                migratedAt: 123456,
                final: true,
                funds: [
                    {
                        tailTransactionHash: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        address: {
                            type: ED25519_ADDRESS_TYPE,
                            pubKeyHash: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
                        },
                        deposit: "64"
                    }
                ],
                transaction: {
                    type: TREASURY_TRANSACTION_PAYLOAD_TYPE,
                    input: {
                        type: TREASURY_INPUT_TYPE,
                        milestoneId: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                    },
                    output: {
                        type: TREASURY_OUTPUT_TYPE,
                        amount: "2694"
                    }
                }
            },
            signatures: [
                {
                    type: 0,
                    publicKey: "0xd85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c98",
                    signature: "0x15188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d"
                },
                {
                    type: 0,
                    publicKey: "0xd9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2",
                    signature: "0x48afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
                }
            ]
        };

        const serialized = new WriteStream();
        serializeMilestonePayload(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "070000003f0400007341ad5f000000000204ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419000000000100000008001111111122222222970000000300000040e20100010100aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa00bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb40000000000000002e0000000400000001aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa02860a0000000000000200d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c9815188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d00d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f248afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
        );
        const deserialized = deserializeMilestonePayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(7);
        expect(deserialized.index).toEqual(1087);
        expect(deserialized.timestamp).toEqual(1605190003);
        expect(deserialized.parentMessageIds[0]).toEqual(
            "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02"
        );
        expect(deserialized.parentMessageIds[1]).toEqual(
            "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
        );
        expect(deserialized.inclusionMerkleProof).toEqual(
            "0x786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419"
        );
        expect(deserialized.metadata).toEqual(
            "0x1111111122222222"
        );
        expect(deserialized.receipt).toBeDefined();
        if (deserialized.receipt) {
            expect(deserialized.receipt.type).toEqual(3);
            expect(deserialized.receipt.migratedAt).toEqual(123456);
            expect(deserialized.receipt.funds.length).toEqual(1);
            expect(deserialized.receipt.funds[0].tailTransactionHash).toEqual("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            expect(deserialized.receipt.funds[0].address.type).toEqual(0);
            expect((deserialized.receipt.funds[0].address as IEd25519Address).pubKeyHash).toEqual("0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
            expect(deserialized.receipt.funds[0].deposit).toEqual("64");
        }
        expect(deserialized.signatures.length).toEqual(2);
        expect(payload.signatures[0].type).toEqual(0);
        expect(payload.signatures[0].publicKey).toEqual(
            "0xd85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c98"
        );
        expect(payload.signatures[0].signature).toEqual(
            "0x15188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d"
        );
        expect(payload.signatures[1].type).toEqual(0);
        expect(payload.signatures[1].publicKey).toEqual(
            "0xd9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2"
        );
        expect(payload.signatures[1].signature).toEqual(
            "0x48afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
        );
    });
});

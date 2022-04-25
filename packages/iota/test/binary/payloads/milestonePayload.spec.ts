// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeMilestonePayload, serializeMilestonePayload } from "../../../src/binary/payloads/milestonePayload";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import { TREASURY_INPUT_TYPE } from "../../../src/models/inputs/ITreasuryInput";
import { IPoWMilestoneOption, POW_MILESTONE_OPTION_TYPE } from "../../../src/models/milestoneOptions/IPoWMilestoneOption";
import { IReceiptMilestoneOption, RECEIPT_MILESTONE_OPTION_TYPE } from "../../../src/models/milestoneOptions/IReceiptMilestoneOption";
import type { MilestoneOptionTypes } from "../../../src/models/milestoneOptions/milestoneOptionTypes";
import { TREASURY_OUTPUT_TYPE } from "../../../src/models/outputs/ITreasuryOutput";
import { IMilestonePayload, MILESTONE_PAYLOAD_TYPE } from "../../../src/models/payloads/IMilestonePayload";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../../../src/models/payloads/ITreasuryTransactionPayload";

describe("Binary Milestone Payload", () => {
    test("Can serialize and deserialize milestone payload with no options", () => {
        const payload: IMilestonePayload = {
            type: MILESTONE_PAYLOAD_TYPE,
            index: 1087,
            timestamp: 1605190003,
            lastMilestoneId: "0x50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e4",
            parentMessageIds: [
                "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02",
                "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
            ],
            confirmedMerkleRoot: "0x665de8d34bca02af275a6ccaf2d5f7b1d018f695473f19855d7ad1a54f106ed1",
            appliedMerkleRoot: "0x0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8",
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
            "070000003f0400007341ad5f50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e40204ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3665de8d34bca02af275a6ccaf2d5f7b1d018f695473f19855d7ad1a54f106ed10e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a808001111111122222222000200d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c9815188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d00d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f248afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
        );
        const deserialized = deserializeMilestonePayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(7);
        expect(deserialized.index).toEqual(1087);
        expect(deserialized.timestamp).toEqual(1605190003);
        expect(deserialized.lastMilestoneId).toEqual("0x50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e4");
        expect(deserialized.parentMessageIds[0]).toEqual(
            "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02"
        );
        expect(deserialized.parentMessageIds[1]).toEqual(
            "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
        );
        expect(deserialized.confirmedMerkleRoot).toEqual(
            "0x665de8d34bca02af275a6ccaf2d5f7b1d018f695473f19855d7ad1a54f106ed1"
        );
        expect(deserialized.appliedMerkleRoot).toEqual(
            "0x0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8"
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

    test("Can serialize and deserialize milestone payload with receipt option", () => {
        const payload: IMilestonePayload = {
            type: MILESTONE_PAYLOAD_TYPE,
            index: 1087,
            timestamp: 1605190003,
            lastMilestoneId: "0x50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e4",
            parentMessageIds: [
                "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02",
                "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
            ],
            confirmedMerkleRoot: "0x665de8d34bca02af275a6ccaf2d5f7b1d018f695473f19855d7ad1a54f106ed1",
            appliedMerkleRoot: "0x0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8",
            metadata: "0x1111111122222222",
            options: [
                {
                    type: RECEIPT_MILESTONE_OPTION_TYPE,
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
                }
            ],
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
            "070000003f0400007341ad5f50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e40204ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3665de8d34bca02af275a6ccaf2d5f7b1d018f695473f19855d7ad1a54f106ed10e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a808001111111122222222010040e20100010100aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa00bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb40000000000000002e0000000400000001aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa02860a0000000000000200d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c9815188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d00d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f248afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
        );
        const deserialized = deserializeMilestonePayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(7);
        expect(deserialized.index).toEqual(1087);
        expect(deserialized.timestamp).toEqual(1605190003);
        expect(deserialized.lastMilestoneId).toEqual("0x50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e4");
        expect(deserialized.parentMessageIds[0]).toEqual(
            "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02"
        );
        expect(deserialized.parentMessageIds[1]).toEqual(
            "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
        );
        expect(deserialized.confirmedMerkleRoot).toEqual(
            "0x665de8d34bca02af275a6ccaf2d5f7b1d018f695473f19855d7ad1a54f106ed1"
        );
        expect(deserialized.appliedMerkleRoot).toEqual(
            "0x0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8"
        );
        expect(deserialized.metadata).toEqual(
            "0x1111111122222222"
        );
        expect(deserialized.options).toBeDefined();
        const options = deserialized.options as MilestoneOptionTypes[];
        expect(options[0].type).toEqual(0);
        const mo0 = options[0] as IReceiptMilestoneOption;
        expect(mo0.migratedAt).toEqual(123456);
        expect(mo0.funds.length).toEqual(1);
        expect(mo0.funds[0].tailTransactionHash).toEqual("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        expect(mo0.funds[0].address.type).toEqual(0);
        expect((mo0.funds[0].address as IEd25519Address).pubKeyHash).toEqual("0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        expect(mo0.funds[0].deposit).toEqual("64");
        expect(mo0.transaction.type).toEqual(4);
        expect(mo0.transaction.input.type).toEqual(1);
        expect(mo0.transaction.input.milestoneId).toEqual("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        expect(mo0.transaction.output.type).toEqual(2);
        expect(mo0.transaction.output.amount).toEqual("2694");
        expect(deserialized.signatures.length).toEqual(2);
        expect(deserialized.signatures[0].type).toEqual(0);
        expect(deserialized.signatures[0].publicKey).toEqual(
            "0xd85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c98"
        );
        expect(deserialized.signatures[0].signature).toEqual(
            "0x15188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d"
        );
        expect(deserialized.signatures[1].type).toEqual(0);
        expect(deserialized.signatures[1].publicKey).toEqual(
            "0xd9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2"
        );
        expect(deserialized.signatures[1].signature).toEqual(
            "0x48afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
        );
    });

    test("Can serialize and deserialize milestone payload with PoW option", () => {
        const payload: IMilestonePayload = {
            type: MILESTONE_PAYLOAD_TYPE,
            index: 1087,
            timestamp: 1605190003,
            lastMilestoneId: "0x50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e4",
            parentMessageIds: [
                "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02",
                "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
            ],
            confirmedMerkleRoot: "0x665de8d34bca02af275a6ccaf2d5f7b1d018f695473f19855d7ad1a54f106ed1",
            appliedMerkleRoot: "0x0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8",
            metadata: "0x1111111122222222",
            options: [
                {
                    type: POW_MILESTONE_OPTION_TYPE,
                    nextPoWScore: 0,
                    nextPoWScoreMilestoneIndex: 1
                }
            ],
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
            "070000003f0400007341ad5f50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e40204ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3665de8d34bca02af275a6ccaf2d5f7b1d018f695473f19855d7ad1a54f106ed10e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a808001111111122222222010100000000010000000200d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c9815188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d00d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f248afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
        );
        const deserialized = deserializeMilestonePayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(7);
        expect(deserialized.index).toEqual(1087);
        expect(deserialized.timestamp).toEqual(1605190003);
        expect(deserialized.lastMilestoneId).toEqual("0x50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e4");
        expect(deserialized.parentMessageIds[0]).toEqual(
            "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02"
        );
        expect(deserialized.parentMessageIds[1]).toEqual(
            "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
        );
        expect(deserialized.confirmedMerkleRoot).toEqual(
            "0x665de8d34bca02af275a6ccaf2d5f7b1d018f695473f19855d7ad1a54f106ed1"
        );
        expect(deserialized.appliedMerkleRoot).toEqual(
            "0x0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8"
        );
        expect(deserialized.metadata).toEqual(
            "0x1111111122222222"
        );
        expect(deserialized.options).toBeDefined();
        const options = deserialized.options as MilestoneOptionTypes[];
        expect(options[0].type).toEqual(1);
        const mo0 = options[0] as IPoWMilestoneOption;
        expect(mo0.nextPoWScore).toEqual(0);
        expect(mo0.nextPoWScoreMilestoneIndex).toEqual(1);
        expect(deserialized.signatures.length).toEqual(2);
        expect(deserialized.signatures[0].type).toEqual(0);
        expect(deserialized.signatures[0].publicKey).toEqual(
            "0xd85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c98"
        );
        expect(deserialized.signatures[0].signature).toEqual(
            "0x15188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d"
        );
        expect(deserialized.signatures[1].type).toEqual(0);
        expect(deserialized.signatures[1].publicKey).toEqual(
            "0xd9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2"
        );
        expect(deserialized.signatures[1].signature).toEqual(
            "0x48afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
        );
    });


    test("Can serialize and deserialize milestone payload with receipt and PoW option", () => {
        const payload: IMilestonePayload = {
            type: MILESTONE_PAYLOAD_TYPE,
            index: 1087,
            timestamp: 1605190003,
            lastMilestoneId: "0x50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e4",
            parentMessageIds: [
                "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02",
                "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
            ],
            confirmedMerkleRoot: "0x665de8d34bca02af275a6ccaf2d5f7b1d018f695473f19855d7ad1a54f106ed1",
            appliedMerkleRoot: "0x0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8",
            metadata: "0x1111111122222222",
            options: [
                {
                    type: RECEIPT_MILESTONE_OPTION_TYPE,
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
                {
                    type: POW_MILESTONE_OPTION_TYPE,
                    nextPoWScore: 0,
                    nextPoWScoreMilestoneIndex: 1
                }
            ],
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
            "070000003f0400007341ad5f50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e40204ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3665de8d34bca02af275a6ccaf2d5f7b1d018f695473f19855d7ad1a54f106ed10e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a808001111111122222222020040e20100010100aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa00bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb40000000000000002e0000000400000001aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa02860a0000000000000100000000010000000200d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c9815188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d00d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f248afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
        );
        const deserialized = deserializeMilestonePayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(7);
        expect(deserialized.index).toEqual(1087);
        expect(deserialized.timestamp).toEqual(1605190003);
        expect(deserialized.lastMilestoneId).toEqual("0x50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e4");
        expect(deserialized.parentMessageIds[0]).toEqual(
            "0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02"
        );
        expect(deserialized.parentMessageIds[1]).toEqual(
            "0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3"
        );
        expect(deserialized.confirmedMerkleRoot).toEqual(
            "0x665de8d34bca02af275a6ccaf2d5f7b1d018f695473f19855d7ad1a54f106ed1"
        );
        expect(deserialized.appliedMerkleRoot).toEqual(
            "0x0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8"
        );
        expect(deserialized.metadata).toEqual(
            "0x1111111122222222"
        );
        expect(deserialized.options).toBeDefined();
        const options = deserialized.options as MilestoneOptionTypes[];
        expect(options.length).toEqual(2);
        expect(options[0].type).toEqual(0);
        const mo0 = options[0] as IReceiptMilestoneOption;
        expect(mo0.migratedAt).toEqual(123456);
        expect(mo0.funds.length).toEqual(1);
        expect(mo0.funds[0].tailTransactionHash).toEqual("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        expect(mo0.funds[0].address.type).toEqual(0);
        expect((mo0.funds[0].address as IEd25519Address).pubKeyHash).toEqual("0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        expect(mo0.funds[0].deposit).toEqual("64");
        expect(mo0.transaction.type).toEqual(4);
        expect(mo0.transaction.input.type).toEqual(1);
        expect(mo0.transaction.input.milestoneId).toEqual("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        expect(mo0.transaction.output.type).toEqual(2);
        expect(mo0.transaction.output.amount).toEqual("2694");
        expect(options[1].type).toEqual(1);
        const mo1 = options[1] as IPoWMilestoneOption;
        expect(mo1.nextPoWScore).toEqual(0);
        expect(mo1.nextPoWScoreMilestoneIndex).toEqual(1);
        expect(deserialized.signatures.length).toEqual(2);
        expect(deserialized.signatures[0].type).toEqual(0);
        expect(deserialized.signatures[0].publicKey).toEqual(
            "0xd85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c98"
        );
        expect(deserialized.signatures[0].signature).toEqual(
            "0x15188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d"
        );
        expect(deserialized.signatures[1].type).toEqual(0);
        expect(deserialized.signatures[1].publicKey).toEqual(
            "0xd9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2"
        );
        expect(deserialized.signatures[1].signature).toEqual(
            "0x48afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a"
        );
    });
});

// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeMilestoneOptions, serializeMilestoneOptions } from "../../../src/binary/milestoneOptions/milestoneOptions";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import { TREASURY_INPUT_TYPE } from "../../../src/models/inputs/ITreasuryInput";
import { IProtocolParamsMilestoneOption, PROTOCOL_PARAMETERS_MILESTONE_OPTION_TYPE } from "../../../src/models/milestoneOptions/IProtocolParamsMilestoneOption";
import { IReceiptMilestoneOption, RECEIPT_MILESTONE_OPTION_TYPE } from "../../../src/models/milestoneOptions/IReceiptMilestoneOption";
import type { MilestoneOptionTypes } from "../../../src/models/milestoneOptions/milestoneOptionTypes";
import { TREASURY_OUTPUT_TYPE } from "../../../src/models/outputs/ITreasuryOutput";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../../../src/models/payloads/ITreasuryTransactionPayload";

describe("Binary Milestone Options", () => {
    test("Can serialize and deserialize receipt milestone options", () => {
        const payload: MilestoneOptionTypes [] = [
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
                        deposit: "100"
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
                        amount: "9876"
                    }
                }
            },
            {
                type: PROTOCOL_PARAMETERS_MILESTONE_OPTION_TYPE,
                targetMilestoneIndex: 13455,
                protocolVersion: 3,
                params: "0x27d0ca22753f76ef32d1e9e8fcc417aa9fc1c15eae854661e0253287be6ea68f649493fc8fd6ac43e9ca750c6f6d884cc72386ddcb7d"
            }
        ];

        const serialized = new WriteStream();
        serializeMilestoneOptions(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "020040e20100010100aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa00bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb64000000000000002e0000000400000001aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa029426000000000000018f34000003360027d0ca22753f76ef32d1e9e8fcc417aa9fc1c15eae854661e0253287be6ea68f649493fc8fd6ac43e9ca750c6f6d884cc72386ddcb7d"
        );
        const deserialized = deserializeMilestoneOptions(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.length).toEqual(2);
        expect(deserialized[0].type).toEqual(0);
        const mo0 = deserialized[0] as IReceiptMilestoneOption;
        expect(mo0.migratedAt).toEqual(123456);
        expect(mo0.final).toEqual(true);
        expect(mo0.funds.length).toEqual(1);
        expect(mo0.funds[0].tailTransactionHash).toEqual("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        expect(mo0.funds[0].address.type).toEqual(0);
        expect((mo0.funds[0].address as IEd25519Address).pubKeyHash).toEqual("0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        expect(mo0.funds[0].deposit).toEqual("100");
        expect(mo0.transaction.type).toEqual(4);
        expect(mo0.transaction.input.type).toEqual(1);
        expect(mo0.transaction.input.milestoneId).toEqual("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        expect(mo0.transaction.output.type).toEqual(2);
        expect(mo0.transaction.output.amount).toEqual("9876");
        expect(deserialized[1].type).toEqual(1);
        const mo1 = deserialized[1] as IProtocolParamsMilestoneOption;
        expect(mo1.targetMilestoneIndex).toEqual(13455);
        expect(mo1.protocolVersion).toEqual(3);
        expect(mo1.params).toEqual("0x27d0ca22753f76ef32d1e9e8fcc417aa9fc1c15eae854661e0253287be6ea68f649493fc8fd6ac43e9ca750c6f6d884cc72386ddcb7d");
    });
});

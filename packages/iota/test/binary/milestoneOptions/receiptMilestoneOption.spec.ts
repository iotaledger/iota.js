// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeReceiptMilestoneOption, serializeReceiptMilestoneOption } from "../../../src/binary/milestoneOptions/receiptMilestoneOption";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import { TREASURY_INPUT_TYPE } from "../../../src/models/inputs/ITreasuryInput";
import { IReceiptMilestoneOption, RECEIPT_MILESTONE_OPTION_TYPE } from "../../../src/models/milestoneOptions/IReceiptMilestoneOption";
import { TREASURY_OUTPUT_TYPE } from "../../../src/models/outputs/ITreasuryOutput";
import { TREASURY_TRANSACTION_PAYLOAD_TYPE } from "../../../src/models/payloads/ITreasuryTransactionPayload";

describe("Binary Receipt Milestone Option", () => {
    test("Can serialize and deserialize receipt milestone option", () => {
        const payload: IReceiptMilestoneOption = {
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
        };

        const serialized = new WriteStream();
        serializeReceiptMilestoneOption(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "0040e20100010100aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa00bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb64000000000000002e0000000400000001aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa029426000000000000"
        );
        const deserialized = deserializeReceiptMilestoneOption(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.migratedAt).toEqual(123456);
        expect(deserialized.final).toEqual(true);
        expect(deserialized.funds.length).toEqual(1);
        expect(deserialized.funds[0].tailTransactionHash).toEqual("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        expect(deserialized.funds[0].address.type).toEqual(0);
        expect((deserialized.funds[0].address as IEd25519Address).pubKeyHash).toEqual("0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        expect(deserialized.funds[0].deposit).toEqual("100");
        expect(deserialized.transaction.type).toEqual(4);
        expect(deserialized.transaction.input.type).toEqual(1);
        expect(deserialized.transaction.input.milestoneId).toEqual("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        expect(deserialized.transaction.output.type).toEqual(2);
        expect(deserialized.transaction.output.amount).toEqual("9876");
    });
});

// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ReadStream } from "@iota/util.js";
import { deserializePoWMilestoneOption } from "../../../src/binary/milestoneOptions/powMilestoneOption";
import { deserializeReceiptMilestoneOption } from "../../../src/binary/milestoneOptions/receiptMilestoneOption";
import { deserializePayload } from "../../../src/binary/payloads/payloads";
import type { IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import type { IMilestonePayload } from "../../../src/models/payloads/IMilestonePayload";
import type { ITaggedDataPayload } from "../../../src/models/payloads/ITaggedDataPayload";


describe("Binary Payload", () => {
    test("Can fail with underflow min", () => {
        const bytes = new Uint8Array();
        expect(() => deserializePayload(new ReadStream(bytes))).toThrow("exceeds the remaining");
    });

    test("Can fail with underflow max", () => {
        const bytes = new Uint8Array(3);
        expect(() => deserializePayload(new ReadStream(bytes))).toThrow("exceeds the remaining");
    });

    test("Can fail with undersize payload length", () => {
        const bytes = Buffer.alloc(12);
        bytes.writeUInt32LE(1000, 0); // Payload length
        expect(() => deserializePayload(new ReadStream(bytes))).toThrow("exceeds the remaining");
    });

    test("Can fail with unrecognised payload", () => {
        const buffer = Buffer.alloc(12);
        buffer.writeUInt32LE(8, 0); // Payload length
        buffer.writeUInt32LE(99, 4); // Payload type
        expect(() => deserializePayload(new ReadStream(buffer))).toThrow("Unrecognized payload");
    });

    test("Can fail with tagged data payload too small", () => {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt32LE(4, 0); // Payload length
        buffer.writeUInt32LE(5, 4); // Payload type
        expect(() => deserializePayload(new ReadStream(buffer))).toThrow("minimimum size");
    });

    test("Can fail with milestone payload too small", () => {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt32LE(4, 0); // Payload length
        buffer.writeUInt32LE(7, 4); // Payload type
        expect(() => deserializePayload(new ReadStream(buffer))).toThrow("minimimum size");
    });

    test("Can fail with receipt payload too small", () => {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt32LE(4, 0); // Payload length
        buffer.writeUInt32LE(3, 4); // Payload type
        expect(() => deserializeReceiptMilestoneOption(new ReadStream(buffer))).toThrow("minimimum size");
    });

    test("Can succeed with valid tagged data", () => {
        const buffer = Buffer.alloc(14);
        buffer.writeUInt32LE(8, 0); // Payload length
        buffer.writeUInt32LE(5, 4); // Payload type
        buffer.writeUInt8(1, 8); // Tag length
        buffer.writeUInt8(65, 9); // Tag data
        buffer.writeUInt32LE(0, 10); // Data length
        const payload = deserializePayload(new ReadStream(buffer)) as ITaggedDataPayload;
        expect(payload.type).toEqual(5);
        expect(payload.tag).toEqual("0x41");
        expect(payload.data).toEqual(undefined);
    });

    test("Can succeed with valid milestone data", () => {
        const buffer = Buffer.alloc(398);
        buffer.writeUInt32LE(315, 0); // Payload length
        buffer.writeUInt32LE(7, 4); // Payload type
        buffer.writeUInt32LE(1087, 8); // Milestone index
        buffer.writeUInt32LE(1605190003, 12); // Milestone timestamp
        buffer.write("50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e4", 16, "hex"); // Last Milestone id
        buffer.writeUInt8(2, 48); // Num parents
        buffer.write("c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3", 49, "hex"); // Parent 1
        buffer.write("04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02", 81, "hex"); // Parent 2
        buffer.write("786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419", 113, "hex"); // Confirmed Merkle proof
        buffer.write("0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8", 145, "hex"); // Applied Merkle proof
        buffer.writeUInt16LE(8, 177); // metadata count
        buffer.write("1111111122222222", 179, "hex"); // metadata
        buffer.writeUInt8(0, 187); // Options count
        buffer.writeUInt8(2, 188); // Signature count
        buffer.writeUInt8(0, 189); // Signature type
        buffer.write(
            "d85e5b1590d898d1e0cdebb2e3b5337c8b76270142663d78811683ba47c17c98",
            190,
            "hex"
        ); // Public key
        buffer.write(
            "15188080d5ef2f8a8fd08498243a30b2a8eb08e0910573101632bb244c9e27db26121c8af619d90de6cb5e5c407e4edd709e0e06702170e311a1668e0a12480d",
            222,
            "hex"
        ); // Signature
        buffer.writeUInt8(0, 286); // Signature type
        buffer.write(
            "d9922819a39e94ddf3907f4b9c8df93f39f026244fcb609205b9a879022599f2",
            287,
            "hex"
        ); // Public key
        buffer.write(
            "48afb8e21fbba0ba473b6798ecad3a33e10d1575fd5e3822e2922db4cc24b0808fd6792ee6eaaade15cdc14e43da16883962d15358dc064ba5bb2726cf07790a",
            319,
            "hex"
        ); // Signature
        const payload = deserializePayload(new ReadStream(buffer)) as IMilestonePayload;
        expect(payload.type).toEqual(7);
        expect(payload.index).toEqual(1087);
        expect(payload.timestamp).toEqual(1605190003);
        expect(payload.lastMilestoneId).toEqual("0x50cf83f8ee3e316a7f3a4df32082747e8392e59fa724bbd13a9f2efc34cec6e4");
        expect(payload.parentMessageIds[0]).toEqual("0xc0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3");
        expect(payload.parentMessageIds[1]).toEqual("0x04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02");
        expect(payload.confirmedMerkleRoot).toEqual(
            "0x786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419"
        );
        expect(payload.appliedMerkleRoot).toEqual(
            "0x0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8"
        );
        expect(payload.metadata).toEqual(
            "0x1111111122222222"
        );
        expect(payload.signatures.length).toEqual(2);
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

    test("Can succeed with valid receipt milestone option", () => {
        const buffer = Buffer.alloc(148);
        buffer.writeUInt8(0, 0); // Payload type
        buffer.writeUInt32LE(1234, 1); // Migrated at
        buffer.writeUInt8(1, 5); // Final
        buffer.writeUInt16LE(1, 6); // Funds count
        buffer.write("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 8, "hex"); // Tail transaction hash
        buffer.writeUInt8(0, 57); // Address type
        buffer.write("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", 58, "hex"); // Address
        buffer.writeBigUInt64LE(BigInt(100), 90); // Desposit
        buffer.writeUInt32LE(4, 98); // Payload length
        buffer.writeUInt32LE(4, 102); // Treasury input payload type
        buffer.writeUInt8(1, 106); // Treasury input type
        buffer.write("cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc", 107, "hex"); // Milestone hash
        buffer.writeUInt8(2, 139); // Treasury output type
        buffer.writeBigUInt64LE(BigInt(123), 140); // Amount

        const payload = deserializeReceiptMilestoneOption(new ReadStream(buffer));
        expect(payload.type).toEqual(0);
        expect(payload.migratedAt).toEqual(1234);
        expect(payload.final).toEqual(true);
        expect(payload.funds.length).toEqual(1);
        expect(payload.funds[0].tailTransactionHash).toEqual("0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        expect(payload.funds[0].address.type).toEqual(0);
        expect((payload.funds[0].address as IEd25519Address).pubKeyHash).toEqual("0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        expect(payload.funds[0].deposit).toEqual("100");
        expect(payload.transaction.type).toEqual(4);
        expect(payload.transaction.input.type).toEqual(1);
        expect(payload.transaction.input.milestoneId).toEqual("0xcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc");
        expect(payload.transaction.output.type).toEqual(2);
        expect(payload.transaction.output.amount).toEqual("123");
    });

    test("Can succeed with valid PoW milestone option", () => {
        const buffer = Buffer.alloc(9);
        buffer.writeUInt8(1, 0); // Payload type
        buffer.writeUInt32LE(0, 1); // Next PoW Score
        buffer.writeUInt32LE(0, 5); // Next PoW Score Milestone index

        const payload = deserializePoWMilestoneOption(new ReadStream(buffer));
        expect(payload.type).toEqual(1);
        expect(payload.nextPoWScore).toEqual(0);
        expect(payload.nextPoWScoreMilestoneIndex).toEqual(0);
      });
});

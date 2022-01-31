// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ReadStream } from "@iota/util.js";
import { deserializePayload } from "../../../src/binary/payloads/payloads";
import type { IMilestonePayload } from "../../../src/models/payloads/IMilestonePayload";
import type { IReceiptPayload } from "../../../src/models/payloads/IReceiptPayload";
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
        buffer.writeUInt32LE(1, 4); // Payload type
        expect(() => deserializePayload(new ReadStream(buffer))).toThrow("minimimum size");
    });

    test("Can fail with receipt payload too small", () => {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt32LE(4, 0); // Payload length
        buffer.writeUInt32LE(3, 4); // Payload type
        expect(() => deserializePayload(new ReadStream(buffer))).toThrow("minimimum size");
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
        expect(payload.tag).toEqual("41");
        expect(payload.data).toEqual(undefined);
    });

    test("Can succeed with valid milestone data", () => {
        const buffer = Buffer.alloc(327);
        buffer.writeUInt32LE(315, 0); // Payload length
        buffer.writeUInt32LE(1, 4); // Payload type
        buffer.writeUInt32LE(1087, 8); // Milestone index
        buffer.writeBigUInt64LE(BigInt(1605190003), 12); // Milestone timestamp
        buffer.writeUInt8(2, 20); // Num parents
        buffer.write("c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3", 21, "hex"); // Parent 1
        buffer.write("04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02", 53, "hex"); // Parent 2
        buffer.write("786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419", 85, "hex"); // Inclusion Merkle proof
        buffer.writeUInt32LE(0, 117); // Next PoW Score
        buffer.writeUInt32LE(0, 121); // Next PoW Score Milestone index
        buffer.writeUInt8(2, 125); // Public Key count
        buffer.write("ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248c", 126, "hex"); // Public Key
        buffer.write("f6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c", 158, "hex"); // Public Key
        buffer.writeUInt32LE(0, 190); // receipt type
        buffer.writeUInt8(2, 194); // Signature count
        buffer.write(
            "f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01",
            195,
            "hex"
        ); // Signature
        buffer.write(
            "fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c",
            259,
            "hex"
        ); // Signature
        const payload = deserializePayload(new ReadStream(buffer)) as IMilestonePayload;
        expect(payload.type).toEqual(1);
        expect(payload.index).toEqual(1087);
        expect(payload.timestamp).toEqual(1605190003);
        expect(payload.parentMessageIds[0]).toEqual("c0ab1d1f6886ba6317634da6b2d957e7c987a9699dd3707d1e2751fcf4b8efe3");
        expect(payload.parentMessageIds[1]).toEqual("04ba147c9cc9bebd3b97310a23d385f33d8e67ac42868b69bc06f5468e3c0a02");
        expect(payload.inclusionMerkleProof).toEqual(
            "786a02f742015903c6c6fd852552d272912f4740e15847618a86e217f71f5419"
        );
        expect(payload.nextPoWScore).toEqual(0);
        expect(payload.nextPoWScoreMilestoneIndex).toEqual(0);
        expect(payload.publicKeys.length).toEqual(2);
        expect(payload.publicKeys[0]).toEqual("ed3c3f1a319ff4e909cf2771d79fece0ac9bd9fd2ee49ea6c0885c9cb3b1248c");
        expect(payload.publicKeys[1]).toEqual("f6752f5f46a53364e2ee9c4d662d762a81efd51010282a75cd6bd03f28ef349c");
        expect(payload.receipt).toBeUndefined();
        expect(payload.signatures.length).toEqual(2);
        expect(payload.signatures[0]).toEqual(
            "f7a99cd2e2e80dd1c4d8ee63567d0ff5be00c3881568d155cf06607a6a78e2972b5d3b1e10dc60da214ae42abb95538f8faa872c90f60636427a36cf4739ac01"
        );
        expect(payload.signatures[1]).toEqual(
            "fc7c1c3174cc0d120c7d522adb3dda549a5f742e082fc2921c740b1b8723bde457498c047cdf6a7759bf7d94b22960d260a1de550e65abadb1a00404d619060c"
        );
    });

    test("Can succeed with valid receipt data", () => {
        const buffer = Buffer.alloc(155);
        buffer.writeUInt32LE(8, 0); // Payload length
        buffer.writeUInt32LE(3, 4); // Payload type
        buffer.writeUInt32LE(1234, 8); // Migrated at
        buffer.writeUInt8(1, 12); // Final
        buffer.writeUInt16LE(1, 13); // Funds count
        buffer.write("a".repeat(98), 15, "hex"); // Tail transaction hash
        buffer.writeUInt8(0, 64); // Address type
        buffer.write("b".repeat(64), 65, "hex"); // Address
        buffer.writeBigUInt64LE(BigInt(100), 97); // Desposit

        buffer.writeUInt32LE(4, 105); // Payload length
        buffer.writeUInt32LE(4, 109); // Treasury input payload type
        buffer.writeUInt8(1, 113); // Treasury input type
        buffer.write("c".repeat(64), 114, "hex"); // Milestone hash
        buffer.writeUInt8(2, 146); // Treasury output type
        buffer.writeBigUInt64LE(BigInt(123), 147); // Amount

        const payload = deserializePayload(new ReadStream(buffer)) as IReceiptPayload;
        expect(payload.type).toEqual(3);
        expect(payload.migratedAt).toEqual(1234);
        expect(payload.final).toEqual(true);
        expect(payload.funds.length).toEqual(1);
        expect(payload.funds[0].tailTransactionHash).toEqual("a".repeat(98));
        expect(payload.funds[0].address.type).toEqual(0);
        expect(payload.funds[0].address.address).toEqual("b".repeat(64));
        expect(payload.funds[0].deposit).toEqual(100);
        expect(payload.transaction.type).toEqual(4);
        expect(payload.transaction.input.type).toEqual(1);
        expect(payload.transaction.input.milestoneId).toEqual("c".repeat(64));
        expect(payload.transaction.output.type).toEqual(2);
        expect(payload.transaction.output.amount).toEqual(123);
    });
});
